import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../utils/days.js';

import {day12} from './day12.js';

const actualInput = await getInput(12);
const sampleInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe('Day 12', () => {
	it('Part 1', () => {
		const {part1: solution} = day12(sampleInput);

		assert.strictEqual(solution, 31);
	});

	it('Part 2', () => {
		const {part2: solution} = day12(sampleInput);

		assert.strictEqual(solution, 29);
	});

	it('Actual', async () => {
		const solution = day12(actualInput);

		expect(solution).toMatchInlineSnapshot(`
			{
			  "part1": 497,
			  "part2": 492,
			}
		`);
	});
});
