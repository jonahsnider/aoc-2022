import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../../utils/days.js';

import {Day2} from './index.js';

const actualInput = await getInput(2);
const sampleInput = `A Y
B X
C Z`;

describe('Day 2', () => {
	it('Part 1', () => {
		const {part1: solution} = new Day2().solve(sampleInput);

		assert.strictEqual(15, solution);
	});

	it('Part 2', () => {
		const {part2: solution} = new Day2().solve(sampleInput);

		assert.strictEqual(12, solution);
	});

	it('Actual', async () => {
		const solution = new Day2().solve(actualInput);

		expect(solution).toMatchInlineSnapshot(`
			{
			  "part1": 8392,
			  "part2": 10116,
			}
		`);
	});
});
