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
}) => {
	const [xSize, ySize] = size;
	const n = xSize * ySize;
	const [index, setIndex] = useState(0);
	const [ref, inView] = useInView({threshold: 0});
	useInterval(() => setIndex(index + 1), inView ? ms : null);

	if (n === 1)
		return (
			<span ref={ref} className={`${classPrefix}-item`}>
				{text[index % text.length]}
			</span>
		);

	return (
		<TextGrid size={size} classPrefix={classPrefix} ref={ref}>
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
