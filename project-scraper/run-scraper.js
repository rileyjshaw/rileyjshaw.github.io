// USAGE: (from project's root directory)
// npx babel-node project-scraper/run-scraper.js && npm run format
const {getAll} = require('./scraper-utils');
const {runTweaks} = require('./curation/tweaks');

getAll().then(() => {
	console.log('Scraped content.');
	runTweaks();
	console.log('Tweaked scraped content.');
	console.log('Done.');
});
