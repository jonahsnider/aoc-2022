import type {SolutionPair} from './types.js';

export type SolveFunction = (input: string) => SolutionPair | PromiseLike<SolutionPair>;

export type Day = {
	readonly skipBenchmarks: boolean;
	readonly solve: SolveFunction;
};
