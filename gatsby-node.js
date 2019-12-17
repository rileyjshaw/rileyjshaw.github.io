require(`@babel/register`);
const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');
const {idify, excerptify} = require('./project-scraper/scraper-utils');

exports.createPages = async ({actions, graphql, reporter}) => {
	const {createPage} = actions;
	const blogListTemplate = path.resolve('src/templates/blog-list.js');
	const blogPostTemplate = path.resolve('src/templates/post.js');

	// TODO(riley): Import this query from a common place.
	const result = await graphql(`
		{
			allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "//posts/.*.md$/"}}
				sort: {fields: [fields___date], order: DESC}
				limit: 1000
			) {
				edges {
					node {
						excerpt
						frontmatter {
							layout
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

			allCombinedProjectsJson(
				filter: {type: {in: ["tumblr", "commit"]}}
				limit: 1000
			) {
				nodes {
					date
				}
			}
		}
	`);

	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}
	const internalPosts = result.data.allMarkdownRemark.edges.map(e => e.node);
	const externalPosts = result.data.allCombinedProjectsJson.nodes;
	const allPosts = internalPosts
		.map(p => ({
			type: 'internal',
			date: p.fields.date,
		}))
		.concat(
			externalPosts.map(p => ({
				type: 'external',
				date: p.date,
			}))
		)
		.sort((a, b) => new Date(b.date) - new Date(a.date));
	const postsPerPage = 5;
	const numPages = Math.ceil(allPosts.length / postsPerPage);

	// Create paginated blog listings in the pattern /blog, /blog/1, etc.
	let internalSkip = 0;
	let externalSkip = 0;
	for (let page = 0; page < numPages; ++page) {
		const internalLimit = allPosts
			.slice(page * postsPerPage, (page + 1) * postsPerPage)
			.filter(p => p.type === 'internal').length;
		const externalLimit = postsPerPage - internalLimit;
		createPage({
			path: `/blog${page ? `/${page + 1}` : ''}`,
			component: blogListTemplate,
			context: {
				internalLimit,
				internalSkip,
				externalLimit,
				externalSkip,
				numPages,
				currentPage: page + 1,
			},
		});
		internalSkip += internalLimit;
		externalSkip += externalLimit;
	}

	// Create a post page for each internal post.
	internalPosts.forEach(post => {
		createPage({
			path: post.fields.slug,
			component: blogPostTemplate,
		});
	});
};

exports.onCreateNode = ({node, getNode, actions}) => {
	const {createNodeField} = actions;

	if (
		node.internal.type === 'MarkdownRemark' &&
		node.fileAbsolutePath.includes('/posts/')
	) {
		let {title} = node.frontmatter;

		const fileName = createFilePath({node, getNode, basePath: `posts`});
		const [, date, slug] = fileName.match(
			/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
		);

		createNodeField({node, name: 'slug', value: `/blog/${slug}`});

		if (!title) {
			title =
				slug.slice(0, 1).toUpperCase() +
				slug.slice(1).replace(/-/g, ' ');
		}

		// Save the date and title for later use.
		createNodeField({node, name: 'title', value: title});
		createNodeField({node, name: 'date', value: date});

		const uid = idify(`POST_${slug.toUpperCase().replace(/-/g, '_')}`);
		createNodeField({node, name: 'uid', value: uid});
	}
};

// TODO(riley): Flesh this out.
exports.createSchemaCustomization = ({actions}) => {
	const {createTypes} = actions;
	const typeDefs = `
		# TODO(riley): Consider merging description and descriptionList.
		# https://github.com/graphql/graphql-spec/issues/215
		type CombinedProjectsJson implements Node {
			title: String
			description: String
			descriptionList: [String]
		}
	`;

	createTypes(typeDefs);
};

exports.createResolvers = ({createResolvers}) =>
	createResolvers({
		// HACK(riley): Currently, excerptify is called twice for each node.
		MarkdownRemark: {
			description: {
				type: 'String',
				resolve: async (source, args, _, info) => {
					const resolver = info.schema
						.getType('MarkdownRemark')
						.getFields().html.resolve;
					const html = await resolver(source, args);
					return excerptify(html).description;
				},
			},
			more: {
				type: 'Boolean',
				resolve: async (source, args, _, info) => {
					const resolver = info.schema
						.getType('MarkdownRemark')
						.getFields().html.resolve;
					const html = await resolver(source, args);
					return excerptify(html).more;
				},
			},
		},
	});
