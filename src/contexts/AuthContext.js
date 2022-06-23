import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	}

	const update = (user, displayName) => {
		return updateProfile(user, { displayName: displayName });
	};

	const logout = () => {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setIsLoading(false)
		});

		return unsubscribe
	}, []);

	const value = {
		currentUser,
		signup,
		update,
		login,
		logout
	};

	return <AuthContext.Provider value={value}>{ !isLoading && children}</AuthContext.Provider>;
};
