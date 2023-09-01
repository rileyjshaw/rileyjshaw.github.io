import SEO from '../components/SEO';
import './Post.css';
import {Link, graphql} from 'gatsby';
import React from 'react';

export function Head({data, ...props}) {
	return <SEO {...props} title={data.mdx.fields.title} />;
}

// TODO: Add settings?
export default function Template({data, children}) {
	const {mdx} = data;
	const {fields} = mdx;
	return (
		<>
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
					{/* TODO(riley): Replace this: replace(/↩/g, '↩&#xFE0E;') */}
					<div className="blog-post-markdown">{children}</div>
				</article>
			</main>
		</>
	);
}

export const pageQuery = graphql`
	query PostTemplate($id: String!) {
		mdx(id: {eq: $id}) {
			fields {
				date(formatString: "MMMM DD, YYYY")
				slug
				title
			}
		}
	}
`;
