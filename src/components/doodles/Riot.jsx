import {useViewport, useRect} from '../../util/hooks';
import './Riot.css';
import React, {useMemo} from 'react';

function Riot({className}, ref) {
	const [riotRef, _inView, boundingClientRect, windowHeight = 0] =
		useViewport({updateOnScroll: true});
	const [oRef, oBoundingClientRect] = useRect();
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
			oBoundingClientRect
				? [
						(oBoundingClientRect.left +
							oBoundingClientRect.width / 2 -
							boundingClientRect.left) /
							boundingClientRect.width +
							0.01, // Fudge, since the O is not centered.
						(oBoundingClientRect.top +
							oBoundingClientRect.height / 2 -
							boundingClientRect.top) /
							boundingClientRect.height -
							0.02, // Fudge, since the O is not centered.,
				  ]
				: [0.5, 0.5],
		[oBoundingClientRect],
	);

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
							i * factor * 30
						}deg)`,
					}}
				>
					RI<span ref={i ? null : oRef}>O</span>T!
				</p>
			))}
		</div>
	);
}

export default Riot;
