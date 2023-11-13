
import axios from "axios";
import { baseUrl } from "../BaseUrl";
const ApiHitLocations = async () => {
  try {
    const data1 = JSON.stringify({
      "companyID": "COMP1"
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/locationOnboardingDepartment`,
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

const ApiHitDepartment = async (obj) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/onboardingDepartment`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: obj
    };

    const response = await axios.request(config);
    console.log(response.data.data,'response.data.dataresponse.data.data1')
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    console.log(response.data.data,'response.data.dataresponse.data.data2')

    return [];
  }
}


const ApiHitDesgniation = async (obj) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/onboardingDesignation`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: obj
    };

    const response = await axios.request(config);
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}


const ApiHitDesgniationGrade = async (obj) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/onboardingDesignationGrade`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: obj
    };

    const response = await axios.request(config);
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}


const ApiHitRoles = async () => {
  try {
    const data1 = JSON.stringify({
      "companyID": "COMP1"
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/onboardingRole`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data1
    };

    const response = await axios.request(config);
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}


  const ApiHitManager = async () => {
    try {
      const data1 = JSON.stringify({
        "companyID": "COMP1"
      });
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/onboardingReportingManager`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data1
      };
  
      const response = await axios.request(config);
      return response.data.data || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const ApiHitDepartmentWithoutLocation = async () => {
    try {
      const data1 = JSON.stringify({
        "companyID": "COMP1"
      });
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/getDepartmentSalarystructure`,
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
      return [];
    }
  }


  

  export {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade,ApiHitDepartmentWithoutLocation}