import {isRenderingOnClient} from '../util/constants';
import {useMousePosition, useWindowSize} from '../util/hooks';
import {useEffect} from 'react';

const MAX_SPREAD_PX = 6;
export default () => {
	const mousePosition = useMousePosition(isRenderingOnClient && window);
	const [windowWidth, windowHeight, windowHypot] = useWindowSize();

	const windowCenter = [windowWidth / 2, windowHeight / 2, windowHypot / 2];
	const angle = Math.atan2(
		mousePosition[1] - windowCenter[1],
		mousePosition[0] - windowCenter[0],
	);
	const magnitude =
		(Math.hypot(
			mousePosition[0] - windowCenter[0],
			mousePosition[1] - windowCenter[1],
		) /
			windowCenter[2]) *
		MAX_SPREAD_PX;

	useEffect(() => {
		const root = document?.documentElement;
		if (!root) return;
		root.style.setProperty(
			'--header-x-offset-s1',
			`${magnitude * Math.cos(angle)}px`,
		);
		root.style.setProperty(
			'--header-y-offset-s1',
			`${magnitude * Math.sin(angle)}px`,
		);
		root.style.setProperty(
			'--header-x-offset-s2',
			`${magnitude * Math.cos(angle + (Math.PI * 2) / 3)}px`,
		);
		root.style.setProperty(
			'--header-y-offset-s2',
			`${magnitude * Math.sin(angle + (Math.PI * 2) / 3)}px`,
		);
		root.style.setProperty(
			'--header-x-offset-s3',
			`${magnitude * Math.cos(angle - (Math.PI * 2) / 3)}px`,
		);
		root.style.setProperty(
			'--header-y-offset-s3',
			`${magnitude * Math.sin(angle - (Math.PI * 2) / 3)}px`,
		);
	}, [angle, magnitude]);

	return null;
};
