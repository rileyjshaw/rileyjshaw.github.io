import React from 'react';
import {Link, graphql} from 'gatsby';

import {colors} from '../util/constants';
import SEO from '../components/seo';
import Layout from '../components/layout';
import PagePicker, {pages} from '../components/page-picker';

class BlogIndex extends React.Component {
	render() {
		const {data} = this.props;
		const posts = [
			...data.allMarkdownRemark.edges.map(({node}) => node),
			...data.allScrapedProjectsFormattedJson.nodes,
		];

		return (
			<Layout noHeader>
				<SEO title="All posts" />
				<div style={{background: pages.blog.color}}>
					<PagePicker page="blog" />
					{posts.map(post => {
						const title =
							post.title ||
							post.frontmatter?.title ||
							post.fields?.slug;

						return (
							<article key={post.uid || post.fields?.slug}>
								<header>
									<h3>
										<Link
											to={post.link || post.fields?.slug}
										>
											{title}
										</Link>
									</h3>
									<small>
										{post.date || post.fields?.date}
									</small>
								</header>
								<section>
									<p
										dangerouslySetInnerHTML={{
											__html:
												post.body ||
												post.description ||
												post.frontmatter?.tldr ||
												post.excerpt,
										}}
									/>
								</section>
							</article>
						);
					})}
				</div>
			</Layout>
		);
	}
}

export default BlogIndex;

// TODO(riley): Standardize this format.
// TODO(riley): Figure out proper excerpts for here and the /explore page.
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

		allScrapedProjectsFormattedJson(
			filter: {type: {in: ["tumblr", "commit"]}}
			sort: {fields: [date, title], order: DESC}
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
			}
		}
	}
`;
