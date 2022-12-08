import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../../utils/days.js';

import {day999} from './day999.js';

const actualInput = await getInput(999);
const sampleInput = `REPLACEME`;

describe('Day 999', () => {
	it('Part 1', () => {
		const {part1: solution} = day999(sampleInput);

		assert.strictEqual(solution, 123);
	});

	it.skip('Part 2', () => {
		const {part2: solution} = day999(sampleInput);

		assert.strictEqual(solution, 123);
	});

	it.skip('Actual', async () => {
		const solution = day999(actualInput);

		expect(solution).toMatchInlineSnapshot();
	});
});
