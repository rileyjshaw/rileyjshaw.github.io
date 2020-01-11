import React from 'react';

import CycleText from '../components/cycle-text';

import './go-up.css';

export default () => (
	<div className="go-up">
		<CycleText
			ms={150}
			OuterElement="span"
			onClick={() =>
				window.scroll({
					top: 0,
					behavior: 'smooth',
				})
			}
		>
			➫➯➱➬–
		</CycleText>
	</div>
);
