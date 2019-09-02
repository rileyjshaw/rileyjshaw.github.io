import React from 'react';

import {useIdle} from '../util/hooks';

import Header from './header';
import Blocker from './blocker';

const Layout = ({children, noHeader, root, colors, className = ''}) => {
	const idle = useIdle(60000 * 10);
	return (
		<>
			{noHeader || <Header colors={colors} />}
			{idle && <Blocker />}
			{root ? children : <main className={className}>{children}</main>}
		</>
	);
};

export default Layout;
