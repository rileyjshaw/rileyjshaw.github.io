import AutoLink from '../AutoLink';
import React from 'react';

function MeIntro() {
	return (
		<p>
			I am a programmer and interface designer. My work has been featured
			on NPR, the CBC, HuffPost, Canadian Business, and elsewhere. I
			volunteer at{' '}
			<AutoLink to="https://mischiefmakers.ca/">
				Mischief Makers
			</AutoLink>
			, and am slowly developing my thoughts on{' '}
			<AutoLink to="https://github.com/miseryco/curriculum">
				what digital literacy means on today’s Internet
			</AutoLink>
			. I founded the studio{' '}
			<AutoLink to="https://misery.co">Misery & Co.</AutoLink> and am
			taking commissions.
		</p>
	);
}

export default MeIntro;
