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
export const getVendorMaterialAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getMaterialVendor`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getProductListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getProductsList`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};

export const getCustomerListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getCustomersList`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getListofPoNumberAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listofPoNumber`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getListofSoNumberAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getSalesOrderNo`, requestBody, apiHeaders);
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
export const getUnitOfMeasure = async (requestBody) => {
  try {
    const response = ['Ton', 'Gram', 'KG'];
    return response;
  } catch (error) {
    throw error;
  }
};
