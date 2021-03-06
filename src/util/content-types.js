import AutoLink, {ExternalLink} from '../components/auto-link';
import React, {useState} from 'react';

const BlockEmbedButton = ({type, onClick}) => (
	<button className="block-embed-button default-button" onClick={onClick}>
		Load embedded media{type ? ` (${type})` : ''}
	</button>
);

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
					read the full description on Patchstorage
				</ExternalLink>
			</p>
		) : (
			<p>{description}</p>
		)}
	</main>
);
export const SongContent = ({title, uid, blockEmbeds}) => {
	const [showEmbed, setShowEmbed] = useState(false);

	return (
		<div className="song-content">
			{!blockEmbeds || showEmbed ? (
				<iframe
					title={`An embedded song called "${title}"`}
					className="soundcloud"
					width="100%"
					height="100"
					scrolling="no"
					frameBorder="no"
					src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${uid.slice(
						uid.indexOf('_') + 1
					)}&color=%23000000&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true`}
				></iframe>
			) : (
				<BlockEmbedButton
					type="SoundCloud"
					onClick={() => setShowEmbed(true)}
				/>
			)}
		</div>
	);
};
export const VideoContent = ({
	blockEmbeds,
	body,
	contentType,
	description,
	title,
	link,
	more,
}) => {
	const [showEmbed, setShowEmbed] = useState(false);

	return (
		<main>
			<div className="video-embed">
				{!blockEmbeds || showEmbed ? (
					{
						vimeo: body && (
							<div dangerouslySetInnerHTML={{__html: body}} />
						),
						youtube: (
							<iframe
								title={`An embedded video called "${title}"`}
								allowFullScreen
								frameBorder="0"
								src={`https://www.youtube-nocookie.com/embed/${body}`}
							></iframe>
						),
					}[contentType]
				) : (
					<BlockEmbedButton
						type={contentType === 'vimeo' ? 'Vimeo' : 'YouTube'}
						onClick={() => setShowEmbed(true)}
					/>
				)}
			</div>
			{description && (
				<>
					<p>{description}</p>
					{more && (
						<p>
							<ExternalLink to={link}>
								Read the full description on{' '}
								{
									{
										vimeo: 'Vimeo',
										youtube: 'YouTube',
									}[contentType]
								}
							</ExternalLink>
						</p>
					)}
				</>
			)}
		</main>
	);
};

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
		className: 'span-4',
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
	song: {
		className: 'span-5',
		readableType: 'Song',
		Inner: SongContent,
	},
	video: {
		className: 'span-4',
		readableType: 'Video',
		Inner: VideoContent,
	},
};
