// Flexbox justified.
import React from 'react';

import './Fit2.css';

export default ({children, className = ''}) => (
	<div className={`fit-2 ${className}`}>
		{children.split('').map((char, i) => (
			<span key={i}>{char}</span>
		))}
	</div>
);
