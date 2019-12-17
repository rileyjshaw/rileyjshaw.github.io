export function shuffle(nodes) {
	const shuffled = [...nodes];
	for (let i = shuffled.length - 1; i > 0; --i) {
		let j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function sortByCoolness(nodes) {
	return [...nodes].sort(({coolness: a = -1}, {coolness: b = -1}) => b - a);
}

export function sortByDate(nodes) {
	return [...nodes].sort((a, b) => b.date.localeCompare(a.date));
}

export function sortByName(nodes) {
	return [...nodes].sort((a, b) => a.title.localeCompare(b.title));
}

export default [
	{
		title: 'date',
		sortFn: sortByDate,
	},
	{
		title: 'name',
		sortFn: sortByName,
	},
	{
		title: 'coolness',
		sortFn: sortByCoolness,
	},
];
