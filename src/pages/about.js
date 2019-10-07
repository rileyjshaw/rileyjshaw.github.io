import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BigQuote from '../components/big-quote';
import GoUp from '../components/go-up';
import {ExternalLink} from '../components/auto-link';
import RgbSplitter from '../components/rgb-splitter';
import Shard from '../components/shard';
import SiteNav from '../components/site-nav';

import '../templates/post.css';
import './about.css';

export default () => (
	<Layout>
		<SEO title="About" className="about" />
		<header className="page-header">
			<SiteNav />
			<RgbSplitter El="h1" className="title">
				<Shard>About</Shard>
			</RgbSplitter>
		</header>
		<StaticQuery
			query={graphql`
				{
					me_title: file(relativePath: {eq: "about/me_title.md"}) {
						childMarkdownRemark {
							html
						}
					}
					me_intro: file(relativePath: {eq: "about/me_intro.md"}) {
						childMarkdownRemark {
							html
						}
					}
					me_rest: file(relativePath: {eq: "about/me_rest.md"}) {
						childMarkdownRemark {
							html
						}
					}
					timeline_title: file(
						relativePath: {eq: "about/work/title.md"}
					) {
						childMarkdownRemark {
							html
						}
					}
					mozilla: file(
						relativePath: {eq: "about/work/mozilla.md"}
					) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					repair_matters: file(
						relativePath: {eq: "about/work/repair_matters.md"}
					) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					sfpc: file(relativePath: {eq: "about/work/sfpc.md"}) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					khan_academy: file(
						relativePath: {eq: "about/work/khan_academy.md"}
					) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					clc: file(relativePath: {eq: "about/work/clc.md"}) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					d30u30: file(relativePath: {eq: "about/work/d30u30.md"}) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					signal: file(relativePath: {eq: "about/work/signal.md"}) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					recurse_center: file(
						relativePath: {eq: "about/work/recurse_center.md"}
					) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					listn: file(relativePath: {eq: "about/work/listn.md"}) {
						childMarkdownRemark {
							html
							frontmatter {
								current
							}
						}
					}
					site: file(relativePath: {eq: "about/site.md"}) {
						childMarkdownRemark {
							html
						}
					}
				}
			`}
			render={({
				me_title,
				me_intro,
				me_rest,
				timeline_title,
				mozilla,
				repair_matters,
				sfpc,
				khan_academy,
				clc,
				d30u30,
				signal,
				recurse_center,
				listn,
				site,
			}) => (
				<main className="about-page">
					<div className="about-me blog-post-content">
						<div
							dangerouslySetInnerHTML={{
								__html: me_title.childMarkdownRemark.html,
							}}
						/>
						<div
							dangerouslySetInnerHTML={{
								__html: me_intro.childMarkdownRemark.html,
							}}
						/>
						<div
							dangerouslySetInnerHTML={{
								__html: me_rest.childMarkdownRemark.html,
							}}
						/>
						{/* TODO(riley): <UpTo /> */}
						<div
							dangerouslySetInnerHTML={{
								__html:
									timeline_title.childMarkdownRemark.html,
							}}
						/>
						<ul className="timeline">
							{[
								mozilla,
								repair_matters,
								sfpc,
								khan_academy,
								clc,
								d30u30,
								signal,
								recurse_center,
								listn,
							].map(
								(
									{
										childMarkdownRemark: {
											html,
											frontmatter: {current},
										},
									},
									i
								) => (
									<li
										key={i}
										className={current ? 'current' : ''}
										dangerouslySetInnerHTML={{
											__html: html,
										}}
									/>
								)
							)}
						</ul>
						<hr />
						<p>
							For a full history of my employment, please see my{' '}
							<ExternalLink to="https://www.linkedin.com/in/rileyjshaw/">
								Linkedin
							</ExternalLink>
							.
						</p>
						<div
							dangerouslySetInnerHTML={{
								__html: site.childMarkdownRemark.html,
							}}
						/>
					</div>
					<BigQuote quoteIndex={4} />
					<GoUp />
				</main>
			)}
		/>
	</Layout>
);
