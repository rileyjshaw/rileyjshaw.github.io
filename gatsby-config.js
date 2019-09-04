module.exports = {
	siteMetadata: {
		title: `rileyjshaw`,
		description: `riley's site`,
		author: `@rileyjshaw`,
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
					`gatsby-remark-autolink-headers`,
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							target: `_blank`,
							rel: `noopener noreferrer`,
						},
					},
					{
						resolve: 'gatsby-remark-embed-markdown',
						options: {
							directory: `${__dirname}/src/data/markdown/`,
						},
					},
					`gatsby-remark-prismjs`,
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
		// TODO(riley)
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
