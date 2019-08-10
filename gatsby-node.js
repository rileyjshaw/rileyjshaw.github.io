/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const {createFilePath} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({node, getNode, actions}) => {
	const {createNodeField} = actions;

	if (node.internal.type === `MarkdownRemark`) {
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
