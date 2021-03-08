import PageHeader from '../components/page-header';
import {STORAGE_KEYS} from '../util/constants';
import {useIdle, useStickyState} from '../util/hooks';
import Blocker from './blocker';
import './layout.css';
import MouseTracker from './mouse-tracker';
import {SettingsContext} from './settings-provider';
import React, {useContext, useEffect, useMemo, useState} from 'react';

// TODO(April 2021): Just trying to be kind and clear out unused keys, but
// delete this once April comes around.
function toSnakeCase(camelCase) {
	return camelCase.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
}
const unusedLocalStorageKeys = [
	'ascending',
	'nodeTypes',
	'sortIdx',
	'tagStates',
	'typeStates',
	'filterType',
].flatMap(name =>
	[name, toSnakeCase(name)].flatMap(unprefixedKey =>
		[1, 2].map(n => `LAB_V${n}_${unprefixedKey}`)
	)
);

const PAGE_CLASSES = {
	'/': 'index-page',
	'/about': 'about-page',
	'/subscribe': 'subscribe-page',
	'/blog': 'blog-page',
	'/blog/post': 'blog-post-page',
};

const Layout = ({children, location, uri}) => {
	const {theme, reducedMotion, contrastPreference} = useContext(
		SettingsContext
	);
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	const [nTimesClosed, setNTimesClosed] = useStickyState(
		0,
		STORAGE_KEYS.nTimesClosedBlocker,
		{scope: 'session', serverState: 0}
	);
	useIdle(60000 * 4 * (nTimesClosed + 1), () => setIsBlockerOpen(true));
	useEffect(() => {
		unusedLocalStorageKeys.forEach(key =>
			window.localStorage.removeItem(key)
		);
	}, []);

	const isBlogPost = location.pathname.match(/\/blog\/.*[^0-9/]/);
	if (uri.startsWith('/blog')) uri = isBlogPost ? '/blog/post' : '/blog';
	const wrapperClassNames = [
		'site-wrapper',
		theme && `${theme}-theme`,
		reducedMotion && 'reduced-motion',
		contrastPreference &&
			contrastPreference !== 'default' &&
			`contrast-preference-${contrastPreference}`,
		PAGE_CLASSES[uri],
	]
		.filter(x => x)
		.join(' ');

	const showPageHeader = !isBlogPost;
	return (
		<div className={wrapperClassNames}>
			{isBlockerOpen && (
				<Blocker
					onClose={() => {
						setIsBlockerOpen(false);
						setNTimesClosed(n => n + 1);
					}}
				/>
			)}
			{showPageHeader && <PageHeader location={location} />}
			<div className="site-content">{children}</div>
			<MouseTracker />
		</div>
	);
};

export default Layout;
