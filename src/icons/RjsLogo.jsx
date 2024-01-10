import * as React from 'react';
const SvgRjsLogo = ({title, titleId, ...props}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={{
			fillRule: 'evenodd',
			clipRule: 'evenodd',
			strokeLinejoin: 'round',
			strokeMiterlimit: 2,
		}}
		viewBox="0 0 392 250"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path d="M0 250V0c68.989 0 125 56.011 125 125v125zM258.333 125c0 68.989-56.01 125-125 125V0h125zM266.667 125c0-68.989 56.01-125 125-125v125c0 68.989-56.011 125-125 125z" />
	</svg>
);
export default SvgRjsLogo;
