// transform: scale
import React from 'react';

import {useMeasure} from 'react-use';

import './Fit3.css';

export default ({children, x, y}) => {
	const [parentRef, parentRect] = useMeasure();
	const [childRef, childRect] = useMeasure();

	const style = {};
	if (
		parentRect.width &&
		parentRect.height &&
		childRect.width &&
		childRect.height
	) {
		style.transform = `scale(${
			x ? parentRect.width / childRect.width : 1
		}, ${y ? parentRect.height / childRect.height : 1})`;
	}
	if (x) style.display = 'inline-block';
	else style.flexGrow = 1;

	return (
		<div className="fit-3-parent" ref={parentRef}>
			<p style={style} className="fit-3-child" ref={childRef}>
				{children}
			</p>
		</div>
	);
};
