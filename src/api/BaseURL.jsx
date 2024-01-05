import axios from 'axios';

console.log(process.env.REACT_APP_API_BASE_URL,"baseURLFRom API")
const instance = axios.create({
  // baseURL: 'https://mallard-blessed-lobster.ngrok-free.app/erp', // Set your base URL heress

 baseURL: process.env.REACT_APP_API_BASE_URL
  // baseURL: 'http://192.168.0.196:3001/erp/', // Set your base URL heress
});

export default instance;

