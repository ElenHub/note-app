import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

interface SignupResponse {
    error?: string;
    theme?: string;
    [key: string]: any;
}

interface SignupData {
    email: string;
    password: string;
    confirmPassword: string;
    theme?: string;
}

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext();

  // Function to handle user signup
    const signup = async ({ email, password, confirmPassword, theme }: SignupData) => {
        if (!handleInputErrors({ email, password, confirmPassword, theme })) return;

        // Set loading indicator to true
        setLoading(true);
        try {
            const response = await axios.post<SignupResponse>("/api/auth/signup", {
                email,
                password,
                confirmPassword,
                theme,
            });
            const data = response.data;

            // If the server returns an error, throw an error
            if (data.error) {
                throw new Error(data.error);
            }
            // Set the user data in local storage
            localStorage.setItem("notes-app", JSON.stringify(data));
            setAuthUser(data);
        } catch (error: any) {
            // Handle any errors that occur during signup
            toast.error(error.response?.data?.error || error.message);
        } finally {
            // Set the loading indicator to false after completion
            setLoading(false);
        }
    };

    return { loading, signup };
};


 //Function to handle input errors
function handleInputErrors({ email, password, confirmPassword }: SignupData): boolean {
    if (!email || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return false;
    }

    // Check for password match
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    // Check for password length
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

export default useSignup