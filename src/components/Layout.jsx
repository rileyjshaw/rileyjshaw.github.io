import React, {useContext, useState, Children, useEffect} from 'react';

import cn from 'cnz';
import {useIdle} from 'react-use';

import NotFoundPage from '../pages/404';
import {SITE_PAGES, STORAGE_KEYS} from '../util/constants';
import {getNextHoliday} from '../util/holidays';
import {useInterval, useStickyState} from '../util/hooks';
import {capitalize} from '../util/util';
import AutoLink from './AutoLink';
import Banner from './Banner';
import Blocker from './Blocker';
import ClientOnly from './ClientOnly';
import {DialogContext} from './DialogProvider';
import PageHeader from './PageHeader';
import {SettingsContext} from './SettingsProvider';
import SiteNav from './SiteNav';

import './layout.css';

const ONE_MINUTE = 60e3;
const Layout = ({children, location}) => {
	const {isDialogOpen} = useContext(DialogContext);
	const {theme, reducedMotion, contrastPreference} =
		useContext(SettingsContext);
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	const [nTimesClosed, setNTimesClosed] = useStickyState(
		0,
		STORAGE_KEYS.nTimesClosedBlocker,
		{scope: 'session', serverState: 0},
	);
	const isIdle = useIdle(ONE_MINUTE * (nTimesClosed * 3 || 1) * 5); // 5, 15, 30, 45…
	const [activeHoliday, setActiveHoliday] = useState(null);
	const [isHolidayBannerOpen, setIsHolidayBannerOpen] = useStickyState(
		true,
		STORAGE_KEYS.showHolidayBanner,
		{scope: 'session'},
	);

	useEffect(() => {
		if (isIdle && !isDialogOpen) {
			setIsBlockerOpen(true);
		}
	}, [isIdle, isDialogOpen]);

	useInterval(() => {
		const nextHoliday = getNextHoliday();
		setActiveHoliday(nextHoliday.daysUntil <= 3 ? nextHoliday : null);
	}, ONE_MINUTE);

	let {pathname, search} = location;
	if (pathname.endsWith('/')) pathname = pathname.slice(1, -1);
	else pathname = pathname.slice(1);

	let is404;
	try {
		is404 = Children.only(children).type === NotFoundPage;
	} catch (e) {
		is404 = false;
	}

	if (!is404) {
		if (pathname.startsWith('blog')) {
			pathname = pathname.match(/blog\/.*[^0-9/]/)
				? 'blog/post'
				: 'blog';
		} else if (pathname.startsWith('gallery')) {
			pathname = pathname.match(/gallery\/.*[^0-9/]/)
				? 'gallery/post'
				: 'gallery';
		}
	}

	const showPageHeader = is404 || !pathname.startsWith('/curate/');

	return (
		<div
			className={cn(
				'site-outer-wrapper',
				theme && `${theme}-theme`,
				reducedMotion && 'reduced-motion',
				contrastPreference &&
					contrastPreference !== 'default' &&
					`contrast-preference-${contrastPreference}`,
				SITE_PAGES.find(([href]) => href === pathname)?.[1] ??
					'page-other',
			)}
		>
			{isBlockerOpen && (
				<Blocker
					onClose={() => {
						setIsBlockerOpen(false);
						setNTimesClosed(n => n + 1);
					}}
				/>
			)}
			<ClientOnly>
				{activeHoliday && isHolidayBannerOpen && (
					<Banner
						onClose={() => setIsHolidayBannerOpen(false)}
						style={activeHoliday.style ?? {}}
					>
						<p>
							{activeHoliday.specialMessages?.[
								activeHoliday.daysUntil
							] || (
								<>
									{activeHoliday.daysUntil > 0
										? `${activeHoliday.daysUntil} day${
												activeHoliday.daysUntil === 1
													? ''
													: 's'
											} until `
										: null}
									{activeHoliday.link ? (
										<AutoLink to={activeHoliday.link}>
											{activeHoliday.daysUntil === 0
												? capitalize(
														activeHoliday.name,
													)
												: activeHoliday.name}
										</AutoLink>
									) : activeHoliday.daysUntil === 0 ? (
										capitalize(activeHoliday.name)
									) : (
										activeHoliday.name
									)}
									{activeHoliday.daysUntil === 0
										? ' is today!'
										: '.'}
								</>
							)}
						</p>
					</Banner>
				)}
			</ClientOnly>
			<div className="site-wrapper">
				{showPageHeader && <PageHeader location={location} />}
				{showPageHeader && <SiteNav location={location} />}
				<div className="site-content">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
