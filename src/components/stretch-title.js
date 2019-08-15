import React, {cloneElement, isValidElement, useState, useEffect} from 'react';

import {useMousePosition, useWindowSize} from '../util/hooks';

const cloneElementTree = el =>
	React.Children.map(el, child =>
		isValidElement(child) && child.props
			? cloneElement(child, cloneElementTree(child.props.children))
			: child
	);

export default ({children}) => {
	const mousePosition = useMousePosition(
		typeof window !== 'undefined' && window
	);
	const windowCenter = useWindowSize().map(d => d / 2);

	const angle = Math.atan2(
		mousePosition[1] - windowCenter[1],
		mousePosition[0] - windowCenter[0]
	);
	const magnitude =
		Math.hypot(
			mousePosition[0] - windowCenter[0],
			mousePosition[1] - windowCenter[1]
		) / 256;

	const offsets = Array.from({length: 3}, (_, i) => {
		const a = angle + (i * Math.PI * 2) / 3;
		return {
			top: magnitude * Math.sin(a),
			left: magnitude * Math.cos(a),
		};
	});

	return (
		<h1 className="title-stretch">
			<div className="title">
				<div className="c" style={offsets[0]}>
					{children}
				</div>
				<div className="m" style={offsets[1]}>
					{cloneElementTree(children)}
				</div>
				<div className="y" style={offsets[2]}>
					{cloneElementTree(children)}
				</div>
			</div>
		</h1>
	);
};
