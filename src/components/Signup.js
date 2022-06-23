import React from 'react';
import {
	Avatar,
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { database } from '../firebase';
import { ref, set } from 'firebase/database';


function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			{/* <Link>Your Website</Link> {new Date().getFullYear()} */}
			{'.'}
		</Typography>
	);
}

const Signup = () => {
	const navigate = useNavigate();

	const { signup, update } = useAuth();

	const handleSignupSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let email = data.get('email')
		let password = data.get('password')
		let confirmPassword = data.get('confirm-password')
		let displayName = data.get('display-name')
		if (password !== confirmPassword) {
			return
		}
		try {
			const result = await signup(email, password);
			await update(result.user, displayName);
			console.log(result);
			let userId = result.user.uid
			let newUser = { uid: userId, email: email, name: displayName }
			set(ref(database, 'users/' + userId), newUser);
			navigate('/');
		} catch (error) {
			console.log(error.message);
			return;
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Log in to enter Orange world!
				</Typography>
				<Box component='form' onSubmit={handleSignupSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						autoFocus
						required
						fullWidth
						margin='normal'
						id='email'
						name='email'
						type='email'
						label='Enter an email'
						placeholder='john.doe@orange.com'
						autoComplete='email'
					/>
					<TextField
						required
						fullWidth
						margin='normal'
						id='password'
						name='password'
						type='password'
						label='Enter a password'
						autoComplete='current-password'
					/>
					<TextField
						required
						fullWidth
						margin='normal'
						id='confirm-password'
						name='confirm-password'
						type='password'
						label='Confirm your password'
						autoComplete='confirm-password'
					/>
					<TextField
						required
						fullWidth
						margin='normal'
						id='display-name'
						name='display-name'
						type='text'
						label='Enter a Display Name'
						placeholder='John Doe'
						autoComplete='display-name'
					/>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
					<Grid container>
						<Grid item xs>
							{/* <Link>Forgot password?</Link> */}
						</Grid>
						<Grid item>
							<Link to='/login'>Already have an account? Log In</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
};

export default Signup;
