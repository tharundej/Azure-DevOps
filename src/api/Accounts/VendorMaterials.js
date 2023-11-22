import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createVendorMaterialAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addVendorMaterial`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getVendorMaterialListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getMaterials`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const updateVendorMaterialAPI = async (requestBody) => {
  try {
    const response = await instance.post(`editVendorMaterial`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const DeleteVendorMaterialAPI = async (requestBody) => {
  try {
    const response = await instance.post(`deleteMaterial`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
