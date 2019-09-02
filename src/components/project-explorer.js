import React, {Fragment} from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import sortingMethods from '../util/sorting-methods';
import allProjectsQuery from '../util/all-projects-query';
import contentTypes from '../util/content-types';

import GridOrnaments from './grid-ornaments';
import ContentGrid from './content-grid';

import './project-explorer.css';

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
			drawerOpen: true,
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
					](tagName => node.tags && node.tags.includes(tagName))
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
				<div className="filters">
					<header>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							version="1.1"
							viewBox="0 0 100 100"
						>
							<path d="M91.5,91.4c-4.6,4.6-13.2,4.8-24.2,0.5c-11.4-4.4-23.7-13-34.9-24.1s-19.8-23.6-24.2-35C3.8,21.7,4,13.2,8.6,8.5  C13.7,3.5,23.8,3.9,36,9.4c-1.7,0.6-3.5,1.3-5.1,2.1C24,8.9,18.9,9,16,11.8c-2.7,2.7-2.8,7.6-0.8,13.7c0,0.1,0.1,0.1,0.1,0.2  c3.3,9.7,11.9,22.6,24.3,34.9c12.3,12.3,25.1,21,34.8,24.2h0.1c2.8,0.9,5.4,1.5,7.6,1.5c2.6,0,4.7-0.7,6.3-2.2c3-3,3-8.3,0.2-15.5  c0.7-1.6,1.5-3.3,2-5C96.1,76.2,96.4,86.3,91.5,91.4z M21.4,78.6C12.1,69.2,8,55.9,10.2,43c4.8,9,11.9,18,20.3,26.5  S48.1,84.8,57,89.7C44,92.1,30.9,88.1,21.4,78.6z M78.7,21.3c15.8,15.8,15.8,41.5,0,57.2c-1.4,1.4-2.8,2.6-4.4,3.8  c-8.7-3.3-20.5-11.1-33-23.4C28.8,46.5,20.9,34.4,17.7,25.7c1.2-1.5,2.3-3,3.7-4.3C37.2,5.6,62.9,5.6,78.7,21.3z" />
						</svg>
						<h1>Project explorer</h1>
						<button
							onClick={() =>
								this.setState(({drawerOpen}) => ({
									drawerOpen: !drawerOpen,
								}))
							}
						>
							{this.state.drawerOpen ? 'Hide' : 'Show'} filters
						</button>
					</header>
					{this.state.drawerOpen && (
						<fieldset className="controls">
							{/* TODO(riley): Once display: contents or display:
						subgrid have good support, get rid of the .inputs
						wrappers and nest fieldsets (display: contents) around
						each legend / .inputs / button set. Until then, the
						children need to be direct descendents of the grid… */}
							<legend>Show:</legend>
							<div className="inputs">
								{this.getNodeTypes(this.props).map(
									(type, i) => (
										<Fragment key={type}>
											<input
												type="checkbox"
												name={`labs-types-${type}`}
												id={`labs-types-${type}`}
												value={type}
												checked={
													this.state.typeStates[i]
												}
												onChange={e =>
													this.handleTypeStateChange(
														e,
														i
													)
												}
											/>
											<label
												htmlFor={`labs-types-${type}`}
											>
												{
													contentTypes[type]
														.readableType
												}
												s
											</label>
										</Fragment>
									)
								)}
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
								<label htmlFor="labs-filter-any">ANY</label>
								|
								<input
									type="radio"
									name="labs-filter-all"
									id="labs-filter-all"
									value="all"
									checked={this.state.filterType === 'all'}
									onChange={this.handleFilterTypeChange}
								/>
								<label htmlFor="labs-filter-all">ALL</label>
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
				<ContentGrid nodes={nodes}>
					<GridOrnaments />
				</ContentGrid>
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

	return (
		<ProjectExplorer nodes={allProjectsQuery()} tags={tags} {...props} />
	);
};
