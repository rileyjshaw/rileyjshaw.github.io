import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';

import allProjectsQuery from '../util/all-projects-query';
import {sortByDate} from '../util/sorting-methods';
import BigQuote from '../components/big-quote';
import ContentGrid from '../components/content-grid';
import CycleText from '../components/cycle-text';
import GoUp from '../components/go-up';
import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import SEO from '../components/seo';

import './index.css';

const IndexPage = ({featuredProjects = [], location}) => {
	// TODO(riley): Get featured projects from here.
	const {
		aboutIntro: {
			childMdx: {body},
		},
	} = useStaticQuery(graphql`
		{
			aboutIntro: file(relativePath: {eq: "about/me_intro.md"}) {
				childMdx {
					body
				}
			}
		}
	`);

	return (
		<Layout>
			<SEO />
			<PageHeader fromPage={location?.state?.fromPage} />
			<main className="main-content">
				<div className="section main-about">
					<div className="row">
						<div />
						<div className="about-stub">
							<MDXRenderer className="md-wrapper">
								{body}
							</MDXRenderer>{' '}
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
							<Link className="lab-link" to="/lab">
								(explore all)
							</Link>
						</div>
						<div>
							<ContentGrid nodes={featuredProjects} />
							<p className="explore-more">
								Sort through hundreds of projects and posts in{' '}
								<Link className="lab-link" to="/lab">
									the lab
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

export default props => {
	const featuredProjects = sortByDate(allProjectsQuery())
		.filter(project => (project.coolness ?? 100) > 40)
		.slice(0, 6);
	return <IndexPage {...props} featuredProjects={featuredProjects} />;
};
