import React from 'react';
import {Link} from 'gatsby';

import SiteNav from '../components/site-nav';

import './page-header.css';

export default ({fromPage}) => (
	<header className="page-header">
		<Link to="/">
			<h1 className="title">
				The digital <span>landfill of</span> <span>Riley J.</span>{' '}
				<span>Shaw</span>
			</h1>
		</Link>
		<SiteNav fromPage={fromPage} />
	</header>
);
