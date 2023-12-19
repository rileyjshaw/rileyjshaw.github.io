import {ExternalLink} from '../components/AutoLink';
import {Time} from '../components/Blocker';
import SEO from '../components/SEO';
import './404.css';
import {Link} from 'gatsby';
import React, {useEffect, useState} from 'react';

export function Head(props) {
	return <SEO {...props} title="404: Not found" />;
}

function NotFoundPage({location}) {
	const [pathname, setPathname] = useState('');
	useEffect(() => {
		setPathname(location.pathname);
	}, [location]);
	return (
		<>
			<main>
				<div className="page-content not-found">
					<h2>Page not found</h2>
					<p>
						You tried to load a page that doesn't exist. Here are
						some things you can do:
					</p>
					<ul>
						<li>
							<p>
								Start over from{' '}
								<Link to="/">the home page</Link>.
							</p>
						</li>
						<li>
							<p>
								Check if the link works on{' '}
								<ExternalLink
									to={`https://v14.rileyjshaw.com${pathname}`}
								>
									my old website
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
										'+',
									)}`}
								>
									related keywords online
								</ExternalLink>
								.
							</p>
						</li>
						<li>
							<p>
								Get off the Internet.{' '}
								<Time format={t => `It’s already ${t}.`} />
							</p>
						</li>
					</ul>
				</div>
			</main>
		</>
	);
}

export default NotFoundPage;
