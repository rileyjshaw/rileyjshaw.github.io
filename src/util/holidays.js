function getAmericanThanksgivingDate(year) {
	const lastDayOfNovember = new Date(year, 10, 30).getDay();
	return lastDayOfNovember === 6 ? 28 : 27 - lastDayOfNovember;
}

// Note: the first entry in `date` (month) is 0-indexed. The second (day) is 1-indexed.
// An optional third entry limits the date to a particular year.
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
	...[
		[9, 2, 2026],
		[10, 6, 2026],
		[11, 4, 2026],
	].map(date => ({
		name: 'Bandcamp Friday',
		date,
		style: {backgroundColor: '#9cdae9', color: '#222'},
		link: 'https://meathouse.bandcamp.com/album/ep',
		linkText: 'Check out my band’s EP!',
	})),
	{
		name: 'Halloween',
		date: [9, 31],
		style: {
			color: 'var(--color-yellow-200)',
			backgroundColor: 'var(--color-red-800)',
		},
	},
	{
		name: 'Black Friday',
		date: year => {
			return [10, getAmericanThanksgivingDate(year) + 1];
		},
		style: {
			color: 'var(--color-grey-950)',
			backgroundColor: 'var(--color-yellow-300)',
		},
		link: 'https://www.monbiot.com/2012/12/10/the-gift-of-death/',
	},
	{
		name: 'Cyber Monday',
		date: year => {
			return [10, getAmericanThanksgivingDate(year) + 4];
		},
		style: {
			color: 'var(--color-grey-950)',
			backgroundColor: 'var(--color-yellow-300)',
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
			let [month, day, year] =
				typeof holiday.date === 'function'
					? holiday.date(currentYear)
					: holiday.date;

			// Add a day in case the holiday is today; we want to ensure it
			// still looks like it’s in the future.
			let msUntil =
				new Date(year ?? currentYear, month, day + 1) - today;
			if (msUntil < 0 && year == null) {
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
		.filter(holiday => holiday.daysUntil >= 0)
		.reduce((closest, current) =>
			current.daysUntil < closest.daysUntil ? current : closest,
		);
}
