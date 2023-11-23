import instance from '../BaseURL';
import { apiHeaders } from '../Token';

export const getLocationAPI = async (requestBody) => {
  try {
    const response = await instance.post(`locationOnboardingDepartment`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getStateAPI = async (requestBody) => {
  try {
    const response = await instance.get(`getallLocationStateCode`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getVendorAPI = async (requestBody) => {
  try {
    const response = await instance.post(`GetVendor`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};

export const getTaxs = async (requestBody) => {
  try {
    const response = [
      { value: 5, label: '5%' },
      { value: 12, label: '12%' },
      { value: 18, label: '18%' },
      { value: 28, label: '28%' },
    ];
    return response;
  } catch (error) {
    throw error;
  }
};
