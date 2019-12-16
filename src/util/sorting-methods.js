export function shuffle(nodes) {
	const shuffled = [...nodes];
	for (let i = shuffled.length - 1; i > 0; --i) {
		let j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

function sortByCoolness(nodes) {
	return [...nodes].sort(({coolness: a = -1}, {coolness: b = -1}) => b - a);
}

function sortByDate(nodes) {
	return [...nodes].sort((a, b) => b.date.localeCompare(a.date));
}

function sortByName(nodes) {
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
