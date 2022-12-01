import test from 'ava';
import {Day1} from './index.js';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

test('works', t => {
	const {part1: solution} = new Day1().solve(input);

	t.is(solution, 24_000);
});
