function getAmericanThanksgivingDate(year) {
	const lastDayOfNovember = new Date(year, 10, 30).getDay();
	return lastDayOfNovember === 6 ? 28 : 27 - lastDayOfNovember;
}

// Note: the first entry in `date` (month) is 0-indexed. The second (day) is 1-indexed.
const holidays = [
	{
		name: 'Deletion Day',
		date: [3, 4],
		link: 'https://deletionday.com',
	},
	{
		name: 'my birthday',
		date: [9, 5],
		specialMessages: ['It’s my birthday! 🎈'],
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
	{
		name: 'Black Friday',
		date: year => {
			return [10, getAmericanThanksgivingDate(year) + 1];
		},
		link: 'https://www.monbiot.com/2012/12/10/the-gift-of-death/',
	},
	{
		name: 'Cyber Monday',
		date: year => {
			return [10, getAmericanThanksgivingDate(year) + 4];
		},
		style: {
			color: 'var(--color-black)',
			backgroundColor: 'var(--color-yellow)',
		},
		link: 'https://www.monbiot.com/2012/12/10/the-gift-of-death/',
	},
];

export function getNextHoliday() {
	const today = new Date();
	const currentYear = today.getFullYear();
	const nextYear = currentYear + 1;
	return holidays
		.map(holiday => {
			let month, day;
			if (typeof holiday.date === 'function') {
				[month, day] = holiday.date(currentYear);
			} else {
				[month, day] = holiday.date;
			}

			// Add a day in case the holiday is today; we want to ensure it
			// still looks like it’s in the future.
			let msUntil = new Date(currentYear, month, day + 1) - today;
			if (msUntil < 0) {
				if (typeof holiday.date === 'function') {
					[month, day] = holiday.date(nextYear);
				}
				msUntil = new Date(nextYear, month, day + 1) - today;
			}

			return {
				...holiday,
				daysUntil: Math.floor(msUntil / 86400000),
			};
		})
		.reduce((closest, current) =>
			current.daysUntil < closest.daysUntil ? current : closest,
		);
}
