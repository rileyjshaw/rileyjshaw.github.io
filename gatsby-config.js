require('dotenv').config();

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
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
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
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-atom`,
			options: {
				source: `http://rileyjshaw.commit--blog.com/feed`,
			},
		},
		// HACK(riley): Can I get this source to dynamically use the "next" key?
		//              See https://github.com/gatsbyjs/gatsby/issues/9682 and
		//              https://spectrum.chat/gatsby-js/general/how-does-gatsby-handle-large-datasets-and-pagination~ebd2abda-fbfe-4b82-9b08-52ce115cad4e
		...Array.from({length: 5}, (_, i) => ({
			resolve: `gatsby-source-custom-api`,
			options: {
				url: `https://www.dwitter.net/api/dweets/?author=rileyjshaw&limit=10&offset=${i *
					10}`,
				rootKey: `dweets${i}`,
				schemas: {
					dweets: `
						next: String
						results: [results]
					`,
					results: `
						id: Int
						link: String
						author: author
						posted: String
					`,
					author: `
						username: String
					`,
				},
			},
		})),
		{
			resolve: `gatsby-source-custom-api`,
			options: {
				url: `http://api.are.na/v2/users/riley-shaw/channels?access_token=${process.env.ARENA_ACCESS_TOKEN}`,
				rootKey: `arenaChannels`,
				schemas: {
					arenaChannels: `
						total_pages: Int
						channels: [channels]
					`,
					channels: `
						title: String
						created_at: String
						updated_at: String
						published: Boolean
						slug: String
						length: Int
						status: String
						metadata: metadata
					`,
					metadata: `
						description: String
					`,
				},
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-prismjs`,
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
				],
			},
		},
		// TODO(riley)
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
