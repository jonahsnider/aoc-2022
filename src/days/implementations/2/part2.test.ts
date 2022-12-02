import test from 'ava';
import {Day2} from './index.js';

const input = `A Y
B X
C Z`;

test('works', t => {
	const {part2: solution} = new Day2().solve(input);

	t.is(solution, 12);
});
