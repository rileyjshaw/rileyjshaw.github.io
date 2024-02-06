import React, {useContext} from 'react';

import ContentNode from './ContentNode';
import {SettingsContext} from './SettingsProvider';

import './ContentGrid.css';

export default React.memo(
	({nodes, hiddenNodes = [], masonry, lazyLoadRef}) => {
		const {theme, blockEmbeds} = useContext(SettingsContext);
		return (
			<ul className={`content-grid${masonry ? ' masonry' : ''}`}>
				{nodes.map((node, i, {length}) => (
					<ContentNode
						theme={theme}
						El="li"
						blockEmbeds={blockEmbeds}
						masonry={masonry}
						ref={i === length - 1 ? lazyLoadRef : null}
						key={node.uid}
						{...node}
					/>
				))}
				{hiddenNodes.map(node => (
					<ContentNode
						theme={theme}
						El="li"
						blockEmbeds={blockEmbeds}
						hidden={true}
						key={node.uid}
						{...node}
					/>
				))}
			</ul>
		);
	},
);
