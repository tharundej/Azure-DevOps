import * as React from 'react';
import {TextField,Grid,Typography, DialogContent,Dialog,Button,Stack}from '@mui/material';
import { _userList } from 'src/_mock';
import { useState , useCallback} from 'react';
import { BasicTable } from '../Table/BasicTable';
import SalaryAdvanceForm from './SalaryAdvaceForm';
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
import {useSnackbar} from '../../components/snackbar';
export default function SalaryAdvace() {
    const {enqueueSnackbar} = useSnackbar()
      const TABLE_HEAD = [
        {
    
          id: "employeeID",
    
          label: "Employee Id",
          minWidth:"8pc",
    
          type: "text",
    
         
        },
    
        { id: "employeeName", label: "Employee Name", minWidth: "10pc", type: "text" },
    
        { id: "requestDate", label: "Request Date", minWidth: "8pc", type: "text" },
    
        { id: "requestAmount", label: "Request Amount", width: "7pc", type: "text" },
    
        { id: "paidDate", label: "Paid Date", minWidth: "8pc", type: "text" },
        { id: "PaidAmount", label: "paid Amount", width: "7pc", type: "text" },
        { id: "approverName", label: "Approver Name", width: 100, type: "text" },
        { id: "commentStatus", label: "Comments", width: 100, type: "text" },
       
        { id: "paymentStatus", label: "Payment Status", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100,type: "badge"},
        // { id: '', width: 88 },
    
      ];
    
     
    
      const actions = [
    
        { name: "Approve",id:'approved',type:'serviceCall',endpoint:"/approveSalaryAdvance"},
        { name: "Reject",id:'rejected',type:'serviceCall',endpoint:"/approveSalaryAdvance"},
    
        { name: "Edit",id:'edit',type:'editform',endpoint:"/updateSalaryAdvance" },
    
    
      ];
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => {
        setShowForm(false);
        setShowEditForm(false);
      };
      const handleTimeForm =()=>{
        setShowForm(true)
      } 
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
    if(event?.name==="Approve" || event?.name==="Reject")
    {
      handleSalaryApprove(rowdata,event)
    }
    else if (event?.name==="Edit"){
        handleEditSalaryForm(rowdata)
    }
  
  }
const [showEditForm,setShowEditForm]= useState(false);
const [rowData,setRowData] = useState();
  const handleEditSalaryForm=(rowdata)=>{
    setRowData(rowdata)
    setShowEditForm(true);
  }
  const handleEditSalary=()=>{
   var payload = {
      "salaryAdvanceID":rowData?.SalaryAdvanceID,
      "requestAmount":parseInt(value)
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    // url:  `http://192.168.0.111:3002/erp/updateSalaryAdvance`,
    url: baseUrl + `/updateSalaryAdvance`,
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
    });
  
  }
const [value,setValue] = useState();
  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);
      
  return (
    <>
      {(showForm) && (
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
                Edit Your Requested Amount 
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
               <Button variant="contained" color="primary" onClick={handleEditSalary}>Apply</Button>
                <Button  sx={{ml:"5px"}} onClick={handleClose}>Cancel</Button>
              </Stack>
      </Dialog>
    )}
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
