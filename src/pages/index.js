import React, {useState} from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';

import allProjectsQuery from '../util/all-projects-query';
import BigQuote from '../components/big-quote';
import ContentGrid from '../components/content-grid';
import CycleText from '../components/cycle-text';
import Fit from '../components/fit-4';
import GoUp from '../components/go-up';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SiteNav from '../components/site-nav';
import RgbSplitter from '../components/rgb-splitter';

import './index.css';

const Shard = ({children}) => {
	const [[rA, rB, rC, rD]] = useState([
		Math.random(),
		Math.random(),
		Math.random(),
		Math.random(),
	]);
	return (
		<Fit
			text={children}
			style={{position: 'relative', marginBottom: '-0.25em'}}
		>
			{rA < 0.5 && (
				<span
					className="shard"
					aria-hidden="true"
					style={{
						[`border${
							rA < 0.25 ? 'Right' : 'Left'
						}`]: '90vw solid #000',
						borderBottom: `${rB * 0.4}em solid transparent`,
						borderTop: `${rC * 0.4}em solid transparent`,
						bottom: `${rD}em`,
					}}
				/>
			)}
		</Fit>
	);
};

const IndexPage = ({starredProjects = []}) => {
	// TODO(riley): Get starred projects from here.
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
		<Layout root>
			<SEO title="Home" />
			<header className="page-header">
				<RgbSplitter El="h1" className="title">
					{/* <Shard>As your eyes adjust, you discover that</Shard>
			<span className="visuallyhidden"> </span> */}
					<Shard>you’re in the digital</Shard>
					<span className="visuallyhidden"> </span>
					<Shard>landfill of</Shard>
					<span className="visuallyhidden"> </span>
					<Shard>Riley J.</Shard>
					<span className="visuallyhidden"> </span>
					<Shard>Shaw</Shard>
				</RgbSplitter>
				<SiteNav />
			</header>
			<main className="main-content">
				<div className="section main-about">
					<div className="row">
						<h2>Welcome</h2>
						<div className="about-stub">
							<div
								className="md-wrapper"
								dangerouslySetInnerHTML={{__html: html}}
							/>
							&nbsp;
							<Link to="/about">
								More&nbsp;
								<CycleText OuterElement="span" ms={100}>
									–➫➯➱➬
								</CycleText>
							</Link>
						</div>
					</div>
				</div>
				{/* Include News, Newsletter? */}
				<div className="section main-projects">
					<div className="row">
						<div>
							<h2>Selected works</h2>
							<Link className="explore-link" to="/explore">
								(explore all)
							</Link>
						</div>
						<div>
							<ContentGrid nodes={starredProjects} />
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
	const starredProjects = allProjectsQuery().filter(project =>
		project.tags?.includes('starred')
	);
	return <IndexPage starredProjects={starredProjects} />;
};
