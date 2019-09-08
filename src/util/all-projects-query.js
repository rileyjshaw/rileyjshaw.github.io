import {useStaticQuery} from 'gatsby';

import formatProps from './format-props';

export default () => {
	const {
		allMarkdownRemark: {edges: posts},
		allProjectsJson: {nodes: projects},
		allScrapedProjectsFormattedJson: {nodes: scraped},
	} = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/\/posts\/.*\\.md$/"}}
				sort: {fields: [fields___date], order: DESC}
			) {
				edges {
					node {
						excerpt
						frontmatter {
							layout
							topTitle
							tags
						}
						fields {
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
					description
					updatedAt
					length
					contentType
					body
					image
				}
			}
		}
	`);

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
};
