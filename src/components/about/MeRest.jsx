import React from 'react';

import AutoLink from '../AutoLink';

function MeRest() {
	return (
		<>
			<p>
				Throughout my career, I have developed software tools for
				education and live collaboration, with my work gaining
				recognition on platforms like NPR, CBC, HuffPost, and Canadian
				Business. Beyond software, I also enjoy the tangible creativity
				of hardware design.
			</p>
			<p>
				A commitment to mentorship and community has been a guiding
				force for me. I am a proud graduate of the{' '}
				<AutoLink to="https://www.recurse.com/scout/click?t=4bdcd56dfdb6c80c7832262c0bb8007b">
					Recurse Center
				</AutoLink>{' '}
				and the{' '}
				<AutoLink to="http://sfpc.io/">
					School for Poetic Computation
				</AutoLink>
				. I have a Bachelor of Science in Electrical Engineering, with
				a focus on human-computer interaction. I have the dubious honor
				of being recognized as one of Canada’s 30 Under 30 developers.
			</p>
			<p>
				If you care to follow along, please{' '}
				<AutoLink to="/subscribe">subscribe to my website</AutoLink>.
			</p>
		</>
	);
}

export default MeRest;
