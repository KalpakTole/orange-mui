import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography } from '@mui/material';

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
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={6}>
					<Item>
						<Typography variant='h5'>New</Typography>
						<Typography variant='h3'>{props.allTasksStatus['new']}</Typography>
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<Typography variant='h5'>In Progress</Typography>
						<Typography variant='h3'>{props.allTasksStatus['inProgress']}</Typography>
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<Typography variant='h5'>Done</Typography>
						<Typography variant='h3'>{props.allTasksStatus['done']}</Typography>
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<Typography variant='h5'>Failed</Typography>
						<Typography variant='h3'>{props.allTasksStatus['failed']}</Typography>
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Status;
