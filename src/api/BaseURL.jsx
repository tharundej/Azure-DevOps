import axios from 'axios';
 
const instance = axios.create({
  // baseURL: 'http://192.168.1.87:3001/erp/', // Set your base URL heress
  baseURL: 'http://192.168.1.135:3001/erp/', // Set your base URL heress
});

export default instance;