import React, {useState} from 'react';

import {useIdle} from '../util/hooks';

import Blocker from './blocker';

const Layout = ({children}) => {
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	useIdle(60000 * 4, () => setIsBlockerOpen(true));

	return (
		<>
			{isBlockerOpen && (
				<Blocker onClose={() => setIsBlockerOpen(false)} />
			)}
			{children}
		</>
	);
};

export default Layout;
