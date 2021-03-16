import {useInterval, useViewport} from '../util/hooks';
import TextGrid from './text-grid';
import React, {useState} from 'react';

/* Fun strings:
▁▂▃▅▆▇▇▆▅▃▂▁
➬➱➯➫–
◯⦿◉◎
○⊙⊚⦾⊛◌ ◌
▙▛▜▟
*/

// HACK(riley): We potentially have two different useViewport refs on this
//              component: one for pausing the animation, and one for checking
//              scroll position for lazy loading. I'm attaching both to the
//              root element for now, but there's gotta be a nicer way to do
//              this.
const mergeRefs = (...refs) => {
	const filteredRefs = refs.filter(Boolean);
	if (!filteredRefs.length) return null;
	if (filteredRefs.length === 1) return filteredRefs[0];
	return el => {
		filteredRefs.forEach(ref => {
			if (typeof ref === 'function') {
				ref(el);
			} else {
				ref.current = el;
			}
		});
	};
};

export default React.forwardRef(
	(
		{
			children: text,
			ms = 300,
			size = [1, 1],
			classPrefix = 'cycle-text',
			className = '',
			OuterElement = 'div',
			...rest
		},
		passedRef
	) => {
		const [xSize, ySize] = size;
		const n = xSize * ySize;
		const [index, setIndex] = useState(0);
		const [ref, inView] = useViewport();
		useInterval(() => setIndex(index + 1), inView ? ms : null);

		if (n === 1)
			return (
				<OuterElement
					ref={mergeRefs(passedRef, ref)}
					className={`${className} ${classPrefix}-item`}
					{...rest}
				>
					{text[index % text.length]}
				</OuterElement>
			);

		return (
			<TextGrid
				size={size}
				classPrefix={classPrefix}
				className={className}
				ref={mergeRefs(passedRef, ref)}
				OuterElement={OuterElement}
				{...rest}
			>
				{Array.from(
					{length: n},
					(_, i) =>
						text[
							Math.floor(index / Math.pow(text.length, i)) %
								text.length
						]
				).join('')}
			</TextGrid>
		);
	}
);
