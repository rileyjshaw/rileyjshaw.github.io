import {Link} from 'gatsby';
import React from 'react';

import {UncontrolledLink, ExternalLink} from '../components/AutoLink';
import BigQuote from '../components/BigQuote';
import GoUp from '../components/GoUp';
import Newsletter from '../components/Newsletter';
import SEO from '../components/SEO';

import './subscribe.css';

export function Head(props) {
	return <SEO {...props} title="Subscribe" />;
}

const SubscribePage = () => (
	<main>
		<div className="page-content">
			<Newsletter />
			<hr />
			<p>This website has RSS feeds for more frequent updates:</p>
			<dl className="rss-feeds">
				<dt>
					<UncontrolledLink to="/highlights.xml">
						Highlights feed
					</UncontrolledLink>
				</dt>
				<dd>
					New featured projects, as well as significant changes to
					the website posted to{' '}
					<s>
						my{' '}
						<ExternalLink to="http://rileyjshaw.commit--blog.com/">
							commit--blog
						</ExternalLink>
						.
					</s>
				</dd>
				<dt>
					<UncontrolledLink to="/blog.xml">
						Blog feed
					</UncontrolledLink>
				</dt>
				<dd>
					New posts from the <Link to="/blog">blog</Link> page.
				</dd>
				<dt>
					<UncontrolledLink to="/blog-internal.xml">
						Internal blog feed
					</UncontrolledLink>
				</dt>
				<dd>
					New posts from the <Link to="/blog">blog</Link> page, minus
					external blogs like Tumblrs or{' '}
					<s>
						the{' '}
						<ExternalLink to="http://rileyjshaw.commit--blog.com/">
							commit--blog
						</ExternalLink>
						.
					</s>
				</dd>
				<dt>
					<UncontrolledLink to="/lab.xml">
						Lab projects feed
					</UncontrolledLink>
				</dt>
				<dd>
					New projects in the <Link to="/lab">lab</Link>, minus blog
					posts.
				</dd>
				<dt>
					<UncontrolledLink to="/index.xml">
						Firehose feed
					</UncontrolledLink>
				</dt>
				<dd>
					<em>All</em> updates from the above feeds.
				</dd>
			</dl>
			<hr />
			<p>You can also find me on:</p>
			<ul>
				<li>
					<ExternalLink to="https://github.com/rileyjshaw">
						GitHub
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://codepen.io/rileyjshaw">
						Codepen
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.linkedin.com/in/rileyjshaw/">
						LinkedIn
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.youtube.com/channel/UCV09P32tImJ8etTRcRNUKNw">
						YouTube
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://keybase.io/rileyjshaw">
						Keybase
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.instagram.com/rileyjshaw">
						Instagram
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.are.na/riley-shaw">
						Are.na
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.dwitter.net/u/rileyjshaw">
						Dwitter
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://vimeo.com/rileyjshaw">
						Vimeo
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.last.fm/user/rileyjshaw">
						Last.fm
					</ExternalLink>
				</li>
				<li>
					<s>
						<ExternalLink to="https://twitter.com/rileyjshaw">
							Twitter
						</ExternalLink>
					</s>
				</li>
				<li>
					<s>
						<ExternalLink to="http://rileyjshaw.commit--blog.com/">
							commit--blog
						</ExternalLink>
					</s>
				</li>
				<li>
					<s>
						<ExternalLink to="/glitch-archive/">
							Glitch
						</ExternalLink>
					</s>
				</li>
			</ul>
		</div>
		<BigQuote quoteId="MAKING_NOTHING" />
		<GoUp />
	</main>
);

export default SubscribePage;
