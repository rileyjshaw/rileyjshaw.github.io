import React, {useState} from 'react';
import {useInView} from 'react-intersection-observer';

import {useInterval} from '../util/hooks';

import TextGrid from './text-grid';

/* Fun strings:
▁▂▃▅▆▇▇▆▅▃▂▁
➬➱➯➫–
◯⦿◉◎
○⊙⊚⦾⊛◌ ◌
▙▛▜▟
*/

export default ({
	children: text,
	ms = 300,
	size = [1, 1],
	classPrefix = 'cycle-text',
	className = '',
	OuterElement = 'div',
	...rest
}) => {
	const [xSize, ySize] = size;
	const n = xSize * ySize;
	const [index, setIndex] = useState(0);
	const [ref, inView] = useInView({threshold: 0});
	useInterval(() => setIndex(index + 1), inView ? ms : null);

	if (n === 1)
		return (
			<OuterElement
				ref={ref}
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
			ref={ref}
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
};
