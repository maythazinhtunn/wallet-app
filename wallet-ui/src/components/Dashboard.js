import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import { addFunds, withdrawFunds, getTransactionHistory } from '../services/api';
import Logout from './Logout'; 

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [userName, setUserName] = useState('');

  
  const fetchTransactions = async () => {
    try {
      const response = await getTransactionHistory();
      const transactionData = response.data;

      
      const totalBalance = transactionData.reduce(
        (acc, transaction) =>
          transaction.type === 'add' ? acc + transaction.amount : acc - transaction.amount,
        0
      );
      setTransactions(transactionData);
      setBalance(totalBalance || 0);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setBalance(0);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    } else {
      console.warn('Username not found in localStorage. Using default value.');
      setUserName('Guest');
    }
  
    fetchTransactions();
  }, []);
  
  
  const handleAddFunds = async () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }
    try {
      await addFunds(parseFloat(amount));
      setAmount('');
      fetchTransactions();
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  
  const handleWithdrawFunds = async () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }
    if (amount > balance) {
      alert('Insufficient balance to withdraw this amount.');
      return;
    }
    try {
      await withdrawFunds(parseFloat(amount));
      setAmount('');
      fetchTransactions();
    } catch (error) {
      console.error('Error withdrawing funds:', error);
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        maxWidth: 600,
        margin: '0 auto',
        padding: 2,
      }}
    >
      {/* Main Content */}
      <Box>
        <Typography variant="h4" gutterBottom>
          {userName}'s Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Balance: ${balance.toFixed(2)}
        </Typography>

        {/* Add Funds / Withdraw Funds Section */}
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{ min: 0 }}
        />
        <Button onClick={handleAddFunds} variant="contained" sx={{ marginRight: 1 }}>
          Add Funds
        </Button>
        <Button onClick={handleWithdrawFunds} variant="contained">
          Withdraw Funds
        </Button>

        {/* Transaction History */}
        <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
          Transaction History
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                <TableCell>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Logout Button */}
      <Box sx={{ marginTop: 4, textAlign: 'right' }}>
        <Logout onLogout={handleLogout} />
      </Box>
    </Box>
  );
};

export default Dashboard;
