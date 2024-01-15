import List from '../icons/List';
import Repeat from '../icons/Repeat';
import {shuffle} from '../util/sorting-methods';
import Quote from './Quote';
import './BigQuote.css';
import {graphql, useStaticQuery, Link} from 'gatsby';
import React, {useState, useRef} from 'react';

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

	const {current: shuffledQuotes} = useRef(shuffle(quotes));
	const {current: offsetIndex} = useRef(
		Math.max(
			0,
			shuffledQuotes.findIndex(({uid}) => uid === quoteId),
		),
	);
	const [refreshCount, setRefreshCount] = useState(0);
	const quoteIndex = (offsetIndex + refreshCount) % quotes.length;
	const quote = shuffledQuotes[quoteIndex];

	return (
		<div className="big-quote" id="big-quote">
			<Quote quote={quote} />
			<div className="big-quote-controls">
				<div className="big-quote-control-container refresh">
					<a
						href="#big-quote"
						aria-label="Load new quote"
						onClick={() => setRefreshCount(n => n + 1)}
					>
						<Repeat />
					</a>
				</div>
				{refreshCount > 2 && (
					<div className="big-quote-control-container browse">
						<Link to="/quotes" aria-label="Browse all quotes">
							<List />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default BigQuote;
