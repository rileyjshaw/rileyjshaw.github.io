import React from 'react';
import {useInView} from 'react-intersection-observer';
export default () => {
	const [ref, inView] = useInView({threshold: 0.5});
	return (
		<div>
			<span ref={ref} style={{color: inView ? 'red' : 'black'}}>
				Always red?
			</span>
		</div>
	);
};
