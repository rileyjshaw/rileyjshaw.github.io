/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import {useStaticQuery, graphql} from 'gatsby';
import React from 'react';

function SEO({
	description = '',
	image,
	imageAlt,
	location,
	title: pageTitle,
	type = 'website',
	children,
}) {
	const {site} = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					author
					siteUrl
				}
			}
		}
	`);

	const {siteMetadata} = site;
	const title = `${pageTitle ? `${pageTitle} · ` : ''}${siteMetadata.title}`;
	const metaDescription = description || siteMetadata.description;
	const url = new URL(
		location?.pathname || '/',
		siteMetadata.siteUrl,
	).toString();
	const metaImage = image && new URL(image, siteMetadata.siteUrl).toString();

	return (
		<>
			<title>{title}</title>
			<meta name="description" content={metaDescription} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:type" content={type} />
			<meta property="og:url" content={url} />
			{metaImage && <meta property="og:image" content={metaImage} />}
			{metaImage && imageAlt && (
				<meta property="og:image:alt" content={imageAlt} />
			)}
			<meta name="twitter:url" content={url} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={metaDescription} />
			<meta
				name="twitter:card"
				content={metaImage ? 'summary_large_image' : 'summary'}
			/>
			<meta name="twitter:creator" content={siteMetadata.author} />
			{metaImage && <meta name="twitter:image" content={metaImage} />}
			{metaImage && imageAlt && (
				<meta name="twitter:image:alt" content={imageAlt} />
			)}
			{children}
		</>
	);
}

export default SEO;
