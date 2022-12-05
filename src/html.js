import React from 'react';

export default function HTML(props) {
	return (
		<html {...props.htmlAttributes}>
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				{props.headComponents}
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#4ccbab"
				/>
				<meta name="msapplication-TileColor" content="#4ccbab" />
				<meta name="theme-color" content="#4ccbab" />
				{/* TODO: Get `gatsby-plugin-preload-fonts` working again. See https://github.com/gatsbyjs/gatsby/issues/32127. */}
				<link
					as="font"
					href="/fonts/geomanist-regular-webfont.woff2"
					rel="preload"
					crossOrigin="anonymous"
				/>
				<link
					as="font"
					href="/fonts/geomanist-medium-webfont.woff2"
					rel="preload"
					crossOrigin="anonymous"
				/>
				<link
					as="font"
					href="/fonts/geomanist-black-webfont.woff2"
					rel="preload"
					crossOrigin="anonymous"
				/>
			</head>
			<body {...props.bodyAttributes}>
				{props.preBodyComponents}
				<div
					id="___gatsby"
					dangerouslySetInnerHTML={{__html: props.body}}
				/>
				{props.postBodyComponents}
			</body>
		</html>
	);
}
