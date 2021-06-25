// transform: scale
import './fit-3.css';
import React from 'react';
import useDimensions from 'react-use-dimensions';

export default ({children, x, y}) => {
	const [parentRef, {width: parentWidth, height: parentHeight}] =
		useDimensions({
			liveMeasure: true,
		});
	const [childRef, {width: childWidth, height: childHeight}] = useDimensions(
		{
			liveMeasure: false,
		}
	);

	const style =
		parentWidth && childWidth
			? {
					transform: `scale(${x ? parentWidth / childWidth : 1}, ${
						y ? parentHeight / childHeight : 1
					})`,
			  }
			: {};
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
