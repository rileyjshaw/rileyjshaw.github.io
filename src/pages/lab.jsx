import {graphql} from 'gatsby';
import React, {useState} from 'react';

import BigQuote from '../components/BigQuote';
import GoUp from '../components/GoUp';
import ProjectExplorer from '../components/ProjectExplorer';
import SEO from '../components/SEO';

export function Head(props) {
	return <SEO {...props} title="Lab" />;
}

const LabPage = ({data}) => {
	const [isFullyLoaded, setIsFullyLoaded] = useState(false);

	return (
		<main>
			<div className="page-content">
				<ProjectExplorer setIsFullyLoaded={setIsFullyLoaded} />
			</div>
			{isFullyLoaded && (
				<>
					<BigQuote quote={data.bigQuote} />
					<GoUp />
				</>
			)}
		</main>
	);
};

export const query = graphql`
	query {
		bigQuote: combinedQuotesJson(uid: {eq: "VOLTAIRE_BORING"}) {
			...BigQuoteFields
		}
	}
`;

export default LabPage;
