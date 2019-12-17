import React from 'react';
import {Link} from 'gatsby';

import {UncontrolledLink, ExternalLink} from '../components/auto-link';
import GoUp from '../components/go-up';
import Layout from '../components/layout';
import Newsletter from '../components/newsletter';
import RgbSplitter from '../components/rgb-splitter';
import SEO from '../components/seo';
import Shard from '../components/shard';
import BigQuote from '../components/big-quote';

import './subscribe.css';

export default () => (
	<Layout>
		<SEO title="Subscribe" className="subscribe-page" />
		<header className="page-header subscribe-page-header">
			<RgbSplitter El="h1" className="title">
				<Shard>Feeds</Shard>
			</RgbSplitter>
		</header>
		<div className="inner">
			<Newsletter />
			<hr />
			<p>This website has RSS feeds for more frequent updates:</p>
			<dl className="rss-feeds">
				<dt>
					<UncontrolledLink to="/index.xml">
						Homepage feed
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
					<UncontrolledLink to="/explore.xml">
						Project feed
					</UncontrolledLink>
				</dt>
				<dd>
					New projects in the{' '}
					<Link to="/explore">project explorer</Link>, minus blog
					posts.
				</dd>
				<dt>
					<UncontrolledLink to="/firehose.xml">
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
			</ul>
		</div>
		<BigQuote quoteIndex={0} />
		<GoUp />
	</Layout>
);
