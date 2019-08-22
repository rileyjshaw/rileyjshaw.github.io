import React from 'react';
import {Link} from 'gatsby';

import {colors} from '../util/constants';
import Layout from '../components/layout';
import Firehose from '../components/firehose';
import SEO from '../components/seo';

const SecondPage = () => (
	<Layout colors={[colors.green, colors.black]}>
		<SEO title="Firehose" />
		<Firehose />
		<Link to="/">Go back to the homepage</Link>
	</Layout>
);

export default SecondPage;
