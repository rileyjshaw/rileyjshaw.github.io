import {cssColorProperty} from './_util';
import {
	ABSTRACT_COLORS,
	ABSTRACT_COLOR_PROPERTIES,
	DIRECT_COLORS,
} from './constants';

export function applyTheme(activeTheme) {
	const root = document.documentElement;
	[DIRECT_COLORS, ABSTRACT_COLOR_PROPERTIES]
		.map(themes => themes[activeTheme])
		.forEach((theme, i) => {
			Object.entries(theme).forEach(([color, _o]) => {
				Object.entries(_o).forEach(([variant, value]) => {
					root.style.setProperty(
						cssColorProperty(color, variant),
						i ? value : `rgb(${value})`
					);
				});
			});
		});
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

export function debounce(fn, ms) {
	let timeout;
	return function _debounce() {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...arguments), ms);
	};
}
export function throttle(fn, ms) {
	let last = -Infinity;
	return function _throttle() {
		const now = Date.now();
		if (now - last > ms) {
			last = now;
			fn(...arguments);
		}
	};
}

// Returns a random bit array within a specified length range, with
// configurable bias towards 0 or 1.
export function randSequence(minLength, maxLength, bias = 0.5) {
	return Array.from(
		{
			length: Math.floor(
				Math.random() * (maxLength - minLength + 1) + minLength
			),
		},
		() => Math.floor(Math.random() + bias)
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
