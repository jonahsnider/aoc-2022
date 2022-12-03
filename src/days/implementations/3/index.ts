import {chunk, first, intersection, lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day3 extends Day {
	private static priorityForItem(item: string): number {
		const code = item.codePointAt(0)!;

		if (code >= 'a'.codePointAt(0)! && code <= 'z'.codePointAt(0)!) {
			return code - 96;
		}

		if (code >= 'A'.codePointAt(0)! && code <= 'Z'.codePointAt(0)!) {
			return code - 38;
		}

		throw new RangeError(`Unknown item: ${item}`);
	}

	private static parseRucksack(rucksack: string): {first: string; second: string; raw: string} {
		const first = rucksack.slice(0, rucksack.length / 2);
		const second = rucksack.slice(rucksack.length / 2);
		return {first, second, raw: rucksack};
	}

	private static findIntersectionInRucksacks(rucksackOne: string, rucksackTwo: string, rucksackThree?: string): string {
		const intersectionOne = intersection(new Set(rucksackOne), new Set(rucksackTwo));

		if (rucksackThree) {
			const intersectionTwo = intersection(new Set(rucksackTwo), new Set(rucksackThree));

			return first(intersection(intersectionOne, intersectionTwo))!;
		}

		return first(intersectionOne)!;
	}

	solve(input: string): SolutionPair {
		const solution = {part1: 0, part2: 0} satisfies SolutionPair;

		const rucksacks = lines(input).map(line => Day3.parseRucksack(line));

		for (const [first, second, third] of chunk(rucksacks, 3)) {
			for (const rucksack of [first, second, third]) {
				const item = Day3.findIntersectionInRucksacks(rucksack.first, rucksack.second);
				const priority = Day3.priorityForItem(item);

				solution.part1 += priority;
			}

			const item = Day3.findIntersectionInRucksacks(first.raw, second.raw, third.raw);
			const priority = Day3.priorityForItem(item);

			solution.part2 += priority;
		}

		return solution;
	}
}
