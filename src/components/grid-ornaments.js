import React from 'react';

import TextGrid from './text-grid';
import CycleText from './cycle-text';
import './grid-ornaments.css';

export default () => (
	<>
		<TextGrid
			size={[3, 3]}
			classPrefix="doingreat"
			className="content-node"
			OuterElement="li"
			key="ORNAMENT_1"
		>
			DOINGREAT
		</TextGrid>
		<CycleText
			classPrefix="wavebump"
			className="content-node"
			ms={50}
			OuterElement="li"
			key="ORNAMENT_2"
		>
			▁▂▃▅▆▇▇▆▅▃▂▁
		</CycleText>
		<CycleText
			classPrefix="droplet"
			className="content-node"
			ms={150}
			OuterElement="li"
			key="ORNAMENT_3"
		>
			⊙⊚⦾⊛
		</CycleText>
		<CycleText
			classPrefix="circles"
			className="content-node"
			ms={100}
			size={[2, 2]}
			OuterElement="li"
			key="ORNAMENT_4"
		>
			◯⦿◉◎
		</CycleText>
		<li className="content-node snowman" key="ORNAMENT_5">
			☃
		</li>
		<CycleText
			classPrefix="wavebump"
			className="content-node tall"
			ms={400}
			OuterElement="li"
			key="ORNAMENT_6"
		>
			GrEeTiNgShUmAn
		</CycleText>
	</>
);
