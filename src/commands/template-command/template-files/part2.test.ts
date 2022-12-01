import test from 'ava';
import {Day999} from './index.js';

const input = `REPLACEME`;

test.skip('works', t => {
	const {part2: solution} = new Day999().solve(input);

	t.is(solution, 123);
});
