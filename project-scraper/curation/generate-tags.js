'use strict';

const fs = require('fs');

function generateTags() {
	const {tagInfo} = JSON.parse(
		fs.readFileSync('./project-scraper/sources/tags.json')
	);
	fs.writeFileSync(
		'./project-scraper/_generated/tags.json',
		JSON.stringify(
			Object.entries(tagInfo).map(([name, value]) => ({
				name,
				...value,
			})),
			null,
			'\t'
		)
	);
}

module.exports = {generateTags};
