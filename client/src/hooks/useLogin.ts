import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

interface LoginResponse {
  error?: string;
  theme?: string;
  [key: string]: any;
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  // Function to handle login
  const login = async (email: string, password: string) => {
    const success = handleInputErrors(email, password);
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post<LoginResponse>("/api/auth/login", {
        email,
        password,
      });

      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("notes-app", JSON.stringify(data));
      setAuthUser(data);
      if (data.theme) {
        localStorage.setItem("darkMode", data.theme === "dark");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

// Function to handle input validation errors
function handleInputErrors(email: string, password: string): boolean {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
