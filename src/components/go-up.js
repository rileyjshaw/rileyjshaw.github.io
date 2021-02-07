import CycleText from '../components/cycle-text';
import './go-up.css';
import React from 'react';

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
