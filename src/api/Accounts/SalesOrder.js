import instance from '../BaseURL';
import { apiHeaders } from '../Token';

export const createSalesOrderAPI = async (requestBody) => {
  try {
    const response = await instance.post(`AddSalesOrder`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getSalesOrderAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getSalesOrder`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};

export const editSalesOrderAPI = async (requestBody) => {
  try {
    const response = await instance.post(`EditSalesOrder`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const deleteSalesOrderAPI = async (requestBody) => {
  try {
    const response = await instance.post(`deleteSalesOrder`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getSalesOrderDetailsAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getProductInfoForInvoice`, requestBody, apiHeaders);
    console.log('API response:', response.data.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
