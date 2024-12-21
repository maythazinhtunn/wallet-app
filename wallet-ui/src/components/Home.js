import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ textAlign: 'center', paddingTop: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome From Wallet App
      </Typography>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        sx={{ marginRight: 2 }}
      >
        Login
      </Button>
      <Button component={Link} to="/register" variant="contained">
        Register
      </Button>
    </Box>
  );
};

export default Home;
