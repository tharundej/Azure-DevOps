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
