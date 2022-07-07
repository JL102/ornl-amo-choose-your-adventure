import { Box, Button, Container, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery, Paper, Typography, Grid, Stack } from "@mui/material";
import { comparePropsAndStateIgnoreFuncs, parseSpecialText } from "./functions-and-types";
import { theme } from './theme';
import PropTypes from 'prop-types';
import Image from 'mui-image';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

// todo types
export function StartPage(props) {
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
			<Button onClick={props.onButtonClick} variant='contained' size='large'>START PLAYING</Button>
		</React.Fragment>
	);
}

StartPage.propTypes = {
	onButtonClick: PropTypes.func.isRequired
};

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export function SelectScope(props: SelectScopeProps) {
	console.log(props);
	return (
		<Box m={2}>
			<Typography variant='h5' dangerouslySetInnerHTML={parseSpecialText(props.title)}></Typography>
			<br/>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Item>
						<Typography variant='h4'>A</Typography>
						<Typography variant='body1' p={2} dangerouslySetInnerHTML={parseSpecialText(props.choice1)}/>
						<Stack direction="row" justifyContent="center" spacing={2}>
							<Button variant='outlined' startIcon={<QuestionMarkIcon/>}>Info</Button>
							<Button onClick={props.onChoice1} variant='contained'>Select</Button>
						</Stack>
					</Item>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Item>
						<Typography variant='h4'>B</Typography>
						<Typography variant='body1' p={2} dangerouslySetInnerHTML={parseSpecialText(props.choice2)}/>
						<Stack direction="row" justifyContent="center" spacing={2}>
							<Button variant='outlined' startIcon={<QuestionMarkIcon/>}>Info</Button>
							<Button onClick={props.onChoice2} variant='contained'>Select</Button>
						</Stack>
					</Item>
				</Grid>
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
	return (
		<Dialog
			fullScreen={fullScreen}
			open={props.open}
			keepMounted
			// onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
		>
			<CardMedia
				component="img"
				height="260"
				image={props.img}
				alt={props.imgAlt}
			/>
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
				<Button onClick={() => props.onClickBack()}>Back</Button>
				<Button onClick={() => props.onClickContinue()}>Continue</Button>
			</DialogActions>
		</Dialog>
	);
}

export class InfoDialog extends React.Component <InfoDialogProps> {
	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps.open);
		return comparePropsAndStateIgnoreFuncs.apply(this, [nextProps, nextState]);
	}
	
	render() {
		return (
			<InfoDialogFunc {...this.props}/>
		);
	}
}

export interface SelectScopeProps {
	title: string;
	choice1: string;
	choice2: string;
	onChoice1: () => void;
	onChoice2: () => void;
}

export interface InfoDialogProps {
	img?: string;
	imgAlt?: string;
	open: boolean;
	onClickBack: () => void;
	onClickContinue: (data?: unknown) => void;
	text: string;
	cardText?: string;
	title: string;
}