export class CommandError extends Error {
	constructor(message: string, stack = false) {
		super(message);
		this.name = this.constructor.name;

		if (!stack) {
			this.stack = undefined;
		}
	}
}
