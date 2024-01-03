import {format} from './src/util/all-projects-query.mjs';
import {dirname} from 'path';
import remarkGfm from 'remark-gfm';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rssify = query => {
	const {siteUrl} = query.site.siteMetadata;
	// HACK(riley): Support for OR is limited, and this was quicker.
	if (query.b) {
		query.allCombinedProjectsJson.nodes.push(...query.b.nodes);
		delete query.b;
	}
	if (query.c) {
		query.allCombinedProjectsJson.nodes.push(...query.c.nodes);
		delete query.c;
	}
	return format(query)
		.map(node => ({
			title: node.title,
			description: node.descriptionList
				? node.descriptionList.join('\n')
				: node.description || '',
			url: (node.link.startsWith('/') ? siteUrl : '') + node.link,
			date: node.date,
			guid: node.uid,
		}))
		.sort(
			(a, b) =>
				new Date(b.date || b.fields.date) -
				new Date(a.date || a.fields.date),
		);
};

export default {
	siteMetadata: {
		title: 'Riley J. Shaw',
		description:
			'Riley J. Shaw is a programmer and interface designer. Focused on accessibility, mentorship, and community, Riley questions who “digital literacy” serves.',
		author: '@rileyjshaw',
		siteUrl: 'https://rileyjshaw.com',
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				query: `
					{
						site {
							siteMetadata {
								siteUrl
							}
						}
						allSitePage {
							nodes {
								path
							}
						}
						allOtherReposJson {
							nodes {
								path
								priority
							}
						}
					}
				`,
				resolvePages: ({
					allSitePage: {nodes: allSitePages},
					allOtherReposJson: {nodes: allOtherRepos},
				}) => {
					var result = allSitePages
						.map(page => {
							let priority = 0.7;
							if (page.path.startsWith('/blog')) {
								if (page.path.match(/\/blog\/[0-9]+$/)) {
									priority = 0.1; // Blog index page eg. /blog/2/
								} else if (
									page.path.match(/\/blog\/.*[^0-9/]/)
								) {
									priority = 0.9;
								}
							}
							return {
								path: page.path,
								priority,
								changefreq: 'daily',
							};
						})
						.concat(
							allOtherRepos.map(page => {
								return {
									...page,
									changefreq: 'daily',
								};
							}),
						);
					return result;
				},
				serialize: page => ({
					url: page.path,
					priority: page.priority,
					changefreq: page.changefreq,
				}),
			},
		},
		// 'gatsby-plugin-preload-fonts',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/content/images`,
			},
		},
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'The personal website of rileyjshaw',
				short_name: 'rileyjshaw',
				start_url: '/',
				background_color: '#4ccbab',
				theme_color: '#4ccbab',
				display: 'minimal-ui',
				icon: 'icons/rjs-f.svg',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/data/markdown/`,
				...(process.env.NODE_ENV !== 'development' && {
					ignore: [`${__dirname}/src/data/markdown/posts/drafts`],
				}),
				name: 'markdown',
			},
		},
		'gatsby-transformer-json',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/project-scraper/_generated/`,
				name: 'generated',
			},
		},
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				extensions: ['.mdx', '.md'],
				mdxOptions: {
					remarkPlugins: [remarkGfm],
				},
				gatsbyRemarkPlugins: [
					// TODO: Replace this with a generic linked header component.
					'gatsby-remark-autolink-headers',
					'gatsby-remark-copy-linked-files',
					{
						resolve: 'gatsby-remark-images',
						options: {
							// TODO(riley): Ensure this is always true.
							maxWidth: 675,
							backgroundColor: 'none',
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-postcss',
			options: {
				cssLoaderOptions: {
					esModule: false,
					modules: {
						namedExport: false,
					},
				},
			},
		},
		// TODO(riley): So much redundancy between here, gatsby-node, and
		//              all-projects-query. Do better!
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				query: `
				{
				  site {
						siteMetadata {
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}
				`,
				feeds: [
					{
						serialize: ({query}) => rssify(query),
						query: `
							{
								allCombinedProjectsJson(filter: {tags: {in: ["starred"]}}, sort: {date: DESC}) {
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
									}
								}
								b: allCombinedProjectsJson(
									filter: {tags: {nin: ["starred"]}, repo: {eq: "rileyjshaw/rileyjshaw-new"}}
									sort: {date: DESC}
								) {
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
									}
								}
								c: allCombinedProjectsJson(
									filter: {tags: {nin: ["starred"]}, repo: {eq: "rileyjshaw/rileyjshaw.github.io"}, timestamp: {gt: 1577833572562}}
									sort: {date: DESC}
								) {
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
									}
								}
							}`,
						output: '/highlights.xml',
						title: 'Highlights feed',
					},
					{
						serialize: ({query}) => rssify(query),
						query: `
							{
								allMdx(
									filter: {internal: {contentFilePath: {regex: "//data/markdown/posts/published/.*\.mdx?$/"}}}
									sort: {fields: {date: DESC}}
								) {
									nodes {
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

								allCombinedProjectsJson(
									filter: {type: {in: ["tumblr"]}}
									sort: {date: DESC}
								) {
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
									}
								}
							}
						`,
						output: '/blog.xml',
						title: 'Blog feed',
					},
					{
						serialize: ({query}) => rssify(query),
						query: `
							{
								allMdx(
									filter: {internal: {contentFilePath: {regex: "//data/markdown/posts/published/.*\.mdx?$/"}}}
									sort: {fields: {date: DESC}}
								) {
									nodes {
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
						`,
						output: '/blog-internal.xml',
						title: 'Blog feed: internal posts only',
					},
					{
						serialize: ({query}) => rssify(query),
						query: `
							{
								allCombinedProjectsJson(
									filter: {type: {nin: ["tumblr", "commit"]}}
									sort: {date: DESC}
								) {
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
									}
								}
							}
						`,
						output: '/lab.xml',
						title: 'Lab projects feed',
					},
					{
						serialize: ({query}) => rssify(query),
						query: `
							{
								allMdx(
									filter: {internal: {contentFilePath: {regex: "//data/markdown/posts/published/.*\.mdx?$/"}}}
									sort: {fields: {date: DESC}}
								) {
									nodes {
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

								allCombinedProjectsJson(
									sort: {date: DESC}
								) {
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
									}
								}
							}
						`,
						output: '/index.xml',
						title: 'Firehose feed',
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-page-creator',
			options: {
				path: `${__dirname}/src/pages`,
				ignore:
					process.env.NODE_ENV === 'production'
						? 'curate/**/*'
						: undefined,
			},
		},
		// TODO(riley)
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// 'gatsby-plugin-offline',
	],
	proxy: [
		{
			prefix: '/_curate',
			url: 'http://localhost:5000',
		},
	],
	trailingSlash: 'never',
};
