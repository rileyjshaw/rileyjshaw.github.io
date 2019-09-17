import React, {Fragment} from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import sortingMethods from '../util/sorting-methods';
import allProjectsQuery from '../util/all-projects-query';
import contentTypes from '../util/content-types';

import gridDoodles from './grid-doodles';
import ContentGrid from './content-grid';
import PagePicker from './page-picker';

import './project-explorer.css';

class ProjectExplorer extends React.PureComponent {
	constructor(props) {
		super(props);

		const nodeTypes = Array.from(
			new Set(this.props.nodes.map(n => n.type))
		);
		const initialState = {
			nodeTypes,
			typeStates: nodeTypes.map(
				type => type === 'project' || type === 'doodle'
			),
			sortIdx: 0,
			ascending: false,
			filterType: 'any',
			tagStates: Array.from(props.tags).fill(0),
			drawerOpen: true,
		};

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
			? nodes.filter(node =>
					checkedTypeNames.some(type => node.type === type)
			  )
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
		const ordered = state.ascending ? sorted : sorted.reverse();
		// Insert doodles into a random position.
		doodles.forEach(doodle =>
			ordered.splice(
				Math.floor(Math.random() * ordered.length),
				0,
				doodle
			)
		);
		return ordered;
	}

	refreshDisplayNodes = () => {
		this.setState((state, props) => ({
			nodes: this.getDisplayNodes(state, props),
		}));
	};

	shuffleDisplayNodes = () => {
		this.setState(({nodes}) => {
			const sorted = [...nodes];
			for (let i = sorted.length - 1; i > 0; --i) {
				let j = Math.floor(Math.random() * (i + 1));
				[sorted[i], sorted[j]] = [sorted[j], sorted[i]];
			}
			return {nodes: sorted};
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
			{typeStates: new Array(this.getNodeTypes().length).fill(0)},
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
			{tagStates: new Array(this.props.tags.length).fill(0)},
			this.refreshDisplayNodes
		);
	};

	handleAscendingChange = e => {
		this.setState({ascending: e.target.checked}, this.refreshDisplayNodes);
	};

	render() {
		const {tags} = this.props;
		const {nodes} = this.state;

		return (
			<div className="project-explorer">
				<PagePicker page="explore">
					<button
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
				</PagePicker>
				<div className="filters">
					{this.state.drawerOpen && (
						<fieldset className="controls">
							{/* TODO(riley): Once display: contents or display:
						subgrid have good support, get rid of the .inputs
						wrappers and nest fieldsets (display: contents) around
						each legend / .inputs / button set. Until then, the
						children need to be direct descendents of the grid… */}
							<legend>Show:</legend>
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
								className="labs-clear-types"
								onClick={this.handleClearTypesClick}
							>
								X
							</button>
							<legend>Sort by:</legend>
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
							<legend>Order:</legend>
							<div className="inputs">
								<input
									type="checkbox"
									name="labs-order"
									id="labs-order"
									value="ascending"
									checked={this.state.ascending}
									onChange={this.handleAscendingChange}
								/>
								<label htmlFor="labs-order">Z - A</label>
								<button onClick={this.shuffleDisplayNodes}>
									Shuffle
								</button>
							</div>
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
								className="labs-clear-tags"
								onClick={this.handleClearTagsClick}
							>
								X
							</button>
						</fieldset>
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
				<ContentGrid nodes={nodes} />
			</div>
		);
	}
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
		gridDoodles.map((rendered, i) => ({
			uid: `DOODLE_${i}`,
			type: 'doodle',
			rendered,
		}))
	);

	return <ProjectExplorer nodes={nodes} tags={tags} {...props} />;
};
