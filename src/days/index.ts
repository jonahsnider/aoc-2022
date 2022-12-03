import type {Day} from '../lib/solution.js';
import * as Days from './implementations/index.js';

export const days: ReadonlyMap<string, Day> = new Map(
	Object.entries(Days).map(([solveFunctionName, solveFunction]) => [
		solveFunctionName.slice('day'.length),
		{
			solve: solveFunction,
		},
	]),
);
