import instance from '../BaseURL';
import { apiHeaders } from '../Token';
export const createPurchaseOrderAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addPurchaseOrder`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getPurchaseOrderAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listPurchaseOrder`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const updatePurchaseOrderAPI = async (requestBody) => {
  try {
    const response = await instance.post(`editPurchaseOrder`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const DeletePurchaseOrderAPI = async (requestBody) => {
  try {
    const response = await instance.post(`deleteasset`, requestBody, apiHeaders);
    console.log('API response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const ListPurchaseOrderDetailsAPI = async (requestBody) => {
  try {
    const response = await instance.post(`listPoDetails`, requestBody, apiHeaders);
    console.log('API response:', response.data.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getPoGenaratorAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getPoGenarator`, requestBody, apiHeaders);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
