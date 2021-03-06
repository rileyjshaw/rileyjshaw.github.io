import Layout from './src/components/layout';
import SettingsProvider from './src/components/settings-provider';
import './src/global.css';
import './src/rjset.css';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';

export const wrapRootElement = ({element}) => (
	<SettingsProvider>{element}</SettingsProvider>
);

export const wrapPageElement = ({props, element}) => (
	<Layout {...props}>{element}</Layout>
);
