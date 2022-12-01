import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day1} from './index.js';

const input = await getInput(1);

test('actual solution', t => {
	const solution = new Day1().solve(input);

	t.deepEqual(solution, {
		part1: 66_487,
		part2: 197_301,
	});
});
