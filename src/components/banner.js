import './banner.css';
import React from 'react';

export default ({children, onClose, style = {}}) => (
	<div className="banner" style={style}>
		{children}
		<button onClick={onClose}>✖</button>
	</div>
);
