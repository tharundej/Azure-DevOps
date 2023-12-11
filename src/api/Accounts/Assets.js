import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createAssetsAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addAssets`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getAssetsListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listassets`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const updateAssetsAPI = async (requestBody) => {
  try {
    const response = await instance.post(`editAssets`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const DeleteAssetsAPI = async (requestBody) => {
  try {
    const response = await instance.post(`deleteasset`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
