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

app.use('/_curate', router);
app.listen(process.env.PORT || 5000, function () {
	console.log(`\nCuration server started on port ${this.address().port}.\n`);
});
