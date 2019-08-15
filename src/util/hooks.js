import {useState, useEffect} from 'react';

export function useWindowSize(cb) {
	const initialSize =
		typeof window !== 'undefined'
			? [window.innerWidth, window.innerHeight]
			: [0, 0];
	const [size, setSize] = useState(initialSize);
	const debouncedSize = useDebounce(size, 300);

	useEffect(() => {
		const handleResize = () =>
			setSize([window.innerWidth, window.innerHeight]);
		window.addEventListener('resize', handleResize);
		cb && cb(size);
		return () => window.removeEventListener('resize', handleResize);
	}, debouncedSize);

	return debouncedSize;
}

export function useMousePosition(el) {
	const [mousePosition, setMousePosition] = useState([null, null]);
	// TODO(riley): Will this work for anything other than window?
	const handleMouseMove = e => setMousePosition([e.pageX, e.pageY]);
	useEffect(() => {
		el.addEventListener('mousemove', handleMouseMove, false);
		return () => el.removeEventListener('mousemove', handleMouseMove);
	}, []);
	return mousePosition;
}

export function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timeout);
	}, [value]);

	return debouncedValue;
}
