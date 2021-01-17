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
