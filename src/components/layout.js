import React from 'react';

import {useIdle} from '../util/hooks';

import Header from './header';
import Blocker from './blocker';

const Layout = ({children, noHeader, colors}) => {
	const idle = useIdle(5000);
	return (
		<>
			{noHeader || <Header colors={colors} />}
			{idle && <Blocker />}
			<main style={{background: idle ? 'red' : 'none'}}>{children}</main>
		</>
	);
};

export default Layout;
