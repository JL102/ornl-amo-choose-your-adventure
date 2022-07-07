import { InfoDialog, InfoDialogProps, SelectScope, StartPage } from "./controls";
import React from 'react';

/**
 * Symbols to represent each page.
 */
export const Pages = {
	start: Symbol.for('start'),
	home: Symbol.for('home'),
	selectScope: Symbol.for('selectScope'),
	scope1Projects: Symbol.for('scope1Projects'),
	scope2Projects: Symbol.for('scope2Projects'),
	digitalTwin: Symbol.for('digitalTwin'),
};

export const pageControls: PageControls = { };

pageControls[Pages.start] = {
	controlClass: StartPage,
	onBack: Pages.start, // Essentially disables back
	onContinue: Pages.home,
	controlProps: { }
};

pageControls[Pages.home] = {
	controlClass: InfoDialog,
	onBack: () => Pages.start,
	onContinue: () => Pages.selectScope,
	controlProps: {
		text: 'For the past couple of decades, the automotive industry has been under pressure from regulators, public interest groups, stakeholders, customers, investors, and financial institutions to pursue a more sustainable model of growth.\nAs a sustainability manager at {$companyName}, your job is to make sure your facility meets its new corporate carbon reduction goal:',
		cardText: '{50%} carbon reduction over the next {10 years} with a {$1,000,000 annual budget}',
		title: 'Introduction',
		img: 'images/manufacturing.png',
		imgAlt: 'A robotic arm working on a car.',
	}
};

pageControls[Pages.selectScope] = {
	controlClass: SelectScope,
	onBack: Pages.home,
	onContinue: function (buttonPressed) {
		return Pages.home;
	},
	controlProps: {
		title: 'To begin, you will need to decide which types of projects to pursue. {Would you like to...}',
		choice1: 'Tackle Scope 1 emissions – fossil fuel consumption',
		choice2: 'Tackle Scope 2 emissions – purchased electricity'
	}
};

pageControls[Pages.digitalTwin] = {
	controlClass: InfoDialog,
	onBack: () => Pages.home,
	onContinue: () => Pages.digitalTwin,
	controlProps: {
		title: '{SELECTED}: DIGITAL TWIN ANALYSIS',
		cardText: 'You have achieved {2%} carbon emissions reduction and spent {$90,000} dollars.',
		text: '[Ford Motor Company: Dearborn Campus Uses A Digital Twin Tool For Energy Plant Management](https://betterbuildingssolutioncenter.energy.gov/implementation-models/ford-motor-company-dearborn-campus-uses-a-digital-twin-tool-energy-plant)\n\nGood choice! Ford Motor Company used digital twin to improve the life cycle of their campus’s central plant. The new plant is projected to achieve a 50% reduction in campus office space energy and water use compared to their older system.',
		img: 'images/ford.png',
	},
};

// eslint-disable-next-line @typescript-eslint/ban-types
export declare type Component = React.Component|Function;

export declare interface PageControl {
	controlClass?: Resolvable<Component|undefined>;
	onBack: Resolvable<symbol>;
	onContinue: Resolvable<symbol>;
	controlProps: {
		[key: string]: string;
	}
}

declare interface PageControls {
	[key: symbol]: PageControl;
}

/**
 * Either the desired return type, or a function which returns the desired type.
 */
declare type Resolvable<T> = T|((params: unknown) => T);