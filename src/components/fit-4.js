import Wrap from './wrap';
import React from 'react';

export default ({children, text, scale = 100, className = '', ...props}) => {
	if (!text) {
		text = children;
		children = null;
	}
	const style = {
		fontSize: `${scale / text.length}vw`,
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		textAlign: 'center',
		...props.style,
	};
	return (
		<span {...props} className={`fit-4 ${className}`} style={style}>
			<Wrap>{text}</Wrap>
			{children}
		</span>
	);
};
