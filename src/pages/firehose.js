import React from 'react';
import {Link} from 'gatsby';

import Layout from '../components/layout';
import Firehose from '../components/firehose';
import SEO from '../components/seo';

const SecondPage = () => (
	<Layout colors={['#0f0', '#000']}>
		<SEO title="FIREHOSE DEMO" />
		<Firehose />
		<Link to="/">Go back to the homepage</Link>
	</Layout>
);

export default SecondPage;
