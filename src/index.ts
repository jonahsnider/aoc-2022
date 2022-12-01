import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {URL} from 'node:url';
import {Builtins, Cli} from 'clipanion';
import type {PackageJson} from 'type-fest';
import * as Commands from './commands/index.js';

const args = process.argv.slice(2);

const pkg = JSON.parse(await fs.readFile(new URL(path.join('..', 'package.json'), import.meta.url), 'utf8')) as PackageJson;

const cli = new Cli({
	binaryLabel: 'AoC 2022',
	binaryName: 'node .',
	binaryVersion: pkg.version,
});

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);

for (const command of Object.values(Commands)) {
	cli.register(command);
}

await cli.runExit(args);
