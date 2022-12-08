import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../utils/days.js';

import {day7} from './day7.js';

const actualInput = await getInput(7);
const sampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe('Day 7', () => {
	it('Part 1', () => {
		const {part1: solution} = day7(sampleInput);

		assert.strictEqual(solution, 95_437);
	});

	it('Part 2', () => {
		const {part2: solution} = day7(sampleInput);

		assert.strictEqual(solution, 24_933_642);
	});

	it.skip('Actual', async () => {
		const solution = day7(actualInput);

		expect(solution).toMatchInlineSnapshot();
	});
});
