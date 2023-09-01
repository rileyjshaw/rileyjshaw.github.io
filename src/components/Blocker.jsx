import {useInterval} from '../util/hooks';
import './Blocker.css';
import React, {useState} from 'react';

export const Time = ({format = t => t}) => {
	const [date, setDate] = useState(null);
	useInterval(() => {
		setDate(new Date());
	}, 1000);
	if (date === null) return '';
	const hour = date.getHours();
	const time = `${hour % 12 || 12}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}${hour < 12 ? 'am' : 'pm'}`;
	return format(time);
};

export default ({onClose}) => {
	const [mode, setMode] = useState('open');
	return (
		<div className="idle-blocker">
			{mode === 'open' ? (
				<>
					<p>
						<Time format={t => `It is now: ${t}.`} />
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
				'Okay.'
			) : mode === 'bye' ? (
				'BYE!'
			) : null}
		</div>
	);
};
