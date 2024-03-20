import {useStaticQuery, graphql} from 'gatsby';

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

const allProjectsQuery = () =>
	format(
		useStaticQuery(graphql`{
	posts: allMdx(
		filter: {internal: {contentFilePath: {regex: "//data/markdown/posts/.*\\.mdx?$/"}}}
		sort: {fields: {date: DESC}}
	) {
		nodes {
			more
			description
			frontmatter {
				tags
			}
			fields {
				uid
				slug
				title
				date(formatString: "YYYY-MM-DD")
			}
		}
	}
	combinedProjects: allCombinedProjectsJson {
		nodes {
			uid
			type
			title
			coolness
			date
			link
			description
			descriptionList
			tags
			repo
			updatedAt
			length
			contentType
			body
			image {
				height
				width
				url
			}
			more
			extraData
		}
	}
}`),
	);

export default allProjectsQuery;
