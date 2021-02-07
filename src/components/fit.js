import {useWindowSize} from '../util/hooks';
import './fit.css';
import React, {useState, useEffect, useRef} from 'react';

export default ({children, className = ''}) => {
	const [windowWidth] = useWindowSize();
	const [size, setSize] = useState([0, 0]);
	const [yAccumulator, setYAccumulator] = useState(0);
	const textEl = useRef(null);

	useEffect(() => {
		const {current: el} = textEl;
		if (!el) return;

		const {width, height, y} = el.getBBox();
		const newSize = [width, height];
		setYAccumulator(yAccumulator - y);
		if (newSize.some((d, i) => size[d] !== i)) {
			setSize(newSize);
		}
	}, [children, windowWidth]);

	return (
		<svg
			viewBox={`0 0 ${size.join(' ')}`}
			className={`${className} fit-svg`}
		>
			<text ref={textEl} x="50%" y={yAccumulator} className="fit-text">
				{children}
			</text>
		</svg>
	);
};
