
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

  const ApiHitDepartment=(obj)=>{
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}onboardingDepartment`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
    
      data : obj
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setDepartmentOptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  const ApiHitDesgniation=(obj)=>{
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}onboardingDesignation`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
    
      data : obj
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setDesginationptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  const ApiHitDesgniationGrade=(obj)=>{
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}onboardingDesignationGrade`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
    
      data : obj
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setDesginationGradeOptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  const ApiHitRoles=()=>{
    const data1 = JSON.stringify({

      "companyID": "COMP1"
    
    });
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}onboardingRole`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
      data:data1
    
     
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setrolesOptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  const ApiHitManager=()=>{
    const data1 = JSON.stringify({

      "companyID": "COMP1"
    
    });
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}onboardingReportingManager`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
      data:data1
    
     
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setassignManagerOptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  export {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles}