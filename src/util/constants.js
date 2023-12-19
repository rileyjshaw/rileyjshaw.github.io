import {cssColorProperty} from './_util';

/**
 * Color object naming, explained:
 *
 * “DIRECT_”: Talks about the actual color, like “cyan” or “red”.
 *    vs
 * “ABSTRACT_”: Talks about the intended use, like “fg”, “p1”, or “link”.
 *
 * “_COLORS”: The raw RGB values, like [0, 255, 255] or [255, 0, 0].
 *    vs
 * “_COLOR_PROPERTIES”: The CSS property reference, like “var(--color-cyan)” or “--color-fg-bold”.
 **/
export const DIRECT_COLORS = {
	light: {
		red: {
			main: [245, 61, 62],
		},
		yellow: {
			main: [249, 215, 62],
		},
		green: {
			main: [44, 203, 62],
		},
		cyan: {
			main: [44, 203, 221],
		},
		blue: {
			main: [44, 61, 153],
		},
		magenta: {
			main: [245, 61, 153],
		},
		black: {
			main: [44, 61, 62],
		},
		white: {
			main: [250, 249, 247],
			mute: [238, 238, 238],
			bold: [255, 255, 255],
		},
	},
	dark: {
		red: {
			main: [204, 54, 40],
		},
		yellow: {
			main: [204, 195, 40],
		},
		green: {
			main: [45, 195, 34],
		},
		cyan: {
			main: [45, 195, 194],
		},
		blue: {
			main: [0, 103, 194],
		},
		magenta: {
			main: [204, 103, 194],
		},
		white: {
			main: [204, 195, 194],
			mute: [170, 168, 166],
			bold: [255, 255, 255],
		},
		black: {
			main: [10, 11, 8],
			mute: [17, 17, 17],
			bold: [0, 0, 0],
		},
	},
};

const DIRECT_COLOR_PROPERTIES = Object.entries(DIRECT_COLORS).reduce(
	(themeAcc, [themeName, colors]) => {
		themeAcc[themeName] = Object.entries(colors).reduce(
			(colorAcc, [colorName, variants]) => {
				colorAcc[colorName] = Object.keys(variants).reduce(
					(colorAcc, variant) => {
						colorAcc[variant] = cssColorProperty(
							colorName,
							variant,
							true,
						);
						return colorAcc;
					},
					{},
				);
				colorAcc[colorName].rgb =
					DIRECT_COLORS[themeName][colorName].main.join();
				return colorAcc;
			},
			{},
		);
		return themeAcc;
	},
	{},
);

const [ABSTRACT_COLORS, ABSTRACT_COLOR_PROPERTIES] = [
	DIRECT_COLORS,
	DIRECT_COLOR_PROPERTIES,
].map(colorObject => ({
	light: {
		// Page colors.
		fg: colorObject.light.black,
		bg: colorObject.light.white,
		// Primary colors.
		p1: colorObject.light.red,
		p2: colorObject.light.green,
		p3: colorObject.light.blue,
		// Secondary colors.
		s1: colorObject.light.cyan,
		s2: colorObject.light.magenta,
		s3: colorObject.light.yellow,
	},
	dark: {
		// Page colors.
		bg: colorObject.dark.black,
		fg: colorObject.dark.white,
		// Primary colors.
		p1: colorObject.dark.cyan,
		p2: colorObject.dark.magenta,
		p3: colorObject.dark.yellow,
		// Secondary colors.
		s1: colorObject.dark.red,
		s2: colorObject.dark.green,
		s3: colorObject.dark.blue,
	},
}));
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
