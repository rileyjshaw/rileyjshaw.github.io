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
					as="font"
					href="/fonts/MintGrotesk-Regular-Subset.woff2"
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
