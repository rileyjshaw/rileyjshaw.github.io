import React, {useState} from 'react';

import {useInterval} from '../util/hooks';

import './Blocker.css';

export const CurrentTime = () => {
	const [date, setDate] = useState(null);
	useInterval(() => {
		setDate(new Date());
	}, 1000);
	if (date === null) return null;
	const hour = date.getHours();
	return (
		<span className="current-time">
			{hour % 12 || 12}:{date.getMinutes().toString().padStart(2, '0')}
			{hour < 12 ? 'am' : 'pm'}
		</span>
	);
};

export default ({onClose}) => {
	const [mode, setMode] = useState('open');
	return (
		<div className="idle-blocker">
			{mode === 'open' ? (
				<>
					<p>
						It is <CurrentTime />.
					</p>
					<p>Do you still want to be on the internet?</p>
					<ul className="options">
						<li>
							<button
								onClick={() => {
									setMode('response');
									window.setTimeout(onClose, 1200);
								}}
							>
								Yes
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									setMode('response');
									window.setTimeout(() => {
										setMode('blank');
										window.setTimeout(() => {
											setMode('bye');
											window.setTimeout(() => {
												setMode('blank');
											}, 2000);
										}, 5000);
									}, 1200);
								}}
							>
								No
							</button>
						</li>
					</ul>
				</>
			) : mode === 'response' ? (
				<p>Okay.</p>
			) : mode === 'bye' ? (
				<p>BYE!</p>
			) : null}
		</div>
	);
};
