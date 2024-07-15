import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);

    const signup = (email) => {
        const user = { email };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
    };

    const login = (email) => {
        const user = { email };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}