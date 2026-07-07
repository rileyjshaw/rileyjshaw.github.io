import express from 'express';
import fs from 'fs';
import stableStringify from 'json-stable-stringify';
import {dirname} from 'path';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const router = express.Router();

router.use('/static', express.static(path.join(__dirname, '..')));
router.use(express.json());

router.put('/tags', function (req, res) {
	const [tagKey, tagValue] = req.body;
	const created = Date.now();
	const tags = JSON.parse(
		fs.readFileSync(path.join(__dirname, '../sources/tags.json')),
	);
	tags.tagInfo[tagKey] = {...tagValue, created};
	fs.writeFileSync(
		path.join(__dirname, '../sources/tags.json'),
		stableStringify(tags, {space: '\t'}),
	);
	res.json(tags);
});

router.put('/tags/:uid', function (req, res) {
	const {uid} = req.params;
	const newTags = req.body.sort((a, b) => a.localeCompare(b));
	const updated = Date.now();
	const tags = JSON.parse(
		fs.readFileSync(path.join(__dirname, '../sources/tags.json')),
	);
	tags.taggedProjects[uid] = {tags: newTags, updated};
	fs.writeFileSync(
		path.join(__dirname, '../sources/tags.json'),
		stableStringify(tags, {space: '\t'}),
	);
	res.json(tags);
});

// cool.json is a sorted array of project uids, least cool → coolest. Inserts
// are validated against the client’s view of the array so a stale tab can’t
// corrupt the ordering.
router.put('/cool', function (req, res) {
	const [projectUid, insertionIdx, arrayLength] = req.body;
	const sortedCool = JSON.parse(
		fs.readFileSync(path.join(__dirname, '../sources/cool.json')),
	);
	if (sortedCool.length !== arrayLength) {
		return res.status(409).json({
			error: `cool.json has ${sortedCool.length} entries but the client expected ${arrayLength}. Re-sync and try again.`,
		});
	}
	if (sortedCool.includes(projectUid)) {
		return res
			.status(409)
			.json({error: `${projectUid} is already ranked.`});
	}
	if (
		!Number.isInteger(insertionIdx) ||
		insertionIdx < 0 ||
		insertionIdx > sortedCool.length
	) {
		return res
			.status(400)
			.json({error: `Invalid insertion index: ${insertionIdx}.`});
	}
	sortedCool.splice(insertionIdx, 0, projectUid);
	fs.writeFileSync(
		path.join(__dirname, '../sources/cool.json'),
		stableStringify(sortedCool, {space: '\t'}),
	);
	res.json(sortedCool);
});

// Remove a uid from the ranking (used by “Undo last”, and handy for
// re-ranking a single project: delete it and it becomes a candidate again).
router.delete('/cool/:uid', function (req, res) {
	const {uid} = req.params;
	const sortedCool = JSON.parse(
		fs.readFileSync(path.join(__dirname, '../sources/cool.json')),
	);
	const index = sortedCool.indexOf(uid);
	if (index === -1) {
		return res.status(404).json({error: `${uid} is not ranked.`});
	}
	sortedCool.splice(index, 1);
	fs.writeFileSync(
		path.join(__dirname, '../sources/cool.json'),
		stableStringify(sortedCool, {space: '\t'}),
	);
	res.json(sortedCool);
});

app.use('/_curate', router);
app.listen(process.env.PORT || 5050, function () {
	console.log(`\nCuration server started on port ${this.address().port}.\n`);
});
