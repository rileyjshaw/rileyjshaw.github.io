import React, {useState} from 'react';
import {StaticQuery, graphql} from 'gatsby';

import {shuffle} from '../util/sorting-methods';
import {ReactComponent as Repeat} from '../../content/images/repeat.svg';
import AutoLink from './auto-link';

import './big-quote.css';

export default ({quoteId, showRefreshButton = true}) => (
	<StaticQuery
		query={graphql`
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
		`}
		render={({allCombinedQuotesJson: {nodes: quotes}}) => {
			const [shuffledQuotes] = useState(shuffle(quotes));
			const [quoteIndex, setQuoteIndex] = useState(
				Math.max(
					0,
					shuffledQuotes.findIndex(({uid}) => uid === quoteId)
				)
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
				<div
					className={`big-quote ${
						showRefreshButton ? '' : 'no-refresh'
					}`}
					id={showRefreshButton && 'big-quote'}
				>
					<blockquote cite={cite}>
						{lines.map((line, i) => (
							<p key={i}>{line}</p>
						))}
						{source && <footer>{source}</footer>}
					</blockquote>
					{showRefreshButton && (
						<a
							href="#big-quote"
							aria-label="Load new quote"
							className="refresh"
							onClick={() =>
								setQuoteIndex(
									prevIndex =>
										(prevIndex + 1) % quotes.length
								)
							}
						>
							<Repeat />
						</a>
					)}
				</div>
			);
		}}
	/>
);
