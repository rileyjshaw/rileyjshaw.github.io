import React from 'react';
import {Link} from 'gatsby';

import SiteNav from '../components/site-nav';
import RGBSplitter from '../components/rgb-splitter';

import './page-header.css';

export default ({fromPage}) => (
	<header className="page-header">
		<Link to="/">
			<RGBSplitter El="h1" className="title">
				The digital <span>landfill of</span> <span>Riley J.</span>{' '}
				<span>Shaw</span>
			</RGBSplitter>
		</Link>
		<SiteNav fromPage={fromPage} />
	</header>
);
