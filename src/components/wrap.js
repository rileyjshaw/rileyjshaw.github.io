import React from 'react';

export default ({children, El = 'span'}) =>
	children
		.split('')
		.map((c, i) => <El key={i}>{c === ' ' ? '\u00A0' : c}</El>);
