import * as React from 'react';
import {Button,Dialog,DialogContent,TextField,Grid,Stack,Typography} from '@mui/material';
import { useState,useCallback} from 'react';
import { BasicTable } from '../Table/BasicTable';

import ApplyLoan from './ApplyLoan';
import {useSnackbar} from '../../components/snackbar';
export default function Loans() {
  const {enqueueSnackbar} = useSnackbar()
      const TABLE_HEAD = [
        {
    
          id: "employeeID",
    
          label: "Employee Id",
          minWidth:"8pc",
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "employeeName", label: "Employe Name", width: 180, type: "text" },
    
        { id: "requestDate", label: "request Date", width: 220, type: "text" },
    
        { id: "requestAmount", label: "Request Amount", width: 180, type: "text" },
    
        { id: "paidDate", label: "Paid Date", minWidth: "8pc", type: "text" },
        { id: "paidAmount", label: "paid Amount", minWidth: "7pc", type: "text" },
        { id: "noOfInstallments", label: "No of Installments", minWidth: "7pc", type: "text" },
        { id: "interestRate", label: "Interest Rate", minWidth: "7pc", type: "text" },
        { id: "approverName", label: " Approver Name", minWidth: "10pc", type: "text" },
        { id: "paymentStatus", label: "Payment Status", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100, type: "badge" },
    
      ];
    
     
    
      const actions = [
    
        { name: "approve", icon: "hh", path: "jjj" },
    
        { name: "view", icon: "hh", path: "jjj" },
    
        { name: "eerr", icon: "hh", path: "jjj" },
    
      ];
    
    
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => {
        setShowForm(false);
        setShowEditForm(false);
      }
      const handleTimeForm =()=>{
        setShowForm(true)
       
      } 
      
  const defaultPayload={
    "count": 5,
    "page": 0,
    "search": "",
    "companyID": localStorage?.getItem('companyID'),
    "externalFilters": {
  "requestDate": {
   
  "RequestDateStart": "",
   
  "RequestDateEnd": ""
   
  },
   
  "paidDate": {
   
  "PaidDateFrom": "",
   
  "PaidDateTo": ""
   
  },
   
  
      "status": "",
      "requestAmount":"",
      "paidAmount":"",
      "approverID":"",
      "interestRate" : ""
    },
    "sort": {
      "key":null ,
      "orderBy": ""
    }
  }
  const onClickActions=(rowdata,event)=>{
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
    });
  
  }
  const [value,setValue] = useState();
  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);
      
  const [showEditForm,setShowEditForm]= useState(false);
const [rowData,setRowData] = useState();
  const handleEditLoanForm=(rowdata)=>{
    setRowData(rowdata)
    setShowEditForm(true);
  }
  const handleEditLoan=()=>{
   var payload = {
      "loanID":rowData?.loanID,
      "requestAmount":parseInt(value)
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url: baseUrl + `/updateLoanDetails`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    enqueueSnackbar(response.data.message,{variant:'success'})
    handleClose()
  })
    .catch((error) => {
      enqueueSnackbar(error.message,{variant:'Error'})
      handleClose()
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
 {(showEditForm) && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showEditForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 500 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
  <DialogContent>
  <Grid container spacing={2}>
     <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'5px'}}>
                Edit Your Loan Request 
              </Typography>
            </Grid>
      </Grid>
      <Grid  xs={12} md={12} sx={{marginLeft:5}}>
      <TextField
                
                fullWidth
                defaultValue={rowData?.requestAmount}
                value={value}
                onChange={handleChange}
                label="Amount"
              />
      </Grid>
     </Grid>
  </DialogContent>
  <Stack alignItems="flex-end" sx={{ mb:2,display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
               <Button variant="contained" color="primary" onClick={handleEditLoan}>Apply</Button>
                <Button  sx={{ml:"5px"}} onClick={handleClose}>Cancel</Button>
              </Stack>
      </Dialog>
    )}
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
