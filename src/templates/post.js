import React from 'react';
import {graphql} from 'gatsby';

import {colors} from '../util/constants';
import Layout from '../components/layout';

export default function Template({data}) {
	const {markdownRemark} = data;
	const {fields, html} = markdownRemark;
	return (
		<Layout colors={[colors.blue, colors.white]}>
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
