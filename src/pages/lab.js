import React, {useState} from 'react';

import GoUp from '../components/go-up';
import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';

const LabPage = ({location}) => {
	const [isFullyLoaded, setIsFullyLoaded] = useState(false);

	return (
		<Layout>
			<SEO title="Lab" />
			<PageHeader fromPage={location?.state?.fromPage}>Lab</PageHeader>
			<ProjectExplorer setIsFullyLoaded={setIsFullyLoaded} />
			{/* TODO: Add quote back? <BigQuote quoteIndex={3} /> */}
			{isFullyLoaded && <GoUp />}
		</Layout>
	);
};

export default LabPage;
