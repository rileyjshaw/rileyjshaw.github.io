/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import {useStaticQuery, graphql} from 'gatsby';
import React from 'react';

function SEO({description = '', title: pageTitle, children}) {
	const {site} = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					titlePostfix
					description
					author
				}
			}
		}
	`);

	const title = `${pageTitle || site.siteMetadata.title} · ${
		site.siteMetadata.titlePostfix
	}`;
	const metaTitle = `${pageTitle ? `${pageTitle} · ` : ''}${
		site.siteMetadata.title
	}`;
	const metaDescription = description || site.siteMetadata.description;

	return (
		<>
			<title>{title}</title>
			<meta name="description" content={metaDescription} />
			<meta name="og:title" content={metaTitle} />
			<meta name="og:description" content={metaDescription} />
			<meta name="og:type" content="website" />
			<meta name="twitter:title" content={metaTitle} />
			<meta name="twitter:description" content={metaDescription} />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content={site.siteMetadata.author} />
			{/* TODO: Update properties to include:

		<meta name="image" content={seo.image} />
		<meta name="twitter:url" content={seo.url} />
		<meta name="twitter:image" content={seo.image} />

		*/}
			{children}
		</>
	);
}

export default SEO;
