import React from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	Typography,
	Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			{/* <Link>Your Website</Link> {new Date().getFullYear()} */}
			{'.'}
		</Typography>
	);
}

const Login = () => {
	const navigate = useNavigate();

	const { login } = useAuth();

	const handleLoginSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let email = data.get('email');
		let password = data.get('password');
		try {
			const result = await login(email, password);
			console.log(result);
			navigate('/');
		} catch (error) {
			console.log(error.message);
			return;
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
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
				<Box component='form' onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						label='Enter your email'
						autoFocus
						placeholder='john.doe@orange.com'
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='password'
						name='password'
						type='password'
						label='Enter your password'
						autoComplete='current-password'
					/>
					<FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Log In
					</Button>
					<Grid container>
						<Grid item xs>
							{/* <Link>Forgot password?</Link> */}
						</Grid>
						<Grid item>
							<Link to='/signup'>Don't have an account? Sign Up</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
};

export default Login;
