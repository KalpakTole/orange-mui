import React, { useState, useEffect } from 'react';
import { lightGreen, lightBlue, orange, red } from '@mui/material/colors';

import {
	Box,
	Paper,
	Button,
	Fab,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Checkbox,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemIcon,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { database } from '../firebase';
import { ref, child, get, set } from 'firebase/database';
import { useCallback } from 'react';

const Tasks = (props) => {
	const [allUsers, setAllUsers] = useState([]);
	// create allUsersList which will contain all users except current user so that
	// current user can assign it to one of those users

	const generateAllUsers = useCallback(async () => {
		let availableUsers = [];
		await get(child(ref(database), `users`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					let allUsersObject = snapshot.val();
					for (const key in allUsersObject) {
						if (Object.hasOwnProperty.call(allUsersObject, key)) {
							const element = allUsersObject[key];
							availableUsers.push(element);
						}
					}
				} else {
					console.log('No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});
		setAllUsers(availableUsers);
	}, []);

	useEffect(() => {
		generateAllUsers();
	}, [generateAllUsers]);

	return (
		<Box sx={{ width: '40%', height: '100%' }}>
			<Paper sx={{ width: '100%', height: '100%', position: 'relative' }} elevation={3}>
				<List
					sx={{
						width: '100%',
						bgcolor: 'background.paper',
						display: 'flex',
						flexDirection: 'column',
						gap: '0.5rem',
						padding: '0',
					}}
				>
					{props.allTasks.map((currentTask) => {
						if (currentTask['taskStatus'] === 'New' && props.toggleTaskVisibility['new']) {
							return (
								<ListItem
									key={currentTask['taskId']}
									sx={{
										background: `linear-gradient(to right, transparent 0 95%, ${lightBlue['A100']} 95% 100%)`,
										padding: 0,
										margin: 0,
										boxShadow: '0px 1px 1px 0px #444444',
										cursor: 'pointer',
										':hover': {
											boxShadow: '0px 1px 1px 1px #444444',
										},
									}}
								>
									<Checkbox color='default' />
									{/* <ListItemAvatar>
										<Avatar sx={{ backgroundColor: lightBlue[900] }}>
											<TaskIcon />
										</Avatar>
									</ListItemAvatar> */}
									<ListItemText
										sx={{ marginInlineStart: '1rem' }}
										primary={currentTask['title']}
										secondary={currentTask['description']}
									/>
									<ListItemIcon
										sx={{
											cursor: 'pointer',
											overflow: 'hidden',
											borderRadius: '100%',
											padding: '0.25rem',
											margin: '0'
										}}
									>
										<DeleteIcon
											sx={{
												':hover': {
													outline: '2px solid black'
												},
											}}
										/>
									</ListItemIcon>
								</ListItem>
							);
						}
						if (currentTask['taskStatus'] === 'In Progress' && props.toggleTaskVisibility['inProgress']) {
							return (
								<ListItem key={currentTask['taskId']} sx={{ backgroundColor: orange['A100'] }}>
									<ListItemAvatar>
										<Avatar sx={{ backgroundColor: orange[900] }}>
											<TaskIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={currentTask['title']}
										secondary={currentTask['description']}
									/>
								</ListItem>
							);
						}
						if (currentTask['taskStatus'] === 'Done' && props.toggleTaskVisibility['done']) {
							return (
								<ListItem key={currentTask['taskId']} sx={{ backgroundColor: lightGreen['A100'] }}>
									<ListItemAvatar>
										<Avatar sx={{ backgroundColor: lightGreen[900] }}>
											<TaskIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={currentTask['title']}
										secondary={currentTask['description']}
									/>
								</ListItem>
							);
						}
						if (currentTask['taskStatus'] === 'Failed' && props.toggleTaskVisibility['failed']) {
							return (
								<ListItem key={currentTask['taskId']} sx={{ backgroundColor: red['A100'] }}>
									<ListItemAvatar>
										<Avatar sx={{ backgroundColor: red[900] }}>
											<TaskIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={currentTask['title']}
										secondary={currentTask['description']}
									/>
								</ListItem>
							);
						}
					})}
				</List>
				<Fab
					color='primary'
					aria-label='add'
					sx={{ position: 'absolute', bottom: '2em', right: '2em' }}
					onClick={props.handleOpen}
				>
					<AddIcon />
				</Fab>
			</Paper>
			<Dialog component='form' onSubmit={props.handleAddTaskSubmit} open={props.open} onClose={props.handleClose}>
				<DialogTitle>Task Details</DialogTitle>
				<DialogContent>
					<DialogContentText>Fill in the following fields to create a task</DialogContentText>
					<TextField
						autoFocus
						required
						fullWidth
						margin='normal'
						id='title'
						name='title'
						type='text'
						label='Task Title'
					/>
					<TextField
						required
						fullWidth
						margin='normal'
						id='description'
						name='description'
						type='text'
						label='Task Description'
					/>
					<FormControl fullWidth margin='normal'>
						<Select
							required
							fullWidth
							value={props.assignee}
							onChange={props.handleAssigneeChange}
							displayEmpty
						>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value='self'>
								<em>Self</em>
							</MenuItem>
							{allUsers.map(
								(user) =>
									user.uid !== props.currentUser.uid && (
										<MenuItem key={user.uid} value={user.uid}>
											{user.name}
										</MenuItem>
									)
							)}
						</Select>
						<FormHelperText>Select the user whom you want to assign the task</FormHelperText>
					</FormControl>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateTimePicker
							label='Start Date'
							value={props.startDate}
							onChange={props.handleStartDateChange}
							renderInput={(params) => <TextField required fullWidth margin='normal' {...params} />}
						/>
						<DateTimePicker
							label='End Date'
							value={props.endDate}
							onChange={props.handleEndDateChange}
							renderInput={(params) => <TextField required fullWidth margin='normal' {...params} />}
						/>
					</LocalizationProvider>
				</DialogContent>
				<DialogActions>
					<Button type='submit' variant='contained' color='primary'>
						Create
					</Button>
					<Button onClick={props.handleClose} variant='contained' color='secondary'>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Tasks;
