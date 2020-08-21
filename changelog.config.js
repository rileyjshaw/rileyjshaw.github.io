module.exports = {
	disableEmoji: true,
	list: [
		'chore',
		'content',
		'mess',
		'bug',
		'design',
		'tooling',
		'feature',
		'refactor',
		'release',
		'docs',
		'test',
	],
	types: {
		chore: {
			description:
				'🤖 An automated change, usually from build tools or the scraper',
			value: 'Chore',
		},
		content: {
			description: '📝 A copy change, new project, blog post, etc.',
			value: 'Content',
		},
		mess: {
			description:
				'🍔 A huge, messy, awesome change that "should" be broken into thoughtful little atoms',
			value: 'Hot mess',
		},
		bug: {
			description: '🐛 Squish, squash, bug sauce!',
			value: 'Bugfix',
		},
		design: {
			description: '💎 Makes the website nicer to use and navigate',
			value: 'Design',
		},
		tooling: {
			description: "💻 An improvement to the site's inner workings",
			value: 'Tooling',
		},
		feature: {
			description:
				'🛠  A generic feature not covered by other categories, eg. perf, a11y, ',
			value: 'Feature',
		},
		refactor: {
			description:
				'⌨️  A code change that neither fixes a bug nor adds a feature',
			value: 'Refactor',
		},
		release: {
			description: '🚢 Create a release commit',
			value: 'Release',
		},
		docs: {
			description: '📗 Documentation-only changes',
			value: 'Docs',
		},
		test: {
			description: '🤣 LMAO ya right!!',
			value: 'Test',
		},
	},
};
