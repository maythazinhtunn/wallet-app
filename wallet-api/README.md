# Wallet API

This is a Node.js backend application for managing wallet functionalities, including user authentication, wallet balance management, and transaction history.

## Prerequisites

Ensure the following tools are installed on your system:

- **Node.js** (v16 or later recommended)
- **MySQL** (to set up the database)

## Setup Instructions

Follow the steps below to set up and run the application:

### 1. Clone the Repository

```bash
git clone git@github.com:maythazinhtunn/wallet-app.git
cd wallet-api
```
### 2 .Install Dependencies
Install the necessary packages using:

```bash
npm install
```
### 3. Set Up Environment Variables
Create a .env file or change .env.example file to .env fil in the project root directory 

### 4. Set Up the Database

1. Start your MySQL server.
2. Create a database named wallet_app

```bash
CREATE DATABASE wallet_app;
```
3. Configure database credentials in the .env file.

4. Create tables

-- Create users table

```bash 
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```
-- Create transactions table

```bash 
CREATE TABLE transactions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type ENUM('add', 'withdraw') NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```
-- Create wallets table

```bash 
CREATE TABLE wallets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    balance DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 5. Start the Application
To start the server, run:

```bash
npm start
```
The server will run on the port specified in the .env file (default is 5000).

### 6. API Endpoints
Below is a summary of the API endpoints:

``` bash
Authentication:
POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in and obtain a JWT token.
```
```bash 
Wallet:
POST /api/wallet/add - Add funds to the wallet.
POST /api/wallet/withdraw - Withdraw funds from the wallet.
```
```bash
Transactions:
GET /api/transactions - View transaction history.
```