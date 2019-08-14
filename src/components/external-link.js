import React from 'react';

export default props => {
	const {to, children, ...rest} = props;
	return (
		<a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
			{children}
		</a>
	);
};
