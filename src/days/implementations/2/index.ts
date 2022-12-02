/* eslint-disable default-case */

import {lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

enum MyShape {
	Rock = 'X',
	Paper = 'Y',
	Scissors = 'Z',
}

enum TheirShape {
	Rock = 'A',
	Paper = 'B',
	Scissors = 'C',
}

enum Shape {
	Rock,
	Paper,
	Scissors,
}

enum GameResult {
	Win,
	Loss,
	Draw,
}

export class Day2 extends Day {
	private static getGameResult(theirs: Shape, mine: Shape): GameResult {
		switch (theirs) {
			case mine: {
				return GameResult.Draw;
			}

			case Shape.Rock: {
				return mine === Shape.Paper ? GameResult.Win : GameResult.Loss;
			}

			case Shape.Paper: {
				return mine === Shape.Scissors ? GameResult.Win : GameResult.Loss;
			}

			case Shape.Scissors: {
				return mine === Shape.Rock ? GameResult.Win : GameResult.Loss;
			}
		}

		throw new RangeError('Invalid shape');
	}

	private static normalizeShape(shape: TheirShape | MyShape): Shape {
		switch (shape) {
			case MyShape.Rock:
			case TheirShape.Rock: {
				return Shape.Rock;
			}

			case MyShape.Paper:
			case TheirShape.Paper: {
				return Shape.Paper;
			}

			case MyShape.Scissors:
			case TheirShape.Scissors: {
				return Shape.Scissors;
			}
		}
	}

	private static scoreForRound(myShape: Shape, gameResult: GameResult): number {
		let score = 0;

		switch (myShape) {
			case Shape.Rock: {
				score += 1;
				break;
			}

			case Shape.Paper: {
				score += 2;
				break;
			}

			case Shape.Scissors: {
				score += 3;
				break;
			}
		}

		switch (gameResult) {
			case GameResult.Win: {
				score += 6;
				break;
			}

			case GameResult.Draw: {
				score += 3;
				break;
			}

			case GameResult.Loss: {
				break;
			}
		}

		return score;
	}

	/** Pick what shape I should play in order to get the desired game result. */
	private static pickShape(theirShape: Shape, goalResult: GameResult): Shape {
		if (goalResult === GameResult.Draw) {
			return theirShape;
		}

		const shouldWin = goalResult === GameResult.Win;
		switch (theirShape) {
			case Shape.Rock: {
				return shouldWin ? Shape.Paper : Shape.Scissors;
			}

			case Shape.Paper: {
				return shouldWin ? Shape.Scissors : Shape.Rock;
			}

			case Shape.Scissors: {
				return shouldWin ? Shape.Rock : Shape.Paper;
			}
		}
	}

	private static shapeToGoalResult(shape: Shape): GameResult {
		switch (shape) {
			case Shape.Rock: {
				return GameResult.Loss;
			}

			case Shape.Paper: {
				return GameResult.Draw;
			}

			case Shape.Scissors: {
				return GameResult.Win;
			}
		}
	}

	solve(input: string): SolutionPair {
		const solution = {part1: 0, part2: 0} satisfies SolutionPair;

		const rounds = lines(input)
			.map(line => line.split(' ') as [TheirShape, MyShape])
			.map(([theirs, mine]) => ({theirs: Day2.normalizeShape(theirs), mine: Day2.normalizeShape(mine)}));

		for (const round of rounds) {
			solution.part1 += Day2.scoreForRound(round.mine, Day2.getGameResult(round.theirs, round.mine));

			const goalResult = Day2.shapeToGoalResult(round.mine);
			const shape = Day2.pickShape(round.theirs, goalResult);
			solution.part2 += Day2.scoreForRound(shape, Day2.getGameResult(round.theirs, shape));
		}

		return solution;
	}
}
