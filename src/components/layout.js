import React from 'react';

import {useIdle} from '../util/hooks';

import Blocker from './blocker';

const Layout = ({children, root, className = ''}) => {
	const idle = useIdle(60000 * 10);
	const El = root ? 'div' : 'main';
	return (
		<>
			{idle && <Blocker />}
			<El className={className}>{children}</El>
		</>
	);
};

export default Layout;
