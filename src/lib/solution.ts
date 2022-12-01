import type {SolutionPair} from './types.js';

export abstract class Day {
	get skipBenchmarks() {
		return false;
	}

	abstract solve(input: string): SolutionPair | PromiseLike<SolutionPair>;
}
