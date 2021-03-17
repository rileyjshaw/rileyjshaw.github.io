'use strict';

/* NOTE: You should never need to call this.
   This was a single-use utility script that I wrote to initially bootstrap
   `sources/tags.json` with data that had previously been stored elsewhere.

   Run this only if project UIDs have become out-of-sync with the project keys
   in `sources/tags.json`.
*/

const fs = require('fs');
const stableStringify = require('json-stable-stringify');

function moveInfo() {
	const projects = JSON.parse(
		fs.readFileSync('./project-scraper/_generated/combined-projects.json')
	);
	const tags = JSON.parse(
		fs.readFileSync('./project-scraper/sources/tags.json')
	);
	tags.taggedProjects = {};

	projects.forEach(project => {
		let projectTags = project.tags;
		if (!projectTags) return;
		if (project.type === 'dweet') {
			projectTags = projectTags.filter(
				t => t !== 'golf' && t !== 'online'
			);
		} else if (project.type === 'song') {
			projectTags = projectTags.filter(
				t => t !== 'music' && t !== 'online'
			);
		}
		if (!projectTags.length) return;

		tags.taggedProjects[project.uid] = {
			tags: projectTags,
			updated: project.lastTagged ?? 0,
		};
	});

	fs.writeFileSync(
		'./project-scraper/sources/tags.json',
		stableStringify(tags, {space: '\t'})
	);
}

module.exports = {moveInfo};
