import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';

import './about.css';

export default () => (
	<Layout colors={['#ff0', '#000']}>
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
				<>
					<blockquote cite="https://www.versobooks.com/books/3002-new-dark-age">
						<p>
							If we do not understand how complex technologies
							function, how systems of technologies interconnect,
							and how systems of systems interact, then we are
							powerless within them, and their potential is more
							easily captured by selfish elites and inhuman
							corporations… this understanding cannot be limited
							to the practicalities of how things work: it must
							be extended to how things came to be, and how they
							continue to function in the world in ways that are
							often invisible and interwoven. What is required is
							not understanding, but literacy.
						</p>
						<footer>
							—James Bridle, <cite>New Dark Age</cite>
						</footer>
						<p>Scroll down arrow goes here!</p>
					</blockquote>
					<div
						dangerouslySetInnerHTML={{
							__html: me.childMarkdownRemark.html,
						}}
					/>
					<div
						dangerouslySetInnerHTML={{
							__html: site.childMarkdownRemark.html,
						}}
					/>
				</>
			)}
		/>
	</Layout>
);
