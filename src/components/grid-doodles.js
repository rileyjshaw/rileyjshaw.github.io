import React from 'react';

import TextGrid from './text-grid';
import CycleText from './cycle-text';
import BackgroundGenerator from './doodles/background-generator';

import './grid-doodles.css';

export default [
	[
		React.forwardRef((props, ref) => (
			<BackgroundGenerator El="li" ref={ref} {...props} />
		)),
		0.8,
	],
	[
		React.forwardRef((props, ref) => (
			<li className="doodle wavytext" ref={ref}>
				{'rileyjshaw'.split('').map((letter, i, {length}) => (
					<span
						key={`wavytext-${i}`}
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
		React.forwardRef((props, ref) => (
			<TextGrid
				size={[3, 3]}
				classPrefix="doingreat"
				className="content-node doodle"
				OuterElement="li"
				{...props}
				ref={ref}
			>
				DOINGREAT
			</TextGrid>
		)),
		0.1,
	],
	[
		React.forwardRef((props, ref) => (
			<CycleText
				classPrefix="wavebump"
				className="content-node doodle"
				ms={50}
				OuterElement="li"
				{...props}
				ref={ref}
			>
				▁▂▃▅▆▇▇▆▅▃▂▁
			</CycleText>
		)),
		0.3,
	],
	[
		React.forwardRef((props, ref) => (
			<CycleText
				classPrefix="droplet"
				className="content-node doodle"
				ms={150}
				OuterElement="li"
				{...props}
				ref={ref}
			>
				⊙⊚⦾⊛
			</CycleText>
		)),
		0.2,
	],
	[
		React.forwardRef((props, ref) => (
			<CycleText
				classPrefix="circles"
				className="content-node doodle"
				ms={100}
				size={[2, 2]}
				OuterElement="li"
				{...props}
				ref={ref}
			>
				◯⦿◉◎
			</CycleText>
		)),
		0.2,
	],
	[
		React.forwardRef((props, ref) => (
			<li className="content-node snowman doodle" {...props} ref={ref}>
				☃
			</li>
		)),
		0.3,
		() => {
			const month = new Date().getMonth();
			return month < 4 || month === 11;
		},
	],
	[
		React.forwardRef((props, ref) => (
			<CycleText
				classPrefix="wavebump"
				className="content-node tall doodle"
				ms={400}
				OuterElement="li"
				{...props}
				ref={ref}
			>
				Hail Santa!
			</CycleText>
		)),
		0.05,
		() => {
			const today = new Date();
			return today.getMonth() === 11 && today.getDate() === 25;
		},
	],
].map(([Component, chance, fn]) => [
	Component,
	fn ? () => fn() || Math.random() < chance : () => Math.random() < chance,
]);
