import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../utils/days.js';

import {day1} from './day1.js';

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
		const {part1: solution} = day1(sampleInput);

		assert.strictEqual(solution, 24_000);
	});

	it('Part 2', () => {
		const {part2: solution} = day1(sampleInput);

		assert.strictEqual(solution, 45_000);
	});

	it('Actual', async () => {
		const solution = day1(actualInput);

		expect(solution).toMatchInlineSnapshot(`
			{
			  "part1": 66487,
			  "part2": 197301,
			}
		`);
	});
});
