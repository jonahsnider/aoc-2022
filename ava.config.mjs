const config = {
	extensions: {
		ts: 'module',
	},
	files: ['./src/**/*.test.ts', '!./src/commands/template-command/template-files/*'],
	nodeArguments: ['--loader=ts-node/esm'],
};

export default config;
