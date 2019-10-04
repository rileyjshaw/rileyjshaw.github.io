'use strict';

// NOTE: Functions accepting an `n` (content node) argument modify the node
//       *in place*. This whole file is a hack.

const fs = require('fs');
const scrapedProjects = require('../_generated/scraped-projects-formatted.json');
const listedProjects = require('../sources/projects.json');

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

	fs.writeFileSync(
		'./project-scraper/_generated/combined-projects.json',
		JSON.stringify(projects)
	);
}
runTweaks();
module.exports = {runTweaks};
