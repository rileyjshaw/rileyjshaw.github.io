import {Link} from 'gatsby';
import React from 'react';

import {RjsLogo} from '../icons';
import {SITE_PAGES} from '../util/constants';

import './PageHeader.css';

const getPageName = pathname => {
	const match = pathname.match(/^\/([^\/]*)/);
	return match ? match[1] : '';
};

export default ({location}) => {
	const pageName = getPageName(location.pathname);
	const activePage =
		SITE_PAGES.find(([name]) => name === pageName) || SITE_PAGES[0];
	return (
		<header className="page-header" id="page-header" tabIndex="-1">
			<Link to="/" className="home-link">
				<RjsLogo
					title="Site home"
					titleId="site-home-title"
					width={null}
					className="home-icon"
				/>
			</Link>
			<h1 className="title">
				<Link to={`/${activePage[0]}`}>{activePage[3]}</Link>
			</h1>
		</header>
	);
};
