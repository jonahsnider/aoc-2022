import assert from 'node:assert/strict';
import {URL} from 'node:url';
import {Suite} from '@jonahsnider/benchmark';
import {days} from '../../days/index.js';
import {getInput} from '../../utils/days.js';

const dayName = new URL(import.meta.url).searchParams.get('day');
assert(dayName);

const input = await getInput(dayName);
const day = days.get(dayName);
assert(day);

const suite = new Suite(dayName, {
	warmup: {durationMs: 10_000},
	run: {durationMs: 10_000},
	filepath: import.meta.url,
});

suite.addTest('solve', () => day.solve(input));

export default suite;
