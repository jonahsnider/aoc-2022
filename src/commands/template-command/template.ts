import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export type TemplateFile = {
	path: string;
	content: string;
};

const PROJECT_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const TEMPLATE_FILES_DIR = path.join(PROJECT_ROOT, 'src', 'commands', 'template-command', 'template-files');

export async function generateTemplateFiles(dayName: string): Promise<TemplateFile[]> {
	const implementationsIndexPath = path.join(PROJECT_ROOT, 'src', 'days', 'implementations', 'index.ts');

	const indexRaw = await readFile(path.join(TEMPLATE_FILES_DIR, 'index.ts'), 'utf8');
	const part1TestRaw = await readFile(path.join(TEMPLATE_FILES_DIR, 'part1.test.ts'), 'utf8');
	const part2TestRaw = await readFile(path.join(TEMPLATE_FILES_DIR, 'part2.test.ts'), 'utf8');
	const actualTestRaw = await readFile(path.join(TEMPLATE_FILES_DIR, 'actual.test.ts'), 'utf8');
	const implementationsIndexRaw = await readFile(implementationsIndexPath, 'utf8');

	const index = replaceDayName(indexRaw, dayName);
	const part1Test = replaceDayName(part1TestRaw, dayName);
	const part2Test = replaceDayName(part2TestRaw, dayName);
	const actualTest = replaceDayName(actualTestRaw, dayName);
	const implementationsIndex = `${implementationsIndexRaw.trimEnd()}\nexport * from './${dayName}/index.js';\n`;

	return [
		// Input file
		{path: path.join(PROJECT_ROOT, 'inputs', `${dayName}.txt`), content: ''},

		// Solution file
		{path: path.join(PROJECT_ROOT, 'src', 'days', 'implementations', dayName, 'index.ts'), content: index},

		// Part 1 test file
		{path: path.join(PROJECT_ROOT, 'src', 'days', 'implementations', dayName, 'part1.test.ts'), content: part1Test},

		// Part 2 test file
		{path: path.join(PROJECT_ROOT, 'src', 'days', 'implementations', dayName, 'part2.test.ts'), content: part2Test},

		// Actual test file
		{path: path.join(PROJECT_ROOT, 'src', 'days', 'implementations', dayName, 'actual.test.ts'), content: actualTest},

		// Implementations index file
		{path: implementationsIndexPath, content: implementationsIndex},
	];
}

function replaceDayName(contents: string, dayName: string): string {
	return contents.replaceAll('999', dayName);
}
