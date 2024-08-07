import {Link, graphql} from 'gatsby';
import React from 'react';

import AutoLink, {ExternalLink} from '../components/AutoLink';
import SEO from '../components/SEO';

import '../components/ContentNode.css';
import './BlogList.css';
import './Post.css';

const urlFrom = page => `/blog${page === 1 ? '' : `/${page}`}`;

export function Head(props) {
	return <SEO {...props} title="All posts" />;
}

// TODO(riley): Style with same stylesheet as blog posts.
const BlogList = ({data, pageContext: {currentPage, numPages}}) => {
	// TODO(riley): Unfortunate that we're re-sorting this client-side instead
	//              of collecting + sorting it with GraphQL.
	const posts = [
		...data.allMdx.nodes,
		...data.allCombinedProjectsJson.nodes,
	].sort(
		(a, b) =>
			new Date(b.date || b.fields.date) -
			new Date(a.date || a.fields.date),
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
		<main className="blog-list">
			<div className="page-content">
				<ul className="blog-posts">
					{posts.map(post => {
						const uid = post.uid || post.fields?.uid;
						const title = post.title || post.fields?.title;
						const link = post.link || post.fields?.slug;
						const date = post.date || post.fields?.date;
						const {repo} = post;

						return (
							<li className="blog-post" key={uid}>
								<article className="blog-post-content prose">
									<header>
										<h1>
											<AutoLink to={link}>
												{title}
											</AutoLink>
										</h1>

										<div className="subheading">
											<time dateTime={date}>
												{new Date(
													date.replace(/-/g, '/'),
												).toLocaleString('en-us', {
													month: 'long',
													day: 'numeric',
													year: 'numeric',
												})}
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
										className={
											post.more ? 'excerpt' : null
										}
									>
										<p
											dangerouslySetInnerHTML={{
												__html: post.description,
											}}
										/>
									</section>
									{post.more && (
										<p className="continue-reading">
											<AutoLink to={link}>
												Continue reading
											</AutoLink>
										</p>
									)}
								</article>
							</li>
						);
					})}
				</ul>
				<div className="page-navigation">
					{!isFirst && (
						<Link to={prevPage} rel="prev">
							←&#xFE0E;
						</Link>
					)}
					{nearbyPages}
					{!isLast && (
						<Link to={nextPage} rel="next">
							→&#xFE0E;
						</Link>
					)}
				</div>
			</div>
		</main>
	);
};

// TODO(riley): Standardize this format.
export const blogListQuery = graphql`query blogListQuery($internalLimit: Int!, $internalSkip: Int!, $externalLimit: Int!, $externalSkip: Int!) {
	allMdx(
		filter: {internal: {contentFilePath: {regex: "//data/markdown/posts/.*\\.mdx?$/"}}}
		sort: {fields: {date: DESC}}
		limit: $internalLimit
		skip: $internalSkip
	) {
		nodes {
			description
			more
			frontmatter {
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
	allCombinedProjectsJson(
		filter: {type: {in: ["tumblr"]}}
		sort: [{date: DESC}, {title: ASC}]
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
}`;

export default BlogList;
