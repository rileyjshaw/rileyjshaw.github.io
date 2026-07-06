// Checks generated project and quote files. Run directly with
// `npm test`, or via `run-scraper.js` after each scrape.
import {execSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import url, {URL} from 'url';

const MAX_PRINTED_FAILURES = 10;
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

function loadJsonFile(relPath) {
	return JSON.parse(
		fs.readFileSync(new URL(relPath, import.meta.url).pathname),
	);
}

// Returns the version of combined-projects.json from the last commit, or null
// if it can’t be read (eg. not in a git repo, or the file is new).
function loadPreviousProjects() {
	try {
		const cwd = new URL('.', import.meta.url).pathname;
		const repoRoot = execSync('git rev-parse --show-toplevel', {cwd})
			.toString()
			.trim();
		const filePath = path.relative(
			repoRoot,
			new URL('../_generated/combined-projects.json', import.meta.url)
				.pathname,
		);
		return JSON.parse(
			execSync(`git show HEAD:"${filePath}"`, {
				cwd,
				maxBuffer: 64 * 1024 * 1024,
				stdio: ['ignore', 'pipe', 'ignore'],
			}).toString(),
		);
	} catch {
		return null;
	}
}

export function runTests() {
	const projects = loadJsonFile('../_generated/combined-projects.json');
	const quotes = loadJsonFile('../_generated/combined-quotes.json');
	const {tagInfo} = loadJsonFile('../sources/tags.json');

	const failures = [];
	const skipped = [];
	function check(name, getProblems) {
		const problems = getProblems();
		if (problems.length) failures.push({name, problems});
	}

	// Ensure required fields are defined.
	check('Required project fields', () =>
		projects
			.filter(p => !(p.uid && p.type && p.title && p.date && p.link))
			.map(
				p =>
					`${p.uid || JSON.stringify(p).slice(0, 80)} is missing ` +
					['uid', 'type', 'title', 'date', 'link']
						.filter(field => !p[field])
						.join(', '),
			),
	);

	// Ensure unique IDs are unique.
	check('Unique project UIDs', () => {
		const uids = projects.map(p => p.uid);
		return uids
			.filter((uid, i) => uids.indexOf(uid) !== i)
			.map(uid => `${uid} appears more than once`);
	});
	check('Unique quote UIDs', () => {
		const uids = quotes.map(q => q.uid);
		return uids
			.filter((uid, i) => uids.indexOf(uid) !== i)
			.map(uid => `${uid} appears more than once`);
	});

	// Ensure dates are formatted properly (YYYY-MM-DD) and valid.
	check('Valid project dates', () =>
		projects
			.filter(
				p =>
					p.date &&
					(!DATE_FORMAT.test(p.date) ||
						Number.isNaN(+new Date(p.date))),
			)
			.map(p => `${p.uid} has invalid date “${p.date}”`),
	);

	// Ensure timestamps match dates.
	check('Timestamps match dates', () =>
		projects
			.filter(p => p.date && p.timestamp !== +new Date(p.date))
			.map(p => `${p.uid} timestamp doesn’t match its date`),
	);

	// Ensure there aren’t any unnecessarily included empty fields.
	check('No empty optional fields', () =>
		projects.flatMap(p =>
			['description', 'tags', 'descriptionList']
				.filter(field => field in p && !p[field]?.length)
				.map(field => `${p.uid} has an empty “${field}” field`),
		),
	);

	// Ensure all tags are defined in sources/tags.json.
	check('All tags are defined', () => {
		const definedTags = new Set(Object.keys(tagInfo));
		return projects.flatMap(p =>
			(p.tags ?? [])
				.filter(tag => !definedTags.has(tag))
				.map(tag => `${p.uid} uses undefined tag “${tag}”`),
		);
	});

	// Ensure each project’s tags are unique.
	check('Tags are unique per project', () =>
		projects
			.filter(p => p.tags && new Set(p.tags).size !== p.tags.length)
			.map(p => `${p.uid} has duplicate tags`),
	);

	// Ensure quotes have content. Attribution is optional.
	check('Quotes have content', () =>
		quotes.filter(q => !q.content).map(q => `${q.uid} has no content`),
	);

	// Ensure we haven’t lost any projects since the last commit.
	const previousProjects = loadPreviousProjects();
	if (previousProjects) {
		check('No projects lost since last commit', () => {
			const countByType = list =>
				list.reduce(
					(counts, p) => (
						(counts[p.type] = (counts[p.type] ?? 0) + 1),
						counts
					),
					{},
				);
			const oldCounts = countByType(previousProjects);
			const newCounts = countByType(projects);
			return Object.entries(oldCounts)
				.filter(
					([type, oldCount]) => (newCounts[type] ?? 0) < oldCount,
				)
				.map(
					([type, oldCount]) =>
						`“${type}” count dropped from ${oldCount} to ${
							newCounts[type] ?? 0
						}`,
				);
		});
	} else {
		skipped.push(
			'No projects lost since last commit (couldn’t read previous version from git)',
		);
	}

	for (const {name, problems} of failures) {
		console.error(`✗ ${name} (${problems.length}):`);
		problems
			.slice(0, MAX_PRINTED_FAILURES)
			.forEach(problem => console.error(`    ${problem}`));
		if (problems.length > MAX_PRINTED_FAILURES) {
			console.error(
				`    …and ${problems.length - MAX_PRINTED_FAILURES} more.`,
			);
		}
	}
	for (const name of skipped) console.warn(`- Skipped: ${name}`);
	if (failures.length) {
		console.error(`\nTests failed (${failures.length}).`);
	} else {
		console.log(
			`Tests passed. Checked ${projects.length} projects and ${quotes.length} quotes.`,
		);
	}
	return failures.length === 0;
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
	process.exit(runTests() ? 0 : 1);
}
