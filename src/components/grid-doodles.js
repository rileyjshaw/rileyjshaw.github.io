import React from 'react';

import TextGrid from './text-grid';
import CycleText from './cycle-text';

import './grid-doodles.css';

export default [
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
	React.forwardRef((props, ref) => (
		<li className="content-node snowman doodle" {...props} ref={ref}>
			☃
		</li>
	)),
	React.forwardRef((props, ref) => (
		<CycleText
			classPrefix="wavebump"
			className="content-node tall doodle"
			ms={400}
			OuterElement="li"
			{...props}
			ref={ref}
		>
			GrEeTiNgShUmAn
		</CycleText>
	)),
];
