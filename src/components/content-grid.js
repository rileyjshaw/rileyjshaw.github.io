import React from 'react';

import ContentNode from './content-node';

import './content-grid.css';

export default React.forwardRef(({nodes}, ref) => (
	<ul className="content-grid">
		{nodes.map((node, i, {length}) => (
			<ContentNode
				ref={i === length - 1 ? ref : null}
				key={node.uid}
				{...node}
			/>
		))}
	</ul>
));
