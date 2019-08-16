import React from 'react';
import {Link, StaticQuery, graphql} from 'gatsby';

import './header.css';

const Header = () => (
	<StaticQuery
		query={graphql`
			{
				site {
					siteMetadata {
						title
					}
				}
			}
		`}
		render={({site}) => (
			<header className="page-header">
				<h1 className="home-link">
					<Link to="/">{site.siteMetadata.title}</Link>
				</h1>
				<ul>
					<li>
						<Link to="/">/ home</Link>
					</li>
					<li>
						<Link to="/about">/ about</Link>
					</li>
					<li>
						<Link to="/blog">/ blog</Link>
					</li>
					<li>
						<Link to="/firehose">/ firehose</Link>
					</li>
					<li>
						<Link to="/subscribe">/ subscribe</Link>
					</li>
				</ul>
			</header>
		)}
	/>
);

export default Header;
