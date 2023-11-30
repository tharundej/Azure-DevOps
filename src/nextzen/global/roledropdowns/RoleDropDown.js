
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
    return response.data.data || [];
  } catch (error) {
    console.error(error);
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
    // const data1 = JSON.stringify({
    //   "companyID": "COMP1"
    // });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/onboardingRole`,
      headers: {
        'Content-Type': 'application/json'
      },
      //  data: data1
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
  const ApiHitleavePeriodType = async (obj) => {
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/filterLeavePeriodType`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: obj
      };
  
      const response = await axios.request(config);
      console.log(response.data.data,'response.data.data' )
      return response.data.data || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  const ApiHitleaveNameType = async (obj) => {
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/filterLeaveTypeName`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: obj
      };
  
      const response = await axios.request(config);
      console.log(response.data.data,'response.data.data' )
      return response.data.data || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const ApiHitCountries=async ()=>{
    try {
      const config = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: `https://countriesnow.space/api/v0.1/countries/states/`,
        headers: {
          'Content-Type': 'application/json'
        },
       
      };
  
      const response = await axios.request(config);
      console.log(response.data.data,'response.data.data' )
      return response.data.data || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const ApiHitStates=async (obj)=>{
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://countriesnow.space/api/v0.1/countries/states`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: obj
      };
  
      const response = await axios.request(config);
      console.log(response.data?.data,'response.data.dataState' )
      return response.data.data || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const ApiHitCities=async()=>{
    
      try {
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `https://countriesnow.space/api/v0.1/countries/state/cities`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: obj
        };
    
        const response = await axios.request(config);
        console.log(response.data.data,'response.data.data' )
        return response.data.data || [];
      } catch (error) {
        console.error(error);
        return [];
      }
   
  }
  

  export {ApiHitCities,ApiHitStates,ApiHitCountries,ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade,ApiHitDepartmentWithoutLocation,ApiHitleavePeriodType,ApiHitleaveNameType}