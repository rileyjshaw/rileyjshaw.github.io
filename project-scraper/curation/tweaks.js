// Stub.
const scrapedProjects = [];

const unique = arr => arr.filter((x, i) => arr.indexOf(x) === i);
const typeTransformers = {
	dweet: n => {
		return {
			...n,
			tags: unique([...n.tags, 'golf', 'online']),
		};
	},
};

Object.entries(typeTransformers).forEach(([type, transformer]) => {
	scrapedProjects
		.filter(n => n.type === type)
		.forEach(n => {
			if (n.transformers) n.transformers.unshift(transformer);
			else n.transformers = [transformer];
		});
});

const tweaks = {
	DWEET_15311: {
		tags: [],
		coolness: [],
		transformers: [],
	},
};
