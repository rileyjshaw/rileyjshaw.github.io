import React from 'react';

import Header from './header';

const Layout = ({children}) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
};

export default Layout;
