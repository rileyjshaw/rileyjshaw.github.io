import React from 'react';

const PinkNoise = props => (
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		width="auto"
		height="1000px"
		style={{
			height: '100%',
			width: '100%',
		}}
		{...props}
	>
		<filter id="filter" x="0" y="0" width="100%" height="100%">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.01"
				result="noise"
				numOctaves="8"
			/>
			<feSpecularLighting
				in="noise"
				lightingColor="#f0f"
				surfaceScale="400"
			>
				<feDistantLight azimuth="100" elevation="100" />
			</feSpecularLighting>
		</filter>
		<rect x="0" y="0" width="100%" height="100%" fill="#fff" />
		<rect
			x="0"
			y="0"
			width="100%"
			height="100%"
			filter="url(#filter)"
			fill="none"
		/>
	</svg>
);

export default PinkNoise;
