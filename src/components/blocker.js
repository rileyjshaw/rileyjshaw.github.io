import React, {useState} from 'react';

import {useInterval} from '../util/hooks';

import './blocker.css';

// TODO(riley): Have this open when you open my website? And have a "no" button
//              to which it says "okay, i tried to warn you." as it fades away.
export default () => {
	const [date, setDate] = useState(new Date());
	useInterval(() => {
		setDate(new Date());
	}, 500);
	const hour = date.getHours();
	const time = `${hour % 12 || 12}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}${hour < 12 ? 'am' : 'pm'}`;
	return (
		<div className="idle-blocker">
			<p>It is now: {time}.</p>
			<p>You have been on the Internet for: too long.</p>
		</div>
	);
};
