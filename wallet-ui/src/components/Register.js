import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Snackbar } from '@mui/material';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
  const navigate = useNavigate();

  const handleClickShowPassword = () => setPasswordVisibility(!passwordVisibility);
  const handleClickShowConfirmPassword = () => setConfirmPasswordVisibility(!confirmPasswordVisibility);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await registerUser(name, email, password);
      setSuccessMessage('Registration successful!'); // Set the success message
      setOpenSnackbar(true); // Show the Snackbar
      setTimeout(() => {
        navigate('/'); // Redirect to the home page after 3 seconds
      }, 3000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    navigate('/'); // Navigate to the home page (or any other page you want)
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Register
      </Typography>

      {error && (
        <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {/* Name field */}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
      />

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

      {/* Confirm Password field */}
      <TextField
        label="Confirm Password"
        variant="outlined"
        type={confirmPasswordVisibility ? 'text' : 'password'}
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowConfirmPassword}>
                {confirmPasswordVisibility ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Button Container */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        {/* Register Button */}
        <Button
          onClick={handleRegister}
          variant="contained"
          sx={{ width: '48%' }}
        >
          Register
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

export default Register;
