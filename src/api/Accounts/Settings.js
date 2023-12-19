import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createAccountInformationAPI = async (requestBody) => {
  try {
    const response = await instance.post(`AccountInformation`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getAccountInformationListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`GetAccountInformation`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const updateAccountInformationAPI = async (requestBody) => {
  try {
    const response = await instance.post(`UpdateAccountInformation`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const DeleteAccountInformationAPI = async (requestBody) => {
  try {
    const response = await instance.post(`DeleteAccountInformation`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
