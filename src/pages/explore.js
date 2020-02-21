import React from 'react';

import BigQuote from '../components/big-quote';
import GoUp from '../components/go-up';
import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';

const ExplorePage = ({location}) => (
	<Layout>
		<SEO title="Project explorer" className="explore" />
		<PageHeader showHome fromPage={location?.state?.fromPage}>
			Explore
		</PageHeader>
		<ProjectExplorer />
		<BigQuote quoteIndex={3} />
		<GoUp />
	</Layout>
);

export default ExplorePage;
