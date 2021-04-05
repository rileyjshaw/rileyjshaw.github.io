// USAGE: (from project's root directory)
// npx babel-node project-scraper/run-scraper.js && npm run format
const {getAll} = require('./scraper-utils');
const {checkGitRepoRoutes} = require('./gh-pages-mapper');
const {runTweaks} = require('./curation/tweaks');
const {generateTags} = require('./curation/generate-tags');

getAll().then(() => {
	console.log('\nScraped content.');
	generateTags();
	runTweaks();
	console.log('Tweaked scraped content.');
});

checkGitRepoRoutes().then(() => {
	console.log('Scraped other repo routes.');
});
