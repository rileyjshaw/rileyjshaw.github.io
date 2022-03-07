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
		<img
			src={image.url}
			width={image.width}
			height={image.height}
			alt={`${title} icon`}
		/>
	</main>
);
export const DweetContent = ({title, blockEmbeds}) => {
	const [showEmbed, setShowEmbed] = useState(false);

	return (
		<div className="dweet-content">
			{!blockEmbeds || showEmbed ? (
				<iframe
					width="100%"
					height="100%"
					frameBorder="0"
					src={`https://www.dwitter.net/e/${title.slice(1)}`}
					allowFullScreen="true"
				/>
			) : (
				<BlockEmbedButton
					type="Dwitter"
					onClick={() => setShowEmbed(true)}
				/>
			)}
		</div>
	);
};
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
	image,
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
					<div
						style={{
							backgroundImage: `url(${image.url})`,
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						<BlockEmbedButton
							type={
								contentType === 'vimeo' ? 'Vimeo' : 'YouTube'
							}
							onClick={() => setShowEmbed(true)}
						/>
					</div>
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
export const ScreenshotContent = ({body, link, contentType, extraData}) => {
	let innerContent;
	switch (contentType) {
		case 'photo':
			// TODO: If embeds are turned off, make innerContent something like:
			// <ExternalLink to={link}>See ${extraData[2]} images</ExternalLink>
			innerContent = (
				<>
					<ExternalLink className="image-link" to={link}>
						<img
							height={extraData[1]}
							src={body}
							width={extraData[0]}
						/>
					</ExternalLink>
					{extraData[2] > 1 && (
						<p>
							<ExternalLink to={link}>
								+ {extraData[2] - 1} more images
							</ExternalLink>
						</p>
					)}
				</>
			);
			break;
		case 'video':
			innerContent = (
				<video
					autoPlay
					controls
					height={extraData[1] || 'auto'}
					loop
					muted
					src={body}
					width={extraData[0]}
				/>
			);
			break;
		case 'audio':
			innerContent = <audio controls preload="none" src={body} />;
			break;
	}
	return <main className="screenshot-content">{innerContent}</main>;
};

export default {
	doodle: {
		readableType: 'Doodle',
	},
	dweet: {
		className: 'span-5',
		readableType: 'Dweet',
		Inner: DweetContent,
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
		Inner: ScreenshotContent,
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
