import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/erp/', // Set your base URL here
});

export default instance;