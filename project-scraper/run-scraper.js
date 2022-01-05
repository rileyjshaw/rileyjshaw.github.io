import {generateTags} from './curation/generate-tags.js';
import {runTweaks} from './curation/tweaks.js';
import {checkGitRepoRoutes} from './gh-pages-mapper.js';
import {getAll} from './scraper-utils.js';

getAll().then(() => {
	console.log('\nScraped content.');
	generateTags();
	runTweaks();
	console.log('Tweaked scraped content.');
});

checkGitRepoRoutes().then(() => {
	console.log('Scraped other repo routes.');
});
