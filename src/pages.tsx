import { Emphasis, GroupedChoices, InfoDialog, InfoDialogProps, SelectScope, SelectScopeChoice, StartPage } from "./controls";
import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Co2Icon from '@mui/icons-material/Co2';
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

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
		choices: [
			{
				title: 'A',
				text: 'Tackle Scope 1 emissions – fossil fuel consumption',
				infoPopup: <div style={{maxWidth: '200px'}}>
					<Typography variant='h6'>
						Scope 1: Direct Emissions
					</Typography>
					<Typography variant='body1'>Company emissions that are owned or controlled by the organization directly.</Typography>
					<Box sx={{marginTop: 2}}>
						<Grid container spacing={4} sx={{textAlign: 'center'}}>
							<Grid item xs={4}>
								<LocalShippingIcon fontSize='large'/>
							</Grid>
							<Grid item xs={4}>
								<FactoryIcon fontSize='large'/>
							</Grid>
							<Grid item xs={4}>
								<LocationCityIcon fontSize='large'/>
							</Grid>
						</Grid>
					</Box>
				</div>,
				onSelect: function (state, nextState) {
					console.log(this);
					return Pages.scope1Projects;
				},
			},
			{
				title: 'B',
				text: 'Tackle Scope 1 emissions – fossil fuel consumption',
				infoPopup: <div style={{maxWidth: '200px'}}>
					<Typography variant='h6'>
						Scope 2: Indirect Emissions
					</Typography>
					<Typography variant='body1'>Company emissions that are caused indirectly when the energy it purchases and uses is produced.</Typography>
					<Box sx={{marginTop: 2}}>
						<Grid container spacing={4} sx={{textAlign: 'center'}}>
							<Grid item xs={6}>
								<FlashOnIcon fontSize='large'/>
							</Grid>
							<Grid item xs={6}>
								<ElectricalServicesIcon fontSize='large'/>
							</Grid>
						</Grid>
					</Box>
				</div>,
				onSelect: () => Pages.scope2Projects,
			},
			
		]
	}
};

pageControls[Pages.scope1Projects] = {
	controlClass: GroupedChoices,
	onBack: Pages.selectScope,
	onContinue: Pages.selectScope,
	controlProps: {
		title: '{Scope 1 Emissions Projects} - Good choice! You have {15 minutes} to explore this menu. Spend it wisely!',
		groups: [
			{
				title: 'Invest in energy efficiency',
				choices: [
					// TODO TOMORROW: this
					{
						title: '1',
						text: 'Upgrade heat recovery on boiler/furnace system',
						infoPopup: <div style={{maxWidth: '200px'}}>
							<Typography variant='h6'>Energy Efficiency - Waste Heat Recovery</Typography>
							<Typography variant='body1'>Currently, your facility uses inefficient, high-volume furnace technology, where combustion gases are evacuated through a side take-off duct into the emission control system</Typography>
							<Typography variant='body1'>You can use digital twin technology to accurately <Emphasis>detect energy losses</Emphasis>, pinpoint areas where energy can be conserved, and improve the overall performance of production lines.</Typography>
						</div>
					},
					{
						title: '1',
						text: 'Upgrade heat recovery on boiler/furnace system',
						infoPopup: <div style={{maxWidth: '200px'}}>
							<Typography variant='h6'>Energy Efficiency - Digital Twin Analysis</Typography>
							<Typography variant='body1'>A digital twin is the virtual representation of a physical object or system across its lifecycle</Typography>
							<Typography variant='body1'>You can use digital twin technology to accurately <Emphasis>detect energy losses</Emphasis>, pinpoint areas where energy can be conserved, and improve the overall performance of production lines.</Typography>
						</div>
					},
				]
			}
		]
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
		[key: string]: any;
	}
}

export declare interface SelectScopeControl extends PageControl {
	controlClass: typeof SelectScope;
	controlProps: {
		title: string;
		choices: SelectScopeChoice[];
	}
}

declare interface PageControls {
	[key: symbol]: PageControl|SelectScopeControl;
}

export class PageError extends Error {
	constructor(message) {
		super(message);
	}
}