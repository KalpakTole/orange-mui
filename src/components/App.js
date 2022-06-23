import Login from './Login';
import Home from './Home'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import PrivateRoute from './PrivateRoute';

function App() {
	return (
		<>
			<CssBaseline />
			<Router>
				<AuthProvider>
					<Routes>
						<Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
						{/* <Route exact path='/' element={<Home />} /> */}
						<Route path='/signup' element={<Signup />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
