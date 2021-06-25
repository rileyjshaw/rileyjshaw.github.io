import PageHeader from '../components/page-header';
import {STORAGE_KEYS} from '../util/constants';
import {useIdle, useInterval, useStickyState} from '../util/hooks';
import AutoLink from './auto-link';
import Banner from './banner';
import Blocker from './blocker';
import ClientOnly from './client-only';
import './layout.css';
import MouseTracker from './mouse-tracker';
import {SettingsContext} from './settings-provider';
import React, {useContext, useEffect, useState} from 'react';

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
	'/blog': 'blog-page',
	'/blog/post': 'blog-post-page',
	'/subscribe': 'subscribe-page',
};

const Layout = ({children, location}) => {
	const {theme, reducedMotion, contrastPreference} =
		useContext(SettingsContext);
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	const [nTimesClosed, setNTimesClosed] = useStickyState(
		0,
		STORAGE_KEYS.nTimesClosedBlocker,
		{scope: 'session', serverState: 0}
	);
	useIdle(60000 * 4 * (nTimesClosed + 1), () => setIsBlockerOpen(true));
	const [isDeletionDayBannerOpen, setIsDeletionDayBannerOpen] =
		useStickyState(true, STORAGE_KEYS.showDeletionDayBanner, 'session');
	const [daysUntilDeletionDay, setDaysUntilDeletionDay] = useState(null);
	useInterval(() => {
		const today = new Date();
		const daysUntil = Math.ceil(
			(new Date(today.getFullYear(), 3, 4) - today) / 86400000
		);
		if (daysUntil >= 0) {
			setDaysUntilDeletionDay(daysUntil);
		} else setDaysUntilDeletionDay(null);
	}, 60000);
	useEffect(() => {
		unusedLocalStorageKeys.forEach(key =>
			window.localStorage.removeItem(key)
		);
	}, []);

	let {pathname} = location;
	if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);

	const isBlogPost = pathname.match(/\/blog\/.*[^0-9/]/);
	if (pathname.startsWith('/blog'))
		pathname = isBlogPost ? '/blog/post' : '/blog';

	const wrapperClassNames = [
		'site-wrapper',
		theme && `${theme}-theme`,
		reducedMotion && 'reduced-motion',
		contrastPreference &&
			contrastPreference !== 'default' &&
			`contrast-preference-${contrastPreference}`,
		PAGE_CLASSES[pathname],
	]
		.filter(x => x)
		.join(' ');

	const showPageHeader = !(isBlogPost || pathname.startsWith('/curate/'));
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
			<ClientOnly>
				{isDeletionDayBannerOpen &&
					typeof daysUntilDeletionDay === 'number' &&
					daysUntilDeletionDay <= 3 && (
						<Banner
							onClose={() => setIsDeletionDayBannerOpen(false)}
						>
							{daysUntilDeletionDay ? (
								<p>
									{daysUntilDeletionDay} day
									{daysUntilDeletionDay > 1
										? 's'
										: ''} until{' '}
									<AutoLink to="https://deletionday.com">
										Deletion Day
									</AutoLink>
								</p>
							) : (
								<p>
									<AutoLink to="https://deletionday.com">
										Deletion Day
									</AutoLink>{' '}
									is today!
								</p>
							)}
						</Banner>
					)}
			</ClientOnly>
			{showPageHeader && <PageHeader location={location} />}
			<div className="site-content">{children}</div>
			<MouseTracker />
		</div>
	);
};

export default Layout;
