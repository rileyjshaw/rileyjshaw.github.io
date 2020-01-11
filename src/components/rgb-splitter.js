import React, {cloneElement, isValidElement} from 'react';

import {useInView, useMousePosition, useWindowSize} from '../util/hooks';

const deepCloneChildren = (children, propsFn = null) =>
	React.Children.map(children, child =>
		isValidElement(child) && child.props
			? cloneElement(
					child,
					propsFn?.(child),
					...deepCloneChildren(child.props.children)
			  )
			: child
	);

const INTENSITY = 1;
export default ({children, El = 'div', className, style}) => {
	const [ref, inView] = useInView({threshold: 0});
	const mousePosition = useMousePosition(
		typeof window !== 'undefined' && inView && window
	);
	const [windowWidth, windowHeight] = useWindowSize();
	const windowCenter = [windowWidth / 2, windowHeight / 2];

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
			top: magnitude * Math.sin(a) * INTENSITY,
			left: magnitude * Math.cos(a) * INTENSITY,
		};
	});

	return (
		<El
			style={style}
			ref={ref}
			className={`rgb-splitter ${className ? className : ''}`}
		>
			<div className="r" style={offsets[0]}>
				{children}
			</div>
			<div className="g" style={offsets[1]} aria-hidden="true">
				{deepCloneChildren(children, el => {
					if (typeof el.props?.children === 'string') {
						return {
							offset: Math.random() + 'px',
						};
					}
				})}
			</div>
			<div className="b" style={offsets[2]} aria-hidden="true">
				{deepCloneChildren(children)}
			</div>
		</El>
	);
};
