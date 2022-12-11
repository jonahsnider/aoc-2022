/* eslint-disable no-new-func */
import {lines, Sort} from '@jonahsnider/util';
import type {SolutionPair} from '../../lib/types.js';

type MonkeyData = {
	id: number;
	startingItems: number[];
	operation: (old: number) => number;
	test: (newValue: number) => boolean;
	trueThrow: number;
	falseThrow: number;

	/** The number of times this monkey inspected an item */
	monkeyBusiness: number;
};

type Monkeys = Map<number, MonkeyData>;

/**
 * The monkeys take turns inspecting and throwing items.
 * On a single monkey's turn, it inspects and throws all of the items it is holding one at a time and in the order listed.
 * Monkey 0 goes first, then monkey 1, and so on until each monkey has had one turn.
 * The process of each monkey taking a single turn is called a round.
 *
 * When a monkey throws an item to another monkey, the item goes on the end of the recipient monkey's list.
 * A monkey that starts a round with no items could end up inspecting and throwing many items by the time its turn comes around.
 * If a monkey is holding no items at the start of its turn, its turn ends.
 */
function runRoundForMonkey(monkeys: Monkeys, monkeyID: number): void {
	const monkey = monkeys.get(monkeyID)!;

	// After each monkey inspects an item but before it tests your worry level, your relief that the monkey's inspection didn't damage the item causes your worry level to be divided by three and rounded down to the nearest integer.

	while (monkey.startingItems.length > 0) {
		const item = monkey.startingItems.shift()!;

		const newValue = Math.floor(monkey.operation(item) / 3);

		if (monkey.test(newValue)) {
			monkeys.get(monkey.trueThrow)!.startingItems.push(newValue);
		} else {
			monkeys.get(monkey.falseThrow)!.startingItems.push(newValue);
		}

		monkey.monkeyBusiness++;
	}
}

function runTurn(monkeys: Monkeys): void {
	for (const [id] of monkeys) {
		runRoundForMonkey(monkeys, id);
	}
}

function parseMonkeyData(rawMonkeyData: string): MonkeyData {
	const [monkey, startingItems, operation, test, trueThrow, falseThrow] = lines(rawMonkeyData);

	const testNumber = test.split('divisible by ')[1];
	const parsedMonkeyData = {
		id: Number(/\d+/.exec(monkey)![0]),
		startingItems: startingItems.split(': ')[1].split(', ').map(Number),
		operation: new Function('old', `return ${operation.split('= ')[1]}`) as (old: number) => number,
		test: new Function('newValue', `return newValue % ${testNumber} === 0`) as (newValue: number) => boolean,
		trueThrow: Number(/\d+/.exec(trueThrow)![0]),
		falseThrow: Number(/\d+/.exec(falseThrow)![0]),

		monkeyBusiness: 0,
	};

	return parsedMonkeyData;
}

export function day11(input: string): SolutionPair {
	const solution = {part1: 0, part2: 0} satisfies SolutionPair;

	const monkeyData: Monkeys = new Map(
		input.split('\n\n').map(rawMonkeyData => {
			const parsed = parseMonkeyData(rawMonkeyData);

			return [parsed.id, parsed];
		}),
	);

	for (let i = 0; i < 20; i++) {
		runTurn(monkeyData);
	}

	const arrayMonkeys = Array.from(monkeyData.values());

	arrayMonkeys.sort(Sort.descending(monkey => monkey.monkeyBusiness));

	const [mostActive, secondMostActive] = arrayMonkeys;

	solution.part1 = mostActive.monkeyBusiness * secondMostActive.monkeyBusiness;

	return solution;
}
