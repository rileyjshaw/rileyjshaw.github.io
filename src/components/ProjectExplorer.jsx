// TODO(RILEY): https://tympanus.net/Development/TiltHoverEffects/index.html
import {useStaticQuery, graphql} from 'gatsby';
import React, {Fragment, useState, useEffect, useMemo} from 'react';

import contentTypes from '../util/ContentTypes';
import allProjectsQuery from '../util/all-projects-query';
import {STORAGE_KEYS} from '../util/constants';
import {useViewport, useStickyState} from '../util/hooks';
import sortingMethods, {shuffle} from '../util/sorting-methods';
import {capitalize} from '../util/util';
import ContentGrid from './ContentGrid';
import gridDoodles from './GridDoodles';

import './ProjectExplorer.css';

const ProjectExplorer = React.memo(function ProjectExplorer(props) {
	const [nodeTypes, version] = useMemo(() => {
		const nodeTypes = Array.from(
			new Set(props.nodes.map(n => n.type)),
		).sort((a, b) => a.localeCompare(b));
		return [nodeTypes, `${nodeTypes.join('')}${sortingMethods.length}`];
	}, [props.nodes]);

	const [ascending, setAscending] = useStickyState(
		false,
		STORAGE_KEYS.labAscending,
		{version},
	);
	const [sortIdx, setSortIdx] = useStickyState(0, STORAGE_KEYS.labSortIdx, {
		version,
	});
	const [typeStates, setTypeStates] = useStickyState(
		() => Array.from(nodeTypes).fill(true),
		STORAGE_KEYS.labTypeStates,
		{version, serverState: []},
	);

	const nSources =
		typeStates.reduce((a, b) => a + b, 0) || typeStates.length;

	const nodes = useMemo(() => {
		if (!typeStates.length) return null;
		const {sortFn} = sortingMethods[sortIdx];
		const checkedTypeNames = nodeTypes.filter((_, i) => typeStates[i]);
		const [doodles, filtered] = (
			checkedTypeNames.length
				? props.nodes.filter(node =>
						checkedTypeNames.includes(node.type),
					)
				: props.nodes
		).reduce(
			(partitions, node) => {
				partitions[node.type === 'doodle' ? 0 : 1].push(node);
				return partitions;
			},
			[[], []],
		);
		const sorted = sortFn(filtered);
		const ordered = ascending ? sorted.reverse() : sorted;
		// Insert a few doodles into a random position.
		doodles.forEach(doodle => {
			const {shouldRender, ...rest} = doodle;
			if (shouldRender()) {
				ordered.splice(
					Math.floor(Math.random() * ordered.length),
					0,
					rest,
				);
			}
		});
		return ordered;
	}, [ascending, sortIdx, typeStates, props.nodes]);

	return (
		nodes && (
			<div className="project-explorer">
				<div className="filters-wrapper">
					<div className="filters">
						<fieldset>
							<legend>Show:</legend>
							<div className="inputs">
								{nodeTypes.map((type, i) => (
									<Fragment key={type}>
										<input
											className="visually-hidden"
											type="checkbox"
											name={`labs-types-${type}`}
											id={`labs-types-${type}`}
											value={type}
											checked={typeStates[i]}
											onChange={e => {
												const {checked} = e.target;
												setTypeStates(
													prevTypeStates => {
														const updatedTypeStates =
															[
																...prevTypeStates,
															];
														updatedTypeStates[i] =
															checked;
														return updatedTypeStates;
													},
												);
											}}
										/>
										<label htmlFor={`labs-types-${type}`}>
											{`${contentTypes[type].readableType}s`}
										</label>
									</Fragment>
								))}
							</div>
							<button
								className="labs-clear labs-clear-types"
								onClick={() =>
									setTypeStates(
										new Array(nodeTypes.length).fill(
											false,
										),
									)
								}
							>
								✖
							</button>
						</fieldset>
						<fieldset>
							<legend>Sort by:</legend>
							<div className="inputs">
								{sortingMethods.map(({title}, i) => (
									<Fragment key={title}>
										<input
											className="visually-hidden"
											type="radio"
											name={`labs-sort-${title}`}
											id={`labs-sort-${title}`}
											value={title}
											checked={sortIdx === i}
											onChange={() => setSortIdx(i)}
										/>
										<label htmlFor={`labs-sort-${title}`}>
											{capitalize(title)}
										</label>
									</Fragment>
								))}
							</div>
						</fieldset>
						<fieldset>
							<legend>Order:</legend>
							<div className="inputs">
								<input
									className="visually-hidden"
									type="checkbox"
									name="labs-order"
									id="labs-order"
									value="ascending"
									checked={ascending}
									onChange={e =>
										setAscending(e.target.checked)
									}
								/>
								<label htmlFor="labs-order">Reverse</label>
								{/* TODO: Add the shuffle button back here!

							<button onClick={this.shuffleDisplayNodes}>
								Shuffle
							</button> */}
							</div>
						</fieldset>
					</div>
					<p className="result-details">
						Found <strong>{nodes.length}</strong> entries from{' '}
						<strong>{nSources}</strong> source
						{nSources === 1 ? '' : 's'}:
					</p>
				</div>
				<LazyGrid
					nodes={nodes}
					setIsFullyLoaded={props.setIsFullyLoaded}
				/>
			</div>
		)
	);
});

