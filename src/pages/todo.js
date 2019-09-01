import React from 'react';
import {Link} from 'gatsby';

import {ExternalLink} from '../components/auto-link';

export default () => (
	<div className="todo-some-better-name">
		<h1>What I'm up to</h1>
		<ul className="currently">
			<li>I'm </li>
			<li>
				I'm creating a massive MIDI controller for music and games.
			</li>
			<li>
				I'm working with Canada Learning Code as an instructor and
				mentor. My next class is{' '}
				<ExternalLink to="https://www.canadalearningcode.ca/experiences/vancouver-chapter-girls-learning-code-gamemaking-and-circuitry-with-scratch-makey-makey/">
					Gamemaking and Circuitry with Scratch & MaKey MaKey
				</ExternalLink>
				.
			</li>
		</ul>
		<Link to="/now">You can read more about what I'm up to here.</Link>

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
							This is some information about the School for
							Poetic Computation, yippee!
						</p>
					</div>
				</div>
			</li>
			<li>
				<div className="content-ughhh">
					<img src="./ka_logo.svg" className="logo" />
					<div className="info">
						<h1>Khan Academy</h1>
						<p>This is some information about KA, yippee!</p>
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
						<p>I went there. Also! I still interview for them.</p>
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
		<ul>
			<li>Add scroll to sidebar on index page if it's short and wide</li>
		</ul>
		<ul>
			<li>Potential other sources:</li>
			<li>
				Instagram
				(https://www.gatsbyjs.org/packages/gatsby-source-instagram/)
			</li>
			<li>
				Github (https://api.github.com/users/rileyjshaw/repos) ADD ALL
				PULL REQUESTS!!
			</li>
			<li>Gists (https://api.github.com/users/rileyjshaw/gists)</li>
			<li>
				Codepen (https://blog.codepen.io/documentation/api/rss-feeds/)
			</li>
			<li>Glitch ()</li>
			<li>Hackster</li>
			<li>Galleries</li>
			<li>SFPC tumblr (https://sfpc.rileyjshaw.com/rss)</li>
			<li>Creative code tumblr</li>
			<li>Increase project node types</li>
			<li></li>
			<li>TODO:</li>
			<li>
				<strike>Sorting</strike>
			</li>
			<li>
				<strike>A few more sources?</strike>
			</li>
			<li>
				<strong>Main page layout</strong>
			</li>
			<li>Lazy-loading</li>
			<li>Blog / etc links</li>
			<li>
				Optimize images:
				https://www.gatsbyjs.org/packages/gatsby-image/
			</li>
		</ul>
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
);
