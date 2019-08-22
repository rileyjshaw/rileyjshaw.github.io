import React from 'react';
import {Link, StaticQuery, graphql} from 'gatsby';

import './header.css';

const Header = ({colors}) => (
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
			<header
				className="page-header"
				style={{background: colors[0], color: colors[1]}}
			>
				<h1 className="home-link">
					<Link to="/">{site.siteMetadata.title}</Link>
				</h1>
				<nav className="site-nav">
					<ul>
						<li>
							<Link to="/" activeClassName="hidden">
								/ home
							</Link>
						</li>
						<li>
							<Link to="/about" activeClassName="hidden">
								/ about
							</Link>
						</li>
						<li>
							<Link to="/blog" activeClassName="hidden">
								/ blog
							</Link>
						</li>
						<li>
							<Link to="/explore" activeClassName="hidden">
								/ explore
							</Link>
						</li>
						<li>
							<Link to="/subscribe" activeClassName="hidden">
								/ subscribe
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		)}
	/>
);

export default Header;
