import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

interface SignupResponse {
    error?: string;
    token?: string;
    [key: string]: any;
}

interface SignupData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    theme?: string;
}

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ username, email, password, confirmPassword, theme }: SignupData) => {
        if (!handleInputErrors({ username, email, password, confirmPassword, theme })) return;

        setLoading(true);
        try {
            const response = await axios.post<SignupResponse>("/api/auth/signup", {
                username,
                email,
                password,
                confirmPassword,
                theme,
            });
            const data = response.data;

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("notes-app", JSON.stringify(data));
            setAuthUser(data);
        } catch (error: any) {
            toast.error(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

function handleInputErrors({ username, email, password, confirmPassword }: SignupData): boolean {
    if (!username || !email || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

export default useSignup;