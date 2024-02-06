import React, {useMemo, useState} from 'react';

import {useKeyPresses, useTypedText} from '../util/hooks';

import './PickOne.css';

const UNCHOSEN = [false, false];
function PickOne({question = '', left, right, answer, onPick}) {
	const displayedQuestion = useTypedText(question);
	const [chosen, setChosen] = useState(UNCHOSEN);
	const [pickLeft, pickRight, keyHandlers] = useMemo(() => {
		const pickLeft = () => setChosen([true, false]);
		const pickRight = () => setChosen([false, true]);
		return [
			pickLeft,
			pickRight,
			answer
				? {}
				: {
						ArrowLeft: {onDown: pickLeft},
						ArrowUp: {onDown: pickLeft},
						ArrowRight: {onDown: pickRight},
						ArrowDown: {onDown: pickRight},
					},
		];
	}, [answer, setChosen]);
	useKeyPresses(keyHandlers);
	return (
		<div
			className={`pick-one${
				question || displayedQuestion ? ' with-question' : ''
			}`}
		>
			<p className="question">{displayedQuestion}</p>
			<div className="choices-container">
				{answer ? (
					answer
				) : (
					<>
						<div
							className={`half${chosen[0] ? ' chosen' : ''}`}
							onClick={pickLeft}
							onAnimationEnd={({animationName}) => {
								if (animationName === 'bulge') {
									setChosen(UNCHOSEN);
									onPick(0);
								}
							}}
						>
							{left}
						</div>
						<div
							className={`half${chosen[1] ? ' chosen' : ''}`}
							onClick={pickRight}
							onAnimationEnd={({animationName}) => {
								if (animationName === 'bulge') {
									setChosen(UNCHOSEN);
									onPick(1);
								}
							}}
						>
							{right}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default PickOne;
