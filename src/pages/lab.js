import BigQuote from '../components/big-quote';
import GoUp from '../components/go-up';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';
import React, {useState} from 'react';

const LabPage = () => {
	const [isFullyLoaded, setIsFullyLoaded] = useState(false);

	return (
		<>
			<SEO title="Lab" />
			<ProjectExplorer setIsFullyLoaded={setIsFullyLoaded} />
			{isFullyLoaded && (
				<>
					<BigQuote quoteId="VOLTAIRE_BORING" />
					<GoUp />
				</>
			)}
		</>
	);
};

export default LabPage;
