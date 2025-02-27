import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
    authUser: null,
    setAuthUser: () => {},
    logout: () => {}
});

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("notes-app")) || null);

    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem('notes-app');
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
