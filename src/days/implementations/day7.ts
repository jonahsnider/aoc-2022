import assert from 'node:assert/strict';
import {lines, sum} from '@jonahsnider/util';
import type {SolutionPair} from '../../lib/types.js';

type ParsedLine =
	| {
			kind: 'ls';
	  }
	| {
			kind: 'lsDir';
			name: string;
	  }
	| {
			kind: 'cd';
			path: string;
	  }
	| {
			kind: 'lsFile';
			size: number;
			name: string;
	  };

type Child = {
	kind: 'directory' | 'file';
	name: string;
	size: number;
};

type FileTree = Map<string, Child[]>;

function sizeOfDirectory(tree: FileTree, dir: string): number {
	const children = tree.get(dir);

	if (children === undefined) {
		throw new TypeError('Directory does not exist');
	}

	let size = 0;

	for (const child of children) {
		size += child.kind === 'file' ? child.size : sizeOfDirectory(tree, dir + '/' + child.name);
	}

	return size;
}

export function day7(input: string): SolutionPair {
	const solution = {part1: 0, part2: 0} satisfies SolutionPair;

	const terminal = lines(input).map((line): ParsedLine => {
		if (line === '$ ls') {
			return {kind: 'ls'};
		}

		if (line.startsWith('dir')) {
			const [, name] = line.split(' ');

			return {kind: 'lsDir', name};
		}

		if (line.startsWith('$ cd')) {
			const path = line.split(' ')[2];

			return {kind: 'cd', path};
		}

		const [size, name] = line.split(' ');

		return {kind: 'lsFile', size: Number(size), name};
	});

	const tree: FileTree = new Map();

	let currentDir = '';

	for (const [lineNumber, line] of terminal.entries()) {
		switch (line.kind) {
			case 'ls': {
				break;
			}

			case 'lsDir': {
				tree.set(currentDir + '/' + line.name, []);
				const children = tree.get(currentDir) ?? [];

				children.push({kind: 'directory', size: 0, name: line.name});
				break;
			}

			case 'cd': {
				switch (line.path) {
					case '/': {
						currentDir = '';
						break;
					}

					case '..': {
						if (currentDir === '') {
							// We're already at the root
							break;
						}

						const parts = currentDir.split('/');
						parts.pop();
						const parent = parts.join('/');

						currentDir = parent;
						break;
					}

					default: {
						currentDir += `/${line.path}`;
						break;
					}
				}

				if (!tree.has(currentDir)) {
					tree.set(currentDir, []);
				}

				break;
			}

			case 'lsFile': {
				const children = tree.get(currentDir);

				if (children === undefined) {
					throw new TypeError('Current directory does not exist');
				}

				children.push({kind: 'file', size: line.size, name: line.name});
				break;
			}
		}
	}

	// Now that we know all the files, go through and update the size of each directory
	for (const [dir, children] of tree.entries()) {
		const size = children.reduce((acc, child) => {
			if (child.kind === 'file') {
				return acc + child.size;
			}

			return acc + sizeOfDirectory(tree, dir + '/' + child.name);
		}, 0);

		for (const child of children) {
			if (child.kind === 'directory') {
				child.size = size;
			}
		}
	}

	const dirs = Array.from(tree.keys());

	solution.part1 = dirs
		.map(dir => sizeOfDirectory(tree, dir))
		.filter(size => size <= 100_000)
		.reduce(sum);

	const currentSize = sizeOfDirectory(tree, '');
	const currentFreeSize = 70_000_000 - currentSize;
	assert(currentFreeSize <= 30_000_000);
	const difference = 30_000_000 - currentFreeSize;

	const dirsThatCanBeDeleted = dirs.filter(dir => sizeOfDirectory(tree, dir) >= difference);

	solution.part2 = dirsThatCanBeDeleted.reduce((acc, dir) => {
		const size = sizeOfDirectory(tree, dir);

		return Math.min(acc, size);
	}, Number.POSITIVE_INFINITY);

	return solution;
}
