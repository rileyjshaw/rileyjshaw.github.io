import React from 'react';

import ContentNode from './content-node.js';

import './content-grid.css';

export default ({children, nodes}) => (
	<ul className="content-grid">
		{nodes.map(node => (
			<ContentNode key={node.uid} {...node} />
		))}
		{children}
	</ul>
);
