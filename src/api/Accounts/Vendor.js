import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createVendorAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addVendorDetails`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getVendorListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`ListVendorDetails`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const updateVendorAPI = async (requestBody) => {
  try {
    const response = await instance.post(`updateVendorDetails`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const DeleteVendorAPI = async (requestBody) => {
  try {
    const response = await instance.post(`DeleteVendorDetails`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
