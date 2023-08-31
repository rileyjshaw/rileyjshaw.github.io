/* NOTE: You should never need to call this.
   This was a single-use utility script that I wrote to initially bootstrap
   `sources/tags.json` with data that had previously been stored elsewhere.

   Run this only if project UIDs have become out-of-sync with the project keys
   in `sources/tags.json`.
*/
import fs from 'fs';
import stableStringify from 'json-stable-stringify';
import {URL} from 'url';

function moveInfo() {
	const projects = JSON.parse(
		fs.readFileSync(
			new URL('../_generated/combined-projects.json', import.meta.url)
				.pathname,
		),
	);
	const tags = JSON.parse(
		fs.readFileSync(new URL('tags.json', import.meta.url).pathname),
	);
	tags.taggedProjects = {};

	projects.forEach(project => {
		let projectTags = project.tags;
		if (!projectTags) return;
		if (project.type === 'dweet') {
			projectTags = projectTags.filter(
				t => t !== 'golf' && t !== 'online',
			);
		} else if (project.type === 'song') {
			projectTags = projectTags.filter(
				t => t !== 'music' && t !== 'online',
			);
		}
		if (!projectTags.length) return;

		tags.taggedProjects[project.uid] = {
			tags: projectTags,
			updated: project.lastTagged ?? 0,
		};
	});

	fs.writeFileSync(
		new URL('tags.json', import.meta.url).pathname,
		stableStringify(tags, {space: '\t'}),
	);
}

module.exports = {moveInfo};
