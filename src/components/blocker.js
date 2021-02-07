import {useInterval} from '../util/hooks';
import './blocker.css';
import React, {useState} from 'react';

export const Time = () => {
	const [date, setDate] = useState(new Date());
	useInterval(() => {
		setDate(new Date());
	}, 1000);
	const hour = date.getHours();
	const time = `${hour % 12 || 12}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}${hour < 12 ? 'am' : 'pm'}`;
	return time;
};

export default ({onClose}) => {
	const [mode, setMode] = useState('open');
	return (
		<div className="idle-blocker">
			{mode === 'open' ? (
				<>
					<p>
						It is now: <Time />.
					</p>
					<p>Do you still want to be on the internet?</p>
					<ul>
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
									window.setTimeout(
										() => setMode('blank'),
										1200
									);
								}}
							>
								No
							</button>
						</li>
					</ul>
				</>
			) : mode === 'response' ? (
				'Okay.'
			) : null}
		</div>
	);
};
