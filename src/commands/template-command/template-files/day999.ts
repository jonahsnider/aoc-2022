import assert from 'node:assert/strict';
import {lines} from '@jonahsnider/util';
import type {SolutionPair} from '../../../lib/types.js';

export function day999(input: string): SolutionPair {
	const solution = {part1: 0, part2: 0} satisfies SolutionPair;

	const linesOfInput = lines(input);

	const numbers = linesOfInput.map(Number);

	for (const number of numbers) {
		assert(number);
	}

	return solution;
}
