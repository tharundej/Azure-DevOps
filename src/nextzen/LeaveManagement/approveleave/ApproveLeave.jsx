import { BasicTable} from 'src/nextzen/Table/BasicTable';
import axios from 'axios';
import { _userList } from 'src/_mock';

import { useTheme } from '@mui/material/styles';

import { useContext, useState } from 'react';

import {useSnackbar} from '../../../components/snackbar'
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import Iconify from 'src/components/iconify/iconify';
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
            { id: "applyDate", label: "Apply Date",minWidth:"8pc", type: "date"},
            {id : "leaveBalance",label:"Leave Balance",minWidth:"8pc",type:"text"},
            { id: "LeaveType", label: "Leave Type",minWidth:"7pc", type: "text" },
            { id: "startDate", label: "Start Date",minWidth:"8pc", type: "date"},
            {id: "endDate",label:"End Date",minWidth:"8pc",type:"date"},
            {id: "requestedDuration",label:"Requested Duration",minWidth:"11pc",type:'text'},
            {id: "approvedBy",label:"Approver",minWidth:"7pc",type:"text"},
            {id:'lossOfPay',label:"Loss of Pay",minWidth:'7pc',type:"text"},
            {id: 'status',label:'Status',minWidth:"4pc",type: "badge"}

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
      const [confirmApproveOpen, setConfirmApproveOpen] = useState(false);
      const [approveData, setApproveData] = useState(null);
      const [count,setCount] = useState(0)

const onClickActions=(rowdata,event)=>{
  if(event?.name==="Approve" || event?.name==="Reject"){
    const approveData = {
      "leave_id": parseInt(rowdata?.applyLeaveId),
      "emp_id": rowdata?.employeeId,
      "status": event?.id,           
      "leave_type_id":parseInt(rowdata?.leaveTypeId),
      "duration": parseInt(rowdata?.requestedDuration),
      "approvedBy":(user?.employeeID)?user?.employeeID:''
   };
   setApproveData(approveData)
   setConfirmApproveOpen(true);
   handleApproveConfirmed();
  }
}
  const handleApproveConfirmed = async () => {
        if (approveData) {
          const config={
            method:'POST',
            maxBodyLength:Infinity,
            url:baseUrl + '/approveLeave',
            data:approveData
           }
           axios.request(config).then((response) => {
            enqueueSnackbar(response.data.message,{variant:'success'})
            setCount(count+1)
          })
            .catch((error) => {
              enqueueSnackbar(error.response.data.message,{variant:'error'})
              console.log(error);
            });
          setApproveData(null);
          setConfirmApproveOpen(false);
        }
      };
  const handleCancelApprove = () => {
        setApproveData(null);
        setConfirmApproveOpen(false);
  };
console.log(count,"countt")
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
  count={count}
/>

<ConfirmationDialog
        open={confirmApproveOpen}
        onClose={handleCancelApprove}
        onConfirm={handleApproveConfirmed}
        itemName={(approveData?.status=="1")?"Approve Leave":"Reject Leave"}
        confirmButtonText={(approveData?.status=="1")?"Approve":"Reject"}
        message={(approveData?.status=="1")?"Are you sure want to Approve Leave?":"Are you sure want to Reject Leave?"}
      />
  
  </>
 )
}