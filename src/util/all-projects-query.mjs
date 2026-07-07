import formatProps from './format-props.mjs';

// Shared content-path regexes for build-time GraphQL queries (gatsby-node,
// gatsby-config). Page queries in src/pages and src/templates are extracted
// statically by Gatsby, so they can’t interpolate these constants and must
// inline the same regexes as literals.
//
// GraphQL string values go through one round of escape processing, so the
// `\\.` below reaches the regex filter as an escaped dot.
export const POSTS_PATH_REGEX = String.raw`//data/markdown/posts/.*\\.mdx?$/`;
export const PUBLISHED_POSTS_PATH_REGEX = String.raw`//data/markdown/posts/published/.*\\.mdx?$/`;
export const GALLERIES_PATH_REGEX = String.raw`//data/markdown/galleries/.*\\.mdx?$/`;

// Gatsby's GraphQL filters can't express OR across different fields, so every
// RSS feed shares this query and does its own filtering in JS via rssify's
// `filter` argument in gatsby-config.
export const ALL_PROJECTS_QUERY = `
	{
		posts: allMdx(
			filter: {internal: {contentFilePath: {regex: "${PUBLISHED_POSTS_PATH_REGEX}"}}}
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
`;

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
