import AutoLink from './src/components/AutoLink';
import Layout from './src/components/Layout';
import SettingsProvider from './src/components/SettingsProvider';
import './src/global.css';
import {MDXProvider} from '@mdx-js/react';
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';

const mdxComponents = {
	a: AutoLink,
};

export const wrapRootElement = ({element}) => (
	<SettingsProvider>
		<MDXProvider components={mdxComponents}>{element}</MDXProvider>
	</SettingsProvider>
);

export const wrapPageElement = ({props, element}) => (
	<Layout {...props}>{element}</Layout>
);
