import axios from 'axios';

const BASE_URL = 'http://192.168.1.199:3001/erp/';
export const createAssetsAPI = async (requestBody) => {
    try {
      const response = await axios.post(`${BASE_URL}addAssets`, requestBody);
      console.log('API response:', response.data); // Log the response data
      return response.data.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error; // Re-throw the error to propagate it
    }
  };
  