import AutoLink from './src/components/AutoLink';
import CodeBlock from './src/components/CodeBlock';
import Layout from './src/components/Layout';
import SettingsProvider from './src/components/SettingsProvider';
import './src/global.css';
import {MDXProvider} from '@mdx-js/react';
import React from 'react';

const mdxComponents = {
	a: AutoLink,
	code: CodeBlock,
};

export const wrapRootElement = ({element}) => (
	<SettingsProvider>
		<MDXProvider components={mdxComponents}>{element}</MDXProvider>
	</SettingsProvider>
);

export const wrapPageElement = ({props, element}) => (
	<Layout {...props}>{element}</Layout>
);
