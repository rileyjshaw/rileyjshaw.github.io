const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

exports.createPages = async ({actions, graphql, reporter}) => {
	const {createPage} = actions;
	const blogPostTemplate = path.resolve(`src/templates/post.js`);
	// TODO(riley): Import this query from a common place.
	const result = await graphql(`
		query PageQuery {
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
							tldr
							topTitle
						}
						fields {
							slug
							title
							date(formatString: "YYYY-MM-DD")
						}
					}
				}
			}
		}
	`);
	console.log('WE GOT IT 1');

	// Handle errors
	if (result.errors) {
		console.log(result);
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}
	console.log('WE GOT IT 2');
	console.log(result.data.allMarkdownRemark.edges.length);
	result.data.allMarkdownRemark.edges.forEach(({node}) => {
		console.log(`creating a page for ${node.fields.slug}`);
		createPage({
			path: node.fields.slug,
			component: blogPostTemplate,
		});
	});
};

exports.onCreateNode = ({node, getNode, actions}) => {
	const {createNodeField} = actions;

	if (
		node.internal.type === `MarkdownRemark` &&
		node.fileAbsolutePath.includes('/posts/')
	) {
		let {title} = node.frontmatter;

		const fileName = createFilePath({node, getNode, basePath: `posts`});
		const [, date, slug] = fileName.match(
			/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
		);

		createNodeField({node, name: `slug`, value: `/blog/${slug}`});

		if (!title) {
			title =
				slug.slice(0, 1).toUpperCase() +
				slug.slice(1).replace(/-/g, ' ');
		}

		// Save the date and title for later use.
		createNodeField({node, name: `title`, value: title});
		createNodeField({node, name: `date`, value: date});
	}
};
