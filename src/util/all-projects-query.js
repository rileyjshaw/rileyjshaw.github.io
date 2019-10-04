import {useStaticQuery, graphql} from 'gatsby';

import formatProps from './format-props';

export function format({
	allMarkdownRemark: {edges: posts} = {edges: []},
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
			allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/\/posts\/.*\\.md$/"}}
				sort: {fields: [fields___date], order: DESC}
			) {
				edges {
					node {
						more
						description
						frontmatter {
							layout
							topTitle
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
				}
			}
		}
	`)
	);
