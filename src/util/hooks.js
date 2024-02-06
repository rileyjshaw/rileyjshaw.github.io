import {useCallback, useEffect, useRef, useState} from 'react';

import {throttle} from './util';

// setInterval with auto drift-correction and dynamic callback / timing props.
export function useInterval(
	cb,
	ms,
	{skipFrames = true, oneShot = false, immediate = true} = {},
) {
	const savedCallback = useRef();
	useEffect(() => {
		savedCallback.current = cb;
	}, [cb]);

	useEffect(() => {
		if (typeof ms !== 'number' || ms < 0) return;

		function tick(lastNow) {
			if (!oneShot) {
				// Mimic setInterval by re-calling setTimeout within the callback.
				let now = performance.now();
				let drift = ms + lastNow - now; // -ve if behind schedule.
				let delay = ms + drift;

				// Handle the case where another tick should have already triggered.
				// If `skipFrames` is true, it forgets all the missed frames, and
				// schedules a new frame in the future. If false, it sets `delay`
				// to 0 over and over again until it catches up.
				if (delay < 0) {
					if (skipFrames) {
						delay = (delay % ms) + ms;
						drift = delay - ms;
					} else delay = 0;
				}

				// Update `now` to when it should have happened.
				now += drift;
				timeoutId = setTimeout(tick, delay, now);
			}

			// Finally, run the callback.
			savedCallback.current();
		}
		let timeoutId = setTimeout(tick, ms, performance.now());

		return () => clearTimeout(timeoutId);
	}, [ms, skipFrames, oneShot]);

	useEffect(() => {
		if (immediate) cb();
	}, []);
}

export function useRect({resize = false} = {}) {
	const [rect, setRect] = useState(null);
	const cleanupFn = useRef();

	const callbackRef = useCallback(
		el => {
			cleanupFn.current?.();

			if (!el) {
				setRect(null);
				return;
			}

			function updateRect() {
				setRect(el.getBoundingClientRect());
			}
			updateRect();

			if (!resize) return;

			const resizeHandler = throttle(updateRect, 250);
			if (typeof ResizeObserver === 'function') {
				const resizeObserver = new ResizeObserver(resizeHandler);
				resizeObserver.observe(el);
				cleanupFn.current = () => resizeObserver.disconnect();
			} else {
				window.addEventListener('resize', resizeHandler);
				cleanupFn.current = () =>
					window.removeEventListener('resize', resizeHandler);
			}
		},
		[resize],
	);

	return [callbackRef, rect];
}

