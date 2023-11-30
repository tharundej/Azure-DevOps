import { BasicTable} from 'src/nextzen/Table/BasicTable';
import axios from 'axios';
import { _userList } from 'src/_mock';

import { useTheme } from '@mui/material/styles';

import { useContext, useState } from 'react';

import {useSnackbar} from '../../../components/snackbar'

import {Typography,CardContent,Grid,Card,TextField,InputAdornment} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
import LeaveFilter from '../LeaveFilter';
 import { baseUrl } from 'src/nextzen/global/BaseUrl';
import UserContext from 'src/nextzen/context/user/UserConext';
export default function Approveleave(){
  const {enqueueSnackbar} = useSnackbar()
  const {user} = useContext(UserContext)
   const theme = useTheme();
    const defaultPayload={
      "manager_id":(user?.employeeID)?user?.employeeID:'',
      "role_id": (user?.roleID)?user?.roleID:'',
      "company_id": (user?.companyID)?user?.companyID:'',
      "page": 0,
      "count": 5,
      "search": "",
      "externalFilters": {
          "leaveTypeName": "",
          "Status": "",
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
          }
      },
      "sort": {
          "key": 0,
          "orderby": "al.apply_date"
      }
  }
    
      const [TABLE_HEAD,setTableHead] =useState( [
        {
              id: "employeeId",
              label: "Employee Id",
              minWidth:"8pc",
              type: "text"
            },
            { id: "employeeName", label: "Employee Name",minWidth:"9pc",type: "text"},
            { id: "managerName", label: "Reporting Manager",minWidth:"10pc",type: "text"},
            { id: "applyDate", label: "Apply Date",minWidth:"7pc", type: "text" },
            {id : "leaveBalance",label:"Leave Balance",minWidth:"8pc",type:"text"},
            { id: "LeaveType", label: "Leave Type",minWidth:"7pc", type: "text" },
            { id: "startDate", label: "Start Date",minWidth:"7pc", type: "text" },
            {id: "endDate",label:"End Date",minWidth:"7pc",type:"text"},
            {id: "requestedDuration",label:"Requested Duration",minWidth:"11pc",type:'text'},
            {id: "approvedBy",label:"Approver",minWidth:"7pc",type:"text"},
            {id: 'status',label:'Status',minWidth:"5pc",type: "badge"}
            // { id: '', width: 88 },

       ]);
    
      const actualActions = [
        { name: "Approve", id: "1", type: "serviceCall", endpoint: '/approveLeave' ,icon:"charm:circle-tick"},

        { name: "Reject", id:"2", type: "serviceCall", endpoint: '/approveLeave',icon:"charm:circle-cross" },
    
      ];
      const generateRowActions = () => {
        const userRoleID = user?.roleID;
        const actions = (userRoleID==1)?null:actualActions
        return actions;
      };
      const actionsBasedOnRoles = generateRowActions();

const onClickActions=(rowdata,event)=>{
        var payload ={
          "leave_id": parseInt(rowdata?.applyLeaveId),
          "emp_id": rowdata?.employeeId,
          "status": event?.id,           
          "leave_type_id":parseInt(rowdata?.leaveTypeId),
          "duration": parseInt(rowdata?.requestedDuration),
          "approvedBy":(user?.employeeID)?user?.employeeID:''
       }
      const config = {
        method: 'POST',
        maxBodyLength:Infinity,
        url: baseUrl + `/approveLeave`,
        data: payload
      
      }
      axios.request(config).then((response) => {
        enqueueSnackbar(response.data.message,{variant:'success'})
      })
        .catch((error) => {
          enqueueSnackbar(error.response.data.message,{variant:'error'})
          console.log(error);
        });
      
      }
      const handleEditRowParent =()=>{
        return null
      };

 return (
  <>
  <BasicTable 
  headerData={TABLE_HEAD} 
  endpoint="/hrapprovals"  
  defaultPayload={defaultPayload} 
  rowActions={actionsBasedOnRoles} 
  bodyData = 'appliedLeave'
  filterName="LeavelistFilter"
  onClickActions={onClickActions}
  handleEditRowParent={handleEditRowParent}/>
  
  </>
 )
}