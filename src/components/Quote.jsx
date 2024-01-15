import AutoLink from './AutoLink';
import './Quote.css';
import React from 'react';

function Quote({quote}) {
	const {content, cite} = quote;
	let {source, author} = quote;
	if (source) {
		source = (
			<>
				“<cite>{source}</cite>”
			</>
		);
		if (cite) {
			source = <AutoLink to={cite}>{source}</AutoLink>;
		}
		if (author) {
			source = (
				<>
					– {author}, {source}
				</>
			);
		}
	} else if (author) {
		if (cite) {
			author = <AutoLink to={cite}>{author}</AutoLink>;
		}
		source = <>– {author}</>;
	}
	const lines = content.split('\n');

	return (
		<blockquote cite={cite} className="site-quote">
			{lines.map((line, i) => (
				<p key={i}>{line}</p>
			))}
			{source && <footer>{source}</footer>}
		</blockquote>
	);
}

export default Quote;
