import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead, Typography } from '@mui/material';

const TransactionHistory = ({ transactions }) => {
  return (
    <div>
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
    </div>
  );
};

export default TransactionHistory;
