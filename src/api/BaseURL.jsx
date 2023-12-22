import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallard-blessed-lobster.ngrok-free.app/erp', // Set your base URL heress

//  baseUrl:`http://192.168.1.5:3001/erp`
  // baseURL: 'http://192.168.0.196:3001/erp/', // Set your base URL heress
});

export default instance;
