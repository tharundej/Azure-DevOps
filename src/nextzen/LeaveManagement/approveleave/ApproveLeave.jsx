import { BasicTable} from 'src/nextzen/Table/BasicTable';



import { _userList } from 'src/_mock';

import { useTheme } from '@mui/material/styles';

import { useState } from 'react';

import {Typography,CardContent,Grid,Card,TextField,InputAdornment} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
import LeaveFilter from '../LeaveFilter';
 
export default function Approveleave(){
   const theme = useTheme();
    const defaultPayload={
        "count": 5,
        "page": 0,
        "search": "",
        "eid": "info1",
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
              minWidth:"8px",
              type: "text"
            },
            { id: "employee", label: "Employee Name",minWidth:"10px", type: "text"},
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
  <>
  <BasicTable 
  headerData={TABLE_HEAD} 
  endpoint="listLeave"  
  defaultPayload={defaultPayload} 
  rowActions={actions} 
  bodyData = 'appliedLeave'
  filterName="LeavelistFilter"/>
  </>
 )
}