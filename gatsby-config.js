require(`@babel/register`);

const {format} = require('./src/util/all-projects-query');

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
				background_color: `#4ccbab`,
				theme_color: `#4ccbab`,
				display: `minimal-ui`,
				include_favicon: false,
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
				path: `${__dirname}/project-scraper/sources/`,
				name: `data`,
			},
		},
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/project-scraper/_generated/`,
				name: `scraped`,
			},
		},
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
		`gatsby-plugin-svgr`,
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
							allCombinedProjectsJson (
								filter: {tags: {in: ["starred"]}}
								sort: {fields: [date], order: DESC}
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

							b: allCombinedProjectsJson (
								filter: {
									tags: {nin: ["starred"]},
									repo: {eq: "rileyjshaw/rileyjshaw-new"}
								}
								sort: {fields: [date], order: DESC}
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

							c: allCombinedProjectsJson (
								filter: {
									tags: {nin: ["starred"]},
									repo: {eq: "rileyjshaw/rileyjshaw.github.io"}
									timestamp: {gt: 1577833572562}
								}
								sort: {fields: [date], order: DESC}
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
						output: `/highlights.xml`,
						title: `Highlights feed`,
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

								allCombinedProjectsJson(
									filter: {type: {in: ["tumblr", "commit"]}}
									sort: {fields: [date], order: DESC}
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
							}
						`,
						output: `/blog.xml`,
						title: `Blog feed`,
					},
					{
						serialize: ({query}) => rssify(query),
						query: `
							{
								allCombinedProjectsJson(
									filter: {type: {nin: ["tumblr", "commit"]}}
									sort: {fields: [date], order: DESC}
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
							}
						`,
						output: `/explore.xml`,
						title: `Projects feed`,
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

								allCombinedProjectsJson(
									sort: {fields: [date], order: DESC}
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
							}
						`,
						output: `/index.xml`,
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
