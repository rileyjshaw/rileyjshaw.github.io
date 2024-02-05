import * as Dialog from '@radix-ui/react-dialog';
import PageHeader from './PageHeader';
import SiteNav from './SiteNav';
import NotFoundPage from '../pages/404';
import {SITE_PAGES, STORAGE_KEYS} from '../util/constants';
import {getNextHoliday} from '../util/holidays';
import {useIdle, useInterval, useStickyState} from '../util/hooks';
import {capitalize} from '../util/util';
import AutoLink from './AutoLink';
import Banner from './Banner';
import Blocker from './Blocker';
import ClientOnly from './ClientOnly';
import './layout.css';
import {SettingsContext} from './SettingsProvider';
import cn from 'cnz';
import React, {useContext, useState, Children, useEffect} from 'react';

function NoteDialog({open, onOpenChange, title, description}) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="dialog-note-overlay" />
				<Dialog.Content className="dialog-note-content">
					<Dialog.Title className="dialog-note-title">
						{title}
					</Dialog.Title>
					<Dialog.Description className="dialog-note-description">
						{description}
					</Dialog.Description>
					<div
						style={{
							display: 'flex',
							marginTop: 25,
							justifyContent: 'flex-end',
						}}
					>
						<Dialog.Close asChild>
							<button className="dialog-note-button">
								Continue
							</button>
						</Dialog.Close>
					</div>
					<Dialog.Close asChild>
						<button
							className="dialog-note-icon-button"
							aria-label="Close"
						>
							✖
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

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
		{scope: 'session'},
	);

	useInterval(() => {
		const nextHoliday = getNextHoliday();
		setActiveHoliday(nextHoliday.daysUntil <= 3 ? nextHoliday : null);
	}, 60000);

	const [isNoteOpen, setNoteOpen] = useState(false);

	let {pathname, search} = location;
	if (pathname.endsWith('/')) pathname = pathname.slice(1, -1);
	else pathname = pathname.slice(1);

	useEffect(() => {
		if (search?.includes('note=gh')) setNoteOpen(true);
	}, [search]);

	let is404;
	try {
		is404 = Children.only(children).type === NotFoundPage;
	} catch (e) {
		is404 = false;
	}

	const isBlogPost = !is404 && pathname.match(/blog\/.*[^0-9/]/);
	if (!is404 && pathname.startsWith('blog'))
		pathname = isBlogPost ? 'blog/post' : 'blog';

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
			<NoteDialog
				open={isNoteOpen}
				onOpenChange={setNoteOpen}
				title="Hello, GitHub!"
				description="I’m so excited about this role. I use GitHub every day, and Primer Prism at least once a week. I would love to contribute to the team that makes so many of my favourite tools ✨"
			/>
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
