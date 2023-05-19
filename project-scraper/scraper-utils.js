import 'dotenv/config';
import fs from 'fs';
import {google} from 'googleapis';
import {JSDOM} from 'jsdom';
import stableStringify from 'json-stable-stringify';
import OAuth from 'oauth';
import request from 'request-promise-native';
import RssParser from 'rss-parser';
import tumblr from 'tumblr.js';
import url, {URL} from 'url';
import util from 'util';
import {Vimeo} from 'vimeo';

const raw = {}; // Raw is completely overwritten, but we append to formatted and quotes.
const formatted = JSON.parse(
	fs.readFileSync(
		new URL('_generated/scraped-projects-formatted.json', import.meta.url)
			.pathname
	)
);
const scrapedQuotes = JSON.parse(
	fs.readFileSync(
		new URL('_generated/scraped-quotes.json', import.meta.url).pathname
	)
);
// Mutate an object by deleting specific keys. Keys can be simple strings to
// remove at the root level, or nested with special characters “.” and “[”.
//
//   . - Remove the key from a nested object. Eg: 'user.name'.
//   [ - Remove the key from each item in an array. Eg: 'users[name'.
//
// Special characters can be combined. For instance: 'posts[author.id'.
const deleteKeys = keys => initialObject => {
	function processKey(key, obj) {
		const nextSpecialCharacter = key.match(/[.[]/);
		if (!nextSpecialCharacter) {
			delete obj[key];
		} else {
			const nestedKey = key.slice(nextSpecialCharacter.index + 1);
			const nestedObj = obj[key.slice(0, nextSpecialCharacter.index)];
			switch (nextSpecialCharacter[0]) {
				case '.':
					processKey(nestedKey, nestedObj);
					break;
				case '[':
					nestedObj.forEach(o => processKey(nestedKey, o));
					break;
			}
		}
	}
	keys.forEach(key => processKey(key, initialObject));
	return initialObject;
};

const processArena = deleteKeys(['contents', 'added_to_at', 'user']);
const processIcon = deleteKeys(['icon_url']);
const processPatch = deleteKeys(['view_count']);
const processSong = deleteKeys([
	'monetization_model',
	'policy',
	'playback_count',
	'user',
	'track_authorization',
]);
const processTumblrPost = deleteKeys(['blog']);

export const idify = uid =>
	uid
		.replace(/[-. ]/g, '_')
		.replace(/\W/g, char => char.codePointAt(0).toString(36))
		.toUpperCase();

export const excerptify = body => {
	if (!body) return {};

	function processNode(node) {
		if (
			['IMG', 'IFRAME'].includes(node.nodeName) ||
			node.textContent.length === 0 ||
			node.className === 'gatsby-resp-image-wrapper'
		) {
			node.remove();
		}

		Array.from(node.children).forEach(processNode);
		return node;
	}
	const processed = Array.from(
		processNode(JSDOM.fragment(body)).children
	).reduce(
		// Limit the excerpt to 700 characters.
		({charCount, els}, el) => {
			if (charCount > 700) return {charCount, els, more: true};
			// TODO:
			// if (charCount + el.textContent.length > 700) {
			// Recursively go through Array.from(el.children).reverse(), and delete
			// nodes until it’s under 700 characters.
			// }
			return {
				charCount: charCount + el.textContent.length,
				els: [...els, el],
				more: false,
			};
		},
		{charCount: 0, els: [], more: false}
	);
	const {els: excerpt, more} = processed;
	let {charCount} = processed;

	// Never end on a header.
	while (excerpt[excerpt.length - 1]?.nodeName.startsWith('H')) {
		charCount -= excerpt.pop().textContent.length;
	}

	// There should never be a H1 in the excerpt. If there is, demote all
	// headings.
	let description;
	if (excerpt.some(el => el.nodeName === 'H1')) {
		description = excerpt
			.map(el => {
				if (!el.nodeName.startsWith('H')) return el.outerHTML;

				// Increment heading numbers. Eg, <H1> => <H2>.
				return el.outerHTML.replace(
					/<(\/?)H([1-5])>/gi,
					(_, slash, n) => `<${slash}h${parseInt(n) + 1}>`
				);
			})
			.join('');
	} else {
		description = excerpt.map(el => el.outerHTML).join('');
	}

	// TODO(riley): Use charCount to slice the textContent of the final node?
	return {description, more};
};

async function getDweets() {
	try {
		let url = 'https://www.dwitter.net/api/dweets/?author=rileyjshaw';
		let dweets = [];
		while (url) {
			const response = JSON.parse(await request(url));
			console.log(`Got ${response.results.length} dweets.`);
			dweets = dweets.concat(response.results);
			url = response.next;
		}
		raw.dweets = dweets;
		dweets.forEach(dweet => {
			const uid = idify(`DWEET_${dweet.id}`);
			const index = formatted.findIndex(d => d.uid === uid);
			const result = {
				uid,
				type: 'dweet',
				title: `#${dweet.id}`,
				date: dweet.posted.slice(0, 10),
				link: dweet.link,
			};
			if (index !== -1) formatted[index] = result;
			else formatted.push(result);
		});
	} catch (err) {
		console.error('Error while fetching Dweets:', err);
	}
}

// Note: Tag a patch as “tiny” to prevent it showing up on the homepage feed.
async function getPatches() {
	try {
		const url =
			'https://patchstorage.com/api/alpha/patches?author=6265&per_page=20';
		let page = 1,
			totalPages = 0;

		let patches = [];
		do {
			const response = await request({
				uri: `${url}&page=${page}`,
				method: 'GET',
				resolveWithFullResponse: true,
			});
			const body = JSON.parse(response.body);
			console.log(`Got ${body.length} patches.`);
			patches = patches.concat(body);
			totalPages = +response.headers['x-wp-totalpages'];
		} while (page++ < totalPages);
		patches.forEach(processPatch);
		raw.patches = patches;
		patches.forEach(patch => {
			const uid = idify(`PATCH_${patch.id}`);
			const index = formatted.findIndex(d => d.uid === uid);
			const result = {
				uid,
				type: 'patch',
				title: patch.title,
				description: patch.excerpt,
				date: patch.created_at.slice(0, 10),
				link: patch.link,
				coolness: patch.tags.some(t => t.slug === 'tiny') ? 21 : 41,
			};
			if (index !== -1) formatted[index] = result;
			else formatted.push(result);
		});
	} catch (err) {
		console.error('Error while fetching Patches:', err);
	}
}

async function getArena() {
	try {
		const url = `http://api.are.na/v2/users/riley-shaw/channels?access_token=${process.env.ARENA_SECRET}`;
		const response = JSON.parse(await request(url));
		const channels = response.channels.filter(
			channel =>
				channel.published &&
				channel.status !== 'private' &&
				channel.owner_id === 72803
		);
		channels.forEach(processArena);
		raw.arena = channels;
		console.log(`Got ${channels.length} Are.na channels.`);
		channels
			.filter(channel => channel.length > 20)
			.forEach(channel => {
				const uid = idify(`ARENA_${channel.slug}`);
				const index = formatted.findIndex(d => d.uid === uid);
				const result = {
					uid,
					type: 'arenaChannel',
					title: channel.title,
					date: channel.created_at.slice(0, 10),
					link: `https://are.na/riley-shaw/${channel.slug}`,
					description: channel.metadata?.description,
					updatedAt: channel.updated_at.slice(0, 10),
					length: channel.length,
				};
				if (index !== -1) formatted[index] = result;
				else formatted.push(result);
			});
	} catch (err) {
		console.error('Error while fetching Are.na channels:', err);
	}
}

async function getCommitBlog() {
	const url = 'https://rileyjshaw.commit--blog.com/feed';
	const parser = new RssParser();
	try {
		const feed = await parser.parseURL(url);
		raw.commitBlog = feed.items;
		console.log(`Got ${feed.items.length} Commit Blog entries.`);
		feed.items.forEach(commit => {
			const uid = idify(
				`COMMIT_${commit.id.slice(commit.id.lastIndexOf('/') + 1)}`
			);
			const index = formatted.findIndex(d => d.uid === uid);
			const body = commit.content?.replace(/<br>\n/g, ' ');
			const result = {
				uid,
				type: 'commit',
				title: commit.title,
				date: commit.isoDate.slice(0, 10),
				link: commit.link,
				repo: commit.link.match(
					/commit--blog\.com\/([^/]*\/[^/]*)/
				)[1],
				body,
				...excerptify(body),
			};

			if (index !== -1) formatted[index] = result;
			else formatted.push(result);
		});
	} catch (err) {
		console.error('Error while fetching Commit Blog:', err);
	}
}

function getSFPCTumblr() {
	const client = tumblr.createClient({
		credentials: {
			consumer_key: process.env.TUMBLR_KEY,
			consumer_secret: process.env.TUMBLR_SECRET,
		},
		returnPromises: true,
	});

	let allPosts = [];
	return (function getPage(queryParams = {}) {
		return client
			.blogPosts('sfpc', queryParams)
			.then(({posts, total_posts}) => {
				allPosts = allPosts.concat(posts);
				console.log(`Got ${posts.length} SFPC Tumblr posts.`);
				if (allPosts.length < total_posts) {
					return getPage({offset: allPosts.length});
				} else {
					allPosts.forEach(processTumblrPost);
					raw.sfpcTumblr = allPosts;
					allPosts.forEach(post => {
						const uid = idify(`SFPC_TUMBLR_${post.id}`);
						switch (post.type) {
							case 'quote':
								const quoteIndex = scrapedQuotes.findIndex(
									post => post.uid === uid
								);
								const sourceDoc = JSDOM.fragment(post.source);
								const sourceAnchor =
									sourceDoc.querySelector('a');
								let cite = sourceAnchor?.href;
								if (
									cite?.startsWith(
										'https://t.umblr.com/redirect'
									)
								) {
									cite = url.parse(cite, true).query.z;
								}
								const quoteResult = {
									uid,
									content: post.text,
									source:
										sourceAnchor?.textContent ||
										sourceDoc.textContent,
									cite,
									relatedLink: post.post_url,
								};
								if (quoteIndex !== -1)
									scrapedQuotes[quoteIndex] = quoteResult;
								else scrapedQuotes.push(quoteResult);
								return;
							// TODO(riley): Should I handle these?
							case 'chat':
							case 'link':
							case 'photo':
							case 'video':
							case 'audio':
								return;
							case 'text':
								const textIndex = formatted.findIndex(
									post => post.uid === uid
								);
								const textResult = {
									uid,
									type: 'tumblr',
									date: post.date.slice(0, 10),
									link: post.post_url,
									contentType: post.type,
									title: post.title || post.summary,
									body: post.body,
									...excerptify(post.body),
								};
								if (textIndex !== -1)
									formatted[textIndex] = textResult;
								else formatted.push(textResult);
						}
					});
				}
			})
			.catch(err => {
				console.error('Error while fetching SFPC Tumblr:', err);
			});
	})();
}

function getScreenshotsTumblr() {
	const client = tumblr.createClient({
		credentials: {
			consumer_key: process.env.TUMBLR_KEY,
			consumer_secret: process.env.TUMBLR_SECRET,
		},
		returnPromises: true,
	});

	let allPosts = [];
	return (function getPage(queryParams = {}) {
		return client
			.blogPosts('screeenshots', queryParams)
			.then(({posts, total_posts}) => {
				allPosts = allPosts.concat(posts);
				console.log(`Got ${posts.length} Screenshots Tumblr posts.`);
				if (allPosts.length < total_posts) {
					return getPage({offset: allPosts.length});
				} else {
					allPosts.forEach(processTumblrPost);
					raw.screenshotsTumblr = allPosts;
					allPosts.forEach(post => {
						const uid = idify(`SCREENSHOTS_TUMBLR_${post.id}`);
						let body,
							fileType,
							extraData = [],
							contentType;
						switch (post.type) {
							case 'text':
								// If the post is classified as “text”, it was
								// probably uploaded from mobile. Assume it’s a
								// photo.
								const img = JSDOM.fragment(
									post.body
								).querySelector('img');
								if (!img) return;
								contentType = 'photo';
								fileType = 'png';
								body = img.src;
								extraData = [
									+img.getAttribute('data-orig-width'),
									+img.getAttribute('data-orig-height'),
									1,
								];
								break;
							case 'photo':
								fileType = 'png';
								const {photos} = post;
								// TODO: Use a smaller one.
								const photo = photos[0].original_size;
								body = photo.url;
								extraData = [
									photo.width,
									photo.height,
									photos.length,
								];
								break;
							case 'video':
								fileType = 'mov';
								body = post.video_url;
								extraData = [
									post.player[0].width,
									+post.player[0].embed_code.match(
										/height=['"](\d+)['"]/
									)?.[1] ?? 0,
								];
								break;
							case 'audio':
								fileType = 'wav';
								body = post.audio_url;
								break;
						}
						if (!fileType) return;

						const textIndex = formatted.findIndex(
							post => post.uid === uid
						);
						const unadjustedDate = new Date(post.timestamp * 1000);
						// The blog is in the Eastern timezone, and
						// we also need to account for DST.
						const localTimezoneOffsetFromEastern =
							(new Date('January 1, 2020').getTimezoneOffset() -
								5 * 60) *
							60 *
							1000;
						const date = new Date(
							unadjustedDate.getTime() +
								localTimezoneOffsetFromEastern
						);
						const title = `${date.getFullYear()}-${`${
							date.getMonth() + 1
						}`.padStart(2, 0)}-${`${date.getDate()}`.padStart(
							2,
							0
						)} at ${`${date.getHours()}`.padStart(
							2,
							0
						)}.${`${date.getMinutes()}`.padStart(
							2,
							0
						)}.${`${date.getSeconds()}`.padStart(
							2,
							0
						)}.${fileType}`;
						const result = {
							uid,
							type: 'screenshotsTumblr',
							date: post.date.slice(0, 10),
							link: post.post_url,
							contentType: contentType || post.type,
							title,
							body,
							extraData,
						};
						if (textIndex !== -1) formatted[textIndex] = result;
						else formatted.push(result);
					});
				}
			})
			.catch(err => {
				console.error('Error while fetching Screenshots Tumblr:', err);
			});
	})();
}

function getIcons() {
	const auth = new OAuth.OAuth(
		'https://api.thenounproject.com',
		'https://api.thenounproject.com',
		process.env.NOUN_PROJECT_KEY,
		process.env.NOUN_PROJECT_SECRET,
		'1.0',
		null,
		'HMAC-SHA1'
	);

	return util
		.promisify(auth.get.bind(auth))(
			'http://api.thenounproject.com/user/riley/uploads',
			null,
			null
		)
		.then(JSON.parse)
		.then(({uploads}) => {
			uploads.forEach(processIcon);
			raw.nounIcons = uploads;
			console.log(`Got ${uploads.length} The Noun Project icons.`);
			uploads.forEach(upload => {
				const uid = idify(`ICON_${upload.id}`);
				const index = formatted.findIndex(post => post.uid === uid);
				const result = {
					uid,
					type: 'icon',
					title:
						upload.term[0].toUpperCase() +
						upload.term.slice(1).toLowerCase().replace(/-/g, ' '),
					date: upload.date_uploaded,
					link: `https://thenounproject.com${upload.permalink}`,
					image: {
						height: 84,
						width: 84,
						url: upload.preview_url_84,
					},
				};
				if (index !== -1) formatted[index] = result;
				else formatted.push(result);
			});
		})
		.catch(err => {
			console.error('Error while fetching The Noun Project icons:', err);
		});
}

// The official SoundCloud API is disallowing new registrations, so I’m just
// using their client-side api-v2 routes for now.
async function getSoundCloud() {
	try {
		let url = `https://api-v2.soundcloud.com/users/${process.env.SOUNDCLOUD_USER_ID}/tracks?limit=20&offset=0`;
		let songs = [];
		while (url) {
			const response = JSON.parse(
				await request(
					`${url}&client_id=${process.env.SOUNDCLOUD_CLIENT_ID}`
				)
			);
			if (response.collection.length || response.next_href) {
				console.log(`Got ${response.collection.length} songs.`);
			}
			songs = songs.concat(response.collection);
			url = response.next_href;
		}
		songs.forEach(processSong);
		raw.songs = songs;
		songs
			.filter(song => !song.tag_list.split(' ').includes('hide'))
			.forEach(song => {
				const uid = idify(`SONG_${song.id}`);
				const index = formatted.findIndex(s => s.uid === uid);
				const result = {
					uid,
					type: 'song',
					title: song.title,
					date: song.created_at.slice(0, 10),
					link: song.permalink_url,
				};
				if (index !== -1) formatted[index] = result;
				else formatted.push(result);
			});
	} catch (err) {
		console.error('Error while fetching SoundCloud tracks:', err);
		console.error(
			'Your SOUNDCLOUD_CLIENT_ID in .env might be out of date.'
		);
		console.error(
			'Check the Network tab on soundcloud.com to get a new one.'
		);
	}
}

async function getYoutube() {
	try {
		const youtube = google.youtube({
			version: 'v3',
			auth: process.env.YOUTUBE_KEY,
		});
		const uploadsPlaylistId = (
			await util.promisify(youtube.channels.list.bind(youtube))({
				forUsername: 'rileyjshaw',
				part: 'id,snippet,contentDetails',
			})
		).data.items[0].contentDetails.relatedPlaylists.uploads;
		const requestConfig = {
			part: 'snippet',
			playlistId: uploadsPlaylistId,
		};
		let videos = [];
		do {
			const {data} = await util.promisify(
				youtube.playlistItems.list.bind(youtube)
			)(requestConfig);
			console.log(`Got ${data.items.length} YouTube videos.`);
			videos = videos.concat(data.items.map(v => v.snippet));
			requestConfig.pageToken = data.nextPageToken;
		} while (requestConfig.pageToken);
		return videos;
	} catch (err) {
		console.error('Error while fetching YouTube videos:', err);
	}
}

async function getVimeo() {
	const vimeoClient = new Vimeo(
		process.env.VIMEO_CLIENT_ID,
		process.env.VIMEO_CLIENT_SECRET,
		process.env.VIMEO_ACCESS_TOKEN_2
	);
	return new Promise((resolve, reject) => {
		(function nextRequest(url, videos = []) {
			vimeoClient.request(
				{
					method: 'GET',
					path: url,
				},
				async function (error, body) {
					if (error) {
						reject(error);
					}
					const nextUrl = body.paging.next;
					const newVideos = await Promise.all(
						body.data
							.filter(video => video.privacy.view === 'anybody')
							.map(async ({metadata, ...video}) => {
								const pictures = await util.promisify(
									vimeoClient.request.bind(vimeoClient)
								)({
									method: 'GET',
									path: metadata.connections.pictures.uri,
								});
								return {
									...video,
									pictures,
								};
							})
					);
					console.log(`Got ${newVideos.length} Vimeo videos.`);
					videos = videos.concat(newVideos);
					if (nextUrl) {
						nextRequest(nextUrl, videos);
					} else {
						resolve(videos);
					}
				}
			);
		})(
			'/me/videos?fields=uri,name,description,link,embed.html,created_time,privacy,metadata.connections&filter_playable=true'
		);
	});
}

async function getVideos() {
	return Promise.all([getVimeo(), getYoutube()])
		.then(([vimeo, youtube]) => {
			raw.videos = {vimeo, youtube};
			vimeo.forEach(video => {
				const uid = idify(`VIDEO_V_${video.uri.slice(8)}`);
				const index = formatted.findIndex(d => d.uid === uid);
				const descriptionList = video.description.split('\n');
				const images = video.pictures.data[0].sizes;
				const image = images[images.length - 1];
				const result = {
					uid,
					type: 'video',
					contentType: 'vimeo',
					title: video.name,
					description: descriptionList[0],
					image: {
						height: image.height,
						width: image.width,
						url: image.link,
					},
					body:
						video.privacy.embed === 'public' &&
						video.embed.html.replace(
							/ ?(width|height)="[0-9]+"/gi,
							''
						),
					date: video.created_time.slice(0, 10),
					link: video.link,
					more: descriptionList.length > 1,
				};
				if (index !== -1) formatted[index] = result;
				else formatted.push(result);
			});
			youtube.forEach(video => {
				const {videoId} = video.resourceId;
				const uid = idify(`VIDEO_Y_${videoId}`);
				const index = formatted.findIndex(d => d.uid === uid);
				const descriptionList = video.description.split('\n');
				const result = {
					uid,
					type: 'video',
					contentType: 'youtube',
					title: video.title,
					description: descriptionList[0],
					image: Object.values(video.thumbnails).reduce(
						(bestQuality, video) => {
							if (video.width > bestQuality.width) return video;
							return bestQuality;
						}
					),
					body: videoId,
					date: video.publishedAt.slice(0, 10),
					link: `https://youtube.com/watch?v=${videoId}`,
					more: descriptionList.length > 1,
				};
				if (index !== -1) formatted[index] = result;
				else formatted.push(result);
			});
		})
		.catch(err => {
			console.log(`Error while fetching videos: ${err}`);
		});
}

export function getAll() {
	return Promise.all([
		getDweets(),
		getPatches(),
		getArena(),
		getCommitBlog(),
		getSFPCTumblr(),
		getScreenshotsTumblr(),
		getIcons(),
		getSoundCloud(),
		getVideos(),
	])
		.then(() => {
			fs.writeFileSync(
				new URL(
					'_generated/scraped-projects-raw.json',
					import.meta.url
				).pathname,
				stableStringify(raw, {space: '\t'})
			);
			fs.writeFileSync(
				new URL(
					'_generated/scraped-projects-formatted.json',
					import.meta.url
				).pathname,
				stableStringify(
					formatted.sort(({uid: a = ''}, {uid: b = ''}) =>
						a.localeCompare(b)
					),
					{space: '\t'}
				)
			);
			fs.writeFileSync(
				new URL('_generated/scraped-quotes.json', import.meta.url)
					.pathname,
				stableStringify(
					scrapedQuotes.sort(({uid: a = ''}, {uid: b = ''}) =>
						a.localeCompare(b)
					),
					{space: '\t'}
				)
			);
		})
		.catch(err => {
			console.log(`Error while scraping content: ${err}`);
		});
}
