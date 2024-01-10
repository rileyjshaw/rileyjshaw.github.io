import {useKeyPresses, useTypedText} from '../../util/hooks';
import './GameOver.css';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const textOptions = {
	loading: 'Loading…',
	win: 'You win',
};

function GameOver({className}, ref) {
	const activeTimeout = useRef(null);
	const [gameState, setGameState] = useState('game-over');
	const mainText =
		useTypedText(textOptions[gameState] ?? 'Game over', {delay: 30}) ||
		'\u00A0';
	useEffect(() => {
		activeTimeout.current = setTimeout(() => {
			setGameState('play-again');
		}, 1800);
		return () => clearTimeout(activeTimeout.current);
	}, []);
	const clickYes = useCallback(() => {
		setGameState('loading');
		clearTimeout(activeTimeout.current);
		activeTimeout.current = setTimeout(() => {
			setGameState('game-over');
			activeTimeout.current = setTimeout(
				() => setGameState('play-again'),
				1800,
			);
		}, 2400);
	}, []);
	const clickNo = useCallback(() => {
		clearTimeout(activeTimeout.current);
		setGameState('win');
	}, []);
	useKeyPresses({y: {onDown: clickYes}, n: {onDown: clickNo}});
	const playAgain = gameState === 'play-again';
	return (
		<div
			{...(ref?.hasOwnProperty('current') ? {ref} : {})}
			className={`doodle doodle-game-over${
				className ? ` ${className}` : ''
			}`}
		>
			<p className="main-text">{mainText}</p>
			<p
				aria-hidden={!playAgain}
				className={`play-again${playAgain ? ' show' : ''}`}
			>
				Play again?{' '}
				<button disabled={!playAgain} onClick={clickYes}>
					Y
				</button>
				{' / '}
				<button disabled={!playAgain} onClick={clickNo}>
					N
				</button>
			</p>
		</div>
	);
}

export default GameOver;
