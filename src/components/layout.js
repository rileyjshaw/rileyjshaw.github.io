import React, {useState} from 'react';

import {useIdle, useStickyState} from '../util/hooks';
import AutoLink from './auto-link';
import Blocker from './blocker';
import Banner from './banner';
import ClientOnly from './client-only';

import './layout.css';

const Layout = ({children}) => {
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	const [isBannerOpen, setIsBannerOpen] = useStickyState(
		true,
		'betaBanner',
		'session'
	);
	useIdle(60000 * 4, () => setIsBlockerOpen(true));

	return (
		<>
			{isBlockerOpen && (
				<Blocker onClose={() => setIsBlockerOpen(false)} />
			)}
			<ClientOnly>
				{isBannerOpen && (
					<Banner onClose={() => setIsBannerOpen(false)}>
						<p>
							This site is in beta.{' '}
							<AutoLink to="https://github.com/rileyjshaw/rileyjshaw-new/issues">
								Please&nbsp;report&nbsp;issues&nbsp;here
							</AutoLink>
							.
						</p>
					</Banner>
				)}
			</ClientOnly>
			<div className="site-content">{children}</div>
		</>
	);
};

export default Layout;
