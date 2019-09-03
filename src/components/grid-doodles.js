import React from 'react';

import TextGrid from './text-grid';
import CycleText from './cycle-text';

import './grid-doodles.css';

export default [
	<TextGrid
		size={[3, 3]}
		classPrefix="doingreat"
		className="content-node"
		OuterElement="li"
	>
		DOINGREAT
	</TextGrid>,
	<CycleText
		classPrefix="wavebump"
		className="content-node"
		ms={50}
		OuterElement="li"
	>
		▁▂▃▅▆▇▇▆▅▃▂▁
	</CycleText>,
	<CycleText
		classPrefix="droplet"
		className="content-node"
		ms={150}
		OuterElement="li"
	>
		⊙⊚⦾⊛
	</CycleText>,
	<CycleText
		classPrefix="circles"
		className="content-node"
		ms={100}
		size={[2, 2]}
		OuterElement="li"
	>
		◯⦿◉◎
	</CycleText>,
	<li className="content-node snowman">☃</li>,
	<CycleText
		classPrefix="wavebump"
		className="content-node tall"
		ms={400}
		OuterElement="li"
	>
		GrEeTiNgShUmAn
	</CycleText>,
];
