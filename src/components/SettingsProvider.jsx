import React, {createContext, useEffect} from 'react';

import {useMedia} from 'react-use';

import {STORAGE_KEYS} from '../util/constants';
import {useStickyState} from '../util/hooks';
import {applyTheme} from '../util/util';
import ClientOnly from './ClientOnly';

export const SettingsContext = createContext();

const SettingsProvider = ({children}) => {
	const [themeKey, setThemeKey] = useStickyState(
		'system',
		STORAGE_KEYS.theme,
	);
	const systemTheme = useMedia('(prefers-color-scheme: dark)')
		? 'dark'
		: 'light';
	const theme = themeKey === 'system' ? systemTheme : themeKey;

	// TODO: Add user controls for reducedMotion, contrastPreference, blockEmbeds.
	const [reducedMotionKey, setReducedMotionKey] = useStickyState(
		'system',
		STORAGE_KEYS.reducedMotion,
	);
	const systemReducedMotion = useMedia('(prefers-reduced-motion: reduce)');
	const reducedMotion =
		reducedMotionKey === 'system' ? systemReducedMotion : reducedMotionKey;

	const [contrastPreferenceKey, setContrastPreferenceKey] = useStickyState(
		'system',
		STORAGE_KEYS.contrastPreference,
	);
	const systemHighContrastPreference =
		useMedia('(prefers-contrast: more)') && 'more';
	const systemLowContrastPreference =
		useMedia('(prefers-contrast: less)') && 'less';
	const systemContrastPreference =
		systemHighContrastPreference ||
		systemLowContrastPreference ||
		'default';
	const contrastPreference =
		contrastPreferenceKey === 'system'
			? systemContrastPreference
			: contrastPreferenceKey;

	const [blockEmbeds, setBlockEmbeds] = useStickyState(
		true,
		STORAGE_KEYS.blockEmbeds,
	);

	useEffect(() => {
		theme && applyTheme(theme);
	}, [themeKey, theme]);

	return (
		<SettingsContext.Provider
			value={{
				themeKey,
				setThemeKey,
				theme, // [light* | dark]
				/* ~~~ */
				reducedMotionKey,
				setReducedMotionKey,
				reducedMotion, // [false* | true]
				/* ~~~ */
				contrastPreferenceKey,
				setContrastPreferenceKey,
				contrastPreference, // [default* | more | less ]
				/* ~~~ */
				setBlockEmbeds,
				blockEmbeds, // [true* | false]
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const withSettings = WrappedComponent =>
	React.forwardRef((props, ref) => (
		<SettingsContext.Consumer>
			{settings => (
				<ClientOnly>
					<WrappedComponent
						{...props}
						settings={settings}
						ref={ref}
					/>
				</ClientOnly>
			)}
		</SettingsContext.Consumer>
	));

export default SettingsProvider;
