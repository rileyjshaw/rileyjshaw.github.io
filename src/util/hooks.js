import {useState, useEffect, useRef} from 'react';

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
		if (el) {
			el.addEventListener('mousemove', handleMouseMove, false);
			return () => el.removeEventListener('mousemove', handleMouseMove);
		}
	}, [el]);
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

// setInterval with auto drift-correction and dynamic callback / timing props.
export function useInterval(cb, ms, oneShot) {
	const callback = useRef();
	useEffect(() => (callback.current = cb), [cb]);
	useEffect(() => {
		if (typeof ms === 'number') {
			function tick(lastNow) {
				let now = performance.now();
				let drift = ms + lastNow - now;
				now += drift;
				if (!oneShot)
					interval = setTimeout(tick, Math.max(0, drift + ms), now);
				callback.current();
			}
			let interval = setTimeout(tick, ms, performance.now());
			return () => clearInterval(interval);
		}
	}, [ms]);
}

// Checks whether an element is visible. `rootMargin` determines how much of
// the element needs to be on screen before it's considered visible.
export function useOnScreen(ref, rootMargin = '0px') {
	const [isIntersecting, setIntersecting] = useState(false);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIntersecting(entry.isIntersecting);
			},
			{rootMargin}
		);
		if (ref.current) {
			observer.observe(ref.current);
		}
		return () => {
			observer.unobserve(ref.current);
		};
	}, []);
	return isIntersecting;
}
