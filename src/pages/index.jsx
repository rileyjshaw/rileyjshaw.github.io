import AboutIntro from '../components/about/MeIntro';
import BigQuote from '../components/BigQuote';
import ContentGrid from '../components/ContentGrid';
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
		<>
			<main className="main-content">
				<div className="frontpage-grid">
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
					{/* Include News, Newsletter? */}
					<div className="main-projects-title">
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
				<BigQuote quoteId="SPUTTERED_AND_STOPPED" />
				<GoUp />
			</main>
		</>
	);
};

const IndexPageWrapper = props => {
	const featuredProjects = sortByDate(allProjectsQuery())
		.filter(project => (project.coolness ?? 100) > 40)
		.slice(0, 5);
	return <IndexPage {...props} featuredProjects={featuredProjects} />;
};

export default IndexPageWrapper;
