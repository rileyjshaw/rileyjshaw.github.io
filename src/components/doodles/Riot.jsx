import {useViewport, useRect} from '../../util/hooks';
import './Riot.css';
import React, {useMemo} from 'react';

function Riot({className, word = 'RIOT!'}, ref) {
	const [riotRef, _inView, boundingClientRect, windowHeight = 0] =
		useViewport({updateOnScroll: true});
	const [centerCharRef, centerCharBoundingClientRect] = useRect();
	let factor = boundingClientRect
		? (0.98 -
				boundingClientRect.top /
					(windowHeight - boundingClientRect.height) -
				0.5) *
			2
		: 0;
	if (factor) factor *= Math.sqrt(Math.abs(factor));

	const transformOrigin = useMemo(
		() =>
			centerCharBoundingClientRect
				? [
						(centerCharBoundingClientRect.left +
							centerCharBoundingClientRect.width / 2 -
							boundingClientRect.left) /
							boundingClientRect.width,
						(centerCharBoundingClientRect.top +
							centerCharBoundingClientRect.height / 2 -
							boundingClientRect.top) /
							boundingClientRect.height,
					]
				: [0.5, 0.5],
		[centerCharBoundingClientRect],
	);

	let centerCharIdx = word.indexOf('O');
	if (centerCharIdx === -1) centerCharIdx = Math.floor(word.length / 2);
	const wordParts = [
		word.slice(0, centerCharIdx),
		word[centerCharIdx],
		word.slice(centerCharIdx + 1),
	];

	return (
		<div
			{...(ref?.hasOwnProperty('current') ? {ref} : {})}
			className={`doodle doodle-riot${className ? ` ${className}` : ''}`}
		>
			{Array.from({length: 6}, (_, i) => (
				<p
					ref={i ? null : riotRef}
					key={`riot-${i}`}
					className="riot-overlay"
					style={{
						transformOrigin: transformOrigin
							.map(p => `${p * 100}%`)
							.join(' '),
						transform: `translate(-50%, -50%) rotate(${
							i * factor * 40
						}deg)`,
					}}
				>
					{wordParts[0]}
					<span ref={i ? null : centerCharRef}>{wordParts[1]}</span>
					{wordParts[2]}
				</p>
			))}
		</div>
	);
}

export default Riot;
