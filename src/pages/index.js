import React from 'react';
import {Link, useStaticQuery, graphql} from 'gatsby';

import {colors} from '../util/constants';
import {useWindowSize} from '../util/hooks';
import allProjectsQuery from '../util/all-projects-query';
import SEO from '../components/seo';
import Fit from '../components/fit';
import StretchTitle from '../components/stretch-title';
import Newsletter from '../components/newsletter';
import CycleText from '../components/cycle-text';
import Layout from '../components/layout';
import ContentGrid from '../components/content-grid';
import GoUp from '../components/go-up';
import {ExternalLink} from '../components/auto-link';
import BigQuote from '../components/big-quote';

import './index.css';

const IndexPage = ({starredProjects = []}) => {
	const {aboutIntro} = useStaticQuery(graphql`
		{
			aboutIntro: file(relativePath: {eq: "about/me-intro.md"}) {
				childMarkdownRemark {
					html
				}
			}
		}
	`);

	const [windowWidth] = useWindowSize();

	return (
		<Layout root={true} noHeader={true}>
			<SEO title="Home" />
			<main>
				{/* TODO(riley): yikes - get rid of this div. */}
				<div className="border-helper" />
				<div className="homepage-top">
					<div className="todo-maybe-header-element">
						<StretchTitle>
							<Fit className="title-welcome">Welcome to the</Fit>
							<Fit className="title-landfill">e-landfill of</Fit>
							{/* Keep this up to date with the media query. */}
							{windowWidth > 800 ? (
								[
									<Fit className="title-riley" key="r">
										Riley
									</Fit>,
									<p className="title-j" key="j">
										J
									</p>,
									<Fit className="title-shaw" key="s">
										Shaw
									</Fit>,
								]
							) : (
								<Fit className="title-rileyjshaw">
									rileyjshaw
								</Fit>
							)}
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
								More&nbsp;
								<CycleText OuterElement="span" ms={100}>
									–➫➯➱➬
								</CycleText>
							</Link>
						</div>
						<Newsletter className="homepage-newsletter" />
					</div>
					<div className="selected-works-container">
						<h2>What I'm up to</h2>
						<ul className="currently">
							<li>
								{/* I'm redoing my website. This is a work in
								progress, big time. */}
								1
							</li>
							<li>
								{/* I'm creating a massive MIDI controller for
								music and games. */}
								2
							</li>
							<li>
								{/* I'm working with Canada Learning Code as an
								instructor and mentor. My next class is{' '}
								<ExternalLink to="https://www.canadalearningcode.ca/experiences/vancouver-chapter-girls-learning-code-gamemaking-and-circuitry-with-scratch-makey-makey/">
									Gamemaking and Circuitry with Scratch &
									MaKey MaKey
								</ExternalLink>
								. */}
								3
							</li>
						</ul>
						<h2>
							Selected works{' '}
							<Link to="/explore">(explore all)</Link>
						</h2>
						<ContentGrid nodes={starredProjects} />
					</div>
				</div>
				<BigQuote>Here's a big quote...</BigQuote>
				<GoUp />
			</main>
		</Layout>
	);
};

export default () => {
	const starredProjects = allProjectsQuery().filter(project =>
		project.tags?.includes('starred')
	);

	return <IndexPage starredProjects={starredProjects} />;
};
