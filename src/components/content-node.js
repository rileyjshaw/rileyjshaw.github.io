import React from 'react';
import useDimensions from 'react-use-dimensions';

import AutoLink, {ExternalLink} from './auto-link';

import './content-node.css';

const Tags = ({tags}) => (
	<ul className="tags">
		{tags.map(tag => (
			<li key={tag}>{tag}</li>
		))}
	</ul>
);
export const DweetContent = () => null;
export const ProjectContent = ({description, tags}) => (
	<>
		{description &&
			description.map((d, i) => (
				<p key={i} dangerouslySetInnerHTML={{__html: d}} />
			))}
		{tags && <Tags tags={tags} />}
	</>
);
export const PostContent = ({excerpt, frontmatter: {tldr, tags}}) => (
	<>
		{tldr && <p dangerouslySetInnerHTML={{__html: tldr}} />}
		<p dangerouslySetInnerHTML={{__html: excerpt}} />
		{tags && <Tags tags={tags} />}
	</>
);
export const CommitBlogContent = ({description, tags}) => (
	<>
		{description && (
			<div dangerouslySetInnerHTML={{__html: description}} />
		)}
		{tags && <Tags tags={tags} />}
	</>
);
export const ArenaChannelContent = ({description, length, updatedAt}) => (
	<>
		{description && <p>{description}</p>}
		<p>
			An Are.na channel with {length} blocks. Last updated{' '}
			{updatedAt.slice(0, 10)}.
		</p>
	</>
);

const contentTypes = {
	dweet: {
		className: 'span-2 dweet',
		readableType: 'Dweet',
		Inner: DweetContent,
	},
	project: {
		className: 'span-4 project',
		readableType: 'Project',
		Inner: ProjectContent,
	},
	post: {
		className: 'span-6 post',
		readableType: 'Blog post',
		Inner: PostContent,
	},
	arenaChannel: {
		className: 'span-3 arena-channel',
		readableType: 'Are.na channel',
		Inner: ArenaChannelContent,
	},
	// TODO(riley): Merge with `post`.
	commit: {
		className: 'span-6 commit-blog',
		readableType: 'Blog post',
		Inner: CommitBlogContent,
	},
};

// Each content type needs:
//   "uid":
//   "type":
//   "title":
//   "date":
export default props => {
	const {type, title, date, link, uid} = props;
	if (!contentTypes[type]) return null;
	const {className = '', readableType, Inner} = contentTypes[type];

	// TODO(riley): Remove fudge.
	// 62px = gap (30px) + padding (16px * 2) + fudge (20px).
	const [ref, {height}] = useDimensions({liveMeasure: false});
	const span = Math.ceil((height + 82) / 130);

	return (
		<li
			className={`${className} ${
				height ? 'measured ' : ' '
			}content-node`}
			key={uid}
			style={height && {gridRowEnd: `span ${span}`}}
		>
			{/* Note: might be able to make this more semantic. Sources:
			https://stackoverflow.com/questions/12866008/html5-semantic-markup-for-blog-post-tags-and-categories
			https://html.spec.whatwg.org/multipage/links.html#link-type-tag */}
			<div className="inner" ref={ref}>
				<div className="content-type">{readableType}</div>
				<h2>
					{link ? <AutoLink to={link}>{title}</AutoLink> : title}
				</h2>
				<time dateTime={date}>{date.replace(/-/g, '.')}</time>
				<Inner {...props} />
			</div>
		</li>
	);
};

/*
case 'project':
	if (node.tags.includes('starred')) className = 'span-2';
*/