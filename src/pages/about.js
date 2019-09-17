import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BigQuote from '../components/big-quote';
import PagePicker, {pages} from '../components/page-picker';
import UpTo from '../components/up-to';
import GoUp from '../components/go-up';
import AutoLink from '../components/auto-link';

import '../templates/post.css';
import './about.css';

export default () => (
	<Layout className="about">
		<SEO title="About" />
		<StaticQuery
			query={graphql`
				{
					me: file(relativePath: {eq: "about/me-full.md"}) {
						childMarkdownRemark {
							html
						}
					}
					site: file(relativePath: {eq: "about/site.md"}) {
						childMarkdownRemark {
							html
						}
					}
				}
			`}
			render={({me, site}) => (
				<div
					className="about-page"
					style={{background: pages.about.color}}
				>
					<PagePicker page="about" />
					<div className="about-me">
						<div
							className="blog-post-content"
							dangerouslySetInnerHTML={{
								__html: me.childMarkdownRemark.html,
							}}
						/>
						<UpTo />
						<div className="resume">
							<h2>Where I've been</h2>
							<p>
								For employment history etc, please see my{' '}
								<AutoLink to="https://www.linkedin.com/in/rileyjshaw/">
									Linkedin
								</AutoLink>
							</p>
							<ul className="timeline">
								<li>
									<div className="content-ughhh">
										<img
											src="https://cdn.glitch.com/9d6f12c1-c6f9-495b-a6c1-02b3ee7ea95f%2Fsfpc_logo.png?v=1564785706822"
											className="logo"
										/>
										<div className="info">
											<h3>
												School for Poetic Computation
											</h3>
											<p>
												This is some information about
												the School for Poetic
												Computation, yippee!
											</p>
										</div>
									</div>
								</li>
								<li>
									<div className="content-ughhh">
										<img
											src="./ka_logo.svg"
											className="logo"
										/>
										<div className="info">
											<h3>Khan Academy</h3>
											<p>
												This is some information about
												KA, yippee!
											</p>
										</div>
									</div>
								</li>
								<li>
									<div className="content-ughhh">
										<img
											src="https://cdn.glitch.com/9d6f12c1-c6f9-495b-a6c1-02b3ee7ea95f%2FD30U30_logo.png?v=1564801045841"
											className="logo"
										/>
										<div className="info">
											<h3>Developer 30 Under 30</h3>
											<p>I won that!</p>
										</div>
									</div>
								</li>
								<li>
									<div className="content-ughhh">
										<img
											src="https://cdn.glitch.com/9d6f12c1-c6f9-495b-a6c1-02b3ee7ea95f%2Fsignal_logo.png?v=1564800789076"
											className="logo"
										/>
										<div className="info">
											<h3>Signal Desktop</h3>
											<p>I worked on that.</p>
										</div>
									</div>
								</li>
								<li>
									<div className="content-ughhh">
										<img
											src="./rc_logo.svg"
											className="logo"
										/>
										<div className="info">
											<h3>Recurse Center</h3>
											<p>
												I went there. Also! I still
												interview for them.
											</p>
										</div>
									</div>
								</li>
								<li>
									<div className="content-ughhh">
										<img
											src="./listn_logo.png"
											className="logo"
										/>
										<div className="info">
											<h3>Listn</h3>
											<p>I built that.</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div
							className="blog-post-content"
							dangerouslySetInnerHTML={{
								__html: site.childMarkdownRemark.html,
							}}
						/>
					</div>
					<BigQuote
						cite="https://www.versobooks.com/books/3002-new-dark-age"
						source={
							<>
								James Bridle, <cite>New Dark Age</cite>
							</>
						}
					>
						If we do not understand how complex technologies
						function, how systems of technologies interconnect, and
						how systems of systems interact, then we are powerless
						within them, and their potential is more easily
						captured by selfish elites and inhuman corporations…
						this understanding cannot be limited to the
						practicalities of how things work: it must be extended
						to how things came to be, and how they continue to
						function in the world in ways that are often invisible
						and interwoven. What is required is not understanding,
						but literacy.
					</BigQuote>
					<GoUp />
				</div>
			)}
		/>
	</Layout>
);
