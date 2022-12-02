import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../../utils/days.js';

import {Day1} from './index.js';

const actualInput = await getInput(1);
const sampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('Day 1', () => {
	it('Part 1', () => {
		const {part1: solution} = new Day1().solve(sampleInput);

		assert.strictEqual(24_000, solution);
	});

	it('Part 2', () => {
		const {part2: solution} = new Day1().solve(sampleInput);

		assert.strictEqual(45_000, solution);
	});

	it('Actual', async () => {
		const solution = new Day1().solve(actualInput);

		expect(solution).toMatchInlineSnapshot(`
			{
			  "part1": 66487,
			  "part2": 197301,
			}
		`);
	});
});
