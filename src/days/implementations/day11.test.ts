import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../utils/days.js';

import {day11} from './day11.js';

const actualInput = await getInput(11);
const sampleInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
	If true: throw to monkey 2
	If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
	If true: throw to monkey 2
	If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
	If true: throw to monkey 1
	If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
	If true: throw to monkey 0
	If false: throw to monkey 1`;

describe(
	'Day 11',
	() => {
		it('Part 1', () => {
			const {part1: solution} = day11(sampleInput);

			assert.strictEqual(solution, 10_605);
		});

		it.fails('Part 2', () => {
			const {part2: solution} = day11(sampleInput);

			assert.strictEqual(solution, 2_713_310_158);
		});

		it.skip('Actual', async () => {
			const solution = day11(actualInput);

			expect(solution).toMatchInlineSnapshot();
		});
	},
	{timeout: 30_000},
);
