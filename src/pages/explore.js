import React from 'react';

import Layout from '../components/layout';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';
import GoUp from '../components/go-up';

import './explore.css';

const ExplorePage = () => (
	<Layout className="explore">
		<SEO title="Project explorer" />
		<ProjectExplorer />
		<GoUp />
		<footer></footer>
	</Layout>
);

export default ExplorePage;
