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

// HAAAACK!
const _webpackImportString = importName =>
	`_\\w+__WEBPACK_IMPORTED_MODULE_[0-9]+__\\["${importName}"\\]`;

const execString_manageInitialTheme = `(function() {
	var stored = JSON.parse(
		window.localStorage.getItem('${STORAGE_KEYS.theme}')
	);
	var theme;
	if (!stored || stored.value === 'system') {
		theme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	} else theme = stored.value;
	(${applyTheme})(theme);
})()`
	.replace(
		new RegExp(_webpackImportString('DIRECT_COLORS')),
		JSON.stringify(DIRECT_COLORS)
	)
	.replace(
		new RegExp(_webpackImportString('ABSTRACT_COLOR_PROPERTIES')),
		JSON.stringify(ABSTRACT_COLOR_PROPERTIES)
	)
	.replace(
		new RegExp(_webpackImportString('cssColorProperty')),
		`(${cssColorProperty})`
	);

const colorObjectToCss = (colorObject, rgbWrap) =>
	Object.entries(colorObject)
		.flatMap(([name, _o]) =>
			Object.entries(_o).map(
				([variant, value]) =>
					`${cssColorProperty(name, variant)}: ${
						rgbWrap ? `rgb(${value})` : value
					};`
			)
		)
		.join('\n');

export const onRenderBody = ({
	setHeadComponents,
	setPreBodyComponents,
}) => {
	setHeadComponents(
		// Set some default themes in case JavaScript isn’t enabled.
		<style key="color-custom-properties">{`
:root {
${colorObjectToCss(DIRECT_COLORS.light, true)}
${colorObjectToCss(ABSTRACT_COLOR_PROPERTIES.light)}
}
@media (prefers-color-scheme: dark) {
:root{
${colorObjectToCss(DIRECT_COLORS.dark, true)}
${colorObjectToCss(ABSTRACT_COLOR_PROPERTIES.dark)}
}
}`}</style>
	);

	setPreBodyComponents(
		<script
			key="set-initial-theme"
			dangerouslySetInnerHTML={{
				__html: execString_manageInitialTheme,
			}}
		/>
	);
};
