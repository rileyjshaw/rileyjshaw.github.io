'use strict';

const fs = require('fs');
const stableStringify = require('json-stable-stringify');

function generateTags() {
	const {tagInfo} = JSON.parse(
		fs.readFileSync('./project-scraper/sources/tags.json')
	);
	fs.writeFileSync(
		'./project-scraper/_generated/tags.json',
		stableStringify(
			Object.entries(tagInfo).map(([name, value]) => ({
				name,
				...value,
			})),
			{space: '\t'}
		)
	);
}

module.exports = {generateTags};
