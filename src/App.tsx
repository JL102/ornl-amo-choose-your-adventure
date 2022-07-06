import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, useMediaQuery, CardMedia, Paper } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'mui-image';

import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { InfoDialogProps, InfoDialog, InfoCard } from './controls';
import { Pages } from './pages';

function StartPage(props) {
	return (
		<div className='homepage'>
			<Container>
				<Box className='row' sx={{ bgcolor: '#ffffff80', height: '100vh' }}>
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
				</Box>
			</Container>
		</div>
	);
}

StartPage.propTypes = {
	onButtonClick: PropTypes.func.isRequired
};

interface HomeProps {
	dialog: InfoDialogProps
}

function HomePage(props: HomeProps) {
	return (
		<div className='homepage'>
			<Box className='row' sx={{ bgcolor: '#ffffff80', height: '100vh' }}>
				<InfoDialog
					open={props.dialog.open}
					onClickBack={props.dialog.onClickBack}
					onClickContinue={props.dialog.onClickContinue}
					text={props.dialog.text}
					cardText={props.dialog.cardText}
					img={props.dialog.img}
					imgAlt={props.dialog.imgAlt}
					title={props.dialog.title}
				/>
			</Box>
		</div>
	);
}

interface AppProps {}

interface AppState {
	currentPage: symbol|number;
	companyName: string;
	dialog: {
		open: boolean;
		title: string;
		text: string;
		cardText?: string;
		img?: string;
		imgAlt?: string;
	}
}
const text = 'For the past couple of decades, the automotive industry has been under pressure from regulators, public interest groups, stakeholders, customers, investors, and financial institutions to pursue a more sustainable model of growth.\nAs a sustainability manager at {$companyName}, your job is to make sure your facility meets its new corporate carbon reduction goal:';
const cardText = '{50%} carbon reduction over the next {10 years} with a {$1,000,000 annual budget}';

/**
 * Just a helper function to clone an object, modify certain keys, and return the cloned object. 
 * This is because React prefers to keep objects within a state immutable.
 */
function cloneAndModify(obj, newValues) {
	let newObj = JSON.parse(JSON.stringify(obj));
	for (let key of Object.keys(newValues)) {
		newObj[key] = newValues[key];
	}
	return newObj;
}

class App extends React.Component <AppProps, AppState> {
	constructor(props: AppProps) { 
		super(props);
		this.state = {
			currentPage: Pages.start,
			companyName: 'Auto-Man, Inc.',
			dialog: {
				open: true,
				title: '',
				text: '',
				cardText: undefined
			}
		};
	}
	
	/**
	 * Replaces variables from the app state, such as "$companyName" -> this.state.companyName
	 * @param text Text to replace
	 */
	fillTemplateText(text: string) {
		const regex = /\$([a-zA-Z]\w*?)(\W)/g;
		return text.replace(regex, (match, variableKey, nextCharacter) => {
			if (this.state.hasOwnProperty(variableKey)) {
				return String(this.state[variableKey]) + nextCharacter;
			}
			else {
				throw new SyntaxError(`Invalid variable name ${match}`);
			}
		});
	}
	
	handleHomepageClick() {
		
		let dialog = cloneAndModify(this.state.dialog, {
			open: true,
			title: 'Introduction',
			text: this.fillTemplateText(text),
			cardText: this.fillTemplateText(cardText),
			img: 'images/manufacturing.png',
			imgAlt: 'A robotic arm working on a car.'
		});
		
		this.setState({
			currentPage: Pages.home,
			dialog: dialog,
		});
	}
	
	handleDialogClickBack() {
		let dialog = cloneAndModify(this.state.dialog, {open: false});
		
		let newCurrentPage = this.state.currentPage;
		
		if (this.state.currentPage === Pages.home) {
			newCurrentPage = Pages.start;
		}
		
		this.setState({dialog: dialog, currentPage: newCurrentPage});
	}
	
	handleDialogClickContinue() {
		let dialog = cloneAndModify(this.state.dialog, {open: false});
		
		this.setState({dialog: dialog});
		
		// sample
		setTimeout(() => {
			let dialog = cloneAndModify(this.state.dialog, {
				open: true,
				title: '{SELECTED}: DIGITAL TWIN ANALYSIS',
				cardText: 'You have achieved {2%} carbon emissions reduction and spent {$90,000} dollars.',
				text: '<a href="https://betterbuildingssolutioncenter.energy.gov/implementation-models/ford-motor-company-dearborn-campus-uses-a-digital-twin-tool-energy-plant" target="_blank">{Ford Motor Company: Dearborn Campus Uses A Digital Twin Tool For Energy Plant Management}</a>\n\nGood choice! Ford Motor Company used digital twin to improve the life cycle of their campus’s central plant. The new plant is projected to achieve a 50% reduction in campus office space energy and water use compared to their older system.',
        img: 'images/ford.png'
			});
			this.setState({dialog: dialog});
		}, 500);
	}
	
	render() {
		switch (this.state.currentPage) {
			case Pages.start:
				return <StartPage onButtonClick={() => this.handleHomepageClick()}></StartPage>;
			case Pages.home:
				return <HomePage 
						dialog={{
							open: this.state.dialog.open,
							onClickBack: () => this.handleDialogClickBack(),
							onClickContinue: () => this.handleDialogClickContinue(),
							text: this.state.dialog.text,
							cardText: this.state.dialog.cardText,
							img: this.state.dialog.img,
							imgAlt: this.state.dialog.imgAlt,
							title: this.state.dialog.title,
						}}
					/>;
			default:
				return;
		}
	}
}

export default App;
