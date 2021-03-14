import './game-over.css';
import React, {useRef, useState, useEffect} from 'react';

const textOptions = {
	loading: 'Loading…',
	win: 'You win',
};

function GameOver(_, ref) {
	const activeTimeout = useRef(null);
	const [gameState, setGameState] = useState('game-over');
	useEffect(() => {
		activeTimeout.current = setTimeout(() => {
			setGameState('play-again');
		}, 1800);
		return () => clearTimeout(activeTimeout.current);
	}, []);
	return (
		<div
			{...(ref?.hasOwnProperty('current') ? {ref} : {})}
			className="content-node doodle doodle-game-over"
		>
			<p className="main-text">
				{textOptions[gameState] ?? 'Game over'}
			</p>
			<p
				className={`play-again${
					gameState === 'play-again' ? ' show' : ''
				}`}
			>
				Play again?{' '}
				<button
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
