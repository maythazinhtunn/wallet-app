import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const getToken = () => localStorage.getItem('userToken');

// Register User
export const registerUser = (name, email, password) => {
    console.log(name,email,password)
    return axios.post(`${API_URL}/auth/register`, { name, email, password });
};
// Login User
export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};


export const addFunds = async (amount) => {
    return await axios.post(
      `${API_URL}/wallet/add`,
      { amount },
      {
        headers: { 'x-auth-token': getToken() },
      }
    );
  };
  
  export const withdrawFunds = async (amount) => {
    return await axios.post(
      `${API_URL}/wallet/withdraw`,
      { amount },
      {
        headers: { 'x-auth-token': getToken() },
      }
    );
  };
  
  export const getTransactionHistory = async () => {
    return await axios.get(`${API_URL}/transactions`, {
      headers: { 'x-auth-token': getToken() },
    });
  };