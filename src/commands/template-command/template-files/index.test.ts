import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../../utils/days.js';

import {Day999} from './index.js';

const actualInput = await getInput(999);
const sampleInput = `REPLACEME`;

describe('Day 1', () => {
	it('Part 1', () => {
		const {part1: solution} = new Day999().solve(sampleInput);

		assert.strictEqual(123, solution);
	});

	it.skip('Part 2', () => {
		const {part2: solution} = new Day999().solve(sampleInput);

		assert.strictEqual(123, solution);
	});

	it.skip('Actual', async () => {
		const solution = new Day999().solve(actualInput);

		expect(solution).toMatchInlineSnapshot();
	});
});
