import {Sort, sum} from '@jonahsnider/util';
import type {SolutionPair} from '../../lib/types.js';

export function day1(input: string): SolutionPair {
	const solution = {part1: 0, part2: 0} satisfies SolutionPair;

	const rawCalorieGroups = input.split('\n\n');
	const calorieGroups = rawCalorieGroups.map(rawCalorieGroup => rawCalorieGroup.split('\n').map(Number));
	const totalCaloriesPerGroup = calorieGroups.map(cluster => cluster.reduce(sum));

	totalCaloriesPerGroup.sort(Sort.descending);

	solution.part1 = totalCaloriesPerGroup[0];
	solution.part2 = totalCaloriesPerGroup[0] + totalCaloriesPerGroup[1] + totalCaloriesPerGroup[2];

	return solution;
}
