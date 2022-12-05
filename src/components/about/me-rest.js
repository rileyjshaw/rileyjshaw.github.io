import AutoLink from '../auto-link';
import React from 'react';

function MeRest() {
	return (
		<>
			<p>
				Throughout my career, I have focused on accessibility,
				mentorship, and community. I am a proud graduate of the
				<AutoLink to="https://www.recurse.com/scout/click?t=4bdcd56dfdb6c80c7832262c0bb8007b">
					Recurse Center
				</AutoLink>
				and the{' '}
				<AutoLink to="http://sfpc.io/">
					School for Poetic Computation
				</AutoLink>
				. I have a Bachelor of Science in Electrical Engineering, with
				a focus on human-computer interaction.
			</p>
			<p>
				I have the dubious honor of being recognized as one of Canada’s
				30 Under 30 developers.
			</p>
			<p>
				If you care to follow along, please{' '}
				<AutoLink to="/subscribe">subscribe to my website</AutoLink>.
			</p>
		</>
	);
}

export default MeRest;
