import CycleText from './CycleText';
import BackgroundGenerator from './doodles/BackgroundGenerator';
import Propellers from './doodles/Propellers';
import CircleConstrainedLines from './doodles/CircleConstrainedLines';
import GameOver from './doodles/GameOver';
import Riot from './doodles/Riot';
import './GridDoodles.css';
import TextGrid from './TextGrid';
import React from 'react';

export default [
	[
		React.forwardRef((_, ref) => (
			<BackgroundGenerator className="content-node" El="li" ref={ref} />
		)),
		0.8,
	],
	[React.forwardRef((_, ref) => <Propellers El="li" ref={ref} />), 0.8],
	[
		React.forwardRef((_, ref) => (
			<CircleConstrainedLines El="li" ref={ref} />
		)),
		0.8,
	],
	[
		React.forwardRef((_, ref) => (
			<GameOver className="content-node" ref={ref} />
		)),
		0.8,
	],
	[
		React.forwardRef((_, ref) => (
			<Riot className="content-node" ref={ref} />
		)),
		0.7,
	],
	[
		React.forwardRef((_, ref) => (
			<li className="doodle wavytext" ref={ref}>
				{'rileyjshaw.com'.split('').map((letter, i, {length}) => (
					<span
						key={i}
						style={{animationDelay: `${(i - length) * 0.2}s`}}
					>
						{letter}
					</span>
				))}
			</li>
		)),
		0.2,
	],
	[
		React.forwardRef((_, ref) => (
			<TextGrid
				size={[3, 3]}
				classPrefix="doingreat"
				className="content-node doodle"
				OuterElement="li"
				ref={ref}
			>
				DOINGREAT
			</TextGrid>
		)),
		0.1,
	],
	[
		React.forwardRef((_, ref) => (
			<CycleText
				classPrefix="wavebump"
				className="content-node doodle"
				ms={50}
				OuterElement="li"
				ref={ref}
			>
				▁▂▃▅▆▇▇▆▅▃▂▁
			</CycleText>
		)),
		0.3,
	],
	[
		React.forwardRef((_, ref) => (
			<CycleText
				classPrefix="droplet"
				className="content-node doodle"
				ms={150}
				OuterElement="li"
				ref={ref}
			>
				⊙⊚⦾⊛
			</CycleText>
		)),
		0.2,
	],
	[
		React.forwardRef((_, ref) => (
			<CycleText
				classPrefix="circles"
				className="content-node doodle"
				ms={100}
				size={[2, 2]}
				OuterElement="li"
				ref={ref}
			>
				◯⦿◉◎
			</CycleText>
		)),
		0.2,
	],
	[
		React.forwardRef((_, ref) => (
			<li className="content-node snowman doodle" ref={ref}>
				☃
			</li>
		)),
		0.3,
		() => {
			const month = new Date().getMonth();
			return month < 4 || month === 11;
		},
	],
].map(([Component, chance, fn]) => [
	Component,
	fn ? () => fn() || Math.random() < chance : () => Math.random() < chance,
]);
