import React from 'react';

import {MDXProvider} from '@mdx-js/react';
import {Prism} from 'prism-react-renderer';
import bashLang from 'refractor/bash';
import lispLang from 'refractor/lisp';
import pythonLang from 'refractor/python';

import AutoLink from './src/components/AutoLink';
import CodeBlock from './src/components/CodeBlock';
import DialogProvider from './src/components/DialogProvider';
import Layout from './src/components/Layout';
import SettingsProvider from './src/components/SettingsProvider';

bashLang(Prism);
lispLang(Prism);
pythonLang(Prism);

const mdxComponents = {
	a: AutoLink,
	code: CodeBlock,
};

export const wrapRootElement = ({element}) => (
	<DialogProvider>
		<SettingsProvider>
			<MDXProvider components={mdxComponents}>{element}</MDXProvider>
		</SettingsProvider>
	</DialogProvider>
);

export const wrapPageElement = ({props, element}) => (
	<Layout {...props}>{element}</Layout>
);
