import React from 'react';

import './big-quote.css';

export default ({children, cite, source}) => (
	<blockquote className="big-quote" cite={cite}>
		<p>{children}</p>
		{source && <footer>{source}</footer>}
	</blockquote>
);
