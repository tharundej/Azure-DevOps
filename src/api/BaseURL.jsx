import axios from 'axios';
 
const instance = axios.create({
  baseURL: 'https://mallard-blessed-lobster.ngrok-free.app/erp', // Set your base URL heress
 
//  baseUrl: process.env.REACT_APP_API_BASE_URL
  // baseURL: 'http://192.168.0.196:3001/erp/', // Set your base URL heress
});
 
export default instance;
 