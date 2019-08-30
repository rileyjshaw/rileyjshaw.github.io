import {useState, useEffect, useRef, useLayoutEffect} from 'react';

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
	const savedCallback = useRef();
	useEffect(() => {
		savedCallback.current = cb;
	}, [cb]);
	useEffect(() => {
		if (typeof ms === 'number') {
			function tick(lastNow) {
				let now = performance.now();
				const drift = ms + lastNow - now;
				now += drift;
				if (!oneShot)
					timeoutId = setTimeout(tick, Math.max(0, ms + drift), now);
				savedCallback.current();
			}
			let timeoutId = setTimeout(tick, ms, performance.now());
			// TODO(riley): Is this going to try to clear the first timeoutId?
			return () => clearTimeout(timeoutId);
		}
	}, [ms]);
}

// TODO(riley): Improve this then replace all useDimensions() calls.
export function useBB() {
	const ref = useRef();
	const [bb, setBB] = useState({});
	useLayoutEffect(() => {
		setBB(ref.current.getBoundingClientRect());
	}, [ref.current]);
	return [ref, bb];
}

const interactionEventNames = [
	'mousemove',
	'keydown',
	'wheel',
	'DOMMouseScroll',
	'mouseWheel',
	'mousedown',
	'touchstart',
	'touchmove',
	'MSPointerDown',
	'MSPointerMove',
];
export function useIdle(delay) {
	if (typeof window === 'undefined') return false;
	const [isIdle, setIdle] = useState(false);
	const [idleTimeout, setIdleTimeout] = useState(null);
	const handleInteraction = () => {
		setIdle(false);
		setIdleTimeout(idleTimeout => {
			window.clearTimeout(idleTimeout);
			return window.setTimeout(() => setIdle(true), delay);
		});
	};
	useEffect(() => {
		interactionEventNames.forEach(name =>
			window.addEventListener(name, handleInteraction)
		);
		return () => {
			window.clearTimeout(idleTimeout);
			interactionEventNames.forEach(name =>
				window.removeEventListener(name, handleInteraction)
			);
		};
	}, []);
	return isIdle;
}
