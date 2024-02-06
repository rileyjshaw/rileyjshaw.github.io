import React, {useState} from 'react';

import './CheatCodeInput.css';

const EXTENDED_CHARS = {
	UP: '⬆',
	DOWN: '⬇',
	LEFT: '⬅',
	RIGHT: '➡',
	START: '⌽',
};
const CODES = {
	ROSEBUD: () => alert('+ $1000'),
	[`${EXTENDED_CHARS.UP}${EXTENDED_CHARS.UP}${EXTENDED_CHARS.DOWN}${EXTENDED_CHARS.DOWN}${EXTENDED_CHARS.LEFT}${EXTENDED_CHARS.RIGHT}${EXTENDED_CHARS.LEFT}${EXTENDED_CHARS.RIGHT}BA${EXTENDED_CHARS.START}`]:
		() => alert('konami'),
};
const MAX_CODE_LENGTH = Math.max(
	10,
	Object.keys(CODES).reduce((max, {length}) => Math.max(max, length), 0),
);

const CheatCodeInput = () => {
	const [inputState, setInputState] = useState('');

	const handleChange = handler => {
		setInputState(prevState => {
			const newState = (
				typeof handler === 'string' ? handler : handler(prevState)
			).toUpperCase();
			if (newState.length > MAX_CODE_LENGTH) return '';
			if (CODES[newState]) {
				CODES[newState]();
				return '';
			}
			return newState;
		});
	};

	return (
		<input
			className="cheat-code-input"
			type="text"
			value={inputState}
			onChange={e => handleChange(e.target.value)}
			onKeyDown={e => {
				if (e.repeat) return;
				switch (e.key) {
					case 'ArrowUp':
						handleChange(
							prevState => `${prevState}${EXTENDED_CHARS.UP}`,
						);
						break;
					case 'ArrowDown':
						handleChange(
							prevState => `${prevState}${EXTENDED_CHARS.DOWN}`,
						);
						break;
					case 'ArrowLeft':
						handleChange(
							prevState => `${prevState}${EXTENDED_CHARS.LEFT}`,
						);
						break;
					case 'ArrowRight':
						handleChange(
							prevState => `${prevState}${EXTENDED_CHARS.RIGHT}`,
						);
						break;
					case 'Enter':
						handleChange(
							prevState => `${prevState}${EXTENDED_CHARS.START}`,
						);
						break;
					case 'Backspace':
						setInputState('');
						break;
					default:
						return;
				}
				e.preventDefault();
			}}
		/>
	);
};

export default CheatCodeInput;
