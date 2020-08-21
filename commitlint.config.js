var changelogConfig = require('./changelog.config');

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-case': [2, 'always', 'sentence-case'],
		'type-enum': [
			2,
			'always',
			changelogConfig.list.map(key => changelogConfig.types[key].value),
		],
	},
};
