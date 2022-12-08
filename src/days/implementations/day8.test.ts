import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../utils/days.js';

import {day8} from './day8.js';

const actualInput = await getInput(8);
const sampleInput = `30373
25512
65332
33549
35390`;

describe('Day 8', () => {
	it('Part 1', () => {
		const {part1: solution} = day8(sampleInput);

		assert.strictEqual(solution, 21);
	});

	it('Part 2', () => {
		const {part2: solution} = day8(sampleInput);

		assert.strictEqual(solution, 8);
	});

	it('Actual', async () => {
		const solution = day8(actualInput);

		expect(solution).toMatchInlineSnapshot(`
			{
			  "part1": 1711,
			  "part2": 301392,
			}
		`);
	});
});
