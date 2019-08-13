function sortByCoolness(nodes) {
	return [...nodes].sort((a, b) => b.coolness - a.coolness);
}

function sortByDate(nodes) {
	return [...nodes].sort((a, b) => a.date.localeCompare(b.date));
}

function sortByName(nodes) {
	return [...nodes].sort((a, b) => b.title.localeCompare(a.title));
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
