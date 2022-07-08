import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BasicPopover(props: PopoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
		<Button aria-describedby={id} 
			variant={props.variant} 
			onClick={handleClick}
			startIcon={props.startIcon}
		>
			{props.text}
		</Button>
		<Popover
			id={id}
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<Typography sx={{ p: 2 }}>{props.children}</Typography>
		</Popover>
    </div>
  );
}

declare interface PopoverProps extends React.PropsWithChildren {
	startIcon?: React.ReactNode;
	variant: 'text'|'outlined'|'contained';
	text: string;
}