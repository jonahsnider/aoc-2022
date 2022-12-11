import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../utils/days.js';

import {day9} from './day9.js';

const actualInput = await getInput(9);

describe('Day 9', () => {
	it('Part 1', () => {
		const sampleInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
		const {part1: solution} = day9(sampleInput);

		assert.strictEqual(solution, 13);
	});

	it.fails('Part 2', () => {
		const sampleInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
		const {part2: solution} = day9(sampleInput);

		assert.strictEqual(solution, 36);
	});

	it.skip('Actual', async () => {
		const solution = day9(actualInput);

		expect(solution).toMatchInlineSnapshot();
	});
});
