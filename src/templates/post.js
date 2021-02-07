import Layout from '../components/layout';
import SEO from '../components/seo';
import './post.css';
import {Link, graphql} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import React from 'react';

export default function Template({data}) {
	const {mdx} = data;
	const {fields, body} = mdx;
	return (
		<Layout>
			<SEO title={fields.title} className="blog-post-page" />
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
						<div className="subheading">
							<time>Posted {fields.date}</time>
						</div>
					</header>
					<MDXRenderer className="blog-post-markdown">
						{/* HACK(riley): Replace this in a remark plugin. */}
						{body.replace(/↩/g, '↩&#xFE0E;')}
					</MDXRenderer>
				</article>
			</main>
		</Layout>
	);
}

export const pageQuery = graphql`
	query($path: String!) {
		mdx(fields: {slug: {eq: $path}}) {
			body
			fields {
				date(formatString: "MMMM DD, YYYY")
				slug
				title
			}
		}
	}
`;
