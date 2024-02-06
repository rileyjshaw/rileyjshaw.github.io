import {Link} from 'gatsby';
import React from 'react';

import contentTypes from '../util/ContentTypes';
import AutoLink from './AutoLink';

import './ContentList.css';

const blogTypes = ['post', 'commit', 'tumblr', 'screenshotsTumblr'];
export default React.memo(({nodes}) => (
	<ul className="content-list">
		{nodes.map(node => {
			const contentType = contentTypes[node.type];
			if (!contentType) return null;

			const type = contentType.readableType.toLowerCase();
			const title = `“${node.title}”`;
			const project = node.link ? (
				<AutoLink
					to={node.link}
					dangerouslySetInnerHTML={{__html: title}}
				/>
			) : (
				<span dangerouslySetInnerHTML={{__html: title}} />
			);

			const destination = blogTypes.includes(node.type) ? (
				<Link to="/blog">the blog</Link>
			) : (
				<Link to="/lab">the lab</Link>
			);

			return (
				<li key={node.uid}>
					<span className="item-date">
						<time dateTime={node.date}>
							{node.date.replace(/-/g, '.')}
						</time>
						:
					</span>{' '}
					<span className="item-content">
						New {type} {project} added to {destination}.
					</span>
				</li>
			);
		})}
	</ul>
));