const LazyGrid = React.memo(({nodes, setIsFullyLoaded}) => {
	const [renderLimit, setRenderLimit] = useState(20);
	const [ref, inView, boundingClientRect] = useViewport();

	// If the last node is on or above the viewport, load the next 20 nodes.
	// Note that the “last” node might be higher up on the page, eg. if it has
	// a small footprint and squeezes into some top row masonry. Hence the on
	// *or above* the viewport check.
	useEffect(() => {
		if (
			(inView || boundingClientRect?.bottom <= 0) &&
			renderLimit < nodes.length
		) {
			setRenderLimit(l => l + 20);
		}
	}, [inView, boundingClientRect]);

	useEffect(() => {
		setRenderLimit(20);
	}, [nodes]);

	useEffect(() => {
		setIsFullyLoaded && setIsFullyLoaded(renderLimit >= nodes.length);
	}, [nodes.length, renderLimit]);

	return (
		<ContentGrid
			masonry
			nodes={nodes.slice(0, renderLimit)}
			hiddenNodes={nodes.slice(renderLimit)}
			lazyLoadRef={ref}
		/>
	);
});

const ProjectExplorerWrapper = React.memo(props => {
	const {
		allTagsJson: {nodes: tags},
	} = useStaticQuery(graphql`
		{
			allTagsJson {
				nodes {
					name
					readable
				}
			}
		}
	`);
	const hiddenTypes = ['post', 'tumblr', 'commit'];
	const allProjects = allProjectsQuery().filter(
		project => !hiddenTypes.includes(project.type),
	);
	const nodes = useMemo(
		() =>
			allProjects.concat(
				gridDoodles.map(([Doodle, shouldRender], i) => ({
					uid: `DOODLE_${i}`,
					type: 'doodle',
					Doodle,
					shouldRender,
				})),
			),
		[allProjects],
	);

	return <ProjectExplorer nodes={nodes} tags={tags} {...props} />;
});

export default ProjectExplorerWrapper;

/* Big TODO: Once tags are established and applied to each content node (lots
   of manual work required before that happens), get filtering by tag back into
   the component. Here’s an old snippet:

		const filtered = checkedTagNames.length
			? filteredByType.filter(node =>
					checkedTagNames[
						state.filterType === 'any' ? 'some' : 'every'
					](tagName => node.tags && node.tags.includes(tagName))
			  )
			: filteredByType;

		// …
		// …then for the render:
		// …

		<legend>Match:</legend>
		<div className="inputs">
			<input
				type="radio"
				name="labs-filter-any"
				id="labs-filter-any"
				value="any"
				checked={this.state.filterType === 'any'}
				onChange={this.handleFilterTypeChange}
			/>
			<label htmlFor="labs-filter-any">Any</label>
			|
			<input
				type="radio"
				name="labs-filter-all"
				id="labs-filter-all"
				value="all"
				checked={this.state.filterType === 'all'}
				onChange={this.handleFilterTypeChange}
			/>
			<label htmlFor="labs-filter-all">All</label>
		</div>
		<legend>Of:</legend>
		<div className="inputs">
			{tags.map((tag, i) => (
				<Fragment key={tag.name}>
					<input
						type="checkbox"
						name={`labs-tags-${tag.name}`}
						id={`labs-tags-${tag.name}`}
						value={tag.name}
						checked={this.state.tagStates[i]}
						onChange={e =>
							this.handleTagStateChange(e, i)
						}
					/>
					<label
						htmlFor={`labs-tags-${tag.name}`}
					>
						{tag.readable}
					</label>
				</Fragment>
			))}
		</div>
		<button
			className="labs-clear labs-clear-tags"
			onClick={this.handleClearTagsClick}
		>
			✖
		</button>
*/
