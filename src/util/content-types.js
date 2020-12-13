import React from 'react';

import AutoLink, {ExternalLink} from '../components/auto-link';

export const TitleOnly = () => null;
export const ProjectContent = ({descriptionList}) =>
	descriptionList && (
		<main>
			{descriptionList.map((d, i) => (
				<p key={i} dangerouslySetInnerHTML={{__html: d}} />
			))}
		</main>
	);
export const PostContent = ({description, link, more}) =>
	description ? (
		<main>
			<div
				className={more ? 'excerpt' : null}
				dangerouslySetInnerHTML={{__html: description}}
			/>
			{more && (
				<p className="continue-reading">
					<AutoLink to={link}>Continue reading</AutoLink>
				</p>
			)}
		</main>
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
export const PatchContent = ({description, link}) => (
	<main>
		{description?.slice(-3) === '...' ? (
			<p>
				{description}{' '}
				<ExternalLink to={link}>
					read the full description at Patchstorage.
				</ExternalLink>
			</p>
		) : (
			<p>{description}</p>
		)}
	</main>
);

export default {
	doodle: {
		readableType: 'Doodle',
	},
	dweet: {
		className: 'span-2',
		readableType: 'Dweet',
		Inner: TitleOnly,
	},
	patch: {
		className: 'span-2',
		readableType: 'Patchstorage module',
		shortType: 'Patch',
		Inner: PatchContent,
	},
	project: {
		className: 'span-4',
		readableType: 'Project',
		Inner: ProjectContent,
	},
	post: {
		className: 'span-6',
		readableType: 'Blog post',
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
	screenshotsTumblr: {
		className: 'span-3',
		readableType: 'Screenshot',
		Inner: TitleOnly,
	},
};
