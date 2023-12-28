import instance from '../BaseURL';
import { apiHeaders } from '../Token';

export const createSalesPaymentAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addSalesPayment`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getSalesPaymentAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listSalesPayment`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};


