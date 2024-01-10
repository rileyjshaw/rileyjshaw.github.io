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
import GalleryImage from '../components/GalleryImage';
import {StaticImage} from 'gatsby-plugin-image';
import {ExternalLink} from '../components/AutoLink';
import BackgroundGenerator from '../components/doodles/BackgroundGenerator';
import Riot from '../components/doodles/Riot';
import CircleConstrainedLines from '../components/doodles/CircleConstrainedLines';
import PinkNoise from '../components/PinkNoise';
import {DIRECT_COLORS} from '../util/constants.mjs';

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
					<ul className="main-gallery">
						<li className="project">
							<ExternalLink
								to="https://youtu.be/ytyOffQuA5o"
								className="image-link"
							>
								<StaticImage
									src="../../content/images/projects/stargazer.svg"
									alt="A logo with the word “Stargazer”"
									width={500}
									aspectRatio={1}
									backgroundColor="rgb(1, 6, 25)"
								/>
							</ExternalLink>
						</li>
						<li className="project">
							<GalleryImage
								ThumbnailImage={
									<StaticImage
										src="../../content/images/projects/multicolor.jpg"
										alt="A technicolour fractal pattern."
										width={500}
										aspectRatio={1}
									/>
								}
								FullImage={
									<StaticImage
										src="../../content/images/projects/multicolor.jpg"
										alt="A technicolour fractal pattern."
										aspectRatio={1}
									/>
								}
								aspectRatio={1}
							/>
						</li>
						<li className="project">
							<ExternalLink
								to="https://youtu.be/Ow5A2BGH1m4"
								className="image-link"
							>
								<StaticImage
									src="../../content/images/projects/jambo.jpg"
									alt="An instrument made of bare electronics, with two knobs, two alphanumeric displays, and a fader."
									width={500}
									aspectRatio={1}
								/>
							</ExternalLink>
						</li>
						<li className="project">
							<GalleryImage
								aspectRatio={1}
								ThumbnailImage={<PinkNoise />}
								FullImage={
									<PinkNoise
										width="2400px"
										height="2400px"
									/>
								}
							/>
						</li>
						<li className="project no-zoom">
							<CircleConstrainedLines />
						</li>
						<li>
							<ul className="bento-half-x">
								<li className="project">
									<GalleryImage
										ThumbnailImage={
											<StaticImage
												src="../../content/images/projects/city.png"
												alt="A pixellated, visually processed, sci-fi cityscape."
												width={500}
												aspectRatio={1}
											/>
										}
										FullImage={
											<StaticImage
												src="../../content/images/projects/city.png"
												alt="A pixellated, visually processed, sci-fi cityscape."
											/>
										}
										aspectRatio={1}
									/>
								</li>
								<li>
									<ul className="bento-half-y">
										<li className="project">
											<GalleryImage
												ThumbnailImage={
													<StaticImage
														src="../../content/images/projects/quantized.jpg"
														alt="An abstract image. It’s shiny, grainy, lo-fi, and looks a bit 3D."
														width={500}
														aspectRatio={1}
													/>
												}
												FullImage={
													<StaticImage
														src="../../content/images/projects/quantized.jpg"
														alt="An abstract image. It’s shiny, grainy, lo-fi, and looks a bit 3D."
													/>
												}
												aspectRatio={1}
											/>
										</li>
										<li className="project">
											<ExternalLink
												to="https://vimeo.com/377116426"
												className="image-link"
											>
												<StaticImage
													src="../../content/images/projects/timestamped.png"
													alt="A geometric pattern with the text “1:57am” overlayed."
													width={500}
													aspectRatio={1}
												/>
											</ExternalLink>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							<ul className="bento-half-y">
								<li className="project deletion-day">
									<ExternalLink to="https://deletionday.com">
										4/04
									</ExternalLink>
								</li>
								<li>
									<ul className="bento-half-x">
										<li className="project no-zoom">
											<Riot word="ROLL" />
										</li>
										<li className="project no-zoom">
											<BackgroundGenerator
												fgColor={
													DIRECT_COLORS.red[500]
												}
												bgColor={
													DIRECT_COLORS.blue[900]
												}
											/>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li className="project">
							<ExternalLink
								to="https://www.tumblr.com/sfpc/182905537092/final-showcase-project-depression"
								className="image-link"
							>
								<StaticImage
									src="../../content/images/projects/depression.jpg"
									alt="A small device with exposed wires and a single knob."
									width={500}
									aspectRatio={1}
								/>
							</ExternalLink>
						</li>
					</ul>
				</div>
				<div className="main-recent">
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