// `keyHandlers` example: {Escape: {onDown: () => setOpen(false)}}.
export function useKeyPresses(keyHandlers) {
	const [keysPressed, setKeysPressed] = useState({});

	useEffect(() => {
		function downHandler({key}) {
			const handlers = keyHandlers[key];
			if (handlers && !keysPressed[key]) {
				setKeysPressed(oldKeysPressed => ({
					...oldKeysPressed,
					[key]: true,
				}));
				handlers.onDown?.();
			}
		}

		function upHandler({key}) {
			const handlers = keyHandlers[key];
			if (handlers && keysPressed[key]) {
				setKeysPressed(oldKeysPressed => ({
					...oldKeysPressed,
					[key]: false,
				}));
				handlers.onUp?.();
			}
		}

		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []);

	return keysPressed;
}

// TODO(riley): Add check for active tab.
export const useViewport = (() => {
	if (typeof window === 'undefined')
		return ({initialInView = false} = {}) => {
			return [null, initialInView];
		};

	const entryCallbacks = new Map();
	const scrollingEntries = new Set();
	const intersectionObserver = new IntersectionObserver(entries => {
		entries.forEach(({target, isIntersecting}) =>
			entryCallbacks.get(target)?.(isIntersecting),
		);
	});

	return function useViewport({
		updateOnScroll,
		initialInView = false,
		ms = 33,
	} = {}) {
		const [inView, setInView] = useState(initialInView);
		const [measurements, setMeasurements] = useState([]);
		// We’re using useCallback here instead of useEffect, since it works
		// better with changing `ref` values. But… it’s less convenient at
		// cleaning up its side-effects.
		const nodeRef = useRef(null);

		const ref = useCallback(node => {
			const prevNode = nodeRef.current;
			nodeRef.current = node;
			if (prevNode) {
				entryCallbacks.delete(prevNode);
				scrollingEntries.delete(prevNode);
				intersectionObserver.unobserve(prevNode);
				// TODO(riley): What was this supposed to do?
				// if (!scrollingEntries.size)
				// 	window.removeEventListener('scroll', handleScroll);
				if (!entryCallbacks.size) intersectionObserver.disconnect();
			}
			setInView(initialInView);
			if (node === null) return;

			const handleScroll = throttle(function handleScroll() {
				setMeasurements([
					node.getBoundingClientRect(),
					window.innerHeight,
					window.innerWidth,
				]);
			}, ms);
			handleScroll();

			if (!entryCallbacks.size) {
				intersectionObserver.observe;
			}
			entryCallbacks.set(node, inView => {
				setInView(inView);
				if (inView && updateOnScroll) {
					if (!scrollingEntries.size) {
						window.addEventListener('scroll', handleScroll, {
							passive: true,
						});
					}
					scrollingEntries.add(node);
				} else {
					scrollingEntries.delete(node);
					if (!scrollingEntries.size) {
						window.removeEventListener('scroll', handleScroll);
					}
				}
			});

			intersectionObserver.observe(node);
		}, []);

		return [ref, inView, ...measurements];
	};
})();

// Note: returns `null` or `serverState` for SSR’d components.
export function useStickyState(
	defaultValue,
	key,
	{scope = 'local', version = 'default', serverState = null} = {},
) {
	const [{initialized, value}, setValue] = useState({
		initialized: false,
		value: serverState,
	});

	// Basically setValue, but adds `initialized: true` for the client.
	const setInitializedValue = useCallback(newValue =>
		setValue(({value: oldValue}) => ({
			initialized: true,
			value:
				typeof newValue === 'function' ? newValue(oldValue) : newValue,
		})),
	);

	// On the client, check if there’s a preexisting value and apply that.
	// Otherwise, apply the default value.
	useEffect(() => {
		const stickyValue = JSON.parse(window[`${scope}Storage`].getItem(key));
		if (
			stickyValue &&
			stickyValue.hasOwnProperty?.('value') &&
			stickyValue.version === version
		) {
			setInitializedValue(stickyValue.value);
		} else {
			const evaluatedDefault =
				typeof defaultValue === 'function'
					? defaultValue()
					: defaultValue;
			setInitializedValue(evaluatedDefault);
		}
	}, []);

	// Keep (local|session)Storage in sync on the client.
	useEffect(() => {
		if (initialized) {
			window[`${scope}Storage`].setItem(
				key,
				JSON.stringify({value, version}),
			);
		}
	}, [initialized, key, value, version]);

	// If the value changes in a different tab, update it in this tab.
	useEffect(() => {
		function updateValue(e) {
			const newValue = JSON.parse(e.newValue);
			if (e.key === key && newValue.version === version) {
				setInitializedValue(newValue.value);
			}
		}
		window.addEventListener('storage', updateValue);
		return () => window.removeEventListener('storage', updateValue);
	}, [key, version]);
	return [value, setInitializedValue];
}

export function useTypedText(text, {delay = 6} = {}) {
	const [displayedText, setDisplayedText] = useState('');
	useEffect(() => {
		let timeout;
		if (text !== displayedText) {
			const nextDisplayedText = text.startsWith(displayedText)
				? text.slice(0, displayedText.length + 1)
				: displayedText.slice(0, -1);
			timeout = setTimeout(
				() => setDisplayedText(nextDisplayedText),
				delay,
			);
		}
		return () => clearTimeout(timeout);
	}, [displayedText, text]);
	return displayedText;
}
