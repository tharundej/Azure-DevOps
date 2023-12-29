import instance from '../BaseURL';
import { apiHeaders } from '../Token';

export const createSalesInvoiceAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addSalesInvoice`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getSalesInvoiceAPI = async (requestBody) => {
  try {
    const response = await instance.post(`/listSalesInvoice`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};

export const editSalesInvoiceAPI = async (requestBody) => {
  try {
    const response = await instance.post(`editSalesInvoice`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};

