import ContentNode from '../../components/content-node';
import SEO from '../../components/seo';
import allProjectsQuery from '../../util/all-projects-query';
import './tags.css';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CreatableSelect from 'react-select/creatable';

function Project({
	addNewTag,
	isLoading,
	node,
	saveProjectTags,
	selectedTags,
	updateSelectedTags,
	tagOptions,
}) {
	const handleCreate = useCallback(
		function handleCreate(inputValue) {
			const readable = prompt(
				'Input the tag’s readable name:',
				inputValue
			);
			let name;
			while (
				!name ||
				tagOptions.map(option => option.value).includes(name)
			) {
				name = prompt(
					`Input the “${readable}” tag’s unique key:`,
					inputValue.toLowerCase().replace(/\W/g, '')
				);
			}
			const isPublic = confirm(
				'Do you want to make this public-facing?'
			);
			const description = prompt(`Describe the “${readable}” tag:`);
			addNewTag(name, {readable, isPublic, description});
		},
		[tagOptions, addNewTag]
	);

	return (
		<>
			<ContentNode {...node} />
			<CreatableSelect
				className="tag-select"
				isMulti
				isDisabled={isLoading}
				isLoading={isLoading}
				onChange={updateSelectedTags}
				onCreateOption={handleCreate}
				options={tagOptions}
				value={selectedTags}
				placeholder="Add some project tags…"
				menuPlacement="top"
				closeMenuOnSelect={false}
			/>
			<button onClick={saveProjectTags}>Save</button>
		</>
	);
}

function CurateTags() {
	// TODO: Include posts as well? For now, just manually curate them.
	const allProjects = allProjectsQuery();
	const [projects, setProjects] = useState(
		allProjects
			.filter(({type}) => type !== 'post')
			.map((p, i) => ({...p, initialIndex: i}))
	);
	const [isLoading, setIsLoading] = useState(false);
	const [tags, setTags] = useState(null);
	const [selectedTags, setSelectedTags] = useState([]);

	useEffect(() => {
		fetch('/_curate/static/sources/tags.json')
			.then(res => res.json())
			.then(tags => setTags(tags));
	}, []);

	// tags comes from the server, and is kept in sync.
	const [tagOptions, nUntaggedProjects, projectNode] = useMemo(() => {
		if (!tags) return [[], 0, null];
		const tagOptions = Object.entries(tags.tagInfo).map(
			([name, {readable}]) => ({
				label: readable,
				value: name,
			})
		);
		const lastTagCreatedAt = Object.values(tags.tagInfo).reduce(
			(mostRecent, {created}) => Math.max(mostRecent, created),
			0
		);
		const untaggedProjects = projects
			.map(p => ({
				project: p,
				updated: tags.taggedProjects[p.uid]?.updated ?? 0,
			}))
			.filter(p => p.updated <= lastTagCreatedAt)
			.sort((a, b) => a.updated - b.updated)
			.map(p => p.project);

		return [tagOptions, untaggedProjects.length, untaggedProjects[0]];
	}, [tags, projects]);

	useEffect(() => {
		if (!projectNode) return;
		const initialTags = tags.taggedProjects[projectNode.uid]?.tags ?? [];
		setSelectedTags(
			initialTags.map(key => ({
				label: tags.tagInfo[key].readable,
				value: key,
			}))
		);
	}, [projectNode]);

	const updateSelectedTags = useCallback(
		newTags => {
			setSelectedTags(newTags);
			setProjects(oldProjects => {
				const newProjects = [...oldProjects];
				newProjects[projectNode.initialIndex].tags = newTags.map(
					t => t.value
				);
				return newProjects;
			});
		},
		[projectNode]
	);

	const addNewTag = useCallback(
		async function addNewTag(name, tag) {
			setIsLoading(true);
			const response = await fetch('/_curate/tags', {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify([name, tag]),
			});
			const newTags = await response.json();
			setTags(newTags);
			updateSelectedTags([
				...selectedTags,
				{
					label: tag.readable,
					value: name,
				},
			]);
			setIsLoading(false);
		},
		[selectedTags, setTags, updateSelectedTags]
	);

	const saveProjectTags = useCallback(
		async function saveProjectTags() {
			setIsLoading(true);
			const response = await fetch(`/_curate/tags/${projectNode.uid}`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(selectedTags.map(t => t.value)),
			});
			const newTags = await response.json();
			setTags(newTags);
			setIsLoading(false);
		},
		[projectNode, selectedTags]
	);

	return (
		<>
			<SEO title="Curate tags" />
			<div className="curate-tags-page">
				{tags && (
					<div className="untagged-counter">
						<strong
							style={{
								color:
									nUntaggedProjects < 30
										? 'var(--color-green)'
										: nUntaggedProjects < 60
										? 'var(--color-yellow)'
										: 'var(--color-red)',
							}}
						>
							{nUntaggedProjects}
						</strong>{' '}
						projects to go!
					</div>
				)}
				{projectNode && (
					<Project
						addNewTag={addNewTag}
						isLoading={isLoading}
						node={projectNode}
						saveProjectTags={saveProjectTags}
						selectedTags={selectedTags}
						updateSelectedTags={updateSelectedTags}
						tagOptions={tagOptions}
					/>
				)}
			</div>
		</>
	);
}

export default CurateTags;
