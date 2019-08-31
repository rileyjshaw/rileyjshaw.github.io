// TODO(riley): Actually get these running.

// Ensure required fields are defined.
projects.every(p => p.uid && p.title && p.date && p.link);

// Ensure unique IDs are unique.
projects.map(p => p.uid).every((uid, i, uids) => uids.indexOf(uid) === i);

// Ensure there aren't any unnecessarily included empty fields.
projects.every(p => p.description?.length && p.tags?.length);

// Ensure all tests are defined.
const definedTags = [];
projects.every(tags => tags?.every(tag => definedTags.includes(tag)));

// Ensure all tags are unique.
projects.every((tags, i) => tags?.indexOf(tag) === i);

// Ensure we haven't lost any projects.
const types = ['dweet', 'post'];
types.every(
	type =>
		oldProjects.filter(p => p.type === type).length <=
		projects.filter(p => p.type === type).length
);
