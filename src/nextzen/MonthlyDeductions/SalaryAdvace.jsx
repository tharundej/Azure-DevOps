import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import instance from 'src/api/BaseURL';
import { BasicTable } from '../Table/BasicTable';
import ReusableTabs from '../tabs/ReusableTabs';
import SalaryAdvanceForm from './SalaryAdvaceForm';
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
import {useSnackbar} from '../../components/snackbar';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function SalaryAdvace() {
    const {enqueueSnackbar} = useSnackbar()
      const TABLE_HEAD = [

        // {
    
        //   id: "",
    
        //   label: "SL_NO",
    
        //   type: "text",
    
        //   containesAvatar: false,
    
        //   secondaryText: "text",
    
        // },
    
        { id: "employeeName", label: "Employee Name", minWidth: "10pc", type: "text" },
    
        { id: "requestDate", label: "Request Date", minWidth: "8pc", type: "text" },
    
        { id: "requestAmount", label: "Request Amount", width: "7pc", type: "text" },
    
        { id: "paidDate", label: "Paid Date", minWidth: "8pc", type: "text" },
        { id: "PaidAmount", label: "paid Amount", width: "7pc", type: "text" },
        { id: "approverName", label: "Approver Name", width: 100, type: "text" },
        { id: "commentStatus", label: "Comments", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100, type: "text" },
        { id: "paymentStatus", label: "Payment Status", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
     
    
      const actions = [
    
        { name: "Approve",id:'approved',type:'serviceCall',endpoint:"/approveSalaryAdvance"},
        { name: "Reject",id:'rejected',type:'serviceCall',endpoint:"/approveSalaryAdvance"},
    
        { name: "Edit",id:'edit',type:'editform',endpoint:"/updateSalaryAdvance" },
    
    
      ];

      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      } 
      
    
      const[tableData,SetTableData] = useState({})
      console.log("🚀 ~ file: TimeProject.jsx:113 ~ TimeProject ~ tableData:", tableData)

  const defaultPayload={
    "count": 10,
    "page": 1,
    "search": "COMP1",
    "companyID": "COMP1",
    "externalFilters": {
  "requestDate": {
   
  "from": "",
   
  "to": ""
   
  },
   
  "paidDate": {
   
  "from": "",
   
  "to": ""
   
  },
      "status": "",
      "requestAmount":"",
      "paidAmount":""
    },
    "sort": {
      "key": 1,
      "orderBy": ""
    }
  }

  const onClickActions=(rowdata,event)=>{
    console.log(rowdata,"rowdataa",event)
    if(event?.name==="Approve" || event?.name==="Reject")
    {
      handleSalaryApprove(rowdata,event)
    }
    else if (event?.name==="Edit"){
        handleEditLoanForm(rowdata)
    }
  
  }

  const handleSalaryApprove=(rowdata,event)=>{
    var payload =
    {
      "employeeID":"info4",
      "salaryAdvanceID":rowdata?.SalaryAdvanceID,
      "paidAmount":rowdata?.paidAmount,
      "commentStatus":rowdata?.commentStatus,
      "status":event?.id,
      "paymentStatus":rowdata?.paymentStatus
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url: baseUrl + `/approveSalaryAdvance`,
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
      {showForm && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <SalaryAdvanceForm handleClose={handleClose} currentUser={{}} close={{handleClose}}  />
      </Dialog>
    )}
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}

</Container>
    <BasicTable

headerData={TABLE_HEAD}
defaultPayload={defaultPayload}

endpoint='/searchSalaryAdvance'
filterName='SalaryFilter'
rowActions={actions}
bodyData="data"
onClickActions={onClickActions}
/>  
    </>
  );
}
