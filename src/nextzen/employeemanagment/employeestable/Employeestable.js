import { useEffect,useState,useCallback } from 'react';


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


export default function EmployeeTable() {

  const actions = [

    { name: "Approve", icon: "hh", id: 'approve', type: "serviceCall", endpoint: '/accept' },
    { name: "View", icon: "hh", id: 'view' },
    { name: "Edit", icon: "hh", id: 'edit' },
    { name: "Delete", icon: "hh", id: 'delete' },
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
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const defaultPayload={
 
    "count": 5,
     
    "page": 0,
     
    "search": "",
    "fcompanyID": "COMP1",
     
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
     
    "orderBy": "employee_id"
     
    }
    }

//   const defaultPayload={

 

//     "Count": 5,

 

//     "Page": 0,

 

//     "Search": "",

 

//     "Eid": "E1",

 

//     "fFromDate": "",

 

//     "fToDate": "",

 

//     "fLeaveTypeName": "",

 

//     "fStatus": "",

 

//     "order":1,

 

//     "orderBy":"al.apply_date"

 

// }
  







  const [TABLE_HEAD,setTableHead] =useState( [
    {
      id: 'employeeId',
      label: 'Employee ID',
      type: 'text',
      containesAvatar: true,
      minWidth:'180px',
      secondaryText: 'name',
    },
    { id: 'firstName', label: 'First name',  type: 'text', minWidth:'180px' },
    { id: 'middleName', label: 'Middle Name ',  type: 'text', minWidth:'180px' },
    { id: 'lastName', label: 'Last Name',  type: 'text', minWidth:'180px' },
    { id: 'emailID', label: 'Email ID',  type: 'text', minWidth:'180px' },
    { id: 'dateOfBirth', label: 'Date Of Birth',  type: 'text', minWidth:'180px' },
    { id: 'fatherName', label: 'Father Name ',  type: 'text', minWidth:'180px' },
    { id: 'motherName', label: 'Mother Name',  type: 'text', minWidth:'180px' },
    { id: 'maritalStatus', label: 'Marital Status',  type: 'text', minWidth:'180px' },
    { id: 'nationality', label: 'Nationality',  type: 'text', minWidth:'180px' },
    { id: 'religion', label: 'religion',  type: 'text', minWidth:'180px' },
    { id: 'bloodGroup', label: 'Blood Group',  type: 'text', minWidth:'180px' },
    { id: 'offerDate', label: 'Offer Date',  type: 'text', minWidth:'180px' },


    { id: 'joiningDate', label: 'Joining Date',  type: 'text', minWidth:'180px' },
    { id: 'pAddressLine1', label: 'pAddressLine1',  type: 'text', minWidth:'180px' },
    { id: 'pAddressLine2', label: 'pAddressLine2',  type: 'text', minWidth:'180px' },
    { id: 'pCity', label: 'p City',  type: 'text', minWidth:'180px' },
    { id: 'pState', label: 'p State ',  type: 'text', minWidth:'180px' },
    { id: 'pPincode', label: 'p Pincode',  type: 'text', minWidth:'180px' },
    { id: 'employmentType', label: 'EmploymentType',  type: 'text', minWidth:'180px' },
    { id: 'departmentId', label: 'DepartmentId',  type: 'text', minWidth:'180px' },
    { id: 'designationName', label: 'Designation Name',  type: 'text', minWidth:'180px' },
    { id: 'designationGrade', label: 'Designatio Grade',  type: 'text', minWidth:'180px' },
    { id: 'workingLocation', label: 'Working Location',  type: 'text', minWidth:'180px' },

    { id: 'roleName', label: 'roleName',  type: 'text', minWidth:'180px' }
   
    
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

  const handleCalled=()=>{
    console.log("hii1")
  }
  return (
    <>
      <Helmet>
        <title> Dashboard: Employees</title>
      </Helmet>

     
      {/* endpoint="/listLeave"

      defaultPayload={defaultPayload}

      headerData={TABLE_HEAD} */}

      <BasicTable headerData={TABLE_HEAD} endpoint="/searchEmployeeDetails"  defaultPayload={defaultPayload} filterOptions={filterOptions}

rowActions={actions} filterName="EmployeeFilterSearch"
 />
    </>
  );
}