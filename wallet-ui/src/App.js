import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the app with AuthProvider */}
        <Container>
          <Routes> {/* Wrap all Route elements inside Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute> {/* Wrap Dashboard inside ProtectedRoute */}
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Logout route should remain to handle any logout-related action */}
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
