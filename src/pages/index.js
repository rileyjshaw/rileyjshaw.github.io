import React from 'react';
import {Link, useStaticQuery, graphql} from 'gatsby';

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
import BigQuote from '../components/big-quote';
import PagePicker, {pages} from '../components/page-picker';

import './index.css';
import UpTo from '../components/up-to';

const IndexPage = ({starredProjects = []}) => {
	const {aboutIntro} = useStaticQuery(graphql`
		{
			aboutIntro: file(relativePath: {eq: "about/me_intro.md"}) {
				childMarkdownRemark {
					html
				}
			}
		}
	`);

	const [windowWidth] = useWindowSize();

	return (
		<Layout root>
			<SEO title="Home" />
			<main>
				<div
					className="homepage-top"
					style={{background: pages.home.color}}
				>
					<div className="todo-maybe-header-element">
						<StretchTitle>
							<Fit className="title-welcome">Welcome to the</Fit>
							<Fit className="title-landfill">
								digital landfill of
							</Fit>
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
						<PagePicker page="home" />
						<UpTo />
						<h2>
							Selected works{' '}
							<Link to="/explore">(explore all)</Link>
						</h2>
						<ContentGrid nodes={starredProjects} />
					</div>
				</div>
				<BigQuote />
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
