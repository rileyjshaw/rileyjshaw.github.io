import AboutIntro from '../components/about/me-intro';
import BigQuote from '../components/big-quote';
import ClientOnly from '../components/client-only';
import ContentGrid from '../components/content-grid';
import CycleText from '../components/cycle-text';
import BackgroundGenerator from '../components/doodles/background-generator';
import CircleConstrainedLines from '../components/doodles/circle-constrained-lines';
import GameOver from '../components/doodles/game-over';
import Riot from '../components/doodles/riot';
import GoUp from '../components/go-up';
import SEO from '../components/seo';
import Repeat from '../icons/Repeat';
import allProjectsQuery from '../util/all-projects-query';
import {shuffle, sortByDate} from '../util/sorting-methods';
import './index.css';
import {Link} from 'gatsby';
import React, {useState} from 'react';

export const Head = SEO;

// Ensure the first doodle shown is consistent to prevent layout shifts on
// initial load. Shuffle the rest.
const doodles = [
	{
		Doodle: BackgroundGenerator,
	},
	...shuffle([
		{
			Doodle: CircleConstrainedLines,
			styles: {height: 'max-content'},
		},
		{
			Doodle: GameOver,
		},
		{
			Doodle: Riot,
		},
	]),
];

const IndexPage = ({featuredProjects = []}) => {
	const [doodleIdx, setDoodleIdx] = useState(0);
	const {Doodle, styles: doodleStyles} = doodles[doodleIdx];

	return (
		<>
			<main className="main-content">
				<div className="frontpage-grid">
					<div className="frontpage-doodle" style={doodleStyles}>
						<ClientOnly>
							<>
								<Doodle />
								<button
									className="new-doodle"
									onClick={() =>
										setDoodleIdx(
											idx => (idx + 1) % doodles.length,
										)
									}
								>
									<Repeat />
								</button>
							</>
						</ClientOnly>
					</div>
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
