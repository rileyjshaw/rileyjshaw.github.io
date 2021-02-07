// Flexbox justified.
import './fit-2.css';
import React from 'react';

export default ({children, className = ''}) => (
	<div className={`fit-2 ${className}`}>
		{children.split('').map((char, i) => (
			<span key={i}>{char}</span>
		))}
	</div>
);
