'use strict';

require('dotenv').config();

const util = require('util');
const fs = require('fs');
const url = require('url');
const tumblr = require('tumblr.js');
const feedRead = require('davefeedread');
const request = require('request-promise-native');
const OAuth = require('oauth');
const {JSDOM} = require('jsdom');

const raw = {}; // Raw is completely overwritten, but we append to formatted.
const formatted = JSON.parse(
	fs.readFileSync(
		'./project-scraper/_generated/scraped-projects-formatted.json'
	)
);
const quotes = JSON.parse(
	fs.readFileSync('./project-scraper/_generated/scraped-quotes.json')
);

const idify = uid => uid.toUpperCase().replace(/-/g, '_');
const excerptify = body => {
	if (!body) return {};

	function processNode(node) {
		if (['IMG'].includes(node.nodeName) || node.textContent.length === 0) {
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
	let url = 'https://www.dwitter.net/api/dweets/?author=rileyjshaw';
	let dweets = [];
	while (url) {
		const response = JSON.parse(await request(url));
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
			title: `No. ${dweet.id}`,
			date: dweet.posted.slice(0, 10),
			link: dweet.link,
		};
		if (index !== -1) formatted[index] = result;
		else formatted.push(result);
	});
}

async function getArena() {
	const url = `http://api.are.na/v2/users/riley-shaw/channels?access_token=${process.env.ARENA_SECRET}`;
	const response = JSON.parse(await request(url));
	raw.arena = response.channels;
	response.channels
		.filter(
			channel =>
				channel.published &&
				channel.status !== 'private' &&
				channel.length > 5
		)
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
}

function getCommitBlog() {
	const url = 'http://rileyjshaw.commit--blog.com/feed';
	return util
		.promisify(feedRead.parseUrl)(url, 15)
		.then(feed => {
			raw.commitBlog = feed.items;
			feed.items.forEach(commit => {
				const uid = idify(
					`COMMIT_${commit.guid.slice(
						commit.guid.lastIndexOf('/') + 1
					)}`
				);
				const index = formatted.findIndex(d => d.uid === uid);
				const body = commit.description?.replace(/<br>\n/g, ' ');
				const result = {
					uid,
					type: 'commit',
					title: commit.title,
					date: commit.date.toISOString().slice(0, 10),
					link: commit.link,
					body,
					...excerptify(body),
				};

				if (index !== -1) formatted[index] = result;
				else formatted.push(result);
			});
		});
}

function getSFPCTumblr() {
	const client = tumblr.createClient({
		consumer_key: process.env.TUMBLR_SECRET,
	});

	let allPosts = [];
	return (function getPage(queryParams = {}) {
		return util
			.promisify(client.blogPosts)('sfpc.tumblr.com', queryParams)
			.then(({posts, total_posts, _links: {next: {query_params}}}) => {
				allPosts = allPosts.concat(posts);
				if (query_params.offset < total_posts) {
					return getPage(query_params);
				} else {
					raw.sfpcTumblr = allPosts;
					allPosts.forEach(post => {
						const uid = idify(`SFPC_TUMBLR_${post.id}`);
						switch (post.type) {
							case 'quote':
								const quoteIndex = quotes.findIndex(
									post => post.uid === uid
								);
								const sourceDoc = JSDOM.fragment(post.source);
								const sourceAnchor = sourceDoc.querySelector(
									'a'
								);
								let sourceLink = sourceAnchor?.href;
								if (
									sourceLink?.startsWith(
										'https://t.umblr.com/redirect'
									)
								) {
									sourceLink = url.parse(sourceLink, true)
										.query.z;
								}
								const quoteResult = {
									uid,
									text: post.text,
									source:
										sourceAnchor.textContent ||
										sourceDoc.querySelector('*')
											?.textContent,
									sourceLink,
									date: post.date.slice(0, 10),
									link: post.post_url,
								};
								if (quoteIndex !== -1)
									quotes[quoteIndex] = quoteResult;
								else quotes.push(quoteResult);
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
			uploads.forEach(upload => {
				const uid = idify(`ICON_${upload.id}`);
				const index = formatted.findIndex(post => post.uid === uid);
				const result = {
					uid,
					type: 'icon',
					title:
						upload.term[0].toUpperCase() +
						upload.term
							.slice(1)
							.toLowerCase()
							.replace(/-/g, ' '),
					date: upload.date_uploaded,
					link: `https://thenounproject.com${upload.permalink}`,
					image: upload.preview_url_84,
				};
				if (index !== -1) formatted[index] = result;
				else formatted.push(result);
			});
		});
}

function getAll() {
	Promise.all([
		getDweets(),
		getArena(),
		getCommitBlog(),
		getSFPCTumblr(),
		getIcons(),
	]).then(() => {
		fs.writeFileSync(
			'./project-scraper/_generated/scraped-projects-raw.json',
			JSON.stringify(raw)
		);
		fs.writeFileSync(
			'./project-scraper/_generated/scraped-projects-formatted.json',
			JSON.stringify(formatted)
		);
		fs.writeFileSync(
			'./project-scraper/_generated/scraped-quotes.json',
			JSON.stringify(quotes)
		);
		console.log('Done.');
	});
}

module.exports = {
	idify,
	excerptify,
	getAll,
};
