import { baseUrl } from "src/nextzen/global/BaseUrl";
import formatDateToYYYYMMDD from "src/nextzen/global/GetDateFormat";
import { useState,useEffect, useContext } from "react";
import {Card,OutlinedInput,FormControl,Select,MenuItem,InputLabel,Stack,Button,Dialog,Container,CardContent,Typography,DialogTitle,Grid,IconButton,DialogContent} from '@mui/material';
import { LoadingScreen } from "src/components/loading-screen";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Iconify from "src/components/iconify";
import dayjs from 'dayjs';
import axios from 'axios';
import Label from "src/components/label/label";
import UserContext from "src/nextzen/context/user/UserConext";
import { BasicTable } from "src/nextzen/Table/BasicTable";
export default function History(){
  const {user} = useContext(UserContext)

        const defaultPayload = {
          "employeeId":(user?.employeeID)?user?.employeeID:'',
          "search": "",
          "page": 0,
          "count": 5,
       "externalFilters":{
        "status":"",
        "leaveTypeName":"",
           "applyDate":{
               "from":"",
               "to":""
           },
    
           "fromDate":{
               "from":"",
               "to":"",
           },
           "toDate":{
                "from":"",
               "to":""
           }
          }
        }

    
      const [TABLE_HEAD,setTableHead] =useState( [
       
            { id: "applyDate", label: "Apply Date",minWidth:"7pc", type: "text" },
            {id : "leaveTypeName",label:"Leave Type",minWidth:"8pc",type:"text"},
            { id: "fromDate", label: "Start Date",minWidth:"7pc", type: "text" },
            {id: "toDate",label:"End Date",minWidth:"7pc",type:"text"},
            {id: "leaveDays",label:"Requested Duration",minWidth:"11pc",type:'text'},
            {id: "comments",label:"Leave Reason",minWidth:"7pc",type:"text"},
            {id: 'status',label:'Status',minWidth:"5pc",type: "badge"}

       ]);

const handleEditRowParent=()=>{
  return null
}

return (    
    <>
<BasicTable
 headerData={TABLE_HEAD} 
 endpoint="/getLeaveHistory"  
 defaultPayload={defaultPayload} 
 rowActions={null}
 filterName="LeaveHistoryFilter"
 handleEditRowParent={handleEditRowParent}
 />
 
  
   </>
)
   
}