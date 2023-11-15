import instance from '../BaseURL';
export const getProductListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`getProductDetails`, requestBody, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1MjcxMTEsInJhbmRvbSI6Nzk5MjR9.f4v9qRoF8PInZjvNmB0k2VDVunDRdJkcmE99qZHZaDA', // Replace YOUR_ACCESS_TOKEN with the actual token
        'Content-Type': 'application/json', // Adjust the content type if necessary
      },
    });
    console.log('API response:', response.data); // Log the response data
    return response.data.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
export const createProductAPI = async (requestBody) => {
  try {
    const response = await instance.post(`addProducts`, requestBody);
    console.log('API response:', response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Re-throw the error to propagate it
  }
};
