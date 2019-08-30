import React from 'react';

import {colors} from '../util/constants';
import Layout from '../components/layout';
import ProjectExplorer from '../components/project-explorer';
import SEO from '../components/seo';
import CycleText from '../components/cycle-text';

const SecondPage = () => (
	<Layout colors={[colors.green, colors.black]}>
		<SEO title="Project explorer" />
		<ProjectExplorer />
		<div className="go-up">
			<a href="#">
				<CycleText>–➫➯➱➬</CycleText>
			</a>
		</div>
		<footer></footer>
	</Layout>
);

export default SecondPage;
