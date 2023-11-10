import instance from '../BaseURL';

export const createAssetsAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addAssets`, requestBody);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const getLocationAPI = async (requestBody) => {
  try {
    const response = await instance.post(`locationOnboardingDepartment`, requestBody);
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
