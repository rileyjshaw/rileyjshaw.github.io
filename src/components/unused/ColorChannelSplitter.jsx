import {useViewport} from '../util/hooks';
import './ColorChannelSplitter.css';
import {SettingsContext} from './SettingsProvider';
import cn from 'cnz';
import React, {cloneElement, isValidElement, useContext} from 'react';

const deepCloneChildren = (children, propsFn = null) =>
	React.Children.map(children, child =>
		isValidElement(child) && child.props
			? cloneElement(
					child,
					propsFn?.(child),
					...deepCloneChildren(child.props.children),
				)
			: child,
	);

function ColorChannelSplitter({
	children,
	El = 'div',
	className,
	style,
	...rest
}) {
	const [ref, inView] = useViewport({initialInView: true});
	const {theme, reducedMotion, contrastPreference} =
		useContext(SettingsContext);

	const hideColors =
		!inView || !theme || reducedMotion || contrastPreference === 'more';

	return (
		<El
			style={style}
			ref={ref}
			className={cn(
				'color-channel-splitter',
				hideColors && 'no-split',
				className,
			)}
			{...rest}
		>
			<div className={`channel ${hideColors ? '' : 's1'}`}>
				{children}
			</div>
			<div className="channel s2" aria-hidden="true">
				{deepCloneChildren(children)}
			</div>
			<div className="channel s3" aria-hidden="true">
				{deepCloneChildren(children)}
			</div>
		</El>
	);
}

export default ColorChannelSplitter;
