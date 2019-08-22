import React from 'react';

import {colors} from '../util/constants';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
	<Layout colors={[colors.black, colors.white]}>
		<SEO title="404: Not found" />
		<h1>NOT FOUND</h1>
		<p>You just hit a route that doesn&#39;t exist.</p>
	</Layout>
);

export default NotFoundPage;
