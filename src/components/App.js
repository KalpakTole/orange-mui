import Login from './Login';
import Home from './Home'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import PrivateRoute from './PrivateRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, indigo } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: {
			main: orange[900],
		},
		secondary: {
			main: indigo['A200'],
		},
	},
});


function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<AuthProvider>
						<Routes>
							<Route
								exact
								path='/'
								element={
									<PrivateRoute>
										<Home />
									</PrivateRoute>
								}
							/>
							{/* <Route exact path='/' element={<Home />} /> */}
							<Route path='/signup' element={<Signup />} />
							<Route path='/login' element={<Login />} />
						</Routes>
					</AuthProvider>
				</Router>
			</ThemeProvider>
		</>
	);
}

export default App;
