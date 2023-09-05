// transform: scale
import {useRect} from '../../util/hooks';
import './Fit3.css';
import React from 'react';

export default ({children, x, y}) => {
	const [parentRef, parentRect] = useRect({resize: true});
	const [childRef, childRect] = useRect();

	const style = {};
	if (parentRect && childRect) {
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
