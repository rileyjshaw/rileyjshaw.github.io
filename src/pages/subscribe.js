import React from 'react';
import {Link} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import PagePicker, {pages} from '../components/page-picker';
import GoUp from '../components/go-up';
import {UncontrolledLink, ExternalLink} from '../components/auto-link';

import './subscribe.css';

export default () => (
	<Layout className="subscribe-page">
		<SEO title="Subscribe" />
		<div style={{background: pages.subscribe.color}} className="inner">
			<PagePicker page="subscribe" />
			<Newsletter />
			<p>
				Each index page on my website has its own RSS feed, which I've{' '}
				<Link to="/blog/todo">written about here</Link> (todo):
			</p>
			<dl>
				<dt>
					<UncontrolledLink to="/index.xml">
						Index feed (todo)
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
					<UncontrolledLink to="/about.xml">
						Current projects feed (todo)
					</UncontrolledLink>
				</dt>
				<dd>
					Updates on <Link to="/about">what I'm up to</Link>.
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
					<UncontrolledLink to="/explore.xml">
						Project feed (todo)
					</UncontrolledLink>
				</dt>
				<dd>
					New projects in the{' '}
					<Link to="/explore">project explorer</Link>.
				</dd>

				<dt>
					<UncontrolledLink to="/subscribe.xml">
						RSS feed feed (todo)
					</UncontrolledLink>
				</dt>
				<dd>A list of feeds available from this page. So meta.</dd>

				<dt>
					<UncontrolledLink to="/firehose.xml">
						Firehose feed
					</UncontrolledLink>
				</dt>
				<dd>
					<em>All</em> updates from the above feeds.
				</dd>
			</dl>

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
			</ul>
		</div>
		<GoUp />
	</Layout>
);
