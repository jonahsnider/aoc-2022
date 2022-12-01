import assert from 'node:assert/strict';
import {lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day999 extends Day {
	solve(input: string): SolutionPair {
		const solution = {part1: 0, part2: 0} satisfies SolutionPair;

		const numbers = lines(input).map(Number);

		for (const number of numbers) {
			assert(number);
		}

		return solution;
	}
}
