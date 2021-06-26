'use strict';

// NOTE: Functions accepting an `n` (content node) argument modify the node
//       *in place*. This whole file is a hack.

const fs = require('fs');
const stableStringify = require('json-stable-stringify');

const {idify} = require('../scraper-utils.js');

const unique = arr => arr.filter((x, i) => arr.indexOf(x) === i);
const addTags = (n, tags = []) => {
	if (typeof tags === 'string') tags = [tags];
	n.tags = [...(n.tags || []), ...tags];
};
// Parse HTML with regular expressions, they said. It'll be fun, they said...
const fixLinks = text =>
	text &&
	text
		.replace(
			/<a [^>]*?\bhref=(["'])(?:https?:\/\/)?(?:www\.)?rileyjshaw\.com\b\/?((\\\1|(?:(?!\1).))*)\1[^>]*?>/gi,
			'<a href=$1/$2$1>'
		)
		.replace(
			/<a [^>]*?\bhref=(["'])((?!(\/|#|\1))(?:\\\1|[^\1])+?)\1[^>]*?>/gi,
			'<a href=$1$2$1 rel="noopener noreferrer" target="_blank">'
		);
const repoTags = {
	'rileyjshaw/rileyjshaw.github.io': ['meta'],
	'rileyjshaw/rileyjshaw-new': ['meta'],
	'rileyjshaw/rileyjshaw.github.io-v14': ['meta'],
	'rileyjshaw/font-comparison-tool': ['tools'],
	'rileyjshaw/palette-test-tool': ['tools'],
	'rileyjshaw/write': ['tools'],
	'rileyjshaw/.supermac': ['tools'],
	'rileyjshaw/tech-ethics-yvr': ['untech'],
	'rileyjshaw/plop': ['tools'],
	'rileyjshaw/xoxo-bingo': ['game'],
	'rileyjshaw/canvas': ['visual', 'pretty', 'collection'],
	'rileyjshaw/Servo': ['tools', 'hardware'],
	'miseryco/curriculum': ['untech'],
	'herlifeinpixels/voxels': ['visual', 'pretty'],
	'rileyjshaw/average-color': ['tools', 'visual'],
	'rileyjshaw/node-timsort-async': ['tools'],
	'rileyjshaw/LineMenuStyles': ['visual', 'golf'],
	'rileyjshaw/dark-theme-everywhere': ['browserextension', 'tool', 'visual'],
};
const typeTransformers = {
	dweet: [
		n => {
			addTags(n, ['golf', 'online', 'visual']);
			n.coolness = 5;
		},
	],
	commit: [
		n => {
			addTags(n, ['readable', ...(repoTags[n.repo] ?? [])]);
			n.body = fixLinks(n.body);
			n.description = fixLinks(n.description);
		},
	],
	icon: [
		n => {
			addTags(n, ['visual']);
		},
	],
	post: [
		n => {
			addTags(n, ['readable']);
		},
	],
	screenshotsTumblr: [
		n => {
			n.coolness = 3;
		},
	],
	song: [
		n => {
			n.coolness = 50;
			addTags(n, ['audio', 'online']);
		},
	],
	tumblr: [
		n => {
			n.body = fixLinks(n.body);
			n.description = fixLinks(n.description);
		},
	],
	patch: [
		n => {
			if (n.description) {
				n.description = unescape(n.description);
			}
			addTags(n, ['audio', 'reusable', 'tool']);
		},
	],
	project: [
		n => {
			if (n.descriptionList) {
				n.descriptionList = n.descriptionList.map(fixLinks);
			}
		},
	],
};

const featuredProjects = [
	// 'depression',
	// 'weather station',
	// 'terra',
	// 'crypto-christmas',
	// 'tappy',
	// 'hackers.cool',
	// 'whoami.py',
	// 'signal desktop',
	// 'time',
	// 'learnstorm',
	// 'video page',
];

const tweaksList = {
	DWEET_15311: {
		tags: [],
		coolness: 41,
		transformers: [],
	},
	PATCH_140563: {
		transformers: [
			n => {
				n.description =
					'Set and toggle 16 independent LFOs. You can cross-modulate them if you want, but by default it’s just a bunch of LFOs.';
			},
		],
	},
};

// Expanded from underscore's _.unescape() method.
const unescape = (substitutions => {
	const substitute = match => substitutions[match];
	const source = '(?:' + Object.keys(substitutions).join('|') + ')';
	const testRegexp = RegExp(source);
	const replaceRegexp = RegExp(source, 'g');

	return function unescape(str) {
		str = str == null ? '' : '' + str;
		return testRegexp.test(str)
			? str.replace(replaceRegexp, substitute)
			: str;
	};
})({
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#x27;': "'",
	'&#x60;': '`',
	'&lsquo;': '‘',
	'&ldquo;': '“',
	'&rsquo;': '’',
	'&rdquo;': '”',
	'&hellip;': '…',
});
const stripOuterQuotes = str => str.replace(/^[“”‘’"'](.*)[“”‘’"']/g, '$1');
const quoteAuthors = ['Osamu Sato', 'Donna J. Haraway'];
function runTweaks() {
	const scrapedProjects = require('../_generated/scraped-projects-formatted.json');
	const scrapedQuotes = require('../_generated/scraped-quotes.json');
	const listedProjects = require('../sources/projects.json');
	const listedQuotes = require('../sources/quotes.json');
	const {taggedProjects} = require('../sources/tags.json');
	const projects = [
		...scrapedProjects,
		...listedProjects
			.filter(n => !n.todo)
			.map(p => {
				const {description, ...rest} = p;
				return {
					...rest,
					// HACK(riley): Array for projects, string for other things.
					descriptionList: description,
					type: 'project',
					uid: `PROJECT_${idify(p.title)}`,
				};
			}),
	];

	// Add project tags.
	projects.forEach(project => {
		const projectTags = taggedProjects[project.uid];
		if (projectTags) {
			project.tags = projectTags.tags;
			project.lastTagged = projectTags.updated;
		}
	});

	// Add type transformers to each node of each specified type.
	Object.entries(typeTransformers).forEach(([type, transformers]) => {
		Object.values(projects)
			.filter(n => n.type === type)
			.forEach(n => {
				if (n.transformers) n.transformers.unshift(...transformers);
				else n.transformers = transformers;
			});
	});

	// Add the "featured" tag to each featured project.
	featuredProjects.forEach(projectId =>
		addTags(projects[projectId], 'featured')
	);

	// Apply tweaks to nodes.
	Object.entries(tweaksList).forEach(
		([projectId, {tags, coolness, transformers}]) => {
			const n = projects.find(project => project.uid === projectId);
			if (!n) {
				console.warn(
					`You’ve written a tweak for nonexistent UID ${projectId}.`
				);
				return;
			}
			if (tags) addTags(n, tags);
			if (coolness) n.coolness = coolness;
			if (transformers)
				n.transformers = [...(n.transformers || []), ...transformers];
		}
	);

	// Run and delete transformers.
	Object.values(projects)
		.filter(n => n.transformers)
		.forEach(n => {
			n.transformers.forEach(transformer => transformer(n));
			delete n.transformers;
		});

	// Ensure tag lists are alphabetized and unique.
	Object.values(projects)
		.filter(n => n.tags)
		.forEach(n => (n.tags = unique(n.tags).sort()));

	// Add a timestamp to each node with a date.
	Object.values(projects)
		.filter(n => n.date)
		.forEach(n => (n.timestamp = +new Date(n.date)));

	fs.writeFileSync(
		'./project-scraper/_generated/combined-projects.json',
		stableStringify(
			projects.sort(({uid: a = ''}, {uid: b = ''}) =>
				a.localeCompare(b)
			),
			{space: '\t'}
		)
	);

	const combinedQuotes = Object.entries(listedQuotes)
		.map(([key, value]) => ({
			uid: key,
			...value,
		}))
		.concat(
			scrapedQuotes.map(({content, source, ...rest}) => ({
				...rest,
				content: content && unescape(stripOuterQuotes(content)),
				[quoteAuthors.includes(source) ? 'author' : 'source']:
					source &&
					// Discard quotes around source names, since big-quote.js adds those.
					unescape(stripOuterQuotes(source)),
			}))
		);

	fs.writeFileSync(
		'./project-scraper/_generated/combined-quotes.json',
		stableStringify(
			combinedQuotes.sort(({uid: a = ''}, {uid: b = ''}) =>
				a.localeCompare(b)
			),
			{space: '\t'}
		)
	);
}

module.exports = {runTweaks};
