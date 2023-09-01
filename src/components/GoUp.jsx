import CycleText from '../components/CycleText';
import './GoUp.css';
import React from 'react';

export default () => (
	<div className="go-up">
		<CycleText
			ms={150}
			OuterElement="span"
			onClick={() => {
				window.scrollTo(0, 0);
				const title = document.getElementById('page-header');
				title.focus({preventScroll: true});
			}}
		>
			➫➯➱➬–
		</CycleText>
	</div>
);
