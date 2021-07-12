import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../auth/firebase.jsx';
import { useUser } from './useUser';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const { setUser } = useUser();

    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logout = () => {
        return auth.signOut();
    };

    useEffect(() => {
        auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ signup, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
