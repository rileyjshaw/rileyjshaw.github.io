import formatProps from './format-props';
import {useStaticQuery, graphql} from 'gatsby';

export function format({
	allMdx: {edges: posts} = {edges: []},
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
		useStaticQuery(graphql`
		{
			allMdx(
				filter: {fileAbsolutePath: {regex: "/\/posts\/.*\\.mdx?$/"}}
				sort: {fields: [fields___date], order: DESC}
			) {
				edges {
					node {
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
					image
					more
					extraData
				}
			}
		}
	`)
	);
