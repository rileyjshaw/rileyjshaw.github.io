module.exports = {
	types: [
		{
			value: 'Chore',
			name: '🤖 Chore\t An automated change, usually from build tools or the scraper',
		},
		{
			value: 'Content',
			name: '📝 Content\t A copy change, new project, blog post, etc.',
		},
		{
			value: 'Hotmess',
			name: '🍔 Hotmess\t A huge, messy, awesome change that “should” be broken into thoughtful little atoms',
		},
		{
			value: 'Bugfix',
			name: '🐛 Bugfix\t Squish, squash, bug sauce!',
		},
		{
			value: 'Design',
			name: '💎 Design\t Makes the website nicer to use and navigate',
		},
		{
			value: 'Tooling',
			name: '💻 Tooling\t An improvement to the site’s inner workings',
		},
		{
			value: 'Feature',
			name: '🛠  Feature\t A generic feature not covered by other categories, eg. perf, a11y, ',
		},
		{
			value: 'Refactor',
			name: '⌨️  Refactor\t A code change that neither fixes a bug nor adds a feature',
		},
		{
			value: 'Release',
			name: '🚢 Release\t Create a release commit',
		},
		{
			value: 'Docs',
			name: '📗 Docs\t Documentation-only changes',
		},
		{
			value: 'Test',
			name: '🤣 Test\t LMAO ya right!!',
		},
	],
	allowCustomScopes: true,
	upperCaseSubject: true,
	skipQuestions: ['scope', 'footer'],
};
