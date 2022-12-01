const base = require('@jonahsnider/xo-config');

const config = {...base};

config.rules['unicorn/no-array-reduce'] = 'off';
config.rules['unicorn/no-array-callback-reference'] = 'off';

config.overrides ??= [];

config.overrides.push({
	files: ['src/commands/template-command/template-files/*.test.ts'],
	rules: {
		'ava/no-ignored-test-files': 'off',
		'ava/no-skip-test': 'off',
	},
});

module.exports = config;
