import React from 'react';

import ContentNode from './content-node';

import './content-grid.css';

export default React.forwardRef(({nodes, masonry}, ref) => (
	<ul className={`content-grid${masonry ? ' masonry' : ''}`}>
		{nodes.map((node, i, {length}) => (
			<ContentNode
				masonry={masonry}
				ref={i === length - 1 ? ref : null}
				key={node.uid}
				{...node}
			/>
		))}
	</ul>
));
