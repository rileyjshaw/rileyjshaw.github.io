import BigQuote from '../components/BigQuote';
import GoUp from '../components/GoUp';
import ProjectExplorer from '../components/ProjectExplorer';
import SEO from '../components/SEO';
import React, {useState} from 'react';

export function Head(props) {
	return <SEO {...props} title="Lab" />;
}

const LabPage = () => {
	const [isFullyLoaded, setIsFullyLoaded] = useState(false);

	return (
		<>
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
