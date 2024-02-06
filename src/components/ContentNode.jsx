import React from 'react';

import cn from 'cnz';

import contentTypes from '../util/ContentTypes';
import {useRect} from '../util/hooks';
import AutoLink, {ExternalLink} from './AutoLink';

import './ContentNode.css';

// TODO: Break this component and the grid fitting component out into separate
//       files.
// Each content type needs:
//   "uid":
//   "type":
//   "title":
//   "date":
export default React.memo(
	React.forwardRef(function ContentNode(props, ref) {
		const {
			El = 'div',
			type,
			title,
			date,
			link,
			repo,
			uid,
			tags,
			Doodle,
			// Warning: `masonry` cannot change within the component’s lifetime.
			masonry,
			hidden,
		} = props;

		if (type === 'doodle') return <Doodle ref={ref} {...props} />;

		const contentType = contentTypes[type];
		if (!contentType) return null;
		const {className = '', readableType, shortType, Inner} = contentType;

		let innerRef, innerRect, span;
		if (masonry) {
			[innerRef, innerRect] = useRect();
			// Inner: Math.ceil((height + 27) / (27 * 2))
			//                            ^ "+ 27" accounts for height falling within gap.
			//     (27 * 2) is the row + gap height ^
			// With outer padding: Math.ceil((height + 27 + 46) / (27 * 2))
			//                    = Math.ceil(height / 54) + 1
			// TODO(riley): Was this with the new design system.
			// const span = height && Math.ceil((height + 19) / 54) + 1;
			span = innerRect && Math.ceil((innerRect.height + 82) / 130);
		}

		return (
			<El
				className={cn(
					'content-node',
					className,
					type
						.split(/(?=[A-Z])/)
						.join('-')
						.toLowerCase(),
					masonry && (innerRect ? 'measured' : 'transparent'),
					hidden && 'visually-hidden',
				)}
				key={uid}
				ref={ref}
				style={span && masonry ? {gridRowEnd: `span ${span}`} : null}
			>
				{/* Note: might be able to make this more semantic. Sources:
			https://stackoverflow.com/questions/12866008/html5-semantic-markup-for-blog-post-tags-and-categories
			https://html.spec.whatwg.org/multipage/links.html#link-type-tag */}
				<div className="inner" ref={innerRef}>
					<div className="content-type">
						{shortType ?? readableType}
					</div>
					<header>
						{link ? (
							<h1>
								<AutoLink
									to={link}
									dangerouslySetInnerHTML={{__html: title}}
								/>
							</h1>
						) : (
							<h1 dangerouslySetInnerHTML={{__html: title}} />
						)}
						<div className="subheading">
							<time dateTime={date}>
								{date.replace(/-/g, '.')}
							</time>
							{repo && (
								<>
									{' '}
									• From repository{' '}
									<ExternalLink
										to={`https://github.com/${repo}`}
									>
										{repo}
									</ExternalLink>
								</>
							)}
						</div>
					</header>
					<Inner {...props} />
					{tags && (
						<footer>
							<ul className="tags">
								{tags.map(tag => (
									<li key={tag}>{tag}</li>
								))}
							</ul>
						</footer>
					)}
				</div>
			</El>
		);
	}),
);

/*
case 'project':
	if (node.tags.includes('starred')) className = 'span-2';
*/
