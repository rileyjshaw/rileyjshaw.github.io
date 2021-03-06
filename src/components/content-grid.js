import './content-grid.css';
import ContentNode from './content-node';
import {SettingsContext} from './settings-provider';
import React, {useContext} from 'react';

export default React.memo(
	React.forwardRef(({nodes, masonry}, ref) => {
		const {theme, blockEmbeds} = useContext(SettingsContext);
		return (
			<ul className={`content-grid${masonry ? ' masonry' : ''}`}>
				{nodes.map((node, i, {length}) => (
					<ContentNode
						theme={theme}
						blockEmbeds={blockEmbeds}
						masonry={masonry}
						ref={i === length - 1 ? ref : null}
						key={node.uid}
						{...node}
					/>
				))}
			</ul>
		);
	})
);
