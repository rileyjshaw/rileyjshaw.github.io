/**
 * Color object naming, explained:
 *
 * “DIRECT_”: Talks about the actual color, like “red” or “grey”.
 *    vs
 * “ABSTRACT_”: Talks about the intended use, like “fg”, “p1”, or “link”.
 *
 * “_COLORS”: The raw RGB values, like [0, 255, 255] or [255, 0, 0].
 *    vs
 * “_COLOR_PROPERTIES”: The CSS property reference, like “var(--color-red-300)” or “--color-fg”.
 **/
export const DIRECT_COLORS = {
	red: {
		50: '#fff8f7',
		100: '#ffe9e5',
		200: '#ffc8c0',
		300: '#ffa499',
		400: '#fe7f71',
		500: '#fd473b',
		600: '#de1e18',
		700: '#b92019',
		800: '#931f17',
		900: '#6c1a12',
		950: '#310a08',
	},
	yellow: {
		50: '#fbfcdd',
		100: '#fbefa6',
		200: '#fdcf5c',
		300: '#fdaa1e',
		400: '#e89110',
		500: '#cb7700',
		600: '#aa5d06',
		700: '#904f0b',
		800: '#71410d',
		900: '#4f310e',
		950: '#229505',
	},
	green: {
		50: '#f1feed',
		100: '#c6fcad',
		200: '#82ee49',
		300: '#4dd633',
		400: '#1abf28',
		500: '#00a225',
		600: '#008331',
		700: '#026e38',
		800: '#035835',
		900: '#06412b',
		950: '#031c13',
	},
	blue: {
		50: '#effdff',
		100: '#c7f6ff',
		200: '#69e5ff',
		300: '#00ccfb',
		400: '#00aeff',
		500: '#008df7',
		600: '#0069f2',
		700: '#044eec',
		800: '#0e29e3',
		900: '#103184',
		950: '#051732',
	},
	grey: {
		0: '#fff',
		25: '#fcfcfd',
		50: '#f9fafc',
		100: '#edeef1',
		200: '#d2d5da',
		300: '#b7bbc3',
		400: '#a0a5b1',
		500: '#848b9c',
		600: '#6a7183',
		700: '#586070',
		800: '#464c5c',
		900: '#333843',
		925: '#1c2026',
		950: '#15181e',
		975: '#111319',
		1000: '#000',
	},
};

const themes = {
	light: {
		bg: ['grey', 50],
		'bg-bold': ['grey', 25],
		'bg-ultrabold': ['grey', 0],
		'bg-mute': ['grey', 500],
		'bg-ultramute': ['grey', 300],
		'bg-selected': ['yellow', 300],
		fg: ['grey', 950],
		'fg-bold': ['grey', 975],
		'fg-ultrabold': ['grey', 1000],
		'fg-mute': ['grey', 700],
		'fg-ultramute': ['grey', 400],
		'fg-selected': ['grey', 400],
		link: ['blue', 700],
		'accent-1': ['yellow', 300],
		'accent-2': ['yellow', 400],
	},
	dark: {
		bg: ['grey', 950],
		'bg-bold': ['grey', 975],
		'bg-ultrabold': ['grey', 1000],
		'bg-mute': ['grey', 700],
		'bg-ultramute': ['grey', 400],
		'bg-selected': ['yellow', 800],
		fg: ['grey', 200],
		'fg-bold': ['grey', 50],
		'fg-ultrabold': ['grey', 0],
		'fg-mute': ['grey', 400],
		'fg-ultramute': ['grey', 500],
		'fg-selected': ['grey', 500],
		link: ['blue', 200],
		'accent-1': ['yellow', 500],
		'accent-2': ['yellow', 600],
	},
};

const ABSTRACT_COLORS = {};
const ABSTRACT_COLOR_PROPERTIES = {};
Object.entries(themes).forEach(([themeName, theme]) => {
	const colors = (ABSTRACT_COLORS[themeName] = {});
	const properties = (ABSTRACT_COLOR_PROPERTIES[themeName] = {});
	Object.entries(theme).forEach(
		([abstractName, [colorName, colorVariant]]) => {
			colors[abstractName] = DIRECT_COLORS[colorName][colorVariant];
			properties[abstractName] =
				`var(--color-${colorName}-${colorVariant})`;
		},
	);
});

export {ABSTRACT_COLORS, ABSTRACT_COLOR_PROPERTIES};

export const isRenderingOnServer = typeof window === 'undefined';
export const isRenderingOnClient = !isRenderingOnServer;

// path, class, link name, title
export const SITE_PAGES = [
	['', 'index-page', 'Home', 'Riley J. Shaw'],
	['about', 'about-page', 'About', 'About'],
	['lab', 'lab-page', 'Lab', 'Lab'],
	['blog', 'blog-page', 'Blog', 'Blog'],
	['blog/post', 'blog-post-page', null, 'Blog'],
	['subscribe', 'subscribe-page', 'Subscribe', 'Subscribe'],
	['uses', 'uses-page', null, 'Inventory'],
];

const _storageKeyPrefix = 'RJS';
export const STORAGE_KEYS = Object.entries({
	theme: 'THEME',
	reducedMotion: 'REDUCED_MOTION',
	contrastPreference: 'CONTRAST_PREFERENCE',
	blockEmbeds: 'BLOCK_EMBEDS',
	nTimesClosedBlocker: 'N_TIMES_CLOSED_BLOCKER',
	labAscending: 'LAB_ASCENDING',
	labSortIdx: 'LAB_SORT_IDX',
	labTypeStates: 'LAB_TYPE_STATES',
	showHolidayBanner: 'SHOW_HOLIDAY_BANNER',
}).reduce((acc, [key, value]) => {
	acc[key] = `${_storageKeyPrefix}__${value}`;
	return acc;
}, {});
