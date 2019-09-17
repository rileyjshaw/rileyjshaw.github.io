import {useStaticQuery, graphql} from 'gatsby';

import formatProps from './format-props';

export function format({
	allMarkdownRemark: {edges: posts} = {edges: []},
	allProjectsJson: {nodes: projects} = {nodes: []},
	allScrapedProjectsFormattedJson: {nodes: scraped} = {nodes: []},
}) {
	return [
		...posts.map(p => ({
			...p,
			type: 'post',
		})),
		...projects
			.filter(({todo}) => !todo)
			.map((p, i) => ({
				...p,
				type: 'project',
				uid: `PROJECT_${p.title.toUpperCase().replace(/[- ]/g, '_')}`,
			})),
		...scraped,
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

			allProjectsJson {
				nodes {
					title
					description
					todo
					tags
					date
					coolness
					href
				}
			}

			allScrapedProjectsFormattedJson {
				nodes {
					uid
					type
					title
					date
					link
					repo
					description
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
