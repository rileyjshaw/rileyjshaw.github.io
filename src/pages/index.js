import React from 'react';
import {Link} from 'gatsby';

import SEO from '../components/seo';
import Firehose from '../components/firehose';
import Fit from '../components/fit';
import ExternalLink from '../components/external-link';

import './index.css';

const IndexPage = () => (
	<>
		<SEO title="Home" />
		<main>
			<div className="homepage-top">
				<div className="todo-maybe-header-element">
					<h1 className="title-stretch">
						<Fit>Welcome to the digital museum of</Fit>
						<Fit className="title-riley">Riley</Fit>
						<Fit className="title-j">J</Fit>
						<Fit className="title-shaw">Shaw</Fit>
					</h1>
					<p>
						I am an artist, engineer, and educator. My work has
						been featured on NPR, the CBC, HuffPost, Canadian
						Business, and elsewhere. I volunteer at Repair Matters
						and Canada Learning Code, and am slowly developing my
						thoughts on what digital literacy means on today's
						Internet. <Link to="/about">More →</Link>
					</p>
					<ul>
						<li>
							<ExternalLink to="https://github.com/rileyjshaw">
								GitHub
							</ExternalLink>
						</li>
						<li>
							<ExternalLink to="https://twitter.com/rileyjshaw">
								Twitter
							</ExternalLink>
						</li>
						<li>
							<ExternalLink to="https://www.linkedin.com/in/rileyjshaw/">
								Linkedin
							</ExternalLink>
						</li>
						<li>
							<ExternalLink to="http://rileyjshaw.commit--blog.com/">
								commit--blog
							</ExternalLink>
						</li>
						<li>
							<ExternalLink to="https://codepen.io/rileyjshaw">
								Codepen
							</ExternalLink>
						</li>
						<li>
							<ExternalLink to="https://glitch.com/@rileyjshaw">
								Glitch
							</ExternalLink>
						</li>
						<li>
							<ExternalLink to="https://www.are.na/riley-shaw">
								Are.na
							</ExternalLink>
						</li>
						<li>
							<ExternalLink to="https://www.instagram.com/rileyjshaw">
								Instagram
							</ExternalLink>
						</li>
						<li>
							<ExternalLink to="https://www.dwitter.net/u/rileyjshaw">
								Dwitter
							</ExternalLink>
						</li>
					</ul>
				</div>
				<div className="todo-some-better-name">
					<h1>What I'm up to</h1>
					<ul className="currently">
						<li>I'm </li>
						<li>
							I'm creating a massive MIDI controller for music
							and games.
						</li>
						<li>
							I'm working with Canada Learning Code as an
							instructor and mentor. My next class is{' '}
							<ExternalLink to="https://www.canadalearningcode.ca/experiences/vancouver-chapter-girls-learning-code-gamemaking-and-circuitry-with-scratch-makey-makey/">
								Gamemaking and Circuitry with Scratch & MaKey
								MaKey
							</ExternalLink>
							.
						</li>
					</ul>
					<Link to="/now">
						You can read more about what I'm up to here.
					</Link>

					<br />
					<br />
					<br />

					<h1>Where I've been</h1>
					<ul className="timeline">
						<li>
							<div className="content-ughhh">
								<img
									src="https://cdn.glitch.com/9d6f12c1-c6f9-495b-a6c1-02b3ee7ea95f%2Fsfpc_logo.png?v=1564785706822"
									className="logo"
								/>
								<div className="info">
									<h1>School for Poetic Computation</h1>
									<p>
										This is some information about the
										School for Poetic Computation, yippee!
									</p>
								</div>
							</div>
						</li>
						<li>
							<div className="content-ughhh">
								<img src="./ka_logo.svg" className="logo" />
								<div className="info">
									<h1>Khan Academy</h1>
									<p>
										This is some information about KA,
										yippee!
									</p>
								</div>
							</div>
						</li>
						<li>
							<div className="content-ughhh">
								<img
									src="https://cdn.glitch.com/9d6f12c1-c6f9-495b-a6c1-02b3ee7ea95f%2FD30U30_logo.png?v=1564801045841"
									className="logo"
								/>
								<div className="info">
									<h1>Developer 30 Under 30</h1>
									<p>I won that!</p>
								</div>
							</div>
						</li>
						<li>
							<div className="content-ughhh">
								<img
									src="https://cdn.glitch.com/9d6f12c1-c6f9-495b-a6c1-02b3ee7ea95f%2Fsignal_logo.png?v=1564800789076"
									className="logo"
								/>
								<div className="info">
									<h1>Signal Desktop</h1>
									<p>I worked on that.</p>
								</div>
							</div>
						</li>
						<li>
							<div className="content-ughhh">
								<img src="./rc_logo.svg" className="logo" />
								<div className="info">
									<h1>Recurse Center</h1>
									<p>
										I went there. Also! I still interview
										for them.
									</p>
								</div>
							</div>
						</li>
						<li>
							<div className="content-ughhh">
								<img src="./listn_logo.png" className="logo" />
								<div className="info">
									<h1>Listn</h1>
									<p>I built that.</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</main>
		<blockquote cite="https://www.versobooks.com/books/3002-new-dark-age">
			<p>
				If we do not understand how complex technologies function, how
				systems of technologies interconnect, and how systems of
				systems interact, then we are powerless within them, and their
				potential is more easily captured by selfish elites and inhuman
				corporations… this understanding cannot be limited to the
				practicalities of how things work: it must be extended to how
				things came to be, and how they continue to function in the
				world in ways that are often invisible and interwoven. What is
				required is not understanding, but literacy.
			</p>
			<footer>
				—James Bridle, <cite>New Dark Age</cite>
			</footer>
		</blockquote>
		<Firehose />
		<Link to="/firehose-demo">Go to page 2</Link>
	</>
);

export default IndexPage;
