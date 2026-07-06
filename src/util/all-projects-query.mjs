import formatProps from './format-props.mjs';

export function format({
	posts: {nodes: posts} = {nodes: []},
	combinedProjects: {nodes: projects} = {nodes: []},
}) {
	return [
		...posts.map(p => ({
			...p,
			type: 'post',
		})),
		...projects,
	].map(formatProps);
}
