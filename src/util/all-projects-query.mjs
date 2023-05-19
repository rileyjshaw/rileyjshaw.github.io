import formatProps from './format-props.mjs';
import {useStaticQuery, graphql} from 'gatsby';

export function format({
	allMdx: {nodes: posts} = {nodes: []},
	allCombinedProjectsJson: {nodes: projects} = {nodes: []},
}) {
	return [
		...posts.map(p => ({
			...p,
			type: 'post',
		})),
		...projects,
	].map(formatProps);
}

export default () =>
	format(
		useStaticQuery(graphql`{
	allMdx(
		filter: {internal: {contentFilePath: {regex: "//data/markdown/posts/.*\\.mdx?$/"}}}
		sort: {fields: {date: DESC}}
	) {
		nodes {
			more
			description
			frontmatter {
				layout
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
	allCombinedProjectsJson {
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
}`)
	);
