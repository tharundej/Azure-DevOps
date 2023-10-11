import { useEffect,useState,useCallback } from 'react';


import { Helmet } from 'react-helmet-async';
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
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo'
      },
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



  


  const [TABLE_HEAD,setTableHead] =useState( [
    {
      id: 'employee_id',
      label: ' Employee id',
      type: 'text',
      containesAvatar: true,

      secondaryText: 'name',
    },
    { id: 'first_name', label: 'First Name', width: 250, type: 'text' },
    { id: 'last_name', label: 'Last name', width: 220, type: 'text' },
    { id: 'contact_number', label: 'Contact Number', width: 300, type: 'text' },
    { id: 'employment_type', label: 'Employment Type', width: 100 ,  type: 'text'},
   
    { id: 'department_name', label: 'Department Name', width: 280, type: 'text' },
    { id: 'working_location', label: 'Working Location', width: 220, type: 'text' },
    { id: 'reporting_manager_name', label: 'Reporting Manager Name', width: 180, type: 'text' }
    
  ]);

  const actions = [
    { name: 'approve', icon: 'hh', path: 'jjj' },
    { name: 'view', icon: 'hh', path: 'jjj' },
    { name: 'eerr', icon: 'hh', path: 'jjj' },
  ];
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
      <Button
        component={RouterLink}
        href={paths.dashboard.employee.onboardform}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}
      >
        Add New Employee
      </Button>


      <BasicTable headdata={TABLE_HEAD} bodydata={bodyContent} rowActions={actions} onhandleCalled={handleCalled} />
    </>
  );
}
