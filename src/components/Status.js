import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography, Checkbox } from '@mui/material';
import { lightGreen, lightBlue, orange, red } from '@mui/material/colors';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
	aspectRatio: '1',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
}));

const Status = (props) => {
	return (
		<Box sx={{ width: '25%' }}>
			<Grid container rowSpacing={2} columnSpacing={2}>
				<Grid item xs={6}>
					<Item
						sx={{ backgroundColor: lightBlue['A100'], cursor: 'pointer', position: 'relative' }}
						onClick={() => props.taskVisibilityHandler('new')}
					>
						<Typography variant='h5'>New</Typography>
						<Typography variant='h3'>{props.allTasksStatus['new']}</Typography>
						<Checkbox
							sx={{ position: 'absolute', bottom: '0', right: '0' }}
							checked={props.toggleTaskVisibility.new}
							onChange={() => props.taskVisibilityHandler('new')}
						/>
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item
						sx={{ backgroundColor: orange['A100'], cursor: 'pointer', position: 'relative' }}
						onClick={() => props.taskVisibilityHandler('inProgress')}
					>
						<Typography variant='h5'>In Progress</Typography>
						<Typography variant='h3'>{props.allTasksStatus['inProgress']}</Typography>
						<Checkbox
							sx={{ position: 'absolute', bottom: '0', right: '0' }}
							checked={props.toggleTaskVisibility.inProgress}
							onChange={() => props.taskVisibilityHandler('inProgress')}
						/>
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item
						sx={{ backgroundColor: lightGreen['A100'], cursor: 'pointer', position: 'relative' }}
						onClick={() => props.taskVisibilityHandler('done')}
					>
						<Typography variant='h5'>Done</Typography>
						<Typography variant='h3'>{props.allTasksStatus['done']}</Typography>
						<Checkbox
							sx={{ position: 'absolute', bottom: '0', right: '0' }}
							checked={props.toggleTaskVisibility.done}
							onChange={() => props.taskVisibilityHandler('done')}
						/>
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item
						sx={{ backgroundColor: red['A100'], cursor: 'pointer', position: 'relative' }}
						onClick={() => props.taskVisibilityHandler('failed')}
					>
						<Typography variant='h5'>Failed</Typography>
						<Typography variant='h3'>{props.allTasksStatus['failed']}</Typography>
						<Checkbox
							sx={{ position: 'absolute', bottom: '0', right: '0' }}
							checked={props.toggleTaskVisibility.failed}
							onChange={() => props.taskVisibilityHandler('failed')}
						/>
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Status;
