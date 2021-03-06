/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import {useStaticQuery, graphql} from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import {Helmet} from 'react-helmet';

function SEO({description, lang, meta, title: pageTitle, className, ...rest}) {
	const {site} = useStaticQuery(
		graphql`
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
		`
	);

	const title = `${pageTitle || site.siteMetadata.title} · ${
		site.siteMetadata.titlePostfix
	}`;
	const metaTitle = `${pageTitle ? `${pageTitle} · ` : ''}${
		site.siteMetadata.title
	}`;
	const metaDescription = description || site.siteMetadata.description;
	const classAttribute = className ? {class: className} : null;

	return (
		<Helmet
			htmlAttributes={{
				...classAttribute,
				lang,
			}}
			title={title}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: metaTitle,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: metaTitle,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			].concat(meta)}
			{...rest}
		/>
	);
}

SEO.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string,
};

export default SEO;
