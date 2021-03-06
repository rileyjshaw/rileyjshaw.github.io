import {UncontrolledLink, ExternalLink} from '../components/auto-link';
import BigQuote from '../components/big-quote';
import GoUp from '../components/go-up';
import Newsletter from '../components/newsletter';
import SEO from '../components/seo';
import './subscribe.css';
import {Link} from 'gatsby';
import React from 'react';

const SubscribePage = () => (
	<>
		<SEO title="Subscribe" className="subscribe-page" />
		<div className="inner">
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
					the website posted to my{' '}
					<ExternalLink to="http://rileyjshaw.commit--blog.com/">
						commit--blog
					</ExternalLink>
					.
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
					external blogs like Tumblrs or the{' '}
					<ExternalLink to="http://rileyjshaw.commit--blog.com/">
						commit--blog
					</ExternalLink>
					.
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
					<ExternalLink to="https://twitter.com/rileyjshaw">
						Twitter
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.linkedin.com/in/rileyjshaw/">
						Linkedin
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://codepen.io/rileyjshaw">
						Codepen
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://glitch.com/@rileyjshaw">
						Glitch
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.are.na/riley-shaw">
						Are.na
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="http://rileyjshaw.commit--blog.com/">
						commit--blog
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.instagram.com/rileyjshaw">
						Instagram
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.dwitter.net/u/rileyjshaw">
						Dwitter
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://www.youtube.com/channel/UCV09P32tImJ8etTRcRNUKNw">
						YouTube
					</ExternalLink>
				</li>
				<li>
					<ExternalLink to="https://vimeo.com/rileyjshaw">
						Vimeo
					</ExternalLink>
				</li>
			</ul>
		</div>
		<BigQuote quoteId="MAKING_NOTHING" />
		<GoUp />
	</>
);

export default SubscribePage;
