import {ExternalLink} from '../components/auto-link';
import BigQuote from '../components/big-quote';
import GoUp from '../components/go-up';
import SEO from '../components/seo';
import '../templates/post.css';
import './about.css';
import {StaticQuery, graphql} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import React from 'react';

const AboutPage = () => (
	<>
		<SEO title="About" />
		<StaticQuery
			query={graphql`
				{
					me_intro: file(relativePath: {eq: "about/me_intro.md"}) {
						childMdx {
							body
						}
					}
					me_rest: file(relativePath: {eq: "about/me_rest.md"}) {
						childMdx {
							body
						}
					}
					timeline_title: file(
						relativePath: {eq: "about/work/title.md"}
					) {
						childMdx {
							body
						}
					}
					misery: file(relativePath: {eq: "about/work/misery.md"}) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					mozilla: file(
						relativePath: {eq: "about/work/mozilla.md"}
					) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					repair_matters: file(
						relativePath: {eq: "about/work/repair_matters.md"}
					) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					sfpc: file(relativePath: {eq: "about/work/sfpc.md"}) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					khan_academy: file(
						relativePath: {eq: "about/work/khan_academy.md"}
					) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					clc: file(relativePath: {eq: "about/work/clc.md"}) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					d30u30: file(relativePath: {eq: "about/work/d30u30.md"}) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					signal: file(relativePath: {eq: "about/work/signal.md"}) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					recurse_center: file(
						relativePath: {eq: "about/work/recurse_center.md"}
					) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					listn: file(relativePath: {eq: "about/work/listn.md"}) {
						childMdx {
							body
							frontmatter {
								current
							}
						}
					}
					site: file(relativePath: {eq: "about/site.md"}) {
						childMdx {
							body
						}
					}
				}
			`}
			render={({
				me_intro,
				me_rest,
				timeline_title,
				misery,
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
					<div className="about-page-content">
						<div className="about-me blog-post-content">
							<MDXRenderer>{me_intro.childMdx.body}</MDXRenderer>
							<MDXRenderer>{me_rest.childMdx.body}</MDXRenderer>
							{/* TODO(riley): <UpTo /> */}
							<MDXRenderer>
								{timeline_title.childMdx.body}
							</MDXRenderer>
							<ul className="timeline">
								{[
									misery,
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
											childMdx: {
												body,
												frontmatter: {current},
											},
										},
										i
									) => (
										<li
											key={i}
											className={
												current ? 'current' : ''
											}
										>
											<MDXRenderer>{body}</MDXRenderer>
										</li>
									)
								)}
							</ul>
							<hr />
							<p>
								For a full history of my employment, please see
								my{' '}
								<ExternalLink to="https://www.linkedin.com/in/rileyjshaw/">
									Linkedin
								</ExternalLink>
								.
							</p>
							<MDXRenderer>{site.childMdx.body}</MDXRenderer>
						</div>
					</div>
					<BigQuote quoteId="DANCES_GAMES_AND_FEASTS" />
					<GoUp />
				</main>
			)}
		/>
	</>
);

export default AboutPage;
