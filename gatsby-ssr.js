import {
	DIRECT_COLORS,
	STORAGE_KEYS,
	ABSTRACT_COLOR_PROPERTIES,
} from './src/util/constants';
import {applyTheme} from './src/util/util';
import React from 'react';

export * from './wrap-root-elements';

const cssColorProperty = (color, variant) =>
	`--color-${color}${variant ? `-${variant}` : ''}`;

const directColorsString = Object.entries(DIRECT_COLORS)
	.flatMap(([colorName, colorVariants]) =>
		Object.entries(colorVariants).map(
			([variant, value]) =>
				`${cssColorProperty(colorName, variant)}: ${value};`,
		),
	)
	.join('\n\t');

const abstractColorsStrings = {};
Object.entries(ABSTRACT_COLOR_PROPERTIES).forEach(
	([themeName, themeColors]) => {
		abstractColorsStrings[themeName] = Object.entries(themeColors)
			.map(
				([abstractName, value]) =>
					`${cssColorProperty(abstractName)}: ${value};`,
			)
			.join('\n\t');
	},
);

const rawString_headCss = `
:root {
	color-scheme: light dark;
	${directColorsString}
	${abstractColorsStrings.light}
}
@media screen and (prefers-color-scheme: dark) {
	html:not([data-theme="light"]) {
		color-scheme: dark light;
		${abstractColorsStrings.dark}
	}
}
@media screen {
	html[data-theme="dark"] {
		color-scheme: dark light;
		${abstractColorsStrings.dark}
	}
}`;

export const onRenderBody = ({
	setHeadComponents,
	setHtmlAttributes,
	setPreBodyComponents,
	setPostBodyComponents,
}) => {
	// Set the language to English.
	setHtmlAttributes({lang: 'en'});

	setHeadComponents(
		// Adheres to media queries in case JavaScript isn’t enabled.
		<style
			key="color-custom-properties"
			dangerouslySetInnerHTML={{
				__html: rawString_headCss,
			}}
		/>,
	);

	setPreBodyComponents(
		<script
			key="set-initial-theme"
			dangerouslySetInnerHTML={{
				__html: rawString_manageInitialTheme,
			}}
		/>,
	);

	setPostBodyComponents(
		<script
			key="love"
			dangerouslySetInnerHTML={{
				__html: rawString_loveYou,
			}}
		/>,
	);
};

const rawString_manageInitialTheme = `(function() {
	var stored = JSON.parse(
		window.localStorage.getItem('${STORAGE_KEYS.theme}')
	);
	if (stored && stored.value !== 'system') {
		(${applyTheme})(stored.value);
	}
})()`;

const rawString_loveYou = `console.log(\`
'▀█║────────────▄▄───────────​─▄──▄_
──█║───────▄─▄─█▄▄█║──────▄▄──​█║─█║
──█║───▄▄──█║█║█║─▄║▄──▄║█║─█║​█║▄█║
──█║──█║─█║█║█║─▀▀──█║─█║█║─█║​─▀─▀
──█║▄║█║─█║─▀───────█║▄█║─▀▀
──▀▀▀──▀▀────────────▀─█║
───────▄▄─▄▄▀▀▄▀▀▄──▀▄▄▀
──────███████───▄▀
──────▀█████▀▀▄▀
────────▀█▀\`);`;
