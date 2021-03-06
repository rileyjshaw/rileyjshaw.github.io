import PageHeader from '../components/page-header';
import {STORAGE_KEYS} from '../util/constants';
import {useIdle, useStickyState} from '../util/hooks';
import Blocker from './blocker';
import './layout.css';
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

const Layout = ({children, location}) => {
	const {theme, reducedMotion, contrastPreference} = useContext(
		SettingsContext
	);
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	const [nTimesClosed, setNTimesClosed] = useStickyState(
		0,
		STORAGE_KEYS.nTimesClosedBlocker,
		{scope: 'session'}
	);
	useIdle(60000 * 4 * (nTimesClosed + 1), () => setIsBlockerOpen(true));
	useEffect(() => {
		unusedLocalStorageKeys.forEach(key =>
			window.localStorage.removeItem(key)
		);
	}, []);

	const wrapperClassNames = useMemo(
		() =>
			[
				'site-wrapper',
				`${theme}-theme`,
				reducedMotion && 'reduced-motion',
				contrastPreference !== 'default' &&
					`contrast-preference-${contrastPreference}`,
			]
				.filter(x => x)
				.join(' '),
		[theme, reducedMotion, contrastPreference]
	);

	const showPageHeader = !location.pathname.match(/\/blog\/.*[^0-9/]/);
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
		</div>
	);
};

export default Layout;
