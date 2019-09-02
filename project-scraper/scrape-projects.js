'use strict';

// USAGE: (from project's root directory)
// npx babel-node project-scraper/scrape-projects.js && npm run format

require('dotenv').config();

const util = require('util');
const fs = require('fs');
const tumblr = require('tumblr.js');
const feedRead = require('davefeedread');
const request = require('request-promise-native');

const raw = {}; // Raw is completely overwritten, but we append to formatted.
const formatted = JSON.parse(
	fs.readFileSync(
		'./project-scraper/_generated/scraped-projects-formatted.json'
	)
);

const idify = uid => uid.toUpperCase().replace(/-/g, '_');

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
	const url = `http://api.are.na/v2/users/riley-shaw/channels?access_token=${process.env.ARENA_ACCESS_TOKEN}`;
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
				const result = {
					uid,
					type: 'commit',
					title: commit.title,
					date: `${commit.date.getFullYear()}-${commit.date.getMonth()}-${commit.date.getDate()}`,
					link: commit.link,
					description: commit.description,
				};
				if (index !== -1) formatted[index] = result;
				else formatted.push(result);
			});
		});
}

function getSFPCTumblr() {
	const client = tumblr.createClient({
		consumer_key: process.env.TUMBLR_SECRET_KEY,
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
						const index = formatted.findIndex(
							post => post.uid === uid
						);
						const result = {
							uid,
							type: 'tumblr',
							title: post.title || post.summary,
							date: post.date.slice(0, 10),
							link: post.post_url,
							contentType: post.type,
							body: post.body,
						};
						if (index !== -1) formatted[index] = result;
						else formatted.push(result);
					});
				}
			});
	})();
}

Promise.all([getDweets(), getArena(), getCommitBlog(), getSFPCTumblr()]).then(
	() => {
		fs.writeFileSync(
			'./project-scraper/_generated/scraped-projects-raw.json',
			JSON.stringify(raw)
		);
		fs.writeFileSync(
			'./project-scraper/_generated/scraped-projects-formatted.json',
			JSON.stringify(formatted)
		);
		console.log('Done.');
	}
);
