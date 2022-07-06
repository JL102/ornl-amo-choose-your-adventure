import { InfoDialog } from "./controls";

/**
 * Symbols to represent each page.
 */
export const Pages = {
	home: Symbol.for('home'),
	start: Symbol.for('start'),
	digitalTwin: Symbol.for('digitalTwin'),
};

export const test = {
	[Pages.home]: {
		dialogClass: InfoDialog,
		onBack: () => Pages.home,
		onContinue: () => Pages.digitalTwin,
		dialogOptions: {
			
		}
	}
};