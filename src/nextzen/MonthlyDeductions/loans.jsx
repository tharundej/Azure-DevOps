import * as React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import { BasicTable } from '../Table/BasicTable';
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
import ApplyLoan from './ApplyLoan';
import {useSnackbar} from '../../components/snackbar';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Loans() {

  const {enqueueSnackbar} = useSnackbar()
      const TABLE_HEAD = [

        {
    
          id: "loanID",
    
          label: "SL_NO",
          minWidth:"5pc",
          type: "text",
    
        },
    
        { id: "employeeName", label: "Employee Name", minWidth: "10pc", type: "text" },
    
        { id: "requestDate", label: "Request Date", minWidth: "8pc", type: "text" },
    
        { id: "requestAmount", label: "Request Amount", minWidth: "7pc", type: "text" },
    
        { id: "paidDate", label: "Paid Date", minWidth: "8pc", type: "text" },
        { id: "paidAmount", label: "paid Amount", minWidth: "7pc", type: "text" },
        { id: "noOfInstallments", label: "No of Installments", minWidth: "7pc", type: "text" },
        { id: "interestRate", label: "Interest Rate", minWidth: "7pc", type: "text" },
        { id: "approverName", label: " Approver Name", minWidth: "10pc", type: "text" },
        { id: "status", label: "Status", width: 100, type: "text" },
        { id: "paymentStatus", label: "Payment Status", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
     
    
      const actions = [
    
        { name: "Approve",id:'approved',type:'serviceCall',endpoint:"/approveLoanDetails"},
        { name: "Reject",id:'rejected',type:'serviceCall',endpoint:"/approveLoanDetails"},
    
        { name: "Edit",id:'edit',type:'editform',endpoint:"/updateLoanDetails" },
    
    
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
    "count": 5,
    "page": 1,
    "search": "",
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
      "paidAmount":"",
      "approverName":"",
      "interestRate" : ""
    },
    "sort": {
      "key":null ,
      "orderBy": ""
    }
  }

  const onClickActions=(rowdata,event)=>{
    console.log(rowdata,"rowdataa",event)
    if(event?.name==="Approve" || event?.name==="Reject")
    {
      handleLoanApprove(rowdata,event)
    }
    else if (event?.name==="Edit"){
        handleEditLoanForm(rowdata)
    }
  
  }

  const handleLoanApprove=(rowdata,event)=>{
    var payload =
    {
      "employeeID":"info 3",
      "loanID": rowdata?.loanID,
      "paidAmount":rowdata?.paidAmount,
      "noOfInstallments":rowdata?.noOfInstallments,
      "interestRate":rowdata?.interestRate,
      "status":event?.id
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url: baseUrl + `/approveLoanDetails`,
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
 <ApplyLoan currentUser={{}} handleClose={handleClose} />
      </Dialog>
    )}
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
 
</Container>
    <BasicTable

headerData={TABLE_HEAD}
defaultPayload={defaultPayload}

endpoint='/getLoanDetailsHr'
bodyData='data'
filterName="LoanSearchFilter"
rowActions={actions}
onClickActions={onClickActions}

/>  
    </>
  );
}
