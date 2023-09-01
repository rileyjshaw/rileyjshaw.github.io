import './UpTo.css';
import React from 'react';

export default () => (
	<div className="up-to">
		<h2>What I'm up to</h2>
		<ul className="currently">
			<li>
				{/* I'm redoing my website. This is a work in
								progress, big time. */}
				work
			</li>
			<li>
				{/* I'm creating a massive MIDI controller for
								music and games. */}
				in
			</li>
			<li>
				{/* I'm working with Canada Learning Code as an
								instructor and mentor. My next class is{' '}
								<ExternalLink to="https://www.canadalearningcode.ca/experiences/vancouver-chapter-girls-learning-code-gamemaking-and-circuitry-with-scratch-makey-makey/">
									Gamemaking and Circuitry with Scratch &
									MaKey MaKey
								</ExternalLink>
								. */}
				progress
			</li>
		</ul>
	</div>
);
