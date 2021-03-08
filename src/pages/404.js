import {ExternalLink} from '../components/auto-link';
import {Time} from '../components/blocker';
import SEO from '../components/seo';
import './404.css';
import {Link} from 'gatsby';
import React, {useEffect, useState} from 'react';

function NotFoundPage({location}) {
	const [pathname, setPathname] = useState('');
	useEffect(() => {
		setPathname(location.pathname);
	}, [location]);
	return (
		<>
			<SEO title="404: Not found" className="page-not-found" />
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
								to={`https://v14.rileyjshaw.com${pathname}`}
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
								to={`https://duckduckgo.com/?q=rileyjshaw${pathname.replace(
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
		</>
	);
}

export default NotFoundPage;
