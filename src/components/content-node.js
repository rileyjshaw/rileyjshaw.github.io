import React from 'react';
import useDimensions from 'react-use-dimensions';

import AutoLink from './auto-link';
import contentTypes from '../util/content-types';

import './content-node.css';

// Each content type needs:
//   "uid":
//   "type":
//   "title":
//   "date":
export default props => {
	const {type, title, date, link, uid, tags, rendered} = props;
	if (rendered) return rendered;

	if (!contentTypes[type]) return null;
	const {className = '', readableType, Inner} = contentTypes[type];

	// TODO(riley): Remove fudge.
	// 82px = gap (30px) + padding (16px * 2) + fudge (20px).
	const [ref, {height}] = useDimensions({liveMeasure: false});
	const span = Math.ceil((height + 82) / 130);

	return (
		<li
			className={`${className} ${height ? '' : 'un'}measured
			content-node`}
			key={uid}
			style={height && {gridRowEnd: `span ${span}`}}
		>
			{/* Note: might be able to make this more semantic. Sources:
			https://stackoverflow.com/questions/12866008/html5-semantic-markup-for-blog-post-tags-and-categories
			https://html.spec.whatwg.org/multipage/links.html#link-type-tag */}
			<div className="inner" ref={ref}>
				<div className="content-type">{readableType}</div>
				<h3>
					{link ? <AutoLink to={link}>{title}</AutoLink> : title}
				</h3>
				<time dateTime={date}>{date.replace(/-/g, '.')}</time>
				<Inner {...props} />
				{tags && (
					<ul className="tags">
						{tags.map(tag => (
							<li key={tag}>{tag}</li>
						))}
					</ul>
				)}
			</div>
		</li>
	);
};

/*
case 'project':
	if (node.tags.includes('starred')) className = 'span-2';
*/
