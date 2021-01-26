// TODO(RILEY): https://tympanus.net/Development/TiltHoverEffects/index.html
import React, {Fragment, useState, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import sortingMethods, {shuffle} from '../util/sorting-methods';
import allProjectsQuery from '../util/all-projects-query';
import contentTypes from '../util/content-types';
import {useInView} from '../util/hooks';

import gridDoodles from './grid-doodles';
import ContentGrid from './content-grid';

import './project-explorer.css';

// TODO(riley): Get rid of the class component, switch to useStickyState.
const SAVED_PROPERTIES = [
	'typeStates',
	'sortIdx',
	'ascending',
	'filterType',
	'tagStates',
];
class ProjectExplorer extends React.PureComponent {
	constructor(props) {
		super(props);

		const nodeTypes = Array.from(
			new Set(this.props.nodes.map(n => n.type))
		).sort((a, b) => a.localeCompare(b));

		const initialState = {
			nodeTypes,
			typeStates: Array.from(nodeTypes).fill(true),
			sortIdx: 0,
			ascending: false,
			filterType: 'any',
			tagStates: Array.from(props.tags).fill(false),
			drawerOpen: false,
		};

		if (typeof window !== 'undefined') {
			if (
				window.localStorage.getItem('LAB_V1_nodeTypes') ===
				initialState.nodeTypes.join('')
			) {
				SAVED_PROPERTIES.forEach(key => {
					const savedValue = JSON.parse(
						window.localStorage.getItem(`LAB_V1_${key}`)
					);
					if (savedValue != null) initialState[key] = savedValue;
				});
			} else {
				window.localStorage.setItem(
					'LAB_V1_nodeTypes',
					initialState.nodeTypes.join('')
				);
				SAVED_PROPERTIES.forEach(key =>
					window.localStorage.removeItem(`LAB_V1_${key}`)
				);
			}
		}

		this.state = {
			...initialState,
			nodes: this.getDisplayNodes(initialState, props),
		};
	}

	// HACK(riley): Better to not use state and memoize this on `props.nodes`.
	getNodeTypes = (state = this.state) => state.nodeTypes;

	getDisplayNodes(state, {tags, nodes}) {
		const {sortFn} = sortingMethods[state.sortIdx];
		const checkedTypeNames = this.getNodeTypes(state).filter(
			(_, i) => state.typeStates[i]
		);
		const checkedTagNames = tags
			.filter((_, i) => state.tagStates[i])
			.map(tag => tag.name);
		const [doodles, filteredByType] = (checkedTypeNames.length
			? nodes.filter(node => checkedTypeNames.includes(node.type))
			: nodes
		).reduce(
			(partitions, node) => {
				partitions[node.type === 'doodle' ? 0 : 1].push(node);
				return partitions;
			},
			[[], []]
		);
		const filtered = checkedTagNames.length
			? filteredByType.filter(node =>
					checkedTagNames[
						state.filterType === 'any' ? 'some' : 'every'
					](tagName => node.tags && node.tags.includes(tagName))
			  )
			: filteredByType;
		const sorted = sortFn(filtered);
		const ordered = state.ascending ? sorted.reverse() : sorted;
		// Insert a few doodles into a random position.
		doodles
			.filter(doodle => doodle.shouldRender())
			.forEach(doodle => {
				ordered.splice(
					Math.floor(Math.random() * ordered.length),
					0,
					doodle
				);
			});
		return ordered;
	}

	refreshDisplayNodes = () => {
		this.setState((state, props) => {
			if (typeof window !== 'undefined') {
				SAVED_PROPERTIES.forEach(key =>
					window.localStorage.setItem(
						`LAB_V1_${key}`,
						JSON.stringify(state[key])
					)
				);
			}
			return {
				nodes: this.getDisplayNodes(state, props),
			};
		});
	};

	shuffleDisplayNodes = () => {
		this.setState(({nodes}) => {
			return {nodes: shuffle(nodes)};
		});
	};

	handleSortMethodChange = sortIdx => {
		this.setState({sortIdx}, this.refreshDisplayNodes);
	};

	handleFilterTypeChange = e => {
		this.setState({filterType: e.target.value}, this.refreshDisplayNodes);
	};

	handleTypeStateChange = (e, typeIdx) => {
		const {checked} = e.target;
		this.setState(({typeStates}) => {
			const updatedTypeStates = [...typeStates];
			updatedTypeStates[typeIdx] = checked;
			return {typeStates: updatedTypeStates};
		}, this.refreshDisplayNodes);
	};

	handleClearTypesClick = () => {
		this.setState(
			{typeStates: new Array(this.getNodeTypes().length).fill(false)},
			this.refreshDisplayNodes
		);
	};

	handleTagStateChange = (e, tagIdx) => {
		const {checked} = e.target;
		this.setState(({tagStates}) => {
			const updatedTagStates = [...tagStates];
			updatedTagStates[tagIdx] = checked;
			return {tagStates: updatedTagStates};
		}, this.refreshDisplayNodes);
	};

	handleClearTagsClick = () => {
		this.setState(
			{tagStates: new Array(this.props.tags.length).fill(false)},
			this.refreshDisplayNodes
		);
	};

	handleAscendingChange = e => {
		this.setState({ascending: e.target.checked}, this.refreshDisplayNodes);
	};

	render() {
		// const {tags} = this.props;
		const {nodes} = this.state;

		return (
			<div className="project-explorer">
				<button
					className="project-explorer-hide-filters"
					onClick={() =>
						this.setState(({drawerOpen}) => ({
							drawerOpen: !drawerOpen,
						}))
					}
				>
					{this.state.drawerOpen
						? 'Hide filters ▲'
						: 'Show filters ▼'}
				</button>
				<div className="filters">
					{this.state.drawerOpen && (
						/* TODO(riley): Once display: contents or display:
						subgrid have good support, replace <p.legend> with
						<legend>, get rid of the .inputs wrappers, and nest
						<fieldset>s (display: contents) around each <legend> /
						.inputs / button set. Until then, the children need to
						be direct descendents of the grid, and a11y takes a
						hit. */
						<div className="controls">
							<p className="legend">Show:</p>
							<div className="inputs">
								{this.getNodeTypes().map((type, i) => (
									<Fragment key={type}>
										<input
											type="checkbox"
											name={`labs-types-${type}`}
											id={`labs-types-${type}`}
											value={type}
											checked={this.state.typeStates[i]}
											onChange={e =>
												this.handleTypeStateChange(
													e,
													i
												)
											}
										/>
										<label htmlFor={`labs-types-${type}`}>
											{contentTypes[type].readableType}s
										</label>
									</Fragment>
								))}
							</div>
							<button
								className="labs-clear labs-clear-types"
								onClick={this.handleClearTypesClick}
							>
								✖
							</button>
							<p className="legend">Sort by:</p>
							<div className="inputs">
								{sortingMethods.map(({title}, i) => (
									<Fragment key={title}>
										<input
											type="radio"
											name={`labs-sort-${title}`}
											id={`labs-sort-${title}`}
											value={title}
											checked={this.state.sortIdx === i}
											onChange={() =>
												this.handleSortMethodChange(i)
											}
										/>
										<label htmlFor={`labs-sort-${title}`}>
											{title.toUpperCase().slice(0, 1) +
												title.slice(1)}
										</label>
									</Fragment>
								))}
							</div>
							<p className="legend">Order:</p>
							<div className="inputs">
								<input
									type="checkbox"
									name="labs-order"
									id="labs-order"
									value="ascending"
									checked={this.state.ascending}
									onChange={this.handleAscendingChange}
								/>
								<label htmlFor="labs-order">Reverse</label>
								<button onClick={this.shuffleDisplayNodes}>
									Shuffle
								</button>
							</div>
							{/* <p className="legend">Match:</p>
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
							<p className="legend">Of:</p>
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
							</button> */}
						</div>
					)}
				</div>
				<p className="result-details">
					Found <strong>{nodes.length}</strong> entries from{' '}
					<strong>
						{this.state.typeStates.reduce((a, b) => a + b) ||
							this.state.typeStates.length}
					</strong>{' '}
					sources:
				</p>
				<LazyGrid
					nodes={nodes}
					setIsFullyLoaded={this.props.setIsFullyLoaded}
				/>
			</div>
		);
	}
}

// TODO(riley): Ensure this lazy-loading works with a screen reader.
function LazyGrid({nodes, setIsFullyLoaded}) {
	const [renderLimit, setRenderLimit] = useState(20);
	const [ref, inView, entry] = useInView();
	// If the last node is on or above the viewport, load the next 20 nodes.
	// Note that the “last” node might be higher up on the page, eg. if it has
	// a small footprint and squeezes into some top row masonry. Hence the on
	// *or above* the viewport check.
	useEffect(() => {
		if (
			(inView || (entry?.boundingClientRect?.bottom ?? 1) <= 0) &&
			renderLimit < nodes.length
		) {
			setRenderLimit(l => l + 20);
		}
	}, [inView, entry?.boundingClientRect?.bottom]);
	useEffect(() => {
		setRenderLimit(20);
	}, [nodes.length]);
	useEffect(() => {
		setIsFullyLoaded && setIsFullyLoaded(renderLimit >= nodes.length);
	}, [nodes.length, renderLimit]);

	return (
		<ContentGrid masonry nodes={nodes.slice(0, renderLimit)} ref={ref} />
	);
}

export default props => {
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

	const nodes = allProjectsQuery().concat(
		gridDoodles.map(([Doodle, shouldRender], i) => ({
			uid: `DOODLE_${i}`,
			type: 'doodle',
			Doodle,
			shouldRender,
		}))
	);

	return <ProjectExplorer nodes={nodes} tags={tags} {...props} />;
};
