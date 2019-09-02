import React from 'react';

export const DweetContent = () => null;
export const ProjectContent = ({description}) =>
	description &&
	description.map((d, i) => (
		<p key={i} dangerouslySetInnerHTML={{__html: d}} />
	));
export const PostContent = ({excerpt, frontmatter: {tldr}}) => (
	<>
		{tldr && <p dangerouslySetInnerHTML={{__html: tldr}} />}
		<p dangerouslySetInnerHTML={{__html: excerpt}} />
	</>
);
export const CommitBlogContent = ({description}) =>
	description && <div dangerouslySetInnerHTML={{__html: description}} />;
export const ArenaChannelContent = ({description, length, updatedAt}) => (
	<>
		{description && <p>{description}</p>}
		<p>
			An Are.na channel with {length} blocks. Last updated{' '}
			{updatedAt.slice(0, 10)}.
		</p>
	</>
);
export const TumblrBlogContent = ({body}) =>
	body && <div dangerouslySetInnerHTML={{__html: body}} />;

export default {
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
	// TODO(riley): Merge both of these with `post`.
	commit: {
		className: 'span-6 commit-blog',
		readableType: 'Commit blog post',
		Inner: CommitBlogContent,
	},
	tumblr: {
		className: 'span-6 tumblr-blog',
		readableType: 'SFPC blog post',
		Inner: TumblrBlogContent,
	},
};
