import React from 'react';

import Layout from '../components/layout';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';
import GoUp from '../components/go-up';
import RgbSplitter from '../components/rgb-splitter';
import Shard from '../components/shard';
import SiteNav from '../components/site-nav';
import BigQuote from '../components/big-quote';

import './explore.css';

const ExplorePage = () => (
	<Layout className="explore">
		<SEO title="Project explorer" />
		<header className="page-header project-explorer-page-header">
			<SiteNav />
			<RgbSplitter El="h1" className="title">
				<Shard>Projects</Shard>
			</RgbSplitter>
		</header>
		<ProjectExplorer />
		<BigQuote quoteIndex={3} />
		<GoUp />
	</Layout>
);

export default ExplorePage;
