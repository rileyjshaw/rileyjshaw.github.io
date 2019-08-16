import React, {useState, useRef} from 'react';

import {useInterval, useOnScreen} from '../util/hooks';

import './cycle-text.css';

/* Fun strings:
▁▂▃▅▆▇▇▆▅▃▂▁
➬➱➯➫–
◯⦿◉◎
○⊙⊚⦾⊛◌ ◌
▙▛▜▟
*/

export default ({
	text,
	ms = 300,
	size: [xSize, ySize] = [1, 1],
	className = '',
	...rest
}) => {
	const ref = useRef(null);
	const n = xSize * ySize;
	const [index, setIndex] = useState(0);
	const onScreen = useOnScreen(ref);

	useInterval(() => setIndex(index + 1), onScreen ? ms : null);
	return n === 1 ? (
		<span ref={ref}>{text[index % text.length]}</span>
	) : (
		<div
			{...rest}
			className={`${className} cycle-text-grid`}
			style={{
				gridTemplate: `repeat(${ySize}, 1fr) / repeat(${xSize}, 1fr)`,
			}}
			ref={ref}
		>
			{Array.from({length: n}, (_, i) => (
				<span key={i}>
					{
						text[
							Math.floor(index / Math.pow(text.length, i)) %
								text.length
						]
					}
				</span>
			))}
		</div>
	);
};
