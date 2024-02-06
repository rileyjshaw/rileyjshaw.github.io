import {graphql, useStaticQuery} from 'gatsby';
import React from 'react';

import Quote from '../components/Quote';
import SEO from '../components/SEO';

export function Head(props) {
	return <SEO {...props} title="All quotes" />;
}

const Quotes = () => {
	const {
		allCombinedQuotesJson: {nodes: quotes},
	} = useStaticQuery(graphql`
		{
			allCombinedQuotesJson(sort: {author: ASC}) {
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

	return (
		<ul className="all-quotes">
			{quotes.map(quote => (
				<li key={quote.uid}>
					<Quote quote={quote} />
				</li>
			))}
		</ul>
	);
};

export default Quotes;
