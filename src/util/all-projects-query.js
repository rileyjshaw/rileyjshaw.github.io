import {useStaticQuery} from 'gatsby';

import formatProps from './format-props';

export default () => {
	const {
		allAtomEntry: {nodes: commits},
		allMarkdownRemark: {edges: posts},
		allProjectsJson: {nodes: projects},
		arenaChannels: {channels: arenaChannels},
		dweets0: {results: d0},
		dweets1: {results: d1},
	} = useStaticQuery(graphql`
		{
			allAtomEntry {
				nodes {
					title
					date(formatString: "YYYY-MM-DD")
					link
					description
				}
			}

			allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/\/posts\/.*\\.md$/"}}
				sort: {fields: [fields___date], order: DESC}
			) {
				edges {
					node {
						excerpt
						frontmatter {
							layout
							tldr
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

			arenaChannels {
				channels {
					id__normalized
					title
					created_at
					updated_at
					published
					slug
					length
					status
					metadata {
						description
					}
				}
			}

			dweets0 {
				results {
					id__normalized
					link
					posted
				}
			}

			dweets1 {
				results {
					id__normalized
					link
					posted
				}
			}
		}
	`);

	return [
		// TODO(riley): Better IDs?
		// TODO(riley): Better way of handling tags!!!!
		...arenaChannels
			.filter(c => c.published && c.status !== 'private' && c.length > 5)
			.map(c => ({
				...c,
				type: 'arenaChannel',
			})),
		...commits.map((c, i) => ({
			...c,
			type: 'commit',
			id: `commit-${i}`,
			tags: ['online', 'instructional'],
		})),
		...posts.map(p => ({
			...p,
			type: 'post',
		})),
		...projects
			.filter(({todo}) => !todo)
			.map((p, i) => ({
				...p,
				type: 'project',
				id: `project-${i}`,
			})),
		...[...d0, ...d1].map(d => ({
			...d,
			type: 'dweet',
		})),
	].map(formatProps);
};
