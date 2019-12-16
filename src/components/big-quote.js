import React, {useState} from 'react';
import {StaticQuery, graphql} from 'gatsby';

import {shuffle} from '../util/sorting-methods';
import {ReactComponent as Repeat} from '../../content/images/repeat.svg';

import './big-quote.css';

export default ({quoteId}) => (
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
			let showRefreshButton = !quoteId;
			let [shuffledQuotes] = useState(shuffle(quotes));
			let [quoteIndex, setQuoteIndex] = useState(
				Math.floor(Math.random() * quotes.length)
			);
			const quote =
				(quoteId && quotes.find(({uid}) => uid === quoteId)) ||
				shuffledQuotes[quoteIndex];
			const {content, author, cite} = quote;
			let {source} = quote;
			if (source) {
				source = (
					<>
						“<cite>{source}</cite>”
					</>
				);
				if (cite) {
					source = <a href={cite}>{source}</a>;
				}
				if (author) {
					source = (
						<>
							– {author}, {source}
						</>
					);
				}
			} else if (author) {
				source = `– ${author}`;
			}

			return (
				<div
					className={`big-quote ${
						showRefreshButton ? '' : 'no-refresh'
					}`}
					id={showRefreshButton && 'big-quote'}
				>
					<blockquote cite={cite}>
						<p>{content}</p>
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
