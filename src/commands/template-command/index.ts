import {mkdir, writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';
import {Command, Option} from 'clipanion';
import {resolveDays, UnknownDayError} from '../../utils/days.js';
import {CommandError} from '../../utils/errors.js';
import type {TemplateFile} from './template.js';
import {generateTemplateFiles} from './template.js';

class DayExistsError extends CommandError {
	override name = this.constructor.name;
	constructor(day: string) {
		super(`Day ${day} already exists`);
	}
}

export class TemplateCommand extends Command {
	static override readonly paths = [['template'], ['t']];

	// eslint-disable-next-line new-cap
	static override readonly usage = Command.Usage({
		category: 'Days',
		description: 'Create template files for a day',
		examples: [['Create a template for day 15', '$0 15']],
	});

	readonly dayName = Option.String();

	async execute() {
		if (this.dayExists(this.dayName)) {
			throw new DayExistsError(this.dayName);
		}

		const templateFiles = await generateTemplateFiles(this.dayName);

		await this.writeTemplateFiles(templateFiles);
	}

	private dayExists(day: string): boolean {
		try {
			resolveDays([day]);
		} catch (error) {
			if (error instanceof UnknownDayError) {
				return false;
			}

			throw error;
		}

		return true;
	}

	private async writeTemplateFiles(files: readonly TemplateFile[]): Promise<void> {
		const logger = new console.Console(this.context.stdout);

		// Create directories
		await Promise.all(files.map(async file => mkdir(dirname(file.path), {recursive: true})));

		// Write files
		await Promise.all(
			files.map(async file => {
				await writeFile(file.path, file.content);
				logger.log(file.path);
			}),
		);
	}
}
