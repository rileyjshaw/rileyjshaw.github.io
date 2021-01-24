import React, {useState} from 'react';

import {useIdle, useStickyState} from '../util/hooks';
import Blocker from './blocker';

import './layout.css';

const Layout = ({children}) => {
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	const [nTimesClosed, setNTimesClosed] = useStickyState(
		0,
		'nTimesClosedBlocker',
		'session'
	);
	useIdle(60000 * 4 * (nTimesClosed + 1), () => setIsBlockerOpen(true));

	return (
		<>
			{isBlockerOpen && (
				<Blocker
					onClose={() => {
						setIsBlockerOpen(false);
						setNTimesClosed(n => n + 1);
					}}
				/>
			)}
			<div className="site-content">{children}</div>
		</>
	);
};

export default Layout;
