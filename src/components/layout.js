import React, {useState} from 'react';

import {useIdle} from '../util/hooks';
import Blocker from './blocker';

import './layout.css';

const Layout = ({children}) => {
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	useIdle(60000 * 4, () => setIsBlockerOpen(true));

	return (
		<>
			{isBlockerOpen && (
				<Blocker onClose={() => setIsBlockerOpen(false)} />
			)}
			<div className="site-content">{children}</div>
		</>
	);
};

export default Layout;
