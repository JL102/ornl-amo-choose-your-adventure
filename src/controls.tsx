import { Box, Button, Container, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery, Paper, Typography, Grid, Stack, SvgIconTypeMap } from "@mui/material";
import { comparePropsAndStateIgnoreFuncs, parseSpecialText } from "./functions-and-types";
import { theme } from './theme';
import PropTypes from 'prop-types';
import Image from 'mui-image';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BasicPopover from "./BasicPopover";
import { ButtonGroup, ButtonGroupButton, ButtonGroupProps } from "./Buttons";

/* -======================================================- */
//                         CONTROLS
/* -======================================================- */

export function Emphasis(props: React.PropsWithChildren) {
	return <span className='emphasis'>{props.children}</span>;
}

/**
 * Start page
 */
export function StartPage(props: StartPageProps) {
	return (
		<React.Fragment>
			<h1>
				<Image style={{'maxWidth': '400px'}} src='./images/better-plants.png' duration={0}></Image>
			</h1>
			<Typography variant="h2" component="div" gutterBottom>
				CHOOSE YOUR OWN SOLUTION!
			</Typography>
			<Typography variant="h4" component="div" gutterBottom>
				Can you decarbonize this industrial facility?
			</Typography>
			<br/>
			<ButtonGroup buttons={props.buttons} doPageCallback={props.doPageCallback} summonInfoDialog={props.summonInfoDialog}/>
		</React.Fragment>
	);
}

/**
 * Stylized "Paper" item to go inside a grid
 */
const PaperGridItem = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

/**
 * Optional BasicPopover info 
 * @param popupContents Contents provided by the page control's infoPopup attribute
 * @returns {React.Component}
 */
function optionalInfoPopup(buttonText: string, buttonVariant: buttonVariant, popupContents?: React.ReactNode) {
	if (popupContents) {
		return (
			<BasicPopover text={buttonText} variant={buttonVariant} startIcon={<QuestionMarkIcon/>}>
				{popupContents}
			</BasicPopover>
		);
	}
	else return <></>;
}

/**
 * Function for selecting general scope.
 */
export function SelectScope(props: SelectScopeProps) {
	
	let numChoices = props.choices.length;
	let gridWidth = 12 / numChoices;
	
	const gridItems = props.choices.map((choice, idx) => {
		
		
		return (
			<Grid item xs={12} sm={gridWidth} key={idx}>
				<PaperGridItem>
					<Typography variant='h4'>{choice.title}</Typography>
						<Typography variant='body1' p={2} dangerouslySetInnerHTML={parseSpecialText(choice.text)}/>
						<ButtonGroup buttons={choice.buttons} doPageCallback={props.doPageCallback} summonInfoDialog={props.summonInfoDialog}/>
						{/* <Stack direction="row" justifyContent="center" spacing={2}>
							{optionalInfoPopup('Info', 'outlined', choice.infoPopup)}
							<Button onClick={() => props.doPageCallback(choice.onSelect)} variant='contained'>Select</Button>
						</Stack> */}
				</PaperGridItem>
			</Grid>
		);
	});
	
	return (
		<Box m={2}>
			<Typography variant='h5' dangerouslySetInnerHTML={parseSpecialText(props.title)}/>
			<br/>
			<Grid container spacing={2}>
				{gridItems}
			</Grid>
		</Box>
	);
}

/**
 * Generic control for picking between multiple choices across multiple groups.
 */
