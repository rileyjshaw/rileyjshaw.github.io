import {generateTags} from './curation/generate-tags.js';
import {runTweaks} from './curation/tweaks.js';
import {checkGitRepoRoutes} from './gh-pages-mapper.js';
import {getAll} from './scraper-utils.js';
import {runTests} from './tests/tests.js';

const scrape = getAll().then(() => {
	console.log('\nScraped content.');
	generateTags();
	runTweaks();
	console.log('Tweaked scraped content.');
});

const routes = checkGitRepoRoutes().then(() => {
	console.log('Scraped other repo routes.');
});

Promise.all([scrape, routes]).then(() => {
	console.log('\nRunning tests…');
	if (!runTests()) process.exitCode = 1;
});
