import assert from 'node:assert/strict';
import {lines} from '@jonahsnider/util';
import type {SolutionPair} from '../../lib/types.js';

type Direction = 'R' | 'U' | 'L' | 'D';
type Instruction = {
	direction: Direction;
	distance: number;
};
type Coordinates = {x: number; y: number};

function coordinatesToString(coordinates: Coordinates): string {
	return `${coordinates.x + 1},${coordinates.y + 1}`;
}

function serializeGrid(head: Coordinates, tail: Coordinates): string {
	const minX = 0;
	const maxX = Math.max(head.x, tail.x);
	const minY = 0;
	const maxY = Math.max(head.y, tail.y);

	const grid: string[][] = [];

	for (let y = minY; y <= maxY; y++) {
		grid[y] = [];

		for (let x = minX; x <= maxX; x++) {
			grid[y][x] = '.';
		}
	}

	if (head.x === tail.x && head.y === tail.y) {
		grid[head.y][head.x] = 'X';
	} else {
		grid[head.y][head.x] = 'H';
		grid[tail.y][tail.x] = 'T';
	}

	grid[0][0] = 's';

	return grid.map(row => row.join('')).join('');
}

export function day9(input: string): SolutionPair {
	const solution = {part1: 0, part2: 0} satisfies SolutionPair;

	const instructions: Instruction[] = lines(input)
		.map(rawInstruction => rawInstruction.split(' '))
		.map(([direction, rawDistance]) => ({
			direction: direction as Direction,
			distance: Number(rawDistance),
		}));

	const head: Coordinates = {x: 0, y: 0};
	const tail: Coordinates = {x: 0, y: 0};
	const visitedTailCoordinates = new Set<string>([coordinatesToString(tail)]);

	for (const instruction of instructions) {
		for (let distanceMoved = 0; distanceMoved < instruction.distance; distanceMoved++) {
			switch (instruction.direction) {
				case 'R': {
					head.x++;
					break;
				}

				case 'U': {
					head.y++;
					break;
				}

				case 'L': {
					head.x--;
					break;
				}

				case 'D': {
					head.y--;
					break;
				}
			}

			const xDifference = head.x - tail.x;
			const yDifference = head.y - tail.y;

			if (head.x === tail.x && Math.abs(yDifference) === 2) {
				// Move tail up or down
				tail.y += Math.sign(yDifference);
			} else if (head.y === tail.y && Math.abs(xDifference) === 2) {
				// Move tail left or right
				tail.x += Math.sign(xDifference);
			} else if (Math.abs(xDifference) === 2 || Math.abs(yDifference) === 2) {
				// Move tail diagonally
				tail.x += Math.sign(xDifference);
				tail.y += Math.sign(yDifference);
			}

			// Finally, we add the tail's coordinates to the set of visited coordinates
			visitedTailCoordinates.add(coordinatesToString(tail));
		}
	}

	solution.part1 = visitedTailCoordinates.size;

	return solution;
}
