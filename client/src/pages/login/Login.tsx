import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import useLogin from '../../hooks/useLogin';

interface LoginProps {
  toggleStyle: {
    textColor: string;
  };
}

const Login: React.FC<LoginProps> = ({ toggleStyle }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, login } = useLogin();

   // Function to handle form submission (login)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          padding: 4,
          borderRadius: '8px',
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" color={toggleStyle.textColor}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              sx: {
                borderRadius: '14px',
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              },
            }}
            sx={{
              '& label.Mui-focused': {
                color: 'black',
              },
              marginBottom: '20px',
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              sx: {
                borderRadius: '14px',
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              },
            }}
            sx={{
              '& label.Mui-focused': {
                color: 'black',
              },
              marginBottom: '20px',
            }}
          />
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="text.secondary" align="right">
              {"Don't"} have an account?
            </Typography>
          </Link>
          <Button
            sx={{
              borderRadius: '30px',
              backgroundColor: 'var(--orange-color)',
              color: 'var(--black-color)',
              marginBottom: '20px',
              marginTop: '30px',
            }}
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
