import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../../utils/days.js';

import {Day3} from './index.js';

const actualInput = await getInput(3);
const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe('Day 3', () => {
	it('Part 1', () => {
		const {part1: solution} = new Day3().solve(sampleInput);

		assert.strictEqual(157, solution);
	});

	it('Part 2', () => {
		const {part2: solution} = new Day3().solve(sampleInput);

		assert.strictEqual(70, solution);
	});

	it('Actual', async () => {
		const solution = new Day3().solve(actualInput);

		expect(solution).toMatchInlineSnapshot(`
			{
			  "part1": 8088,
			  "part2": 2522,
			}
		`);
	});
});
