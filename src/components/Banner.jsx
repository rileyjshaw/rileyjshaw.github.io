import React from 'react';

import './Banner.css';

export default ({children, onClose, style = {}}) => (
	<div className="banner" style={style}>
		{children}
		<button onClick={onClose}>✖</button>
	</div>
);
