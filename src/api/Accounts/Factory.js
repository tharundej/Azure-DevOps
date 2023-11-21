import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createFactoryAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addLocation`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getFactoryListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listFactory`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const updateFactoryAPI = async (requestBody) => {
  try {
    const response = await instance.post(`editFactory`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const DeleteFactoryAPI = async (requestBody) => {
  try {
    const response = await instance.post(`deleteLocation`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
