import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';
import axios from 'axios';

const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthUser, logout: contextLogout } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/auth/logout", {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res.data.error) {
                throw new Error(res.data.error);
            }

            localStorage.removeItem("notes-app");
            contextLogout();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
