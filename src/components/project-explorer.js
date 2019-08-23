import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import sortingMethods from '../util/sorting-methods';
import allProjectsQuery from '../util/all-projects-query';

import GridOrnaments from './grid-ornaments';
import ContentGrid from './content-grid';

class ProjectExplorer extends React.Component {
	constructor(props) {
		super(props);

		const initialState = {
			typeStates: this.getNodeTypes().map(
				type => type === 'project' || type === 'post'
			),
			sortIdx: 0,
			ascending: false,
			filterType: 'any',
			tagStates: Array.from(props.tags).fill(0),
		};

		this.state = {
			...initialState,
			nodes: this.getDisplayNodes(initialState, props),
		};
	}

	getNodeTypes = () => {
		return Array.from(new Set(this.props.nodes.map(n => n.type)));
	};

	getDisplayNodes(state, {tags, nodes}) {
		const {sortFn} = sortingMethods[state.sortIdx];
		const checkedTypeNames = this.getNodeTypes().filter(
			(_, i) => state.typeStates[i]
		);
		const checkedTagNames = tags
			.filter((_, i) => state.tagStates[i])
			.map(tag => tag.name);
		const filteredByType = checkedTypeNames.length
			? nodes.filter(node =>
					checkedTypeNames.some(type => node.type === type)
			  )
			: nodes;
		const filtered = checkedTagNames.length
			? filteredByType.filter(node =>
					checkedTagNames[
						state.filterType === 'any' ? 'some' : 'every'
					](tagName => node.tags.includes(tagName))
			  )
			: filteredByType;
		const sorted = sortFn(filtered);
		const ordered = state.ascending ? sorted : sorted.reverse();

		return ordered;
	}

	refreshDisplayNodes = () => {
		this.setState((state, props) => ({
			nodes: this.getDisplayNodes(state, props),
		}));
	};

	reorderDisplayNodes = () => {};

	shuffleDisplayNodes = () => {
		this.setState(({nodes}) => {
			const sorted = [...nodes];
			for (let i = sorted.length - 1; i > 0; --i) {
				let j = Math.floor(Math.random() * (i + 1));
				[sorted[i], sorted[j]] = [sorted[j], sorted[i]];
			}
			return sorted;
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
			<>
				<fieldset className="filters">
					<fieldset>
						<legend>Show:</legend>
						{this.getNodeTypes(this.props).map((type, i) => (
							<label key={type}>
								<input
									type="checkbox"
									name="labs-types"
									value={type}
									checked={this.state.typeStates[i]}
									onChange={e =>
										this.handleTypeStateChange(e, i)
									}
								/>
								{type}
							</label>
						))}
						<button
							className="labs-clear-types"
							onClick={this.handleClearTypesClick}
						>
							X
						</button>
					</fieldset>
					<fieldset>
						<legend>Sort by:</legend>
						{sortingMethods.map(({title}, i) => (
							<label key={title}>
								<input
									type="radio"
									name="labs-sort"
									value={title}
									checked={this.state.sortIdx === i}
									onChange={() =>
										this.handleSortMethodChange(i)
									}
								/>
								{title.toUpperCase().slice(0, 1) +
									title.slice(1)}
							</label>
						))}
						<label>
							<input
								type="checkbox"
								name="labs-order"
								value="ascending"
								checked={this.state.ascending}
								onChange={this.handleAscendingChange}
							/>
							Z-A
						</label>
						<button onClick={this.shuffleDisplayNodes}>
							Shuffle
						</button>
					</fieldset>
					<fieldset>
						<legend>Match:</legend>
						<label>
							<input
								type="radio"
								name="labs-filter"
								value="any"
								checked={this.state.filterType === 'any'}
								onChange={this.handleFilterTypeChange}
							/>
							ANY
						</label>
						|
						<label>
							<input
								type="radio"
								name="labs-filter"
								value="all"
								checked={this.state.filterType === 'all'}
								onChange={this.handleFilterTypeChange}
							/>
							ALL
						</label>
					</fieldset>
					<fieldset>
						<legend>Of:</legend>
						{tags.map((tag, i) => (
							<label key={tag.name}>
								<input
									type="checkbox"
									name="labs-tags"
									value={tag.name}
									checked={this.state.tagStates[i]}
									onChange={e =>
										this.handleTagStateChange(e, i)
									}
								/>
								{tag.readable}
							</label>
						))}
						<button
							className="labs-clear-tags"
							onClick={this.handleClearTagsClick}
						>
							X
						</button>
					</fieldset>
				</fieldset>
				<p>
					Found <strong>{nodes.length}</strong> entries from{' '}
					<strong>
						{this.state.typeStates.reduce((a, b) => a + b) ||
							this.state.typeStates.length}
					</strong>{' '}
					sources.
				</p>
				<ContentGrid nodes={nodes}>
					<GridOrnaments />
				</ContentGrid>
			</>
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

	return (
		<ProjectExplorer nodes={allProjectsQuery()} tags={tags} {...props} />
	);
};
