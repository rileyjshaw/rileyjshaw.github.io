import React from 'react';
import {Link, graphql} from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';

import './post.css';

export default function Template({data}) {
	const {markdownRemark} = data;
	const {fields, html} = markdownRemark;
	return (
		<Layout root>
			<div className="blog-post-page">
				<SEO title={fields.title} />
				<header className="top-nav" role="banner">
					<nav role="navigation">
						<h1>
							<Link to="/">Riley Shaw</Link>
						</h1>{' '}
						/ <Link to="/blog">Blog</Link> / {fields.title}
					</nav>
				</header>
				<main>
					<article className="blog-post-content" role="article">
						<header>
							<h1>{fields.title}</h1>
							<time>Posted {fields.date}</time>
						</header>
						<div
							className="blog-post-markdown"
							// HACK(riley): Replace this in a remark plugin.
							dangerouslySetInnerHTML={{
								__html: html.replace(/↩/g, '↩&#xFE0E;'),
							}}
						/>
					</article>
				</main>
			</div>
		</Layout>
	);
}

export const pageQuery = graphql`
	query($path: String!) {
		markdownRemark(fields: {slug: {eq: $path}}) {
			html
			fields {
				date(formatString: "MMMM DD, YYYY")
				slug
				title
			}
		}
	}
`;
