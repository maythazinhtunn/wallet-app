# Wallet UI - React Application

## Overview

Wallet UI is a React-based user interface for a wallet management system. It connects to a backend API to perform operations like adding funds, withdrawing funds, and viewing transaction history. This project utilizes modern web development tools and libraries to ensure a responsive and dynamic user experience.

## Features
React 19 for efficient rendering and state management.
Material-UI (MUI) for a modern, responsive UI design.
React Router for easy navigation across multiple pages.
Axios for robust API integration.
Emotion for flexible and powerful styling.

## Prerequisites
Ensure the following tools are installed on your system:

- Node.js (version 16 or higher)
- npm (Node Package Manager)

## Installation
1. Clone the Repository
``` bash
git clone git@github.com:maythazinhtunn/wallet-app.git
cd wallet-ui
```

2. Install Dependencies
Run the following command to install project dependencies:

```bash
npm install
```

## Running the Application
1. Start the Development Server
To launch the application in development mode, use:

```bash
npm start
```
The app will run on http://localhost:3000/.

2. Build for Production
To generate an optimized production build:
```bash
npm run build
```

Environment Variables
To connect with the backend API, create a .env file in the root directory and add:

```bash
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

Scripts

npm start: Start the development server.
npm run build: Create a production-ready build.
