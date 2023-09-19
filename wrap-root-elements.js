import AutoLink from './src/components/AutoLink';
import CodeBlock from './src/components/CodeBlock';
import Layout from './src/components/Layout';
import {Prism} from 'prism-react-renderer';
import React from 'react';
import bashLang from 'refractor/lang/bash';
import lispLang from 'refractor/lang/lisp';
import pythonLang from 'refractor/lang/python';
import SettingsProvider from './src/components/SettingsProvider';
import {MDXProvider} from '@mdx-js/react';

bashLang(Prism);
lispLang(Prism);
pythonLang(Prism);

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
