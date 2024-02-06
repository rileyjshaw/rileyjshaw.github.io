import * as React from 'react';

const SvgRepeat = ({title, titleId, ...props}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path d="M93.748 50.034c0-.039.007-.076.007-.114h-.012C93.659 27.442 75.352 9.18 52.852 9.18v17.683c12.79 0 23.194 10.391 23.216 23.17-.059 12.558-10.144 22.769-22.643 23.078-11.699-.287-21.277-9.273-22.483-20.742h9.335L22.015 34.114 3.755 52.369h9.494c1.254 21.028 18.419 37.801 39.603 38.392v.06c.192 0 .381-.026.573-.03.193.004.38.03.573.03v-.06c21.971-.613 39.664-18.595 39.75-40.687h.003q-.001-.022-.003-.04" />
	</svg>
);
export default SvgRepeat;
