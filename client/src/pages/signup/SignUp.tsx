import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import useSignup from '../../hooks/useSignup';

interface SignUpProps {
  toggleStyle: {
    textColor: string;
  };
}

const SignUp: React.FC<SignUpProps> = ({ toggleStyle }) => {
  const [inputs, setInputs] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { loading, signup } = useSignup();
  
  // Function to handle form submission (sign-up)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(inputs);
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
        <Typography variant="h4" align="center" gutterBottom color={toggleStyle.textColor}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            required
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
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            required
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
            fullWidth
            margin="normal"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            required
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
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            required
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
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: 'blue',
              marginTop: '10px',
              display: 'block',
            }}
          >
            <Typography variant="body2" color="text.secondary" align="right">
              Already have an account?
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
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            type="submit"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;

