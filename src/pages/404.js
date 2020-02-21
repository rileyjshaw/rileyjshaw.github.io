import React from 'react';
import {Link} from 'gatsby';

import {ExternalLink} from '../components/auto-link';
import {Time} from '../components/blocker';
import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import SEO from '../components/seo';

import './404.css';

const NotFoundPage = ({location}) => (
	<Layout>
		<SEO title="404: Not found" className="page-not-found" />
		<PageHeader showHome>
			<span>Page</span> <span>not</span> <span>found.</span>
		</PageHeader>
		<main className="404-main">
			<p>
				You tried to load a page that doesn't exist. Here are some
				things you can do:
			</p>
			<ul>
				<li>
					<p>
						Start over from <Link to="/">the home page</Link>.
					</p>
				</li>
				<li>
					<p>
						Check if the link works on my{' '}
						<ExternalLink
							to={`https://v14.rileyjshaw.com${location.pathname}`}
						>
							old website
						</ExternalLink>
						.
					</p>
				</li>
				<li>
					<p>
						Search for{' '}
						<ExternalLink
							to={`https://duckduckgo.com/?q=rileyjshaw${location.pathname.replace(
								/[/ _-]/g,
								'+'
							)}`}
						>
							related keywords online
						</ExternalLink>
						.
					</p>
				</li>
				<li>
					<p>
						Get off the Internet. It's already <Time />.
					</p>
				</li>
			</ul>
		</main>
	</Layout>
);

export default NotFoundPage;
