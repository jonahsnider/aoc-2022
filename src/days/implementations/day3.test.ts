import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../utils/days.js';

import {day3} from './day3.js';

const actualInput = await getInput(3);
const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe('Day 3', () => {
	it('Part 1', () => {
		const {part1: solution} = day3(sampleInput);

		assert.strictEqual(157, solution);
	});

	it('Part 2', () => {
		const {part2: solution} = day3(sampleInput);

		assert.strictEqual(70, solution);
	});

	it('Actual', async () => {
		const solution = day3(actualInput);

		expect(solution).toMatchInlineSnapshot(`
			{
			  "part1": 8088,
			  "part2": 2522,
			}
		`);
	});
});
