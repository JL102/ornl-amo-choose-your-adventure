import React from 'react';
import { Container, Button, Box, } from '@mui/material';

import './App.scss';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { InfoDialogProps, InfoDialog, StartPage, SelectScope } from './controls';
import { Component, pageControls, Pages } from './pages';
import { resolveToValue } from './functions-and-types';

interface HomeProps {
	dialog: AnyDict;
	selectScope?: AnyDict;
	onClickBack: () => void;
	onClickContinue: (data: unknown) => void;
	controlClass?: Component;
}

interface AppProps {}

interface AppState {
	currentPage: symbol;
	companyName: string;
	dialog: {
		open: boolean;
		title: string;
		text: string;
		cardText?: string;
		img?: string;
		imgAlt?: string;
	},
	selectScope?: StringDict; //todo
	controlClass?: Component;
}

function Dashboard(props: HomeProps) {
	const dlg = props.dialog;
	
	switch (props.controlClass) {
		case StartPage:
			return (<StartPage
				onButtonClick={props.onClickContinue}
			/>);
		case SelectScope:
			if (!props.selectScope) throw new Error('selectScope not defined');
			return (<SelectScope
				title={props.selectScope.title}
				choice1={props.selectScope.choice1}
				choice2={props.selectScope.choice2}
				onChoice1={() => props.onClickContinue(1)}
				onChoice2={() => props.onClickContinue(2)}
			/>);
		default:
			return <></>;
	}
}

function HomePage(props: HomeProps) {
	const dlg = props.dialog;
	
	return (
		<div className='homepage'>
			<Box className='row' sx={{ bgcolor: '#ffffff80', height: '100vh' }}>
				<Dashboard {...props}/>
			</Box>
			<InfoDialog
				open={props.controlClass === InfoDialog && dlg.open}
				title={dlg.title}
				img={dlg.img}
				imgAlt={dlg.imgAlt}
				text={dlg.text}
				cardText={dlg.cardText}
				onClickBack={props.onClickBack}
				onClickContinue={props.onClickContinue}
			/>
		</div>
	);
}

/**
 * Just a helper function to clone an object, modify certain keys, and return the cloned object. 
 * This is because React prefers to keep objects within a state immutable.
 */
function cloneAndModify<T>(obj: T, newValues: AnyDict): T {
	let newObj = JSON.parse(JSON.stringify(obj));
	for (let key of Object.keys(newValues)) {
		newObj[key] = newValues[key];
	}
	return newObj;
}

class App extends React.PureComponent <AppProps, AppState> {
	constructor(props: AppProps) { 
		super(props);
		this.state = {
			currentPage: Pages.start,
			companyName: 'Auto-Man, Inc.',
			dialog: {
				open: false,
				title: '',
				text: '',
				cardText: undefined
			},
			selectScope: undefined,
			controlClass: pageControls[Pages.start].controlClass,
		};
		// @ts-ignore - for debugging
		window.app = this;
		
		// todo
		// addEventListener('popstate', this.handleHistoryPopState.bind(this));
	}
	
	/**
	 * Replaces variables from the app state, such as "$companyName" -> this.state.companyName
	 */
	fillTemplateText<T=AnyDict>(obj: T): T{
		const regex = /\$([a-zA-Z]\w*?)(\W)/g;
		
		for (let key of Object.keys(obj)) {
			if (typeof obj[key] === 'string') {
				obj[key] = obj[key].replace(regex, (match, variableKey, nextCharacter) => {
					if (this.state.hasOwnProperty(variableKey)) {
						return String(this.state[variableKey]) + nextCharacter;
					}
					else {
						throw new SyntaxError(`Invalid variable name ${match}`);
					}
				});
			}
		}
		return obj;
	}
	
	getThisPageControl() {
		let thisPageControl = pageControls[this.state.currentPage];
		if (!thisPageControl) 
			throw new TypeError(`Page controls not defined for the symbol ${this.state.currentPage.description}`);
		return thisPageControl;
	}
	
	setPage(page: symbol) {
		
		let thisPageControl = pageControls[page];
		if (!thisPageControl) 
			throw new TypeError(`Page controls not defined for the symbol ${page.description}`);
		
		let controlClass = thisPageControl.controlClass;
		let controlProps = this.fillTemplateText(thisPageControl.controlProps);
		
		let dialog, selectScope;
		
		if (controlClass === InfoDialog) {
			dialog = cloneAndModify(this.state.dialog, controlProps);
			dialog.open = true;
		}
		else {
			dialog = cloneAndModify(this.state.dialog, {open: false});
		}
		
		if (controlClass === SelectScope) {
			selectScope = controlProps;
		}
		
		this.setState({
			currentPage: page, 
			dialog: dialog, 
			controlClass: controlClass,
			selectScope: selectScope
		});
	}
	
	handleDialogClickBack() {
		let thisPageControl = this.getThisPageControl();
		let nextPage = resolveToValue(thisPageControl.onBack);
		
		this.setPage(nextPage);
	}
	
	/**
	 * @param data Any data to be passed into pageControl.onContinue - Depends on the control
	 */
	handleDialogClickContinue(data?: unknown) {
		let thisPageControl = this.getThisPageControl();
		let nextPage = resolveToValue(thisPageControl.onContinue, undefined, [data], this);
		
		this.setPage(nextPage);
		
		return;
		// Symbols can't be cloned
		let symbolKey = Symbol.keyFor(nextPage);
		// Add to window history for back button
		history.pushState({page: symbolKey}, '', symbolKey); 
	}
	
	// todo
	handleHistoryPopState(event) {
		console.log(event);
		if (!event.state) return;
		
		let lastPage: symbol = Symbol.for(event.state.page);
		if (!lastPage) return console.log('lastpage');
		
		let lastPageControl = pageControls[lastPage];
		if (!lastPageControl) return console.log('lastpcontrol');
		this.setPage(resolveToValue(lastPageControl.onBack));
	}
	
	render() {
		return (
			<div className='homepage'>
				<Container maxWidth='xl'>
					<HomePage 
						dialog={this.state.dialog}
						selectScope={this.state.selectScope}
						onClickBack={() => this.handleDialogClickBack()}
						onClickContinue={(data?: unknown) => this.handleDialogClickContinue(data)}
						controlClass={this.state.controlClass}
					/>
				</Container>
			</div>
		);
	}
}

export default App;
