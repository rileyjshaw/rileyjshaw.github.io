import React from 'react';

export const DweetContent = () => null;
export const ProjectContent = ({description}) =>
	description &&
	description.map((d, i) => (
		<p key={i} dangerouslySetInnerHTML={{__html: d}} />
	));
export const PostContent = ({description, more}) =>
	description ? (
		<div
			className={more && 'excerpt'}
			dangerouslySetInnerHTML={{__html: description}}
		/>
	) : null;
export const ArenaChannelContent = ({description, length, updatedAt}) => (
	<>
		{description && <p>{description}</p>}
		<p>
			An Are.na channel with {length} blocks. Last updated{' '}
			{updatedAt.slice(0, 10)}.
		</p>
	</>
);
export const IconContent = ({image, title}) => (
	<img src={image} alt={`${title} icon`} />
);

export default {
	doodle: {
		readableType: 'Doodle',
	},
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
		readableType: 'Old blog post',
		Inner: PostContent,
	},
	arenaChannel: {
		className: 'span-3 arena-channel',
		readableType: 'Are.na channel',
		Inner: ArenaChannelContent,
	},
	icon: {
		className: 'span-3 icon',
		readableType: 'Icon',
		Inner: IconContent,
	},
	commit: {
		className: 'span-6 commit-blog',
		readableType: 'Commit blog post',
		Inner: PostContent,
	},
	tumblr: {
		className: 'span-6 tumblr-blog',
		readableType: 'SFPC blog post',
		Inner: PostContent,
	},
};
