import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createExpensesAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addExpenses`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getExpensesListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listExpenses`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const updateExpensesAPI = async (requestBody) => {
  try {
    const response = await instance.post(`editExpenses`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const DeleteExpensesAPI = async (requestBody) => {
  try {
    const response = await instance.post(`deleteExpenses`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
