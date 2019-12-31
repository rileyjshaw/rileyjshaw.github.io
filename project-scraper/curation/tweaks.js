'use strict';

// NOTE: Functions accepting an `n` (content node) argument modify the node
//       *in place*. This whole file is a hack.

const fs = require('fs');
const scrapedProjects = require('../_generated/scraped-projects-formatted.json');
const scrapedQuotes = require('../_generated/scraped-quotes.json');
const listedProjects = require('../sources/projects.json');
const listedQuotes = require('../sources/quotes.json');

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
				uid: `PROJECT_${p.title.toUpperCase().replace(/[- ]/g, '_')}`,
			};
		}),
];

const unique = arr => arr.filter((x, i) => arr.indexOf(x) === i);
const addTags = (n, tags) => {
	if (typeof tags === 'string') tags = [tags];
	n.tags = [...(n.tags || []), ...tags];
};
const typeTransformers = {
	dweet: n => {
		addTags(n, ['golf', 'online']);
	},
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
		coolness: [],
		transformers: [],
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
	// Add type transformers to each node of each specified type.
	Object.entries(typeTransformers).forEach(([type, transformer]) => {
		Object.values(projects)
			.filter(n => n.type === type)
			.forEach(n => {
				if (n.transformers) n.transformers.unshift(transformer);
				else n.transformers = [transformer];
			});
	});

	// Add the "featured" tag to each featured project.
	featuredProjects.forEach(projectId =>
		addTags(projects[projectId], 'featured')
	);

	// Apply tweaks to nodes.
	Object.entries(tweaksList).forEach(
		(projectId, {tags, coolness, transformers}) => {
			const n = projects[projectId];
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
		JSON.stringify(
			projects.sort(({uid: a = ''}, {uid: b = ''}) => a.localeCompare(b))
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
		JSON.stringify(
			combinedQuotes.sort(({uid: a = ''}, {uid: b = ''}) =>
				a.localeCompare(b)
			)
		)
	);
}

module.exports = {runTweaks};
