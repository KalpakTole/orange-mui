import Status from './Status';
import Tasks from './Tasks';
import { Box } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';
import React, { useState, useEffect, useCallback } from 'react';
import { database } from '../firebase';
import { ref, child, get, set } from 'firebase/database';
import { v1 as uuidv1 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
	const [assignee, setAssignee] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [allTasks, setAllTasks] = useState([]);
	const [allTasksStatus, setAllTasksStatus] = useState({ new: 0, inProgress: 0, done: 0, failed: 0 });
	const [open, setOpen] = useState(false);
	const [toggleTaskVisibility, setToggleTaskVisibility] = useState({
		new: true,
		inProgress: true,
		done: true,
		failed: true,
	});

	const { currentUser } = useAuth();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAssigneeChange = (event) => {
		setAssignee(event.target.value);
	};

	const handleStartDateChange = (newValue) => {
		setStartDate(newValue);
	};

	const handleEndDateChange = (newValue) => {
		setEndDate(newValue);
	};

	const taskVisibilityHandler = (type) => {
		if (type === 'new') {
			setToggleTaskVisibility(prevState => {
				return { ...prevState, 'new': !prevState.new };
			})
		}
		if (type === 'inProgress') {
			setToggleTaskVisibility(prevState => {
				return {...prevState, 'inProgress': !prevState.inProgress}
			})
		}
		if (type === 'done') {
			setToggleTaskVisibility((prevState) => {
				return { ...prevState, done: !prevState.done };
			});
		}
		if (type === 'failed') {
			setToggleTaskVisibility((prevState) => {
				return { ...prevState, failed: !prevState.failed };
			});
		}
	};

	const handleAddTaskSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let title = data.get('title');
		let description = data.get('description');
		let taskId = uuidv1();
		let newTask = {
			taskId: taskId,
			title: title,
			description: description,
			assignee: assignee,
			taskStatus: 'New',
			created: new Date().toLocaleString(),
			startDate: startDate.toLocaleString(),
			endDate: endDate.toLocaleString(),
		};
		set(ref(database, 'allTasks/' + taskId), newTask);
		console.log(newTask);
		setOpen(false);
		displayTasks();
	};

	const displayTasks = useCallback(async () => {
		let availableTasks = [];
		await get(child(ref(database), `allTasks`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					let allTasksObject = snapshot.val();
					for (const key in allTasksObject) {
						if (Object.hasOwnProperty.call(allTasksObject, key)) {
							const element = allTasksObject[key];
							availableTasks.push(element);
						}
					}
				} else {
					console.log('No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});
		setAllTasks(availableTasks);
		let newTaskCount = 0,
			inProgressTaskCount = 0,
			doneTaskCount = 0,
			failedTaskCount = 0;
		for (let task of availableTasks) {
			if (task['taskStatus'] === 'New') ++newTaskCount;
			else if (task['taskStatus'] === 'In Progress') ++inProgressTaskCount;
			else if (task['taskStatus'] === 'Done') ++doneTaskCount;
			else if (task['taskStatus'] === 'Failed') ++failedTaskCount;
		}
		setAllTasksStatus({
			new: newTaskCount,
			inProgress: inProgressTaskCount,
			done: doneTaskCount,
			failed: failedTaskCount,
		});
	}, []);

	useEffect(() => {
		displayTasks();
	}, [displayTasks]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', height: '100%' }}>
			<ResponsiveAppBar currentUser={currentUser} />
			<Box sx={{ display: 'flex', gap: '1rem', paddingBlockEnd: '1rem', flexGrow: 1, marginInline: '1rem' }}>
				<Status allTasksStatus={allTasksStatus} taskVisibilityHandler={taskVisibilityHandler} />
				<Tasks
					currentUser={currentUser}
					allTasks={allTasks}
					handleAddTaskSubmit={handleAddTaskSubmit}
					assignee={assignee}
					handleAssigneeChange={handleAssigneeChange}
					startDate={startDate}
					handleStartDateChange={handleStartDateChange}
					endDate={endDate}
					handleEndDateChange={handleEndDateChange}
					open={open}
					handleOpen={handleOpen}
					handleClose={handleClose}
					toggleTaskVisibility={toggleTaskVisibility}
				/>
			</Box>
		</Box>
	);
};

export default Home;
