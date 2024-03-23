import {Link} from 'gatsby';
import React, {useCallback, useState} from 'react';

import {StaticImage} from 'gatsby-plugin-image';

import fractalImgSrc from '../../content/images/projects/fractal.webp';
import {ExternalLink} from '../components/AutoLink';
import BigQuote from '../components/BigQuote';
import ContentList from '../components/ContentList';
import CycleText from '../components/CycleText';
import GalleryImage from '../components/GalleryImage';
import GoUp from '../components/GoUp';
import PinkNoise from '../components/PinkNoise';
import SEO from '../components/SEO';
import AboutIntro from '../components/about/MeIntro';
import BackgroundGenerator from '../components/doodles/BackgroundGenerator';
import CircleConstrainedLines from '../components/doodles/CircleConstrainedLines';
import Propellers from '../components/doodles/Propellers';
import Riot from '../components/doodles/Riot';
import allProjectsQuery from '../util/all-projects-query';
import {DIRECT_COLORS} from '../util/constants.mjs';
import {sortByDate} from '../util/sorting-methods';

import './index.css';

export const Head = SEO;

const DOODLES = [Propellers, CircleConstrainedLines];

const IndexPage = ({featuredProjects = []}) => {
	const [featuredDoodleIdx, setFeaturedDoodleIdx] = useState(0);
	const incrementFeaturedDoodleIdx = useCallback(() => {
		setFeaturedDoodleIdx(i => (i + 1) % DOODLES.length);
	}, []);
	const FeaturedDoodle = DOODLES[featuredDoodleIdx];

	return (
		<main>
			<div className="page-content">
				<div className="about-stub">
					<AboutIntro />{' '}
					<p>
						I learn by making, so this website collects tiny
						experiments that I’ve built in service of learning or
						teaching. If you want to read about bigger projects
						I’ve been involved with,{' '}
						<Link to="/about">
							there’s more{' '}
							<span className="about-link-end">
								here{' '}
								<CycleText
									className="about-arrow"
									OuterElement="span"
									ms={100}
								>
									➫➯➱➬–
								</CycleText>
							</span>
						</Link>
					</p>
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
									width={600}
									aspectRatio={1}
									backgroundColor="rgb(1, 6, 25)"
								/>
							</ExternalLink>
						</li>
						<li className="project">
							<ExternalLink
								to="/fractal/#R=0.36_I=0.4_C=y54_E=2_X=-0.05471340852756047_Y=-0.25617551945643696_Z=6.4_F=0_P=1_D=-1_H=1"
								className="image-link"
							>
								<img
									className="featured-raw-img"
									src={fractalImgSrc}
									alt="An animated fractal spiral."
								/>
							</ExternalLink>
						</li>
						<li className="project">
							<GalleryImage
								ThumbnailImage={
									<StaticImage
										src="../../content/images/projects/multicolor.jpg"
										alt="A technicolour fractal pattern."
										width={600}
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
						<li>
							<ul className="bento-half-y">
								<li className="project deletion-day">
									<ExternalLink to="https://deletionday.com">
										4/04
									</ExternalLink>
								</li>
								<li className="project">
									<ExternalLink
										to="https://sort.tools"
										className="image-link sort-tools-link"
									>
										<StaticImage
											src="../../content/images/projects/sort-tools.png"
											alt="A logo with the title “Sort Tools”"
											className="sort-tools-logo"
											width={500}
											placeholder="none"
										/>
									</ExternalLink>
								</li>
							</ul>
						</li>
						<li className="project">
							<ExternalLink
								to="https://youtu.be/Ow5A2BGH1m4"
								className="image-link"
							>
								<StaticImage
									src="../../content/images/projects/jambo.jpg"
									alt="An instrument made of bare electronics, with two knobs, two alphanumeric displays, and a fader."
									width={600}
									aspectRatio={1}
								/>
							</ExternalLink>
						</li>
						<li>
							<ul className="bento-half-x">
								<li className="project">
									<GalleryImage
										ThumbnailImage={
											<StaticImage
												src="../../content/images/projects/CA.png"
												alt="An abstract image. It’s green and layered, like a psychedelic rock formation."
												width={300}
											/>
										}
										FullImage={
											<StaticImage
												src="../../content/images/projects/CA.png"
												alt="An abstract image. It’s green and layered, like a psychedelic rock formation."
											/>
										}
									/>
								</li>
								<li>
									<ul className="bento-half-y">
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
										<li className="project">
											<ExternalLink
												to="/ribbon"
												className="image-link"
											>
												<StaticImage
													src="../../content/images/projects/ribbon.png"
													alt="A folded papercraft ribbon."
													width={300}
													aspectRatio={1}
												/>
											</ExternalLink>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li className="project">
							<GalleryImage
								ThumbnailImage={
									<StaticImage
										src="../../content/images/projects/quantized.jpg"
										alt="An abstract image. It’s shiny, grainy, lo-fi, and looks a bit 3D."
										width={600}
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
								to="https://www.tumblr.com/sfpc/182905537092/final-showcase-project-depression"
								className="image-link"
							>
								<StaticImage
									src="../../content/images/projects/depression.jpg"
									alt="A small device with exposed wires and a single knob."
									width={600}
									aspectRatio={1}
								/>
							</ExternalLink>
						</li>
						<li className="project color-mute">
							<ExternalLink
								to="https://vimeo.com/377116426"
								className="image-link"
							>
								<StaticImage
									src="../../content/images/projects/timestamped.jpg"
									alt="A geometric pattern with the text “4:40am” overlayed."
									width={600}
									aspectRatio={1}
								/>
							</ExternalLink>
						</li>
						<li>
							<ul className="bento-half-x">
								<li className="project">
									<GalleryImage
										ThumbnailImage={
											<StaticImage
												src="../../content/images/projects/city.png"
												alt="A pixellated, visually processed, sci-fi cityscape."
												width={300}
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
										<li className="project no-zoom">
											<BackgroundGenerator
												fgColor={
													DIRECT_COLORS.yellow[500]
												}
												bgColor={
													DIRECT_COLORS.yellow[800]
												}
											/>
										</li>
										<li className="project no-zoom">
											<Link to="/about">
												<Riot word="ABOUT" />
											</Link>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li className="project no-zoom featured-doodle">
							<FeaturedDoodle
								onFullCycle={incrementFeaturedDoodleIdx}
							/>
						</li>
						<li className="project selectable">
							<div className="mess-is-more">
								<p>Less is bore.</p>
								<p>Mess is more!</p>
							</div>
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
