import React from 'react';

import Header from './header';

const Layout = ({children, colors}) => {
	return (
		<>
			<Header colors={colors} />
			<main>{children}</main>
		</>
	);
};

export default Layout;
