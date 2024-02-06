import * as React from 'react';

const SvgList = ({title, titleId, ...props}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={{
			fillRule: 'evenodd',
			clipRule: 'evenodd',
			strokeLinejoin: 'round',
			strokeMiterlimit: 2,
		}}
		viewBox="0 0 625 625"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path d="M187.5 0H625v125H187.5zM187.5 250H625v125H187.5zM187.5 500H625v125H187.5z" />
		<ellipse
			cx={157.867}
			cy={197.333}
			rx={50.756}
			ry={44.312}
			transform="matrix(1.23139 0 0 1.41046 -131.896 34.17)"
		/>
		<ellipse
			cx={157.867}
			cy={197.333}
			rx={50.756}
			ry={44.312}
			transform="matrix(1.23139 0 0 1.41046 -131.896 284.169)"
		/>
		<ellipse
			cx={157.867}
			cy={197.333}
			rx={50.756}
			ry={44.312}
			transform="matrix(1.23139 0 0 1.41046 -131.896 -215.831)"
		/>
	</svg>
);
export default SvgList;
