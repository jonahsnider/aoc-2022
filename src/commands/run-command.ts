import {Sort} from '@jonahsnider/util';
import {Command, Option} from 'clipanion';
import {days} from '../days/index.js';
import type {Day} from '../lib/solution.js';
import type {SolutionPair} from '../lib/types.js';
import {getInput, resolveDays} from '../utils/days.js';

type DaySolution = {
	day: number;
	part1: number | string;
	part2: number | string;
};

const MAX_STRING_SOLUTION_LENGTH = 10;

export class RunCommand extends Command {
	static override readonly paths = [['run'], ['r'], Command.Default];

	// eslint-disable-next-line new-cap
	static override readonly usage = Command.Usage({
		category: 'Days',
		description: 'Run the programs for the provided days, or all of them if unspecified',
		examples: [
			['Run all days', '$0'],
			['Run a given set of days', '$0 1 2'],
		],
	});

	// eslint-disable-next-line new-cap
	readonly days = Option.Rest();

	async execute(): Promise<void> {
		const results: DaySolution[] = await this.runDays();

		new console.Console(this.context.stdout).table(results);
	}

	private resolveDays(): Map<string, Day> {
		if (this.days.length === 0) {
			return new Map(days);
		}

		return resolveDays(this.days);
	}

	private formatSolution(solution: SolutionPair[keyof SolutionPair]): SolutionPair[keyof SolutionPair] {
		if (typeof solution === 'string') {
			if (solution.length <= MAX_STRING_SOLUTION_LENGTH) {
				return solution;
			}

			return '[truncated]';
		}

		return solution;
	}

	private async runDays() {
		const days = this.resolveDays();

		const results: DaySolution[] = await Promise.all(
			[...days.entries()].map(async ([dayName, day]) => {
				const input = await getInput(dayName);

				const {part1, part2} = await day.solve(input);

				return {
					day: Number(dayName),
					part1: this.formatSolution(part1),
					part2: this.formatSolution(part2),
				};
			}),
		);

		results.sort(Sort.ascending(x => x.day));

		return results;
	}
}
