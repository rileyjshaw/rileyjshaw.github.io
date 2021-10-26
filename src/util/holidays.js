// Note: the first entry in `date` (month) is 0-indexed. The second (day) is 1-indexed.
const holidays = [
	{
		name: 'Deletion Day',
		date: [3, 4],
		link: 'https://deletionday.com',
	},
	{
		name: 'Riley’s birthday',
		date: [9, 5],
	},
	{
		name: 'Halloween',
		date: [9, 31],
		style: {
			color: 'var(--color-yellow)',
			backgroundColor: 'var(--color-red)',
			fontWeight: 'bold',
		},
	},
];

export function getNextHoliday() {
	const today = new Date();
	const currentYear = today.getFullYear();
	return holidays
		.map(holiday => {
			const [month, day] = holiday.date;

			// Add a day in case the holiday is today; we want to ensure it
			// still looks like it’s in the future.
			let msUntil = new Date(currentYear, month, day + 1) - today;
			if (msUntil < 0) {
				msUntil = new Date(currentYear + 1, month, day + 1) - today;
			}

			return {
				...holiday,
				daysUntil: Math.floor(msUntil / 86400000),
			};
		})
		.reduce((closest, current) =>
			current.daysUntil < closest.daysUntil ? current : closest
		);
}
