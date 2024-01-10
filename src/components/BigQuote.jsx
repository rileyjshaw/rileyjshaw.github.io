import Repeat from '../icons/Repeat';
import {shuffle} from '../util/sorting-methods';
import AutoLink from './AutoLink';
import './BigQuote.css';
import {graphql, useStaticQuery} from 'gatsby';
import React, {useState} from 'react';

function BigQuote({quoteId}) {
	const {
		allCombinedQuotesJson: {nodes: quotes},
	} = useStaticQuery(graphql`
		{
			allCombinedQuotesJson {
				nodes {
					uid
					content
					author
					source
					cite
					relatedLink
				}
			}
		}
	`);

	const [shuffledQuotes] = useState(shuffle(quotes));
	const [quoteIndex, setQuoteIndex] = useState(
		Math.max(
			0,
			shuffledQuotes.findIndex(({uid}) => uid === quoteId),
		),
	);
	const quote = shuffledQuotes[quoteIndex];
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
		<div className="big-quote" id="big-quote">
			<blockquote cite={cite}>
				{lines.map((line, i) => (
					<p key={i}>{line}</p>
				))}
				{source && <footer>{source}</footer>}
			</blockquote>
			<a
				href="#big-quote"
				aria-label="Load new quote"
				className="refresh"
				onClick={() =>
					setQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length)
				}
			>
				<Repeat />
			</a>
		</div>
	);
}

export default BigQuote;
