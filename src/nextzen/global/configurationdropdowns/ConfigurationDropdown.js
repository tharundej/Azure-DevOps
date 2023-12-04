
import axios from "axios";
import { baseUrl } from "../BaseUrl";
const leavePeriodType = async () => {
  try {
    const data1 = JSON.stringify({
      "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/filterLeavePeriodType`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data1
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
const leaveTypeName = async () => {
  try {
    const data1 = JSON.stringify({
      "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/filterLeaveTypeName`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data1
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
const holidayTypeName = async () => {
  try {
    const data1 = JSON.stringify({
      "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/filterHolidayName`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data1
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
const locationNameApi = async () => {
  try {
    const data1 = JSON.stringify({
      "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/filterLocationName`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data1
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }

}
const payScheduleType = async () => {
  try {
    const data1 = JSON.stringify({
      "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/filterLeaveTypeName`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data1
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export   {leavePeriodType,leaveTypeName,holidayTypeName,locationNameApi,payScheduleType}