import {graphql} from 'gatsby';
import React from 'react';

import SEO from '../components/SEO';

import './Post.css';

export function Head({data, ...props}) {
	return <SEO {...props} title={data.mdx.fields.title} />;
}

export default function Template({data, children}) {
	const {mdx} = data;
	const {fields} = mdx;
	return (
		<main>
			<div className="page-content">
				<article
					className="blog-post-content prose prose-lg"
					role="article"
				>
					<header>
						<h1>{fields.title}</h1>
						<div className="subheading">
							<time>Posted {fields.date}</time>
						</div>
					</header>
					{/* TODO(riley): Replace this: replace(/↩/g, '↩&#xFE0E;') */}
					<div className="blog-post-markdown">{children}</div>
				</article>
			</div>
		</main>
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
