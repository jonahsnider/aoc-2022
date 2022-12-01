import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day999} from './index.js';

const input = await getInput(999);

test.skip('actual solution', t => {
	const solution = new Day999().solve(input);

	t.deepEqual(solution, {
		part1: 0,
		part2: 0,
	});
});
