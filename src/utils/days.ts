import {readFile} from 'node:fs/promises';
import {URL} from 'node:url';
import {days} from '../days/index.js';
import type {Day} from '../lib/solution.js';

export class UnknownDayError extends RangeError {
	override name = this.constructor.name;
	constructor(day: string) {
		super(`Day ${day} could not be resolved`);
	}
}

export function resolveDays(dayNames: readonly string[]): Map<string, Day> {
	return new Map(
		dayNames.map(day => {
			const solution = days.get(day);

			if (!solution) {
				throw new UnknownDayError(day);
			}

			return [day, solution];
		}),
	);
}

function getInputPath(dayName: string | number): URL {
	return new URL(`../../inputs/${dayName}.txt`, import.meta.url);
}

export async function getInput(dayName: string | number): Promise<string> {
	return readFile(getInputPath(dayName), 'utf8');
}
