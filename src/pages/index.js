import {ReactComponent as Repeat} from '../../content/images/repeat.svg';
import BigQuote from '../components/big-quote';
import ClientOnly from '../components/client-only';
import ContentGrid from '../components/content-grid';
import CycleText from '../components/cycle-text';
import BackgroundGenerator from '../components/doodles/background-generator';
import CircleConstrainedLines from '../components/doodles/circle-constrained-lines';
import GoUp from '../components/go-up';
import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import SEO from '../components/seo';
import allProjectsQuery from '../util/all-projects-query';
import {shuffle, sortByDate} from '../util/sorting-methods';
import './index.css';
import {useStaticQuery, graphql, Link} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import React, {useState} from 'react';

// Ensure the first doodle shown is consistent to prevent layout shifts on
// initial load. Shuffle the rest.
const doodles = [
	{
		Doodle: BackgroundGenerator,
		styles: {height: '100%'},
	},
	...shuffle([
		{
			Doodle: CircleConstrainedLines,
			styles: {height: 'max-content'},
		},
	]),
];

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

	const [doodleIdx, setDoodleIdx] = useState(0);
	const {Doodle, styles: doodleStyles} = doodles[doodleIdx];

	return (
		<Layout>
			<SEO />
			<PageHeader fromPage={location?.state?.fromPage} />
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
											idx => (idx + 1) % doodles.length
										)
									}
								>
									<Repeat />
								</button>
							</>
						</ClientOnly>
					</div>
					<div className="about-stub">
						<MDXRenderer className="about-md-wrapper">
							{body}
						</MDXRenderer>{' '}
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
		</Layout>
	);
};

const IndexPageWrapper = props => {
	const featuredProjects = sortByDate(allProjectsQuery())
		.filter(project => (project.coolness ?? 100) > 40)
		.slice(0, 8);
	return <IndexPage {...props} featuredProjects={featuredProjects} />;
};

export default IndexPageWrapper;
