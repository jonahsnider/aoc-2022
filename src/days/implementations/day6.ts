import type {SolutionPair} from '../../lib/types.js';

export function day6(input: string): SolutionPair {
	const solution = {part1: 0, part2: 0} satisfies SolutionPair;

	// Input is a single line with a ton of charaters
	// iterate through it in groups of 4 at a time
	// if all 4 characters are not the same, set the solution to part 1 to that index and exit

	for (let i = 0; i < input.length; i++) {
		const slice1 = input.slice(i, i + 4);
		const slice2 = input.slice(i, i + 14);

		if (!solution.part1 && new Set(slice1).size === 4) {
			solution.part1 = i + 4;
		}

		if (new Set(slice2).size === 14) {
			solution.part2 = i + 14;
			break;
		}
	}

	return solution;
}
