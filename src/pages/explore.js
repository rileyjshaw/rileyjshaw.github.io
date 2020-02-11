import React from 'react';

import BigQuote from '../components/big-quote';
import Fit from '../components/fit-4';
import GoUp from '../components/go-up';
import Layout from '../components/layout';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';

import './explore.css';

const ExplorePage = () => (
	<Layout>
		<SEO title="Project explorer" className="explore" />
		<header className="page-header">
			<h1 className="title">
				<Fit>Projects</Fit>
			</h1>
		</header>
		<ProjectExplorer />
		<BigQuote quoteIndex={3} />
		<GoUp />
	</Layout>
);

export default ExplorePage;
