import React, {useState} from 'react';

export default ({pointsPerSide, colors}) => {
	const height = pointsPerSide - 2;
	const [[left, right], setPoints] = useState(() => {
		const leftVerticals = [0];
		const rightVerticals = [0];
		for (let i = 0, left = 0, right = 0; i < height; ++i) {
			leftVerticals.push((left += 1 + Math.random()));
			rightVerticals.push((right += 1 + Math.random()));
		}
		leftVerticals.push(height * 2);
		rightVerticals.push(height * 2);
		return [leftVerticals, rightVerticals];
	});

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 1 ${height * 1.5}`}
			className="triangle-bg"
			width="100%"
			height="100%"
			preserveAspectRatio="none"
		>
			{left.slice(0, -1).map((p1, i) => {
				const p2 = right[i];
				const p3 = right[i + 1];
				const p4 = left[i + 1];
				return (
					<polygon
						fill={colors[i % colors.length]}
						points={`0 ${p1}, 1 ${p2}, 1 ${p3}, 0 ${p4}`}
						key={i}
					/>
				);
			})}
		</svg>
	);
};
