'use strict';

require('dotenv').config();

const fs = require('fs');
const fetch = require('node-fetch');
const {Octokit} = require('@octokit/rest');

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN,
});

const SITE_ROOT = 'https://rileyjshaw.com/';

const PRIORITY_JSON_NAME = 'other-repo-sitemap-priorities.json';
const otherRepoSitemapPriorities = JSON.parse(
	fs.readFileSync(`./project-scraper/sources/${PRIORITY_JSON_NAME}`)
);

// Github doesn’t presently provide a way to check which of your repos have an
// associated Github Pages subdirectory. Maybe I could check for a `gh-pages`
// branch, or grep `package.json` for “gh-pages” or “deploy”, or scrape the
// settings page, or look for other telling artifacts. But it would take a LOT
// of repo-cloning and special-casing. And even if I got it to work… it sounds
// brittle. For instance, I’d need to exclude some (but not all!) repos with a
// file called `CNAME`. What a headache!
//
// There is an easier way to check if a repo exists as a subdirectory of my
// site. Make a single HTTP request to that route and see what happens.
//
// This is the kind of hack that I love because it actually tells me _exactly_
// what I need. It skips all the plumbing, and arrives at the answer with a
// single request.
async function checkGitRepoRoutes() {
	const routeChecks = [];
	let page = 0;
	while (true) {
		const {
			data,
			headers: {link},
		} = await octokit.repos.listForAuthenticatedUser({
			visibility: 'public',
			affiliation: 'owner,collaborator',
			per_page: 100,
			page: page++,
		});
		routeChecks.push(
			Promise.allSettled(
				data.map(repo =>
					fetch(`${SITE_ROOT}${encodeURIComponent(repo.name)}`, {
						method: 'HEAD',
					})
				)
			).then(results =>
				results
					.filter(
						result =>
							result.status === 'fulfilled' &&
							result.value.status === 200 &&
							result.value.url.startsWith(SITE_ROOT) &&
							result.value.url !== SITE_ROOT
					)
					.map(r => r.value.url)
			)
		);
		if (!link?.includes('rel="next"')) break;
	}
	return Promise.all(routeChecks).then(results => {
		fs.writeFileSync(
			'./project-scraper/_generated/other-repos.json',
			JSON.stringify(
				results
					.flat()
					.filter((route, i, routes) => routes.indexOf(route) === i)
					.sort((a, b) => a.localeCompare(b))
					.map(url => {
						const {pathname} = new URL(url);
						const strippedPath = pathname.replace(/^\/|\/$/g, '');
						let priority =
							otherRepoSitemapPriorities[strippedPath];
						if (typeof priority !== 'number') {
							priority = 0.1;
							console.log(
								`Missing priority for ${strippedPath}. Update ${PRIORITY_JSON_NAME}.`
							);
						}
						return {path: pathname, priority};
					}),
				null,
				'\t'
			)
		);
	});
}

module.exports = {checkGitRepoRoutes};
