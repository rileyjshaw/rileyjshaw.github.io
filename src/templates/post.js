import React from 'react';
import {graphql} from 'gatsby';

export default function Template({
	data, // this prop will be injected by the GraphQL query below.
}) {
	const {markdownRemark} = data; // data.markdownRemark holds our post data
	const {fields, html} = markdownRemark;
	return (
		<div className="blog-post-container">
			<div className="blog-post">
				<h1>{fields.title}</h1>
				<h2>{fields.date}</h2>
				<div
					className="blog-post-content"
					dangerouslySetInnerHTML={{__html: html}}
				/>
			</div>
		</div>
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
