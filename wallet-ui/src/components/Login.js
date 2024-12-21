import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Snackbar } from '@mui/material';
import { loginUser } from '../services/api';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../context/AuthContext'; // Import useAuth to access the login function
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
  const { login } = useAuth(); // Use login function from AuthContext
  const navigate = useNavigate(); // For navigation

  const handleClickShowPassword = () => setPasswordVisibility(!passwordVisibility);

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('name', response.data.name); // Save user name to localStorage
      localStorage.setItem('userToken', response.data.token); // Save token to localStorage

      // Set the success message and show Snackbar
      setSuccessMessage('Login successful!');
      setOpenSnackbar(true);

      // Call login from context to update authentication state
      login();  // This will update isAuthenticated and navigate to the dashboard

    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setError(null); // Reset error message
    navigate('/'); // Navigate to home or any other page you want
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      {error && (
        <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {/* Email field */}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoFocus
      />

      {/* Password field */}
      <TextField
        label="Password"
        variant="outlined"
        type={passwordVisibility ? 'text' : 'password'}
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {passwordVisibility ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Button Container for Login and Cancel */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        {/* Login Button */}
        <Button
          onClick={handleLogin}
          variant="contained"
          sx={{ width: '48%' }}
        >
          Login
        </Button>

        {/* Cancel Button */}
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{ width: '48%' }}
        >
          Cancel
        </Button>
      </Box>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={successMessage}
      />
    </Box>
  );
};

export default Login;
