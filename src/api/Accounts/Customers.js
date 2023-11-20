import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createCustomerAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addCustomer`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getCustomerListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listcustomers`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const deleteCutomerApi = async (requestBody) => {
  try {
    const response = await instance.post('deleteCustomer', requestBody, apiHeaders);
    console.log('API responce:', response);
    return response.data;
  } catch (error) {
    console.log('API request faild:', error);
    throw error;
  }
};
export const updateCustomerAPI = async (requestBody) => {
  try {
    const response = await instance.post('editCustomer', requestBody, apiHeaders);
    console.log('API responce:', response);
    return response.data;
  } catch (error) {
    console.log('API request faild:', error);
    throw error;
  }
};
