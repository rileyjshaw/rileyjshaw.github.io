import React from 'react';
import {Link, useStaticQuery, graphql} from 'gatsby';

import {colors} from '../util/constants';
import SEO from '../components/seo';
import Fit from '../components/fit';
import StretchTitle from '../components/stretch-title';
import Newsletter from '../components/newsletter';
import CycleText from '../components/cycle-text';
import Layout from '../components/layout';
import SkewBg from '../components/skew-bg';

import './index.css';

// TODO(riley): Only here for testing, remove l8r.
const colorful = (() => {
	const {black, white, ...colorful} = colors;
	return Object.values(colorful);
})();
const randomRgb = () => colorful[Math.floor(Math.random() * colorful.length)];
const IndexPage = () => {
	const {aboutIntro} = useStaticQuery(graphql`
		{
			aboutIntro: file(relativePath: {eq: "about/me-intro.md"}) {
				childMarkdownRemark {
					html
				}
			}
		}
	`);

	return (
		<Layout root={true} noHeader={true}>
			<SEO title="Home" />
			<main>
				<div className="homepage-top">
					<div className="todo-maybe-header-element">
						<StretchTitle>
							<Fit>Welcome to the digital landfill of</Fit>
							{/* <Fit className="title-riley">Riley</Fit>
							<p className="title-j">J</p>
							<Fit className="title-shaw">Shaw</Fit> */}
							<Fit>rileyjshaw</Fit>
						</StretchTitle>
						<div className="about-stub">
							<div
								className="md-wrapper"
								dangerouslySetInnerHTML={{
									__html:
										aboutIntro.childMarkdownRemark.html,
								}}
							/>{' '}
							<Link to="/about">
								More&nbsp;<CycleText>➬➱➯➫–</CycleText>
							</Link>
						</div>
						<Newsletter className="homepage-newsletter" />
					</div>
					{/* <div className="header-background">
						<SkewBg
							pointsPerSide={10}
							colors={Array.from({length: 6}, randomRgb)}
						/>
					</div> */}
					<div className="selected-works-container">
						<h2>
							Selected works{' '}
							<Link to="/explore">(explore all)</Link>
						</h2>
						<ul className="selected-works">
							{Array.from({length: 20}, (_, i) => (
								<li
									key={i}
									style={{
										background: randomRgb(),
									}}
								>
									Sample text.
								</li>
							))}
						</ul>
					</div>
				</div>
				<blockquote>Here's a big quote...</blockquote>
			</main>
		</Layout>
	);
};

export default IndexPage;
