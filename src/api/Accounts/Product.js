import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const getProductListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getProductDetails`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const createProductAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addProducts`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const UpdateProductAPI = async (requestBody) => {
  try {
    const response = await instance.post(`editProducts`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const DeleteProductAPI = async (requestBody) => {
  try {
    const response = await instance.post(`deleteProductDetails`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