export function GroupedChoices(props: GroupedChoicesProps) {
		
	let numGroups = props.groups.length;
	let gridWidth = 12 / numGroups;
	
	const gridItems = props.groups.map((group, idx) => {
		
		const choices = group.choices.map((choice, idx) => {
			
			return (<Grid item xs={12} key={idx}>
				<PaperGridItem>
					<Typography variant='h4'>{choice.title}</Typography>
						<Typography variant='body1' p={2} dangerouslySetInnerHTML={parseSpecialText(choice.text)}/>
						
						<ButtonGroup 
							buttons={choice.buttons} 
							doPageCallback={props.doPageCallback} 
							summonInfoDialog={props.summonInfoDialog}
						/>
						{/* <Stack direction="row" justifyContent="center" spacing={2}>
							{optionalInfoPopup('Info', 'outlined', choice.infoPopup)}
							<Button onClick={() => props.doPageCallback(choice.onSelect)} variant='contained'>Select</Button>
						</Stack> */}
				</PaperGridItem>
			</Grid>);
		});
		
		return (<Grid item xs={12} sm={gridWidth} key={idx}>
			<Typography variant='h6' dangerouslySetInnerHTML={parseSpecialText(group.title)}/>
			<Grid container spacing={2}>
				{choices}
			</Grid>
		</Grid>);
	});
	
	return (
		<Box m={2}>
			<Typography variant='h5' dangerouslySetInnerHTML={parseSpecialText(props.title)}/>
			<br/>
			<Grid container spacing={2}>
				{gridItems}
			</Grid>
		</Box>
	);
}

export const InfoCard = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
	height: 60,
	lineHeight: '60px',
	borderColor: theme.palette.primary.light,
}));

function InfoDialogFunc (props: InfoDialogProps) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	
	const cardImage = (props.img) ? 
		<CardMedia
			component="img"
			height="260"
			image={props.img}
			alt={props.imgAlt}
		/>
		: <></>;
	console.log(props.buttons);
	return (
		<Dialog
			fullScreen={fullScreen}
			open={props.open}
			keepMounted
			// onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
		>
			{cardImage}
			<DialogTitle className='semi-emphasis' dangerouslySetInnerHTML={parseSpecialText(props.title)}></DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description" gutterBottom dangerouslySetInnerHTML={parseSpecialText(props.text)}>
				</DialogContentText>
				<br/>
				{props.cardText ? 
					<InfoCard variant='outlined' 
						dangerouslySetInnerHTML={parseSpecialText(props.cardText)}
					/>
					:
					<></>
				}
			</DialogContent>
			<DialogActions>
				<ButtonGroup 
					buttons={props.buttons} 
					doPageCallback={props.doPageCallback} 
					summonInfoDialog={props.summonInfoDialog}
					useMUIStack={false}
				/>
			</DialogActions>
		</Dialog>
	);
}

export class InfoDialog extends React.Component <InfoDialogProps> {
	shouldComponentUpdate(nextProps, nextState) {
		return comparePropsAndStateIgnoreFuncs.apply(this, [nextProps, nextState]);
	}
	
	render() {
		return (
			<InfoDialogFunc {...this.props}/>
		);
	}
}

/* -======================================================- */
//                      PROPS INTERFACES
/* -======================================================- */

export interface Choice {
	title?: string;
	text: string;
	infoPopup?: React.ReactNode;
	// onSelect: PageCallback;
	disabled?: Resolvable<boolean>;
	buttons?: ButtonGroupButton[];
}

export interface SelectScopeProps {
	title: string;
	choices: Choice[];
	doPageCallback: (callback?: PageCallback) => void;
	summonInfoDialog: (props) => void;
	buttons?: ButtonGroupButton[];
}

export interface GroupedChoicesGroup {
	title: string;
	choices: Choice[];
}

export interface GroupedChoicesProps {
	title: string;
	groups: GroupedChoicesGroup[];
	doPageCallback: (callback?: PageCallback) => void;
	summonInfoDialog: (props) => void;
}

export interface InfoDialogProps {
	img?: string;
	imgAlt?: string;
	open: boolean;
	text: string;
	cardText?: string;
	title: string;
	buttons?: ButtonGroupButton[];
	doPageCallback: (callback?: PageCallback) => void;
	summonInfoDialog: (props) => void;
}

export declare interface StartPageProps {
	onButtonClick: () => void;
	buttons?: ButtonGroupButton[];
	doPageCallback: (callback?: PageCallback) => void;
	summonInfoDialog: (props) => void;
}

/**
 * Control properties specified by the scripter (in pages.tsx).
 */
export declare interface DialogControlProps {
	title: string;
	text: string;
	cardText?: string;
	img?: string;
	imgAlt?: string;
	buttons?: ButtonGroupButton[];
}

/**
 * Properties sent to the InfoDialog control.
 */
export declare interface DialogProps extends DialogControlProps {
	open: boolean;
}