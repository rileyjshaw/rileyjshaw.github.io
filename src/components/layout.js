import React, {useState} from 'react';

import {useIdle} from '../util/hooks';
import AutoLink from './auto-link';
import Blocker from './blocker';
import Banner from './banner';

const Layout = ({children}) => {
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	const [isBannerOpen, setIsBannerOpen] = useState(
		!JSON.parse(sessionStorage.getItem('betaBannerClosed'))
	);
	useIdle(60000 * 4, () => setIsBlockerOpen(false));

	return (
		<>
			{isBlockerOpen && (
				<Blocker onClose={() => setIsBlockerOpen(false)} />
			)}
			{isBannerOpen && (
				<Banner
					onClose={() => {
						sessionStorage.setItem('betaBannerClosed', true);
						setIsBannerOpen(false);
					}}
				>
					<p>
						This site is in beta.{' '}
						<AutoLink to="https://github.com/rileyjshaw/rileyjshaw-new/issues">
							Please&nbsp;report&nbsp;issues&nbsp;here
						</AutoLink>
						.
					</p>
				</Banner>
			)}
			{children}
		</>
	);
};

export default Layout;
