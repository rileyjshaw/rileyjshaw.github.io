import * as React from 'react';
const SvgMenu = ({title, titleId, ...props}) => (
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
		<path d="M0 0h625v125H0zM0 250h625v125H0zM0 500h625v125H0z" />
	</svg>
);
export default SvgMenu;
