import React from 'react';

import TextGrid from './text-grid';
import CycleText from './cycle-text';
import './grid-ornaments.css';

export default () => (
	<>
		<TextGrid size={[3, 3]} classPrefix="doingreat">
			DOINGREAT
		</TextGrid>
		<CycleText classPrefix="wavebump" ms={50}>
			▁▂▃▅▆▇▇▆▅▃▂▁
		</CycleText>
		<CycleText classPrefix="droplet" ms={150}>
			⊙⊚⦾⊛
		</CycleText>
		<CycleText classPrefix="circles" ms={100} size={[2, 2]}>
			◯⦿◉◎
		</CycleText>
	</>
);
