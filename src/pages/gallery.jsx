import {Link, graphql} from 'gatsby';
import React from 'react';

import SEO from '../components/SEO';

import './gallery.css';

export function Head(props) {
	return <SEO {...props} title="All galleries" />;
}

const GalleryPage = ({data}) => {
	const posts = data.allMdx.nodes;
	return (
		<main>
			<div className="page-content">
				<ul className="gallery-list">
					{posts.map(post => (
						<li key={post.fields.uid}>
							<Link to={post.fields.slug}>
								<time dateTime={post.fields.date}>
									{post.fields.date.replace(/-/g, '.')}
								</time>
								<h1>{post.fields.title}</h1>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
};

export const galleryQuery = graphql`query galleryQuery {
	allMdx(
		filter: {internal: {contentFilePath: {regex: "//data/markdown/galleries/.*\\.mdx?$/"}}}
		sort: {fields: {date: DESC}}
	) {
		nodes {
			fields {
				uid
				slug
				title
				date(formatString: "YYYY-MM-DD")
			}
		}
	}
}`;

export default GalleryPage;
