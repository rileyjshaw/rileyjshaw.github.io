import {ABSTRACT_COLORS} from './constants';

export function applyTheme(activeTheme) {
	document.documentElement.setAttribute('data-theme', activeTheme);
}

// Usage example: getThemeColor('light')('fg')();
export function getThemeColor(activeTheme) {
	const themeColors = ABSTRACT_COLORS[activeTheme];
	return (color, variant = 'main') => {
		const rgb = themeColors[color][variant];
		return (alpha = 1) =>
			alpha === 1 ? `rgb(${rgb})` : `rgba(${rgb.concat(alpha)})`;
	};
}

/**
 * Returns a debounced version of the passed function.
 *
 *   • = event
 *   x = trigger
 *
 *   With default arguments:
 *   • • • •      • • • •
 *           x            x
 *
 *   With triggerFirstCall = true, triggerLastCall = true:
 *   • • • •      • • • •
 *   x       x    x       x
 *
 *   With triggerFirstCall = true, triggerLastCall = false:
 *   • • • •      • • • •
 *   x            x
 */
export function debounce(
	fn,
	ms,
	{triggerFirstCall = false, triggerLastCall = true} = {},
) {
	let timeout = null;
	function _debounce() {
		if (triggerFirstCall && timeout == null) fn(...arguments);
		else clearTimeout(timeout);
		timeout = setTimeout(() => {
			if (triggerLastCall) fn(...arguments);
			timeout = null;
		}, ms);
	}
	// hehe…
	_debounce.clearTimeout = function _debounceClearTimeout() {
		clearTimeout(timeout);
		timeout = null;
	};
	return _debounce;
}

/**
 * Returns a throttled version of the passed function.
 *
 *   • = event
 *   x = trigger
 *
 *   With default arguments:
 *   • • • •      • • • •
 *   x   x   x    x   x   x
 *
 *   With triggerLastCall = false:
 *   • • • •      • • • •
 *   x   x        x   x
 */
export function throttle(fn, ms, {triggerLastCall = true} = {}) {
	const debouncedFn =
		triggerLastCall &&
		debounce(fn, ms, {triggerFirstCall: false, triggerLastCall: true});
	let last = -Infinity;
	return function _throttle() {
		const now = Date.now();
		if (now - last >= ms) {
			last = now;
			fn(...arguments);
			debouncedFn?.clearTimeout();
		} else {
			debouncedFn?.(...arguments);
		}
	};
}

// Returns a random bit array within a specified length range, with
// configurable bias towards 0 or 1.
export function randSequence(minLength, maxLength, bias = 0.5) {
	return Array.from(
		{
			length: Math.floor(
				Math.random() * (maxLength - minLength + 1) + minLength,
			),
		},
		() => Math.floor(Math.random() + bias),
	);
}
// Greatest common denominator of all time.
export function gcd(a, b) {
	if (a < b) [a, b] = [b, a];
	const t = a % b;
	return t ? gcd(b, t) : b;
}
// Lowest common multiple.
export function lcm(a, b) {
	if (!Math.min(a, b)) return Math.max(a, b);
	return (a / gcd(a, b)) * b;
}
