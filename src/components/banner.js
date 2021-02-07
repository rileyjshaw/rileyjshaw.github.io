import './banner.css';
import React from 'react';

export default ({children, onClose}) => (
	<div className="banner">
		{children}
		<button onClick={onClose}>✖</button>
	</div>
);
