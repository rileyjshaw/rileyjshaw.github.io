import Layout from './src/components/layout';
import SettingsProvider from './src/components/settings-provider';
import {cssColorProperty} from './src/util/_util';
import {
	DIRECT_COLORS,
	STORAGE_KEYS,
	ABSTRACT_COLOR_PROPERTIES,
} from './src/util/constants';
import {applyTheme} from './src/util/util';
import React from 'react';

export const wrapRootElement = ({element}) => (
	<SettingsProvider>{element}</SettingsProvider>
);

export const wrapPageElement = ({props, element}) => (
	<Layout {...props}>{element}</Layout>
);

const execString_manageInitialTheme = `(function() {
	var stored = JSON.parse(
		window.localStorage.getItem('${STORAGE_KEYS.theme}')
	);
	if (stored && stored.value !== 'system') {
		(${applyTheme})(stored.value);
	}
})()`;

const colorObjectToCss = (colorObject, rgbWrap) =>
	Object.entries(colorObject)
		.flatMap(([name, _o]) =>
			Object.entries(_o).map(
				([variant, value]) =>
					`${cssColorProperty(name, variant)}: ${
						rgbWrap ? `rgb(${value})` : value
					};`,
			),
		)
		.join('\n\t');

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
				__html: `
:root {
	color-scheme: light dark;
	${colorObjectToCss(DIRECT_COLORS.light, true)}
	${colorObjectToCss(ABSTRACT_COLOR_PROPERTIES.light)}
}
html[data-theme="dark"] {
	color-scheme: dark light;
	${colorObjectToCss(DIRECT_COLORS.dark, true)}
	${colorObjectToCss(ABSTRACT_COLOR_PROPERTIES.dark)}
}
@media (prefers-color-scheme: dark) {
html:not([data-theme="light"]) {
	color-scheme: dark light;
	${colorObjectToCss(DIRECT_COLORS.dark, true)}
	${colorObjectToCss(ABSTRACT_COLOR_PROPERTIES.dark)}
}
}`,
			}}
		/>,
	);

	setPreBodyComponents(
		<script
			key="set-initial-theme"
			dangerouslySetInnerHTML={{
				__html: execString_manageInitialTheme,
			}}
		/>,
	);

	setPostBodyComponents(
		<script
			key="love"
			dangerouslySetInnerHTML={{
				__html: `console.log(\`${loveYou}\`)`,
			}}
		/>,
	);
};

const loveYou = `
'▀█║────────────▄▄───────────​─▄──▄_
──█║───────▄─▄─█▄▄█║──────▄▄──​█║─█║
──█║───▄▄──█║█║█║─▄║▄──▄║█║─█║​█║▄█║
──█║──█║─█║█║█║─▀▀──█║─█║█║─█║​─▀─▀
──█║▄║█║─█║─▀───────█║▄█║─▀▀
──▀▀▀──▀▀────────────▀─█║
───────▄▄─▄▄▀▀▄▀▀▄──▀▄▄▀
──────███████───▄▀
──────▀█████▀▀▄▀
────────▀█▀
`;
