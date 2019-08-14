import React, {useState, useEffect} from 'react';

export function useWindowWidth(cb) {
	const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
	const [width, setWidth] = useState(initialWidth);
	const debouncedWidth = useDebounce(width, 300);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		cb && cb(width);
		return () => window.removeEventListener('resize', handleResize);
	}, [debouncedWidth]);

	return debouncedWidth;
}

export function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timeout);
	}, [value]);

	return debouncedValue;
}
