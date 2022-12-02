const base = require('@jonahsnider/xo-config');

const config = {...base};

config.rules['unicorn/no-array-reduce'] = 'off';
config.rules['unicorn/no-array-callback-reference'] = 'off';

config.overrides ??= [];

module.exports = config;
