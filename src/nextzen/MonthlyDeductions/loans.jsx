import * as React from 'react';
import {Button,Dialog,DialogContent,TextField,Grid,Stack,Typography, MenuItem} from '@mui/material';
import { useState,useCallback,useMemo,forwardRef} from 'react';
import { BasicTable } from '../Table/BasicTable';
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ApplyLoan from './ApplyLoan';
import FormProvider from 'src/components/hook-form/form-provider';
import {useSnackbar} from '../../components/snackbar';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import UserContext from '../context/user/UserConext';
import ModalHeader from '../global/modalheader/ModalHeader';
export default function Loans() {
  const {user} = useContext(UserContext);
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
    
        { id: "requestAmount", label: "Request Amount", minWidth: "7pc", type: "text" },
    
        { id: "paidDate", label: "Paid Date", minWidth: "8pc", type: "text" },
        { id: "paidAmount", label: "paid Amount", minWidth: "7pc", type: "text" },
        { id: "noOfInstallments", label: "No of Installments", minWidth: "7pc", type: "text" },
        { id: "interestRate", label: "Interest Rate", minWidth: "7pc", type: "text" },
        { id: "approverName", label: " Approver Name", minWidth: "10pc", type: "text" },
        { id: "comments", label: "User Comments", minWidth: "10pc", type: "text" },
        { id: "approverComments", label: "Approver Comments", minWidth: "10pc", type: "text" },
        { id: "paymentStatus", label: "Payment Status", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100, type: "badge" },
         
      ];
    
     
    
      const actions = [
    
        { name: "Approve",id:'approved',type:'serviceCall',endpoint:"/approveLoanDetails",icon:"charm:circle-tick"},
        { name: "Reject",id:'rejected',type:'serviceCall',endpoint:"/approveLoanDetails",icon:"charm:circle-cross"},
    
        { name: "Edit",id:'edit',type:'editform',endpoint:"/updateLoanDetails",icon:"solar:pen-bold" },
    
    
      ];
    
    
      const [showForm, setShowForm] = useState  (false);
      const [rowData,setRowData] = useState();
      const [showApproveForm,setApproveForm]= useState(false);
      const [showRejectForm,setRejectForm]= useState(false);
      const [commentsValue,setCommentsValue]=useState("");
      const handleClose = () => {
        setShowForm(false);
        setAmountValue();
        setShowEditForm(false);
        setApproveForm(false);
        setRejectForm(false);
      }
      const handleTimeForm =()=>{
        setShowForm(true)
       
      } 
    
  const defaultPayload={
    "count": 5,
    "page": 0,
    "search": "",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":(user?.roleID)?user?.roleID:'',
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
    if(event?.name==="Approve" )
    {
      setRowData(rowdata);
      setApproveForm(true);
    }
    else if (event?.name ==="Reject"){
    setRowData(rowdata);
    setRejectForm(true);
    }
    else if (event?.name==="Edit"){
        handleEditLoanForm(rowdata)
    }
  
  }    
  const handleComments= (e)=>{
    setCommentsValue(e.target.value);
  }

  const handleLoanReject=()=>{
    var payload =
    {
      "employeeID":(user?.employeeID)?user?.employeeID:'',
      "loanID": rowData?.loanID,
      "paidAmount":rowData?.paidAmount,
      "noOfInstallments":rowData?.noOfInstallments,
      "interestRate":rowData?.interestRate,
      "status":"rejected",
      "paymentStatus":rowData?.paymentStatus,
      "approverComments":commentsValue
    }
    apihit(payload);
  
  }


  
  const NewUserSchema = Yup.object().shape({
    noOfInstallments:Yup.number(),
    loanID:Yup.number(),
    paidAmount:Yup.number(),
    interestRate:Yup.number(),
    status:Yup.string(),
    employeeID:Yup.string(),
    approverComments:Yup.string(),
    paymentStatus:Yup.string()
  })
 
  const defaultValues = useMemo(

    () => ({ 
      
      employeeID:(user?.employeeID)?user?.employeeID:'',
      loanID:0,
      paidAmount:"",
      noOfInstallments:"",
      interestRate:"",
      status:"approved",
      approverComments:"",
      paymentStatus:""
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const apihit=(obj)=>{
    const config = {
      method: 'POST',
      maxBodyLength:Infinity,
      url: baseUrl + `/approveLoanDetails`,
      data: obj
    
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
  const onSubmit = handleSubmit(async (data)=>{
    data.loanID=rowData?.loanID
    try{
      apihit(data)
    }
    catch (error){
      console.error(error)
    }
  });


  const [amountValue,setAmountValue] = useState();
  const handleChange = useCallback((event) => {
    setAmountValue(event.target.value);
  }, []);
      
  const [showEditForm,setShowEditForm]= useState(false);
  const handleEditLoanForm=(rowdata)=>{
    setRowData(rowdata)
    setShowEditForm(true);
  }
  const handleEditLoan=()=>{
   var payload = {
      "loanID":rowData?.loanID,
      "requestAmount":parseInt(amountValue)
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
<ModalHeader heading="Edit Loan Request"/>
  <DialogContent>
  <Grid container spacing={2}>
      <Grid  xs={12} md={12} sx={{marginLeft:3,marginTop:2}}>
      <TextField
                
                fullWidth
                defaultValue={rowData?.requestAmount}
                value={amountValue}
                onChange={handleChange}
                label="Amount"
              />
      </Grid>
     </Grid>
  </DialogContent>
  <Stack alignItems="flex-end" sx={{ mb:2,display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
             
                <Button  sx={{marginRight:2}} onClick={handleClose} variant="outlined">Cancel</Button>
                <Button sx={{right:5}} variant="contained" color="primary" disabled={amountValue===undefined || 0} onClick={handleEditLoan}>Apply</Button>
              </Stack>
      </Dialog>
    )}

{(showApproveForm) && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showApproveForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 500 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
<FormProvider methods={methods} onSubmit={onSubmit}>
   <ModalHeader heading="Approve Request"/>
<DialogContent>
<Grid container>
  <Grid container flexDirection="row" spacing={1}>
  <Grid item xs={12} md={6}>
<RHFTextField name="noOfInstallments" label="No of Installments"/>
</Grid>
<Grid item xs={12} md={6}>
<RHFTextField name="paidAmount" label="Paid Amount"/>
</Grid>
  </Grid>

<Grid container flexDirection="row" spacing={1}>
<Grid item sx={{marginTop:2}} xs={12} md={6}>
<RHFTextField name="interestRate" label="Interest Rate" />
</Grid>
<Grid item sx={{marginTop:2}} xs={12} md={6}>
<RHFSelect name="paymentStatus" label="Payment Status">
  <MenuItem value="credited">Credited</MenuItem>
  <MenuItem value="debited">Debited</MenuItem>
</RHFSelect>

</Grid>
</Grid>
<Grid container flexDirection="row" sx={{marginTop:2}} xs={12} md={12}>
<RHFTextField name="approverComments" label="Comments"/>

</Grid>
</Grid>

<Button variant="contained" color="primary" sx={{float:"right",marginTop:2,color:"white"}} type="submit">Approve Loan</Button>
<Button sx={{float:"right",right:10,marginTop:2}} variant="outlined" onClick={()=>setApproveForm(false)}>Cancel</Button>

</DialogContent>
</FormProvider>
      </Dialog>
    )}

{(showRejectForm) && (
<Dialog
fullWidth
maxWidth={false}
open={showRejectForm}
onClose={handleClose}
PaperProps={{
  sx: { maxWidth: 500 , overflow:'hidden'},
}}
className="custom-dialog">
    <ModalHeader heading="Reject Request"/>
<TextField 
label="comments"
placeholder='comments'
onChange={(e)=>handleComments(e)}
sx={{margin:2}}
/>
<div style={{display:"flex",justifyContent:"right",marginBottom:2}}>
<Button variant="outlined" onClick={()=>setRejectForm(false)} sx={{marginRight:2}}>Cancel</Button>
<Button variant="contained" color="primary" sx={{float:'right',right:5}}  onClick={handleLoanReject}>Reject</Button>

</div>
</Dialog>
      )
    }
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