import AutoLink from '../AutoLink';
import React from 'react';

const thirdThings = [
	'toymaker',
	'toolmaker',
	'noisemaker',
	'code gardener',
	'code breaker',
	'patcher',
	'circuitbender',
	'mender',
	'mentee',
	'mentor',
	'plant eater',
	'fixer',
	'remixer',
	'drummer',
];

function MeIntro() {
	return (
		<p>
			I am a programmer, interface designer, and {thirdThings[2]}. Rooted
			in repair and craft, I strive to create transparent, remixable
			digital tools for a sustainable and accessible future. I run a
			studio called{' '}
			<AutoLink to="https://misery.co">Misery & Co.</AutoLink> and am
			taking commissions.
		</p>
	);
}

export default MeIntro;
