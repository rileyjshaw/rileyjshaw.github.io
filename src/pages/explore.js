import React from 'react';

import {colors} from '../util/constants';
import Layout from '../components/layout';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';
import GoUp from '../components/go-up';

const ExplorePage = () => (
	<Layout colors={[colors.green, colors.black]}>
		<SEO title="Project explorer" />
		<ProjectExplorer />
		<GoUp />
		<footer></footer>
	</Layout>
);

export default ExplorePage;