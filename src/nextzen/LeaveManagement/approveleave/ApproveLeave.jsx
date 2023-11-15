import { BasicTable} from 'src/nextzen/Table/BasicTable';
import axios from 'axios';
import { _userList } from 'src/_mock';

import { useTheme } from '@mui/material/styles';

import { useState } from 'react';

import {useSnackbar} from '../../../components/snackbar'

import {Typography,CardContent,Grid,Card,TextField,InputAdornment} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
import LeaveFilter from '../LeaveFilter';
 
export default function Approveleave(){
  const {enqueueSnackbar} = useSnackbar()
   const theme = useTheme();
    const defaultPayload={
        "count": 5,
        "page": 0,
        "search": "",
        "eid": localStorage.getItem('employeeID'),
        "externalFilters": {
          "fApplyDate": "",
          "fFromDate": "",
          "fToDate": "",
          "applyDate": {
              "from": "",
              "to": ""
          },
          "fromDate": {
              "from": "",
              "to": ""
          },
          "toDate": {
              "from": "",
              "to": ""
          },
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
              id: "employeeId",
              label: "Employee Id",
              minWidth:"8pc",
              type: "text"
            },
            { id: "employee", label: "Employee Name",minWidth:"10pc",type: "text"},
            { id: "applyDate", label: "Apply Date",minWidth:"8pc", type: "text" },
            {id : "netLeaveBalance",label:"Leave Balance",minWidth:"7pc",type:"text"},
            { id: "leaveType", label: "Leave Type",minWidth:"8pc", type: "text" },
            { id: "fromDate", label: "Start Date",minWidth:"7pc", type: "text" },
            {id: "toDate",label:"End Date",minWidth:"7pc",type:"text"},
            {id: "requestedDuration",label:"Requested Duration",minWidth:"7pc",type:'text'},
            {id: 'status',label:'Status',minWidth:"8pc",type: "badge"}
            // { id: '', width: 88 },

       ]);
    
    
      const actions = [
        { name: "Approve", id: "1", type: "serviceCall", endpoint: '/approveLeave' },

        { name: "Reject", id:"2", type: "serviceCall", endpoint: '/approveLeave' },
    
      ];

const onClickActions=(rowdata,event)=>{
        var payload ={
          "leave_id": rowdata?.leaveId,
          "emp_id": rowdata?.employeeId,
          "status": event?.id,           
          "leave_type_id":rowdata?.leaveTypeId,
          "duration": rowdata?.requestedDuration 
       }
      console.log(payload,"requestedddbodyyy")
      const config = {
        method: 'POST',
        maxBodyLength:Infinity,
        url: baseUrl + `/approveLeave`,
        // url: `https://27gq5020-3001.inc1.devtunnels.ms/erp/approveLeave`,
        data: payload
      
      }
      axios.request(config).then((response) => {
        enqueueSnackbar(response.data.message,{variant:'success'})
      })
        .catch((error) => {
          enqueueSnackbar(error.message,{variant:'Error'})
          console.log(error);
        });
      
      }
   
 return (
  <>
  <BasicTable 
  headerData={TABLE_HEAD} 
  endpoint="/listLeave"  
  defaultPayload={defaultPayload} 
  rowActions={actions} 
  bodyData = 'appliedLeave'
  filterName="LeavelistFilter"
  onClickActions={onClickActions}/>
  
  </>
 )
}