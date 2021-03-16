import {useViewport} from '../util/hooks';
import './color-channel-splitter.css';
import {SettingsContext} from './settings-provider';
import React, {cloneElement, isValidElement, useContext} from 'react';

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

function ColorChannelSplitter({
	children,
	El = 'div',
	className,
	style,
	...rest
}) {
	const [ref, inView] = useViewport({initialInView: true});
	const {theme, reducedMotion, contrastPreference} = useContext(
		SettingsContext
	);

	const hideColors =
		!inView || !theme || reducedMotion || contrastPreference === 'more';

	const classNames = [
		'color-channel-splitter',
		hideColors && 'no-split',
		className,
	]
		.filter(x => x)
		.join(' ');

	return (
		<El style={style} ref={ref} className={classNames} {...rest}>
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
