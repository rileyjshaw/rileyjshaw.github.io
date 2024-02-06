import * as React from 'react';

const SvgStar = ({title, titleId, ...props}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={{
			fillRule: 'evenodd',
			clipRule: 'evenodd',
			strokeLinejoin: 'round',
			strokeMiterlimit: 2,
		}}
		viewBox="0 0 750 750"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path d="m375-.001 84.192 259.118h272.453l-220.42 160.144 84.193 259.118L375 518.235 154.58 678.38l84.193-259.118-220.42-160.144h272.454z" />
	</svg>
);
export default SvgStar;
