import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createPurchaseInvoiceAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addPurchaseInvoice`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const listPurchaseInvoiceAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listPurchaseInvoice`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
