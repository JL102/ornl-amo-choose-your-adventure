import { Button, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery, Paper, useTheme, styled } from "@mui/material";
import { parseSpecialText } from "./functions";


export const InfoCard = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
	height: 60,
	lineHeight: '60px',
	borderColor: theme.palette.primary.light,
}));


export interface InfoDialogProps {
	img?: string;
	imgAlt?: string;
	open: boolean;
	onClickBack: () => void;
	onClickContinue: () => void;
	text: string;
	cardText?: string;
	title: string;
}

export function InfoDialog(props: InfoDialogProps) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div>
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
		</div>
	);
}