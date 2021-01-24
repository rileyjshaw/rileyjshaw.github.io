import {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {useInView as useInViewExternal} from 'react-intersection-observer';

export function useWindowSize(cb) {
	const initialSize =
		typeof window !== 'undefined'
			? [window.innerWidth, window.innerHeight]
			: [1000, 1000];
	const [size, setSize] = useState(initialSize);
	const debouncedSize = useDebounce(size, 300);
	useEffect(() => {
		const handleResize = () =>
			setSize([window.innerWidth, window.innerHeight]);
		window.addEventListener('resize', handleResize);
		cb && cb(size);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, debouncedSize);
	return debouncedSize;
}

export function useMousePosition(el) {
	const [mousePosition, setMousePosition] = useState([null, null]);
	// TODO(riley): Will this work for anything other than window?
	const handleMouseMove = e => setMousePosition([e.clientX, e.clientY]);
	useEffect(() => {
		if (el) {
			el.addEventListener('mousemove', handleMouseMove, false);
			return () => {
				el.removeEventListener('mousemove', handleMouseMove);
			};
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
				// TODO(riley): Add option to skip ticks if drift > ms.
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
// Usage: useDomMethod(domMethod: string)
// Eg: useDomMethod('getBoundingClientRect');
export function useDomMethod(domMethod) {
	const ref = useRef();
	const [result, setResult] = useState({});
	useLayoutEffect(() => {
		setResult(ref.current[domMethod]());
	}, [ref.current]);
	return [ref, result];
}

export function useKeyPress(targetKey, onDown, onUp) {
	const [keyPressed, setKeyPressed] = useState(false);

	function downHandler({key}) {
		if (key === targetKey && !keyPressed) {
			setKeyPressed(true);
			onDown?.();
		}
	}

	const upHandler = ({key}) => {
		if (key === targetKey && keyPressed) {
			setKeyPressed(false);
			onUp?.();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []);

	return keyPressed;
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
export function useIdle(delay, onIdle) {
	if (typeof window === 'undefined') return false;
	const [isIdle, setIdle] = useState(false);
	const [idleTimeout, setIdleTimeout] = useState(null);
	const resetIdleTimeout = () =>
		setIdleTimeout(idleTimeout => {
			window.clearTimeout(idleTimeout);
			return window.setTimeout(() => {
				setIdle(true);
				onIdle && onIdle();
			}, delay);
		});
	const handleInteraction = () => {
		setIdle(false);
		resetIdleTimeout();
	};
	useEffect(() => {
		interactionEventNames.forEach(name =>
			window.addEventListener(name, handleInteraction)
		);
		resetIdleTimeout();
		return () => {
			window.clearTimeout(idleTimeout);
			interactionEventNames.forEach(name =>
				window.removeEventListener(name, handleInteraction)
			);
		};
	}, [delay]);
	return isIdle;
}

export function useInView() {
	let [ref, inView, entry] = useInViewExternal(...arguments);
	inView = inView && true; // TODO(riley): Add check for active tab.
	return [ref, inView, entry];
}

export function useStickyState(defaultValue, key, scope = 'local') {
	const [value, setValue] = useState(() => {
		const stickyValue =
			typeof window === 'undefined'
				? null
				: window[`${scope}Storage`].getItem(key);
		return stickyValue === null ? defaultValue : JSON.parse(stickyValue);
	});
	useEffect(() => {
		window[`${scope}Storage`].setItem(key, JSON.stringify(value));
	}, [key, value]);
	return [value, setValue];
}
