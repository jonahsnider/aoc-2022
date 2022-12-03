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
	const indexTestRaw = await readFile(path.join(TEMPLATE_FILES_DIR, 'index.test.ts'), 'utf8');
	const implementationsIndexRaw = await readFile(implementationsIndexPath, 'utf8');

	const index = replaceDayName(indexRaw, dayName);
	const indexTest = replaceDayName(indexTestRaw, dayName);
	const implementationsIndex = `${implementationsIndexRaw.trimEnd()}\nexport * from './${dayName}/index.js';\n`;

	return [
		// Input file
		{path: path.join(PROJECT_ROOT, 'inputs', `${dayName}.txt`), content: ''},

		// Solution file
		{path: path.join(PROJECT_ROOT, 'src', 'days', 'implementations', dayName, 'index.ts'), content: index},

		// Solution test file
		{path: path.join(PROJECT_ROOT, 'src', 'days', 'implementations', dayName, 'index.test.ts'), content: indexTest},

		// Implementations index file
		{path: implementationsIndexPath, content: implementationsIndex},
	];
}

function replaceDayName(contents: string, dayName: string): string {
	return contents.replaceAll('999', dayName);
}
