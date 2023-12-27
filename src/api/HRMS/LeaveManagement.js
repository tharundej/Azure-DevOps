import instance from 'src/api/BaseURL';
import { apiHeaders } from '../Token';
export const ApproveLeaveAPI = async (requestBody) => {
  
  try {
    const response = await instance.post(`approveLeave`, requestBody, apiHeaders);
    return response;
  } catch (error) {
    throw error; 
  }
};
export const getHolidaysListAPI = async (requestBody) => {
  try {
    const response = await instance.post(`holidayList`, requestBody, apiHeaders);
    return response;
  } 
  catch (error) {
    throw error; 
  }
};
export const getLeaveTypeAPI = async (requestBody) => {
  
  try {
    const response = await instance.post(`getleaveType`, requestBody, apiHeaders);
    return response;
  } catch (error) {
    throw error; 
  }
};
export const getAvailableLeaveAPI = async (requestBody) => {
  try {
    const response = await instance.post(`availableLeave`, requestBody, apiHeaders);
    return response;
  } catch (error) {
    throw error; 
  }
};
export const getLossOfPayAPI = async (requestBody) => {
    try {
      const response = await instance.post(`getLossOfPay`, requestBody, apiHeaders);
      return response;
    } catch (error) {
      throw error; 
    }
  };
  export const getPendingApprovedAPI = async (requestBody) => {
    try {
      const response = await instance.post(`pendingapproved`, requestBody, apiHeaders);
      return response;
    } catch (error) {
      throw error; 
    }
  };
