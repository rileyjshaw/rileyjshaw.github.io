import {isRenderingOnClient} from '../util/constants';
import {useInView, useMousePosition, useWindowSize} from '../util/hooks';
import {SettingsContext} from './settings-provider';
import React, {cloneElement, isValidElement, useContext, useMemo} from 'react';

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

const ColorChannelSplitter = ({
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
	const {theme, reducedMotion, contrastPreference} = useContext(
		SettingsContext
	);
	const hideColors = reducedMotion || contrastPreference === 'more';

	let styles;
	let commonStyles = useMemo(
		() => ({
			mixBlendMode: theme === 'light' ? 'darken' : 'lighten',
		}),
		[theme]
	);
	if (hideColors) {
		commonStyles = {...commonStyles, top: 0, left: 0};
		const otherChannelStyles = {...commonStyles, display: 'none'};
		styles = [commonStyles, otherChannelStyles, otherChannelStyles];
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

		styles = Array.from({length: 3}, (_, i) => {
			const a = angle + (i * Math.PI * 2) / 3;
			return {
				...commonStyles,
				top: magnitude * Math.sin(a) * intensity,
				left: magnitude * Math.cos(a) * intensity,
			};
		});
	}

	return (
		<El
			style={style}
			ref={ref}
			className={`color-channel-splitter ${className ? className : ''}`}
			{...rest}
		>
			<div className={hideColors ? 'k' : 'c'} style={styles[0]}>
				{children}
			</div>
			<div className="m" style={styles[1]} aria-hidden="true">
				{deepCloneChildren(children)}
			</div>
			<div className="y" style={styles[2]} aria-hidden="true">
				{deepCloneChildren(children)}
			</div>
		</El>
	);
};

export default ColorChannelSplitter;
