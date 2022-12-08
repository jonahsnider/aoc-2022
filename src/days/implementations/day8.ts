import {lines} from '@jonahsnider/util';
import type {SolutionPair} from '../../lib/types.js';

type TreeHeight = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Forest = TreeHeight[][];
type TreePosition = {x: number; y: number};

function getTreeHeight(forest: Forest, {x, y}: TreePosition): TreeHeight {
	return forest[y][x];
}

function getRow(forest: Forest, y: number): TreeHeight[] {
	return forest[y];
}

function* trees(forest: Forest): Generator<TreePosition> {
	for (const [y, element] of forest.entries()) {
		for (let x = 0; x < element.length; x++) {
			yield {x, y};
		}
	}
}

export function day8(input: string): SolutionPair {
	const solution = {part1: 0, part2: 0} satisfies SolutionPair;

	const forest: Forest = lines(input).map(line => line.split('').map(character => Number(character) as TreeHeight));

	for (const {x, y} of trees(forest)) {
		const height = getTreeHeight(forest, {x, y});

		const numberOfTreesVisible = {
			up: 0,
			down: 0,
			left: 0,
			right: 0,
		};

		const blocked = {
			up: false,
			down: false,
			left: false,
			right: false,
		};

		for (let distance = 1; distance < forest.length; distance++) {
			if (y - distance >= 0 && !blocked.up) {
				const neighbor = getTreeHeight(forest, {x, y: y - distance});

				blocked.up ||= neighbor >= height;
				numberOfTreesVisible.up++;
			}

			if (y + distance < forest.length && !blocked.down) {
				const neighbor = getTreeHeight(forest, {x, y: y + distance});
				blocked.down ||= neighbor >= height;
				numberOfTreesVisible.down++;
			}

			if (x - distance >= 0 && !blocked.left) {
				const neighbor = getTreeHeight(forest, {x: x - distance, y});

				blocked.left ||= neighbor >= height;
				numberOfTreesVisible.left++;
			}

			if (x + distance < getRow(forest, y).length && !blocked.right) {
				const neighbor = getTreeHeight(forest, {x: x + distance, y});

				blocked.right ||= neighbor >= height;
				numberOfTreesVisible.right++;
			}
		}

		const scenicScore = numberOfTreesVisible.up * numberOfTreesVisible.down * numberOfTreesVisible.left * numberOfTreesVisible.right;

		if (!blocked.up || !blocked.down || !blocked.left || !blocked.right) {
			solution.part1++;
		}

		if (scenicScore > solution.part2) {
			solution.part2 = scenicScore;
		}
	}

	return solution;
}
