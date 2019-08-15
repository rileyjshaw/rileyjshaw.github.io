import React from 'react';
import {Link, graphql} from 'gatsby';

import SEO from '../components/seo';

class BlogIndex extends React.Component {
	render() {
		const {data} = this.props;
		const posts = data.allMarkdownRemark.edges;
		console.log(posts);

		return (
			<>
				<SEO title="All posts" />
				{posts.map(({node: post}) => {
					const title = post.frontmatter.title || post.fields.slug;

					return (
						<article key={post.fields.slug}>
							<header>
								<h3>
									<Link to={post.fields.slug}>{title}</Link>
								</h3>
								<small>{post.fields.date}</small>
							</header>
							<section>
								<p
									dangerouslySetInnerHTML={{
										__html:
											post.frontmatter.tldr ||
											post.excerpt,
									}}
								/>
							</section>
						</article>
					);
				})}
			</>
		);
	}
}

export default BlogIndex;

export const pageQuery = graphql`
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
`;
