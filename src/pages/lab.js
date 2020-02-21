import React from 'react';

import BigQuote from '../components/big-quote';
import GoUp from '../components/go-up';
import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';

const LabPage = ({location}) => (
	<Layout>
		<SEO title="Lab" />
		<PageHeader fromPage={location?.state?.fromPage}>Lab</PageHeader>
		<ProjectExplorer />
		<BigQuote quoteIndex={3} />
		<GoUp />
	</Layout>
);

export default LabPage;
