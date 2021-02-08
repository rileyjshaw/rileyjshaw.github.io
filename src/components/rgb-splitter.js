import {isRenderingOnClient} from '../util/constants';
import {
	useInView,
	useMousePosition,
	useWindowSize,
	useMediaQuery,
} from '../util/hooks';
import React, {cloneElement, isValidElement} from 'react';

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

export default ({
	children,
	El = 'div',
	className,
	style,
	intensity = 1,
	...rest
}) => {
	const [ref, inView] = useInView({threshold: 0});
	const mousePosition = useMousePosition(
		isRenderingOnClient && inView && window
	);
	const [windowWidth, windowHeight] = useWindowSize();
	const prefersReducedMotion = useMediaQuery(
		'(prefers-reduced-motion: reduce)'
	);
	const highContrast = useMediaQuery('(prefers-contrast: high)');
	const hideRgb = prefersReducedMotion || highContrast;
	let offsets;
	if (hideRgb) {
		const rStyles = {top: 0, left: 0};
		const gbStyles = {...rStyles, display: 'none'};
		offsets = [rStyles, gbStyles, gbStyles];
	} else {
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

		offsets = Array.from({length: 3}, (_, i) => {
			const a = angle + (i * Math.PI * 2) / 3;
			return {
				top: magnitude * Math.sin(a) * intensity,
				left: magnitude * Math.cos(a) * intensity,
			};
		});
	}

	return (
		<El
			style={style}
			ref={ref}
			className={`rgb-splitter ${className ? className : ''}`}
			{...rest}
		>
			<div className={hideRgb ? 'k' : 'r'} style={offsets[0]}>
				{children}
			</div>
			<div className="g" style={offsets[1]} aria-hidden="true">
				{deepCloneChildren(children)}
			</div>
			<div className="b" style={offsets[2]} aria-hidden="true">
				{deepCloneChildren(children)}
			</div>
		</El>
	);
};
