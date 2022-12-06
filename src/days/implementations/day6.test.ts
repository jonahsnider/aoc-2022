import {describe, assert, it, expect} from 'vitest';
import {getInput} from '../../utils/days.js';

import {day6} from './day6.js';

const actualInput = await getInput(6);

describe('Day 6', () => {
	it('Part 1', () => {
		assert.strictEqual(day6('mjqjpqmgbljsphdztnvjfqwrcgsmlb').part1, 7);
		assert.strictEqual(day6('bvwbjplbgvbhsrlpgdmjqwftvncz').part1, 5);
		assert.strictEqual(day6('nppdvjthqldpwncqszvftbrmjlhg').part1, 6);
		assert.strictEqual(day6('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg').part1, 10);
		assert.strictEqual(day6('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw').part1, 11);
	});

	it('Part 2', () => {
		assert.strictEqual(day6('mjqjpqmgbljsphdztnvjfqwrcgsmlb').part2, 19);
		assert.strictEqual(day6('bvwbjplbgvbhsrlpgdmjqwftvncz').part2, 23);
		assert.strictEqual(day6('nppdvjthqldpwncqszvftbrmjlhg').part2, 23);
		assert.strictEqual(day6('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg').part2, 29);
		assert.strictEqual(day6('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw').part2, 26);
	});

	it('Actual', async () => {
		const solution = day6(actualInput);

		expect(solution).toMatchInlineSnapshot(`
			{
			  "part1": 1480,
			  "part2": 2746,
			}
		`);
	});
});
