import assert from 'node:assert/strict';
import {Sort, sum} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day1 extends Day {
	solve(input: string): SolutionPair {
		const solution = {part1: 0, part2: 0} satisfies SolutionPair;

		const clusters = input.split('\n\n').map(group => group.split('\n').map(Number));

		const summed = clusters.map(cluster => cluster.reduce(sum));

		summed.sort(Sort.descending);

		assert(summed[0]);
		assert(summed[1]);
		assert(summed[2]);
		solution.part1 = summed[0];
		solution.part2 = summed[0] + summed[1] + summed[2];

		return solution;
	}
}
