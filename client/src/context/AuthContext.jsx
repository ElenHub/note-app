import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
    authUser: null,
    setAuthUser: () => {},
    logout: () => {},
    darkMode: false,
    setDarkMode: () => {}
});

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("notes-app")) || null);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    const logout = () => {
        setAuthUser(null);
        setDarkMode(false); 
        localStorage.removeItem('notes-app');
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, logout, darkMode, setDarkMode }}>
            {children}
        </AuthContext.Provider>
    );
};
