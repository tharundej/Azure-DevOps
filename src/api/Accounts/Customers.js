import instance from '../BaseURL';

export const createCustomerAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addCustomer`, requestBody);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getCustomerListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listcustomers`, requestBody);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
