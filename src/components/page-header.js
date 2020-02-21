import React from 'react';
import {Link} from 'gatsby';

import SiteNav from '../components/site-nav';

import './page-header.css';

export default ({children, fromPage, underlined}) => (
	<>
		<SiteNav fromPage={fromPage} />
		<header className="page-header">
			<h1 className={`title${underlined ? ' underlined' : ''}`}>
				{children}
			</h1>
		</header>
	</>
);
