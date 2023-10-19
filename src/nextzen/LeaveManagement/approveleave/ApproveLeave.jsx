import { BasicTable} from 'src/nextzen/Table/BasicTable';



import { _userList } from 'src/_mock';

import { useTheme } from '@mui/material/styles';

import { useState } from 'react';

import {Typography,CardContent,Grid,Card,TextField,InputAdornment} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
 
export default function Approveleave(){
   const theme = useTheme();

   const cardStyle = {
      display: 'flex',
      // justifyContent: 'space-between', // Align cards horizontally
      marginBottom: '16px', // Add margin at the bottom
    };
    const cardHeaderStyle = {
      backgroundColor: '#3B82F6',
      color: '#fff',
      padding: '16px',
      textAlign: 'center',
      fontWeight: 'bold',
    };
    const cardContentStyle = {
      padding: '16px', 
      // fontWeight: 'bold', 
      fontSize: '18px', 
      backgroundColor: '#DFEBFE', // Change the background color
      display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
      alignItems: 'center',
      color: 'black', // Change the text color
      
    };

    const defaultPayload={
        "count": 5,
        "page": 0,
        "search": "",
        "eid": "E2",
    "externalFilters":{
        "fFromDate": "",
        "fToDate": "",
        "fLeaveTypeName": "",
        "fStatus": ""
    },
    "sort": {
        "key":1,
        "orderBy":"al.apply_date"
    }
    }

      const [TABLE_HEAD,setTableHead] =useState( [
        {
              id: "employee_id",
              label: "Employee Id",
              type: "text"
            },
            { id: "employee", label: "Employee Name", type: "text"},
            { id: "apply_date", label: "Apply Date", type: "text" },
            {id : "net_leave_balance",label:"Leave Balance",type:"text"},
            { id: "leave_type", label: "Leave Type", type: "text" },
            { id: "from_date", label: "Start Date", type: "text" },
            {id: "to_date",label:"End Date",type:"text"},
            {id: "requested_duration",label:"Requested Duration",type:'text'},
            {id: 'status',label:'Status',type:'text'}
            // { id: '', width: 88 },

       ]);
    
    
      const actions = [
        { name: "Approve", id: 'approve', type: "serviceCall", endpoint: '/accept' },

        { name: "Reject", id: 'reject', type: "serviceCall", endpoint: '/reject' },
    
      ];

  
 return (
    <Card sx={{marginTop:"5px"}}>
     <BasicTable headerData={TABLE_HEAD} endpoint="/listLeave"  defaultPayload={defaultPayload} rowActions={actions}/>
        <br/>
    </Card>
 )
}