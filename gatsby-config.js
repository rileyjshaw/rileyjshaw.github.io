require(`@babel/register`);

const {format} = require('./src/util/all-projects-query');

const rssify = query => {
	const {siteUrl} = query.site.siteMetadata;
	return format(query)
		.map(node => ({
			title: node.title,
			description: node.description || '',
			url: (node.link.startsWith('/') ? siteUrl : '') + node.link,
			date: node.date,
			guid: node.uid,
		}))
		.sort(
			(a, b) =>
				new Date(b.date || b.fields.date) -
				new Date(a.date || a.fields.date)
		);
};

module.exports = {
	siteMetadata: {
		title: `rileyjshaw`,
		description: `riley's site`,
		author: `@rileyjshaw`,
		siteUrl: `https://rileyjshaw.com`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/content/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `The digital landfill of rileyjshaw`,
				short_name: `rileyjshaw`,
				start_url: `/`,
				background_color: `#0074d9`,
				theme_color: `#0074d9`,
				display: `minimal-ui`,
				// TODO(riley): Favicon.
				// icon: `content/images/favicon.png`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/data/markdown/`,
				name: `markdown`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/data/json/`,
				name: `data`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/project-scraper/_generated/`,
				name: `scraped`,
			},
		},
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-autolink-headers`,
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							target: `_blank`,
							rel: `noopener noreferrer`,
						},
					},
					`gatsby-remark-prismjs`,
					{
						resolve: `gatsby-remark-images`,
						options: {
							// TODO(riley): Ensure this is always true.
							maxWidth: 675,
							backgroundColor: `none`,
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-svgr',
			options: {
				prettier: true,
				svgo: true,
				svgoConfig: {
					plugins: {
						removeViewBox: true,
						cleanupIDs: true,
					},
				},
			},
		},
		// TODO(riley): So much redundancy between here, gatsby-node, and
		//              all-projects-query. Do better!
		{
			resolve: `gatsby-plugin-feed`,
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
						query: `{
							allMarkdownRemark(
								filter: {fileAbsolutePath: {regex: "//posts/.*\.md$/"}}
								sort: {fields: [fields___date], order: DESC}
							) {
								edges {
									node {
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

							allScrapedProjectsFormattedJson(
								filter: {type: {in: ["tumblr", "commit"]}}
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
									image
								}
							}
						}`,
						output: '/blog.xml',
						title: 'Blog feed',
					},
					{
						serialize: ({query}) => rssify(query),
						query: `
							{
								allMarkdownRemark(
									filter: {fileAbsolutePath: {regex: "//posts/.*\.md$/"}}
									sort: {fields: [fields___date], order: DESC}
								) {
									edges {
										node {
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
										description
										updatedAt
										length
										contentType
										body
										image
									}
								}
							}
						`,
						output: `/firehose.xml`,
						title: `Firehose feed`,
					},
				],
			},
		},
		// TODO(riley)
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
