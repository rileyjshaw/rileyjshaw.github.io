import React from 'react';
import {Link, graphql} from 'gatsby';

import AutoLink, {ExternalLink} from '../components/auto-link';
import Layout from '../components/layout';
import RgbSplitter from '../components/rgb-splitter';
import SEO from '../components/seo';
import Shard from '../components/shard';
import SiteNav from '../components/site-nav';

import '../components/content-node.css';
import './post.css';
import './blog-list.css';

const urlFrom = page => `/blog${page === 1 ? '' : `/${page}`}`;

// TODO(riley): Style with same stylesheet as blog posts.
export default ({data, pageContext: {currentPage, numPages}}) => {
	// TODO(riley): Unfortunate that we're re-sorting this client-side instead
	//              of collecting + sorting it with GraphQL.
	const posts = [
		...data.allMarkdownRemark.edges.map(({node}) => node),
		...data.allCombinedProjectsJson.nodes,
	].sort(
		(a, b) =>
			new Date(b.date || b.fields.date) -
			new Date(a.date || a.fields.date)
	);

	const isFirst = currentPage === 1;
	const isLast = currentPage === numPages;
	const prevPage = !isFirst && urlFrom(currentPage - 1);
	const nextPage = !isLast && urlFrom(currentPage + 1);
	const nearbyPages = Array.from({length: numPages}, (_, i) => i + 1)
		.splice(Math.min(Math.max(0, currentPage - 3), numPages - 5), 5)
		.map(page => (
			<Link
				key={page}
				to={urlFrom(page)}
				className={page === currentPage ? 'current-page' : ''}
			>
				{page}
			</Link>
		));

	return (
		<Layout>
			<SEO title="All posts" />
			<header className="page-header blog-list-page-header">
				<SiteNav />
				<RgbSplitter El="h1" className="title">
					<Shard>Blog</Shard>
				</RgbSplitter>
			</header>
			<main className="blog-list">
				<ul className="blog-posts">
					{posts.map(post => {
						const uid = post.uid || post.fields?.uid;
						const title = post.title || post.fields?.title;
						const link = post.link || post.fields?.slug;
						const date = post.date || post.fields?.date;
						const {repo} = post;

						return (
							<li className="blog-post content-node" key={uid}>
								<article
									className={`blog-post-content${
										post.more ? ' excerpt' : ''
									}`}
								>
									<header>
										<h1>
											<AutoLink to={link}>
												{title}
											</AutoLink>
										</h1>

										<div className="subheading">
											<time dateTime={date}>
												{date.replace(/-/g, '.')}
											</time>
											{repo && (
												<>
													{' '}
													• From repository{' '}
													<ExternalLink
														to={`https://github.com/${repo}`}
													>
														{repo}
													</ExternalLink>
												</>
											)}
										</div>
									</header>
									<section
										dangerouslySetInnerHTML={{
											__html: post.description,
										}}
									></section>
								</article>
							</li>
						);
					})}
				</ul>
				{/* TODO(riley): Consider replacing arrows with - and + in final design. */}
				<div className="page-navigation">
					{!isFirst && (
						<Link to={prevPage} rel="prev">
							⬅&#xFE0E;
						</Link>
					)}
					{nearbyPages}
					{!isLast && (
						<Link to={nextPage} rel="next">
							➡&#xFE0E;
						</Link>
					)}
				</div>
			</main>
		</Layout>
	);
};

// TODO(riley): Standardize this format.
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
					description
					more
					frontmatter {
						layout
						topTitle
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
			sort: {fields: [date, title], order: DESC}
			limit: $externalLimit
			skip: $externalSkip
		) {
			nodes {
				uid
				title
				date
				link
				repo
				description
				more
			}
		}
	}
`;
