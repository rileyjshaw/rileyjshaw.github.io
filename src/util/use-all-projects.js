import {graphql, useStaticQuery} from 'gatsby';

import {format} from './all-projects-query.mjs';

// Client-side counterpart to ALL_PROJECTS_QUERY in all-projects-query.mjs,
// plus `coolness`. Static queries are extracted statically by Gatsby, so the
// query text must be inlined here rather than interpolated from the shared
// constants.
export default function useAllProjects() {
	return format(
		useStaticQuery(graphql`
			{
				posts: allMdx(
					filter: {
						internal: {
							contentFilePath: {
								regex: "//data/markdown/posts/published/.*\\.mdx?$/"
							}
						}
					}
					sort: {fields: {date: DESC}}
				) {
					nodes {
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
				combinedProjects: allCombinedProjectsJson(sort: {date: DESC}) {
					nodes {
						uid
						type
						title
						coolness
						date
						link
						description
						updatedAt
						length
						contentType
						body
						image {
							height
							width
							url
						}
						extraData
						tags
						repo
						timestamp
					}
				}
			}
		`),
	);
}
