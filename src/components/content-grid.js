// TODO(riley): This component will benefit greatly from time-slicing.
// https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html
import React from 'react';
import TimeSlicer from 'react-time-slicer';

import ContentNode from './content-node.js';

import './content-grid.css';

export default ({nodes}) => (
	<TimeSlicer>
		<ul className="content-grid">
			{nodes.map(node => (
				<ContentNode key={node.uid} {...node} />
			))}
		</ul>
	</TimeSlicer>
);
