import React from 'react';

export const DweetContent = () => null;
export const ProjectContent = ({description}) =>
	description && (
		<main>
			{description.map((d, i) => (
				<p key={i} dangerouslySetInnerHTML={{__html: d}} />
			))}
		</main>
	);
export const PostContent = ({description, more}) =>
	description ? (
		<main
			className={more ? 'excerpt' : null}
			dangerouslySetInnerHTML={{__html: description}}
		/>
	) : null;
export const ArenaChannelContent = ({description, length, updatedAt}) => (
	<main>
		{description && <p>{description}</p>}
		<p>
			An Are.na channel with {length} blocks. Last updated{' '}
			{updatedAt.slice(0, 10)}.
		</p>
	</main>
);
export const IconContent = ({image, title}) => (
	<main>
		<img src={image} width={84} height={84} alt={`${title} icon`} />
	</main>
);

export default {
	doodle: {
		readableType: 'Doodle',
	},
	dweet: {
		className: 'span-2',
		readableType: 'Dweet',
		Inner: DweetContent,
	},
	project: {
		className: 'span-4',
		readableType: 'Project',
		Inner: ProjectContent,
	},
	post: {
		className: 'span-6',
		readableType: 'Old blog post',
		Inner: PostContent,
	},
	arenaChannel: {
		className: 'span-3',
		readableType: 'Are.na channel',
		Inner: ArenaChannelContent,
	},
	icon: {
		className: 'span-3',
		readableType: 'Icon',
		Inner: IconContent,
	},
	commit: {
		className: 'span-6',
		readableType: 'Commit blog post',
		Inner: PostContent,
	},
	tumblr: {
		className: 'span-6',
		readableType: 'SFPC blog post',
		Inner: PostContent,
	},
};
