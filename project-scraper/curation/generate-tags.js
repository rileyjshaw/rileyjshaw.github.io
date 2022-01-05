import fs from 'fs';
import stableStringify from 'json-stable-stringify';
import {URL} from 'url';

export function generateTags() {
	const {tagInfo} = JSON.parse(
		fs.readFileSync(
			new URL('../sources/tags.json', import.meta.url).pathname
		)
	);
	fs.writeFileSync(
		new URL('../_generated/tags.json', import.meta.url).pathname,
		stableStringify(
			Object.entries(tagInfo).map(([name, value]) => ({
				name,
				...value,
			})),
			{space: '\t'}
		)
	);
}
