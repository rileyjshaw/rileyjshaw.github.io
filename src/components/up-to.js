import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

import './up-to.css';

export default () => (
	<div className="up-to">
		<h2>What I'm up to</h2>
		<ul className="currently">
			<li>
				{/* I'm redoing my website. This is a work in
								progress, big time. */}
				1
			</li>
			<li>
				{/* I'm creating a massive MIDI controller for
								music and games. */}
				2
			</li>
			<li>
				{/* I'm working with Canada Learning Code as an
								instructor and mentor. My next class is{' '}
								<ExternalLink to="https://www.canadalearningcode.ca/experiences/vancouver-chapter-girls-learning-code-gamemaking-and-circuitry-with-scratch-makey-makey/">
									Gamemaking and Circuitry with Scratch &
									MaKey MaKey
								</ExternalLink>
								. */}
				3
			</li>
		</ul>
	</div>
);