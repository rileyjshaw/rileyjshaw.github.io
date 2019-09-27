import React from 'react';

import {useIdle} from '../util/hooks';

import Blocker from './blocker';

const Layout = ({children}) => {
	const idle = useIdle(60000 * 10);
	return (
		<>
			{idle && <Blocker />}
			{children}
		</>
	);
};

export default Layout;
