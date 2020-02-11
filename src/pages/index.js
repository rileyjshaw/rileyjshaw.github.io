import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';

import allProjectsQuery from '../util/all-projects-query';
import {sortByDate} from '../util/sorting-methods';
import BigQuote from '../components/big-quote';
import ContentGrid from '../components/content-grid';
import CycleText from '../components/cycle-text';
import Fit from '../components/fit-4';
import GoUp from '../components/go-up';
import Layout from '../components/layout';
import SEO from '../components/seo';

import './index.css';

const IndexPage = ({featuredProjects = []}) => {
	// TODO(riley): Get featured projects from here.
	const {
		aboutIntro: {
			childMarkdownRemark: {html},
		},
	} = useStaticQuery(graphql`
		{
			aboutIntro: file(relativePath: {eq: "about/me_intro.md"}) {
				childMarkdownRemark {
					html
				}
			}
		}
	`);

	return (
		<Layout>
			<SEO />
			<header className="page-header">
				<h1 className="title">
					<Fit>You’re in the digital</Fit>
					<span className="visuallyhidden"> </span>
					<Fit>landfill of</Fit>
					<span className="visuallyhidden"> </span>
					<Fit>Riley J.</Fit>
					<span className="visuallyhidden"> </span>
					<Fit>Shaw</Fit>
				</h1>
			</header>
			<main className="main-content">
				<div className="section main-about">
					<div className="row">
						<h2>Welcome</h2>
						<div className="about-stub">
							<div
								className="md-wrapper"
								dangerouslySetInnerHTML={{__html: html}}
							/>{' '}
							<Link to="/about" className="about-link">
								More{' '}
								<CycleText
									className="arrow"
									OuterElement="span"
									ms={100}
								>
									➫➯➱➬–
								</CycleText>
							</Link>
						</div>
					</div>
				</div>
				{/* Include News, Newsletter? */}
				<div className="section main-projects">
					<div className="row">
						<div>
							<h2>Recent additions</h2>
							<Link className="explore-link" to="/explore">
								(explore all)
							</Link>
						</div>
						<div>
							<ContentGrid nodes={featuredProjects} />
							<p className="explore-more">
								Sort through hundreds of projects and posts
								with{' '}
								<Link className="explore-link" to="/explore">
									the explorer
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
				<BigQuote />
				<GoUp />
			</main>
		</Layout>
	);
};

export default () => {
	const featuredProjects = sortByDate(allProjectsQuery()).slice(0, 6);
	return <IndexPage featuredProjects={featuredProjects} />;
};
