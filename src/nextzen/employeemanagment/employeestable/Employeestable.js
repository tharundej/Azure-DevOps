import { useEffect,useState,useCallback, useContext } from 'react';

import CryptoJS from "crypto-js";

import { Helmet } from 'react-helmet-async';

import { Grid } from '@mui/material';
// sections
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import Button from '@mui/material/Button';
// ----------------------------------------------------------------------
import { _userList } from 'src/_mock';
import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

import axios from 'axios';
import UserContext from 'src/nextzen/context/user/UserConext';


export default function EmployeeTable() {

  const actions = [

    
   
    
  ];

  const [filterOptions,setFilterOptions]=useState({
    dates:[
      {
      display:'Joining Date',
      field_name:'joining_date'
    },
    {
      display:'Offer Date',
      field_name:'offer_date'
    }
  ],
  dropdowns:[
    {
      display:'Status',
      options:["active","inactive"],
      field_name:'status'
    },
    {
      display:'Employement Type',
      options:["Permanent","Contract"],
      field_name:'employement_type'
    }
  ]
  })

  const [bodyContent,setBodyContent]=useState([])
  const [body_for_employee,setBody]=useState({
    "count" : 5,
    "page":1
  })


   const ApiHit=()=>{
    const data1=body_for_employee
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'http://192.168.0.222:3001/erp/employeeDetails',
      // headers: { 
      //   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo'
      // },
      data:data1
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.data));
      setBodyContent(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
   }

  useEffect(()=>{
   ApiHit();
   
  },[])

  const {user}=useContext(UserContext)
  console.log(user,'pppoppp')

  const defaultPayload={
    records:user?.rolePermissions?.employeeManagement?.fullAccess,
    employeeID: user?.employeeID,
    roleID:user?.roleID,
    "count": 10,
     
    "page": 0,
     
    "search": "",
    "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
     
    "externalFilters": {
    "fMaritalStatus":"",
    "fBloodGroup":"",
    "fPState":"",
    "fPEmployementType":"",
    "fPdepartmentName":"",
    "fPDesignation":"",
    "fPDesignationGrade":"",
    "fWorkingLocation":"",
     
    "fjoiningDate": {
     
    "from": "",
     
    "to": ""
     
    },
     
    "fDOB": {
     
    "from": "",
     
    "to": ""
     
    },
     
    "fofferDate": {
     
    "from": "",
     
    "to": ""
     
    }
    },
     
    "sort": {
     "key": 1,
      "orderBy": "last_updated_by"
  }
    }


  const [TABLE_HEAD,setTableHead] =useState( [
    {
      id: 'employeeId',
      label: 'Employee ID',
      type: 'text',
      
    minWidth:'180px',
      secondaryText: 'name',
    },
    { id: 'firstName', label: 'First name',  type: 'text', minWidth:'180px' },
    { id: 'middleName', label: 'Middle Name ',  type: 'text', minWidth:'180px' },
    { id: 'lastName', label: 'Last Name',  type: 'text', minWidth:'180px' },
    { id: 'companyEmail', label: 'Company Email',  type: 'text', minWidth:'180px' },
    { id: 'personalEmail', label: 'Personal Email',  type: 'text', minWidth:'180px' },
    { id: 'reportingManager', label: 'Reporting Manager',  type: 'text', minWidth:'180px' },
    { id: 'contactNumber', label: 'Contact Number',  type: 'text', minWidth:'180px' },
    { id: 'dateOfBirth', label: 'Date of Birth',  type: 'date', minWidth:'180px' },
    { id: 'employmentType', label: 'Employment Type',  type: 'text', minWidth:'180px' },
    { id: 'departmentId', label: 'Department ID',  type: 'text', minWidth:'180px' },
    { id: 'designationName', label: 'Designation Name',  type: 'text', minWidth:'180px' },
    { id: 'designationGrade', label: 'Designation Grade',  type: 'text', minWidth:'180px' },
    { id: 'workingLocation', label: 'Working Location',  type: 'text', minWidth:'180px' },

    { id: 'roleName', label: 'Role Name',  type: 'text', minWidth:'180px' },
    { id: 'fatherName', label: 'Father Name ',  type: 'text', minWidth:'180px' },
    { id: 'motherName', label: 'Mother Name',  type: 'text', minWidth:'180px' },
    { id: 'maritalStatus', label: 'Marital Status',  type: 'text', minWidth:'180px' },
    { id: 'nationality', label: 'Nationality',  type: 'text', minWidth:'180px' },
    { id: 'religion', label: 'Religion',  type: 'text', minWidth:'180px' },
    { id: 'bloodGroup', label: 'Blood Group',  type: 'text', minWidth:'180px' },
    { id: 'offerDate', label: 'Offer Date',  type: 'date', minWidth:'180px' },


    { id: 'joiningDate', label: 'Joining Date',  type: 'date', minWidth:'180px' },
    { id: 'pAddressLine1', label: 'Permanent Address Line 1',  type: 'text', minWidth:'280px' },
    { id: 'pAddressLine2', label: 'Permanent Address Line 2',  type: 'text', minWidth:'280px' },
    { id: 'pCity', label: 'Permanent City',  type: 'text', minWidth:'180px' },
    { id: 'pState', label: 'Permanent State ',  type: 'text', minWidth:'180px' },
    { id: 'pPincode', label: 'Permanent Pincode',  type: 'text', minWidth:'180px' }
    
   
    
  ]);


  // const bodyContent = [
  //   {
  //     name: 'ssurendra',
  //     email: 'suri@infobellIt.com',
  //     phoneNumber: '9879876789',
  //     company: 'Infobell',
  //     role: 'UI Developer',
  //     status: 'active',
  //   },
  // ];
  const router = useRouter();


  const handleEditRowParent = useCallback(
    (ele) => {
      const secretPass = "XkhZG4fW2t2W";

      const encryptData = () => {
        const data = CryptoJS.AES.encrypt(
          JSON.stringify(ele?.employeeId),
          secretPass
        ).toString();

       // setEncrptedData(data);
       console.log('called',data)
         router.push(paths.dashboard.employee.userview(data));
       
      };
      //encryptData()
     router.push(paths.dashboard.employee.userview(ele?.employeeId));
      
      
    },
    [router]
    
  );
  return (
    <>
      <Helmet>
        <title> Dashboard: Employees</title>
      </Helmet>

     
      {/* endpoint="/listLeave"

      defaultPayload={defaultPayload}

      headerData={TABLE_HEAD} */}

      <BasicTable headerData={TABLE_HEAD} endpoint="/employeeDetails"  defaultPayload={defaultPayload} filterOptions={filterOptions}

rowActions={actions} filterName="EmployeeFilterSearch"  handleEditRowParent={handleEditRowParent}
 />
    </>
  );
}