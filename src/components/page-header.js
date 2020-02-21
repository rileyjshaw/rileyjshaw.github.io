import React from 'react';
import {Link} from 'gatsby';

import SiteNav from '../components/site-nav';

import './page-header.css';

export default ({children, fromPage, rileyjshaw, showHome}) => (
	<>
		<SiteNav fromPage={fromPage} showHome={showHome} />
		<header className="page-header">
			<h1 className="title">
				{children}
				{rileyjshaw ? (
					<>
						{' '}
						<Link to="/">
							<span>Riley J.</span> <span>Shaw</span>
						</Link>
					</>
				) : null}
			</h1>
		</header>
	</>
);
