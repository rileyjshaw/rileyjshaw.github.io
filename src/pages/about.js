import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

import {colors} from '../util/constants';
import Layout from '../components/layout';
import SEO from '../components/seo';
import BigQuote from '../components/big-quote';
import PagePicker, {pages} from '../components/page-picker';
import UpTo from '../components/up-to';
import GoUp from '../components/go-up';

export default () => (
	<Layout className="about" noHeader>
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
				<div style={{background: pages.about.color}}>
					<PagePicker page="about" />
					<div
						dangerouslySetInnerHTML={{
							__html: me.childMarkdownRemark.html,
						}}
					/>
					<UpTo />
					<div
						dangerouslySetInnerHTML={{
							__html: site.childMarkdownRemark.html,
						}}
					/>
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
