var czConfig = require('./.cz-config.js');

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-case': [2, 'always', 'sentence-case'],
		'type-enum': [
			2,
			'always',
			czConfig.types.map(function (type) {
				return type.value;
			}),
		],
		'subject-case': [0],
		'body-max-line-length': [0, 'always', [100]],
	},
};
