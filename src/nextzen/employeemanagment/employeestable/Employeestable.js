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

 

    "Page":1,
    
     
    
    "Count":5
    
     
    
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
      id: 'project_id',
      label: 'project_id',
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

      <Grid>
        {/* <Grid md={8}>

        </Grid> */}
        <Grid  >
      <Button
        component={RouterLink}
        href={paths.dashboard.employee.onboardform}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}
      >
        Add New Employee
      </Button>
      </Grid>
      </Grid>
      {/* endpoint="/listLeave"

      defaultPayload={defaultPayload}

      headerData={TABLE_HEAD} */}

      <BasicTable headerData={TABLE_HEAD} endpoint="/listLeave"  defaultPayload={defaultPayload} filterOptions={filterOptions}

rowActions={actions}
 />
    </>
  );
}
