import React from 'react';

import AutoLink from '../AutoLink';

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
	'technomancer',
];

function MeIntro() {
	return (
		<p>
			I am a programmer, interface designer, and {thirdThings[2]}. Rooted
			in repair and craft, I strive to create transparent, remixable
			digital tools for a sustainable and accessible future. I do my best
			work on projects that combine high-performance engineering with
			ambitious design. I build climate software at{' '}
			<AutoLink to="https://watershed.com/">Watershed</AutoLink> and run
			a studio called{' '}
			<AutoLink to="https://misery.co">Misery & Co.</AutoLink>
		</p>
	);
}

export default MeIntro;
