import SiteNav from './SiteNav';
import './PageHeader.css';
import {Link} from 'gatsby';
import React from 'react';

const links = [
	['/about', 'About'],
	['/lab', 'Lab'],
	['/blog', 'Blog'],
	['/subscribe', 'Subscribe'],
];

export default ({location}) => {
	const activePage = links.find(([href]) =>
		location.pathname.startsWith(href),
	);
	return (
		<header className="page-header" id="page-header" tabIndex="-1">
			<div className="title">
				<h1>
					<Link to="/">Riley J. Shaw</Link>
				</h1>
				{activePage && (
					<div className="subpage">
						/ <Link to={activePage[0]}>{activePage[1]}</Link>
					</div>
				)}
			</div>
			<SiteNav location={location} />
		</header>
	);
};
