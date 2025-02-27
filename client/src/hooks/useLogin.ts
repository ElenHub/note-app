import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

interface LoginResponse {
  error?: string;
  token?: string;
  [key: string]: any;
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>('/api/auth/login', { email, password });
      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem('notes-app', JSON.stringify(data));
      setAuthUser(data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;