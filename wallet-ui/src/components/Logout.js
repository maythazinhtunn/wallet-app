import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the icon

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token'); // Or session storage, based on how you store it
    onLogout(); // Notify the app to update the authentication state
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="secondary"
      endIcon={<ExitToAppIcon />} // Add arrow icon here
      sx={{
        backgroundColor: '#d32f2f',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#b71c1c',
        },
        padding: '8px 16px',
        borderRadius: '8px',
        fontWeight: 'bold',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      }}
    >
      Exit
    </Button>
  );
};

export default Logout;
