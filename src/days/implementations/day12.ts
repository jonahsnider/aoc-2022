import assert from 'node:assert/strict';
import {lines, MathMap, Sort} from '@jonahsnider/util';
import type {SolutionPair} from '../../lib/types.js';

type Route = Set<Point>;

type Grid = Point[][];

class Point {
	neighbors: Point[] = [];

	public readonly height: number;

	constructor(public readonly x: number, public readonly y: number, height: string) {
		this.height = letterToHeight(height);
	}
}

class Self extends Point {
	constructor(x: number, y: number) {
		super(x, y, 'a');
	}
}

class Goal extends Point {
	constructor(x: number, y: number) {
		super(x, y, 'z');
	}
}

function letterToHeight(letter: string): number {
	return letter.codePointAt(0)! - 'a'.codePointAt(0)!;
}

function reconstructPath(cameFrom: Map<Point, Point>, current: Point): Route {
	const totalPath: Route = new Set([current]);

	while (cameFrom.has(current)) {
		current = cameFrom.get(current)!;
		totalPath.add(current);
	}

	return new Set([...totalPath].reverse());
}

function heuristic(current: Readonly<Point>, goal: Readonly<Point>, part2: boolean): number {
	return distance(current, goal, part2);
}

function distance(start: Readonly<Point>, end: Readonly<Point>, part2: boolean): number {
	if (part2 && start.height === end.height && start.height === letterToHeight('a')) {
		return 1;
	}

	return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
}

function aStar(start: Readonly<Point>, goal: Readonly<Point>, part2: boolean): Route {
	const openSet = new Set<Point>([start]);
	const cameFrom = new Map<Point, Point>();

	const gScore = new MathMap(Number.POSITIVE_INFINITY);
	gScore.set(start, 0);

	const fScore = new MathMap(Number.POSITIVE_INFINITY);
	fScore.set(start, heuristic(start, goal, part2));

	while (openSet.size > 0) {
		const current = [...openSet].sort(Sort.ascending(x => fScore.get(x)!))[0];

		if (current === goal) {
			return reconstructPath(cameFrom, current);
		}

		openSet.delete(current);
		for (const neighbor of current.neighbors) {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			const tentativeGScore = gScore.get(current)! + distance(current, neighbor, part2);

			if (tentativeGScore >= gScore.get(neighbor)!) {
				continue;
			}

			cameFrom.set(neighbor, current);
			gScore.set(neighbor, tentativeGScore);
			fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal, part2));

			if (!openSet.has(neighbor)) {
				openSet.add(neighbor);
			}
		}
	}

	throw new RangeError('No path found');
}

export function day12(input: string): SolutionPair {
	const solution = {part1: 0, part2: 0} satisfies SolutionPair;

	let goal: Goal | undefined;
	let self: Self | undefined;
	/** Points with elevation `a`. */
	const aElevationPoints: Point[] = [];

	const grid: Grid = lines(input).map((line, y) =>
		line.split('').map((char, x) => {
			if (char === 'S') {
				self = new Self(x, y);
				return self;
			}

			if (char === 'E') {
				goal = new Goal(x, y);
				return goal;
			}

			const point = new Point(x, y, char);

			if (point.height === letterToHeight('a')) {
				aElevationPoints.push(point);
			}

			return point;
		}),
	);

	assert(self);
	assert(goal);

	// Setup neighbors
	for (const row of grid) {
		for (const point of row) {
			point.neighbors = [grid[point.y - 1]?.[point.x], grid[point.y + 1]?.[point.x], grid[point.y]?.[point.x - 1], grid[point.y]?.[point.x + 1]];

			point.neighbors = point.neighbors.filter(Boolean).filter(neighbor => neighbor.height <= point.height + 1);

			if (point.height === letterToHeight('a')) {
				point.neighbors.push(...aElevationPoints);
			}
		}
	}

	const part1Route = aStar(self, goal, false);
	const part2Route = aStar(self, goal, true);

	const routeArray = [...part2Route];

	// Don't count the starting point
	solution.part1 = part1Route.size - 1;
	// Don't count the starting point or the "a" height point we "teleported" to
	solution.part2 = part2Route.size - 2;

	return solution;
}
