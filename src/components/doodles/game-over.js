import {useTypedText} from '../../util/hooks';
import './game-over.css';
import React, {useRef, useState, useEffect} from 'react';

const textOptions = {
	loading: 'Loading…',
	win: 'You win',
};

function GameOver(_, ref) {
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
	const playAgain = gameState === 'play-again';
	return (
		<div
			{...(ref?.hasOwnProperty('current') ? {ref} : {})}
			className="content-node doodle doodle-game-over"
		>
			<p className="main-text">{mainText}</p>
			<p
				aria-hidden={!playAgain}
				className={`play-again${playAgain ? ' show' : ''}`}
			>
				Play again?{' '}
				<button
					disabled={!playAgain}
					onClick={() => {
						setGameState('loading');
						clearTimeout(activeTimeout.current);
						activeTimeout.current = setTimeout(() => {
							setGameState('game-over');
							activeTimeout.current = setTimeout(
								() => setGameState('play-again'),
								1800
							);
						}, 2400);
					}}
				>
					Y
				</button>{' '}
				/{' '}
				<button
					disabled={!playAgain}
					onClick={() => {
						clearTimeout(activeTimeout.current);
						setGameState('win');
					}}
				>
					N
				</button>
			</p>
		</div>
	);
}

export default GameOver;
