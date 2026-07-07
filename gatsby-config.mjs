import {dirname} from 'path';
import remarkGfm from 'remark-gfm';
import {fileURLToPath} from 'url';

import {ALL_PROJECTS_QUERY, format} from './src/util/all-projects-query.mjs';
import {ABSTRACT_COLORS} from './src/util/constants.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rssify = (query, filter = () => true) => {
	const {siteUrl} = query.site.siteMetadata;
	return format(query)
		.filter(filter)
		.map(node => ({
			title: node.title,
			description: node.description || '',
			url: (node.link.startsWith('/') ? siteUrl : '') + node.link,
			date: node.date,
			guid: node.uid,
		}))
		.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export default {
	siteMetadata: {
		title: 'Riley J. Shaw',
		description:
			'Riley J. Shaw is a programmer and designer. Rooted in repair and craft, he creates transparent, remixable tools for a sustainable and accessible future.',
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
				background_color: ABSTRACT_COLORS.dark.bg,
				theme_color: ABSTRACT_COLORS.dark.accent,
				display: 'minimal-ui',
				icon: 'icons/rjs-logo.svg',
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
						serialize: ({query}) =>
							rssify(
								query,
								node =>
									node.type !== 'post' &&
									(node.tags?.includes('starred') ||
										node.repo ===
											'rileyjshaw/rileyjshaw-new' ||
										(node.repo ===
											'rileyjshaw/rileyjshaw.github.io' &&
											node.timestamp > 1577833572562)),
							),
						query: ALL_PROJECTS_QUERY,
						output: '/highlights.xml',
						title: 'Highlights feed',
					},
					{
						serialize: ({query}) =>
							rssify(query, node =>
								['post', 'tumblr'].includes(node.type),
							),
						query: ALL_PROJECTS_QUERY,
						output: '/blog.xml',
						title: 'Blog feed',
					},
					{
						serialize: ({query}) =>
							rssify(query, node => node.type === 'post'),
						query: ALL_PROJECTS_QUERY,
						output: '/blog-internal.xml',
						title: 'Blog feed: internal posts only',
					},
					{
						serialize: ({query}) =>
							rssify(
								query,
								node =>
									!['post', 'tumblr', 'commit'].includes(
										node.type,
									),
							),
						query: ALL_PROJECTS_QUERY,
						output: '/lab.xml',
						title: 'Lab projects feed',
					},
					{
						serialize: ({query}) => rssify(query),
						query: ALL_PROJECTS_QUERY,
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
		'gatsby-plugin-webpack-bundle-analyser-v2',
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
