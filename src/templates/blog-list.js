import React from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PagePicker, {pages} from '../components/page-picker';
import AutoLink from '../components/auto-link';

import './blog-list.css';

export default class BlogList extends React.Component {
	render() {
		const {
			data,
			pageContext: {currentPage, numPages},
		} = this.props;

		// TODO(riley): Unfortunate that we're re-sorting this client-side
		//              instead of collecting + sorting it with GraphQL.
		const posts = [
			...data.allMarkdownRemark.edges.map(({node}) => node),
			...data.allScrapedProjectsFormattedJson.nodes,
		].sort(
			(a, b) =>
				new Date(b.date || b.fields.date) -
				new Date(a.date || a.fields.date)
		);

		const isFirst = currentPage === 1;
		const isLast = currentPage === numPages;
		const prevPage =
			!isFirst && `/blog${currentPage > 2 ? `/${currentPage - 1}` : ''}`;
		const nextPage = !isLast && `/blog/${currentPage + 1}`;

		return (
			<Layout noHeader>
				<SEO title="All posts" />
				<div
					className="blog-list"
					style={{background: pages.blog.color}}
				>
					<PagePicker page="blog" />

					<ul className="blog-posts">
						{posts.map(post => {
							const title =
								post.title ||
								post.frontmatter?.title ||
								post.fields?.slug;

							return (
								<li key={post.uid || post.fields?.slug}>
									<article className="blog-post">
										<header>
											<h3>
												<AutoLink
													to={
														post.link ||
														post.fields?.slug
													}
												>
													{title}
												</AutoLink>
											</h3>
											<small>
												{post.date ||
													post.fields?.date}
											</small>
										</header>
										<section>
											<p
												dangerouslySetInnerHTML={{
													__html:
														post.body ||
														post.description ||
														post.frontmatter
															?.tldr ||
														post.excerpt,
												}}
											/>
										</section>
									</article>
								</li>
							);
						})}
					</ul>
					{!isFirst && (
						<Link to={prevPage} rel="prev">
							← Previous Page
						</Link>
					)}
					{!isLast && (
						<Link to={nextPage} rel="next">
							Next Page →
						</Link>
					)}
				</div>
			</Layout>
		);
	}
}

// TODO(riley): Standardize this format.
// TODO(riley): Figure out proper excerpts for here and the /explore page.
export const blogListQuery = graphql`
	query blogListQuery(
		$internalLimit: Int!
		$internalSkip: Int!
		$externalLimit: Int!
		$externalSkip: Int!
	) {
		allMarkdownRemark(
			filter: {fileAbsolutePath: {regex: "//posts/.*.md$/"}}
			sort: {fields: [fields___date], order: DESC}
			limit: $internalLimit
			skip: $internalSkip
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
			limit: $externalLimit
			skip: $externalSkip
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
