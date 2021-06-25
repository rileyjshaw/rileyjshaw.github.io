'use strict';

require('dotenv').config();

const util = require('util');
const fs = require('fs');
const url = require('url');
const tumblr = require('tumblr.js');
const {Vimeo} = require('vimeo');
const {google} = require('googleapis');
const RssParser = require('rss-parser');
const request = require('request-promise-native');
const OAuth = require('oauth');
const {JSDOM} = require('jsdom');
const stableStringify = require('json-stable-stringify');

const raw = {}; // Raw is completely overwritten, but we append to formatted and quotes.
const formatted = JSON.parse(
	fs.readFileSync(
		'./project-scraper/_generated/scraped-projects-formatted.json'
	)
);
const scrapedQuotes = JSON.parse(
	fs.readFileSync('./project-scraper/_generated/scraped-quotes.json')
);

const idify = uid => uid.toUpperCase().replace(/-/g, '_');
const excerptify = body => {
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
			// if (charCount + charCount + el.textContent.length > 700) {
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
		const channels = (raw.arena = response.channels.filter(
			channel => channel.published && channel.status !== 'private'
		));
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
			.then(
				({
					posts,
					total_posts,
					_links: {
						next: {query_params},
					},
				}) => {
					allPosts = allPosts.concat(posts);
					console.log(`Got ${posts.length} SFPC Tumblr posts.`);
					if (query_params.offset < total_posts) {
						return getPage(query_params);
					} else {
						raw.sfpcTumblr = allPosts;
						allPosts.forEach(post => {
							const uid = idify(`SFPC_TUMBLR_${post.id}`);
							switch (post.type) {
								case 'quote':
									const quoteIndex = scrapedQuotes.findIndex(
										post => post.uid === uid
									);
									const sourceDoc = JSDOM.fragment(
										post.source
									);
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
										scrapedQuotes[quoteIndex] =
											quoteResult;
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
				}
			)
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
			.then(
				({
					posts,
					total_posts,
					_links: {
						next: {query_params},
					},
				}) => {
					allPosts = allPosts.concat(posts);
					console.log(
						`Got ${posts.length} Screenshots Tumblr posts.`
					);
					if (query_params.offset < total_posts) {
						return getPage(query_params);
					} else {
						raw.screenshotsTumblr = allPosts;
						allPosts.forEach(post => {
							const uid = idify(`SCREENSHOTS_TUMBLR_${post.id}`);
							let body,
								fileType,
								extraData = [];
							switch (post.type) {
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
							const unadjustedDate = new Date(
								post.timestamp * 1000
							);
							// The blog is in the Eastern timezone, and
							// we also need to account for DST.
							const localTimezoneOffsetFromEastern =
								(new Date(
									'January 1, 2020'
								).getTimezoneOffset() -
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
								contentType: post.type,
								title,
								body,
								extraData,
							};
							if (textIndex !== -1)
								formatted[textIndex] = result;
							else formatted.push(result);
						});
					}
				}
			)
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
					image: upload.preview_url_84,
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
			requestConfig.pageToken = requestConfig.nextPageToken;
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
				function (error, body) {
					if (error) {
						reject(error);
					}
					const nextUrl = body.paging.next;
					const newVideos = body.data.filter(
						video => video.privacy.view === 'anybody'
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
			'/me/videos?fields=uri,name,description,link,embed.html,created_time,privacy&filter_playable=true'
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
				const result = {
					uid,
					description: descriptionList[0],
					type: 'video',
					title: video.name,
					date: video.created_time.slice(0, 10),
					body:
						video.privacy.embed === 'public' &&
						video.embed.html.replace(
							/ ?(width|height)="[0-9]+"/gi,
							''
						),
					link: video.link,
					contentType: 'vimeo',
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
					body: videoId,
					description: descriptionList[0],
					type: 'video',
					title: video.title,
					date: video.publishedAt.slice(0, 10),
					link: `https://youtube.com/watch?v=${videoId}`,
					contentType: 'youtube',
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

function getAll() {
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
				'./project-scraper/_generated/scraped-projects-raw.json',
				stableStringify(raw, {space: '\t'})
			);
			fs.writeFileSync(
				'./project-scraper/_generated/scraped-projects-formatted.json',
				stableStringify(
					formatted.sort(({uid: a = ''}, {uid: b = ''}) =>
						a.localeCompare(b)
					),
					{space: '\t'}
				)
			);
			fs.writeFileSync(
				'./project-scraper/_generated/scraped-quotes.json',
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

module.exports = {
	idify,
	excerptify,
	getAll,
};
