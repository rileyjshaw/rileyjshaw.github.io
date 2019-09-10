import React from 'react';

import {useIdle} from '../util/hooks';

import Blocker from './blocker';

const Layout = ({children, root, className = ''}) => {
	const idle = useIdle(60000 * 10);
	return (
		<>
			{idle && <Blocker />}
			{root ? children : <main className={className}>{children}</main>}
		</>
	);
};

export default Layout;
