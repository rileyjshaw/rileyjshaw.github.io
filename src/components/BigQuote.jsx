import {graphql, Link} from 'gatsby';
import React, {useState} from 'react';

import {List, Repeat} from '../icons';
import {shuffle} from '../util/sorting-methods';
import Quote from './Quote';

import './BigQuote.css';

// Pages render BigQuote with a single build-time quote (see the fragment
// below). The full pool is only downloaded — as its own webpack chunk — once
// a visitor interacts with the refresh button. The pool is module-level, so
// it’s fetched and shuffled at most once per session.
let poolPromise;
const loadPool = () =>
	(poolPromise ??=
		import('../../project-scraper/_generated/combined-quotes.json').then(
			({default: quotes}) => shuffle(quotes),
		));

function BigQuote({quote: initialQuote}) {
	const [pool, setPool] = useState(null);
	const [refreshCount, setRefreshCount] = useState(0);

	const refresh = async () => {
		const loadedPool = await loadPool();
		setPool(loadedPool);
		setRefreshCount(n => {
			// The initial quote is also somewhere in the pool, so the first
			// refresh could land on the quote that’s already showing. Skip
			// past it if so; pool entries are unique so this is the only
			// possible collision.
			const currentUid =
				n === 0
					? initialQuote.uid
					: loadedPool[(n - 1) % loadedPool.length].uid;
			const skip =
				loadedPool[n % loadedPool.length].uid === currentUid ? 2 : 1;
			return n + skip;
		});
	};

	const quote =
		refreshCount === 0
			? initialQuote
			: pool[(refreshCount - 1) % pool.length];

	return (
		<div className="big-quote" id="big-quote">
			<Quote quote={quote} />
			<div className="big-quote-controls">
				<div className="big-quote-control-container refresh">
					<a
						href="#big-quote"
						aria-label="Load new quote"
						onPointerEnter={loadPool}
						onFocus={loadPool}
						onClick={refresh}
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

// Pages that render a BigQuote query their own initial quote with this
// fragment, eg:
//
//	export const query = graphql`
//		query {
//			bigQuote: combinedQuotesJson(uid: {eq: "SOME_QUOTE_UID"}) {
//				...BigQuoteFields
//			}
//		}
//	`;
export const bigQuoteFragment = graphql`
	fragment BigQuoteFields on CombinedQuotesJson {
		uid
		content
		author
		source
		cite
		relatedLink
	}
`;

export default BigQuote;
