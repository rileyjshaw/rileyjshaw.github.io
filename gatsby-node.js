require('@babel/register');
const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

// TODO(riley): Since this is a CommonJS file and the Project Scraper is written,
// as ES Modules, I duplicated this function rather than complicating the build process.
// ENSURE THIS FUNCTION STAYS IN SYNC WITH THE COPY IN `scraper-utils.js`.
const idify = uid =>
	uid
		.replace(/[-. ]/g, '_')
		.replace(/\W/g, char => char.codePointAt(0).toString(36))
		.toUpperCase();

exports.createPages = async ({actions, graphql, reporter}) => {
	const {createPage, createRedirect} = actions;

	// Create some redirects.
	createRedirect({
		fromPath: '/contact',
		toPath: '/subscribe',
		redirectInBrowser: true,
	});

	const blogListTemplate = path.resolve('./src/templates/blog-list.js');
	const blogPostTemplate = path.resolve('./src/templates/post.js');

	// TODO(riley): Import this query from a common place.
	const result = await graphql(`
		{
			allMdx(
				filter: {
					internal: {
						contentFilePath: {
							regex: "//data/markdown/posts/.*.mdx?$/"
						}
					}
				}
				sort: {fields: {date: DESC}}
				limit: 1000
			) {
				nodes {
					id
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
					internal {
						contentFilePath
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

	// Handle errors.
	if (result.errors) {
		reporter.panicOnBuild(
			`Error while running GraphQL query.`,
			result.errors
		);
		return;
	}

	const internalPosts = result.data.allMdx.nodes;
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
			path: `/blog${page ? `/${page + 1}` : ''}/`,
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
			component: `${blogPostTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
			context: {
				id: post.id,
			},
		});
	});
};

exports.onCreateNode = ({node, getNode, actions}) => {
	const {createNodeField} = actions;

	if (
		node.internal.type === 'Mdx' &&
		node.internal.contentFilePath.includes('/data/markdown/posts/')
	) {
		let {title, slug} = node.frontmatter;
		const fileName = createFilePath({node, getNode, basePath: `posts`});
		const [, date, fileNameSlug] = fileName.match(
			/^\/(?:published|drafts)\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
		);
		slug ??= fileNameSlug;
		createNodeField({
			node,
			name: 'slug',
			value: `/blog/${encodeURI(slug)}`,
		});

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
		// HACK(riley): Currently, excerpt is called twice for each node.
		Mdx: {
			description: {
				type: 'String',
				resolve: async (source, args, context, info) => {
					const resolver = info.schema.getType('Mdx').getFields()
						.excerpt.resolve;
					return await resolver(
						source,
						{
							...args,
							pruneLength: 700,
							truncate: false,
						},
						context,
						info
					);
				},
			},
			more: {
				type: 'Boolean',
				resolve: async (source, args, context, info) => {
					const resolver = info.schema.getType('Mdx').getFields()
						.excerpt.resolve;
					const excerpt = await resolver(
						source,
						{
							...args,
							pruneLength: 700,
							truncate: false,
						},
						context,
						info
					);
					return excerpt.charAt(excerpt.length - 1) === '…';
				},
			},
		},
	});

// Allows components to be imported from the absolute path "components/etc"
// instead of the relative "../../components/etc". This is necessary for MDX.
exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
	const config = {
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		},
	};

	actions.setWebpackConfig(config);
};
