import MeIntro from '../components/about/me-intro';
import MeRest from '../components/about/me-rest';
import {
	CLC,
	D30U30,
	KhanAcademy,
	Listn,
	Misery,
	Mozilla,
	RecurseCenter,
	RepairMatters,
	SFPC,
	Signal,
} from '../components/about/work';
import AutoLink from '../components/auto-link';
import BigQuote from '../components/big-quote';
import GoUp from '../components/go-up';
import SEO from '../components/seo';
import '../templates/post.css';
import './about.css';
import React from 'react';

export function Head(props) {
	return <SEO {...props} title="About" />;
}

function AboutPage() {
	return (
		<main className="about-page">
			<div className="about-page-content">
				<div className="about-me blog-post-content">
					<MeIntro />
					<MeRest />
					{/* TODO(riley): <UpTo /> */}
					<h2>Where I’ve been</h2>
					<ul className="timeline">
						<Misery />
						<Mozilla />
						<RepairMatters />
						<SFPC />
						<KhanAcademy />
						<CLC />
						<D30U30 />
						<Signal />
						<RecurseCenter />
						<Listn />
					</ul>
					<hr />
					<p>
						For a full history of my employment, please see my{' '}
						<AutoLink to="https://www.linkedin.com/in/rileyjshaw/">
							LinkedIn
						</AutoLink>
						.
					</p>
					<h2>About this website</h2>
					<p>
						This website aggregates content that I’ve littered
						across the Internet. I wrote a{' '}
						<AutoLink to="https://rileyjshaw.commit--blog.com/rileyjshaw/rileyjshaw-new/2488bcd5e5610f692773e7815fabdb247ece55f5">
							small utility to scrape the web
						</AutoLink>{' '}
						which runs daily. I structured my website this way to
						regain ownership of the collection and presentaton of
						my data.
					</p>
					<p>
						If you like the idea of website-as-API,{' '}
						<AutoLink to="/subscribe">
							I have some feeds that you can subscribe to
						</AutoLink>
						.
					</p>
					<p>
						To respect your privacy, this site does not, and will
						never, track usage data. Most website owners do not
						share this proclivity. To reclaim some privacy, check
						out{' '}
						<AutoLink to="https://www.eff.org/privacybadger">
							Privacy Badger
						</AutoLink>{' '}
						and{' '}
						<AutoLink to="https://deletionday.com/">
							Deletion Day
						</AutoLink>
						. This site is free software under the{' '}
						<AutoLink to="https://github.com/rileyjshaw/rileyjshaw.github.io/blob/dev/COPYING">
							GNU GPLv3 license
						</AutoLink>{' '}
						and follows the{' '}
						<AutoLink to="https://www.contributor-covenant.org/">
							Contributor Covenant
						</AutoLink>
						.
					</p>
				</div>
			</div>
			<BigQuote quoteId="DANCES_GAMES_AND_FEASTS" />
			<GoUp />
		</main>
	);
}

export default AboutPage;
