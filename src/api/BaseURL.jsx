import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/erp/', // Set your base URL here
//   baseURL: 'https://qx41jxft-3001.inc1.devtunnels.ms/', //  Anandh base URL here
//   baseURL: 'https://kz7mdxrb-3001.inc1.devtunnels.ms/', //  Yukthi base URL here
});

export default instance;