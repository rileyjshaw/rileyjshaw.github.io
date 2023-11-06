import PageHeader from './PageHeader';
import NotFoundPage from '../pages/404';
import {STORAGE_KEYS} from '../util/constants';
import {getNextHoliday} from '../util/holidays';
import {useIdle, useInterval, useStickyState} from '../util/hooks';
import {capitalize} from '../util/util';
import AutoLink from './AutoLink';
import Banner from './Banner';
import Blocker from './Blocker';
import ClientOnly from './ClientOnly';
import './layout.css';
import MouseTracker from './MouseTracker';
import {SettingsContext} from './SettingsProvider';
import cn from 'cnz';
import React, {useContext, useState, Children} from 'react';

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
		{scope: 'session', serverState: 0},
	);
	useIdle(60000 * 4 * (nTimesClosed + 1), () => setIsBlockerOpen(true));
	const [activeHoliday, setActiveHoliday] = useState(null);
	const [isHolidayBannerOpen, setIsHolidayBannerOpen] = useStickyState(
		true,
		STORAGE_KEYS.showHolidayBanner,
		'session',
	);

	useInterval(() => {
		const nextHoliday = getNextHoliday();
		setActiveHoliday(nextHoliday.daysUntil <= 3 ? nextHoliday : null);
	}, 60000);

	let {pathname} = location;
	if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);

	let is404;
	try {
		is404 = Children.only(children).type === NotFoundPage;
	} catch (e) {
		is404 = false;
	}

	const isBlogPost = !is404 && pathname.match(/\/blog\/.*[^0-9/]/);
	if (!is404 && pathname.startsWith('/blog'))
		pathname = isBlogPost ? '/blog/post' : '/blog';

	const showPageHeader = is404 || !pathname.startsWith('/curate/');

	return (
		<div
			className={cn(
				'site-wrapper',
				theme && `${theme}-theme`,
				reducedMotion && 'reduced-motion',
				contrastPreference &&
					contrastPreference !== 'default' &&
					`contrast-preference-${contrastPreference}`,
				PAGE_CLASSES[pathname],
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
							] ||
								`${
									activeHoliday.daysUntil > 0
										? `${activeHoliday.daysUntil} day${
												activeHoliday.daysUntil === 1
													? ''
													: 's'
										  } until `
										: ''
								}${
									activeHoliday.link ? (
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
									)
								}${
									activeHoliday.daysUntil === 0
										? ' is today!'
										: '.'
								}`}
						</p>
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
