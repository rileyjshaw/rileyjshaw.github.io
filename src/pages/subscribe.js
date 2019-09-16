import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import PagePicker, {pages} from '../components/page-picker';
import GoUp from '../components/go-up';

export default () => (
	<Layout className="subscribe">
		<SEO title="Subscribe" />
		<div style={{background: pages.subscribe.color}}>
			<PagePicker page="subscribe" />
			<Newsletter />
			<GoUp />
		</div>
	</Layout>
);
