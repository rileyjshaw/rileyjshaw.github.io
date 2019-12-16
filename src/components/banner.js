import React from 'react';

import './banner.css';

export default ({children, onClose}) => (
	<div className="banner">
		{children}
		<button onClick={onClose}>𝘅</button>
	</div>
);
