import AboutIntro from '../components/about/MeIntro';
import BigQuote from '../components/BigQuote';
import ContentList from '../components/ContentList';
import CycleText from '../components/CycleText';
import GoUp from '../components/GoUp';
import SEO from '../components/SEO';
import allProjectsQuery from '../util/all-projects-query';
import {sortByDate} from '../util/sorting-methods';
import './index.css';
import {Link} from 'gatsby';
import React from 'react';

export const Head = SEO;

const IndexPage = ({featuredProjects = []}) => {
	return (
		<main>
			<div className="page-content">
				<div className="about-stub">
					<AboutIntro />{' '}
					<Link to="/about" className="about-link">
						More{' '}
						<CycleText
							className="about-arrow"
							OuterElement="span"
							ms={100}
						>
							➫➯➱➬–
						</CycleText>
					</Link>
				</div>
				<div className="main-projects">
					<h2>Projects</h2>
				</div>
				<div className="recent-additions">
					<h2>Recent additions</h2>
					<ContentList nodes={featuredProjects} />
					<p className="explore-more">
						Explore hundreds of projects in{' '}
						<Link to="/lab">the lab</Link>.
					</p>
				</div>
			</div>
			<BigQuote quoteId="SPUTTERED_AND_STOPPED" />
			<GoUp />
		</main>
	);
};

const IndexPageWrapper = props => {
	const featuredProjects = sortByDate(allProjectsQuery())
		.filter(project => (project.coolness ?? 100) > 40)
		.slice(0, 8);
	return <IndexPage {...props} featuredProjects={featuredProjects} />;
};

export default IndexPageWrapper;
