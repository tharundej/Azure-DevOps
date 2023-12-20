import * as React from 'react';
import {Button,Dialog,DialogContent,TextField,Grid,Stack,Typography, MenuItem} from '@mui/material';
import { useState,useCallback,useMemo,forwardRef} from 'react';
import { BasicTable } from '../../Table/BasicTable';
import { baseUrl } from '../../global/BaseUrl';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ApplyLoan from './ApplyLoan';
import FormProvider from 'src/components/hook-form/form-provider';
import {useSnackbar} from '../../../components/snackbar';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import UserContext from '../../context/user/UserConext';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import ModalHeader from '../../global/modalheader/ModalHeader';
import { LoadingButton } from '@mui/lab';
export default function Loans({defaultPayload,componentPage}) {
  const {user} = useContext(UserContext);
  const [count,setCount] = useState(0)
  const {enqueueSnackbar} = useSnackbar()
      const TABLE_HEAD = [
        {
    
          id: "employeeID",
    
          label: "Employee Id",
          minWidth:"8pc",
          type: "text",
    
        },
    
        { id: "employeeName", label: "Employee Name", minWidth: "9pc", type: "text" },
    
        { id: "requestDate", label: "Request Date", minWidth: "8pc", type: "date" },
        { id: "requestType", label: "Request Type", minWidth: "9pc", type: "text" },
        { id: "requestAmount", label: "Request Amount", minWidth: "9pc", type: "text" },
        { id: "approvedDate", label: "Approved Date", minWidth: "9pc", type: "text" },
         { id: "paidAmount", label: "Approved Amount", minWidth: "10pc", type: "text" },
        { id: "noOfInstallments", label: "Installment Count", minWidth: "10pc", type: "text" },
        // { id: "interestRate", label: "Interest Rate", minWidth: "8pc", type: "text" },
        { id: "approverName", label: " Approver", minWidth: "8pc", type: "text" },
        { id: "paidDate", label: "Paid Date", minWidth: "8pc", type: "date" },
        { id: "comments", label: "User Remarks", minWidth: "8pc", type: "text" },
        { id: "approverComments", label: "HR Remarks", minWidth: "8pc", type: "text" },
        { id: "paymentStatus", label: "Payment Status", minWidth: '9pc', type: "text" },
        { id: "status", label: "Status", minWidth: '7pc', type: "badge" },
         
      ];
    
     
    
      const actualActions = [
    
        { name: "Approve",id:'approved',type:'serviceCall',endpoint:"/approveSalaryAdvance",icon:"charm:circle-tick"},
        { name: "Reject",id:'rejected',type:'serviceCall',endpoint:"/approveSalaryAdvance",icon:"charm:circle-cross"},
      ];

      const defaultActions=[
        { name: "Edit",id:'edit',type:'editform',endpoint:"/updateSalaryAdvance",icon:"solar:pen-bold" },
      ]
     
      // Function to get row actions based on user role
      const generateRowActions = () => {
        console.log(componentPage,"componentpagee")
        const userRoleID = user?.roleID; // Assuming roleID is available in user object
        const actions = (componentPage=="MyRequests")?defaultActions:actualActions
        console.log(actions,"actionsss")
        return actions;
      };
    
      const actionsBasedOnRoles = generateRowActions();
    
    
      const [showForm, setShowForm] = useState  (false);
      const [rowData,setRowData] = useState();
      const [showApproveForm,setApproveForm]= useState(false);
      const [showRejectForm,setRejectForm]= useState(false);
      const [commentsValue,setCommentsValue]=useState("");
      const handleClose = () => {
        setShowForm(false);
        setIsFormChanged(false);
        setAmountValue();
        setShowEditForm(false);
        setApproveForm(false);
        setRejectForm(false);
      }
      const handleTimeForm =()=>{
        setShowForm(true)
       
      } 
    
  const defaultPayloadValue=(defaultPayload)?defaultPayload:{
    "count": 5,
    "page": 0,
    "search": "",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":(user?.roleID)?user?.roleID:'',
    "records":"All Records",
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
      "key":1 ,
      "orderBy": "loan_id"
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
      // "noOfInstallments":rowData?.noOfInstallments,
      // "interestRate":rowData?.interestRate,
      "status":"rejected",
      "paymentStatus":rowData?.paymentStatus,
      "approverComments":commentsValue
    }
    apihit(payload);
  
  }

  const router = useRouter();


  const handleLoanDetails = useCallback(
    (ele) => {
console.log(ele,"elementtt")
      const secretPass = "XkhZG4fW2t2W";

      const encryptData = () => {
        const data = CryptoJS.AES.encrypt(
          JSON.stringify(ele?.loanID),
          secretPass
        ).toString();

       // setEncrptedData(data);
       console.log('called',data)
         router.push(paths.dashboard.monthlydeductions.userview(data));
       
      };
      //encryptData()
     router.push(paths.dashboard.monthlydeductions.userview(ele?.loanID));
      
      
    },
    [router]
    
  );
  
  const NewUserSchema = Yup.object().shape({
    loanID:Yup.number(),
    paidAmount:Yup.number().required('Please Enter Amount'),
    status:Yup.string(),
    employeeID:Yup.string(),
    approverComments:Yup.string().required('Please Enter Remarks'),
    paymentStatus:Yup.string()
  })
 
  const defaultValues = useMemo(

    () => ({ 
      
      employeeID:(user?.employeeID)?user?.employeeID:'',
      loanID:0,
      paidAmount:"",
      // noOfInstallments:"",
      // interestRate:"",
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
    console.log(obj,"dataa")
    const config = {
      method: 'POST',
      maxBodyLength:Infinity,
      // url:`https://xql1qfwp-3001.inc1.devtunnels.ms/erp/approveLoanDetails`,
      url: baseUrl + `/approveLoanDetails`,
      data: obj
    
    }
    axios.request(config).then((response) => {
      console.log(response,"responseeee")
      enqueueSnackbar(response.data.message,{variant:'success'})
     handleClose()
     reset()
     setCount(count+1)
    })
      .catch((error) => {
        console.log(error,"Errorrrr")
        enqueueSnackbar(error.message,{variant:'error'})
       handleClose()
      });
  }
  const onSubmit = handleSubmit(async (data)=>{
    data.loanID=rowData?.loanID
   
    console.log(data,"Dataa")
    try{
      apihit(data)
    }
    catch (error){
      console.error(error)
    }
  });


  const [amountValue,setAmountValue] = useState();
  const [installmentValue,setInstallmentValue] = useState()
  const [userCommentValue,setUserCommentValue] = useState()
  const [isFormChanged, setIsFormChanged] = useState(false);
  const handleChange = useCallback((event) => {
    if (!isFormChanged) {
      setIsFormChanged(true);
    }
    setAmountValue(event.target.value);
  }, []);
  const handleInstallmentValue = useCallback((event) => {
    if (!isFormChanged) {
      setIsFormChanged(true);
    }
    setInstallmentValue(event.target.value);
    
  }, []);
  const handleCommentValue =useCallback((event)=>{
    if (!isFormChanged) {
      setIsFormChanged(true);
    }
      setUserCommentValue(event.target.value)
  },[])
  const [showEditForm,setShowEditForm]= useState(false);
  const handleEditLoanForm=(rowdata)=>{
    setRowData(rowdata)
    setShowEditForm(true);
  }
  const handleEditLoan=()=>{
   var payload = {
      "loanID":rowData?.loanID,
      "requestAmount":amountValue?parseInt(amountValue):rowData?.requestAmount,
      "noOfInstallments":installmentValue?parseInt(installmentValue):rowData?.noOfInstallments,
     "comments":userCommentValue
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url: baseUrl + `/updateLoanDetails`,
    // url:`https://xql1qfwp-3001.inc1.devtunnels.ms/erp/updateLoanDetails`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    enqueueSnackbar(response.data.message,{variant:'success'})
    setCount(count+1)
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
  <Grid container flexDirection="row" spacing={1}>
      <Grid item xs={12} md={6} sx={{marginTop:2}}>
      <TextField
                
                fullWidth
                defaultValue={rowData?.requestAmount}
                value={amountValue}
                onChange={handleChange}
                label="Amount"
              />
      </Grid>
      <Grid item xs={12} md={6} sx={{marginTop:2}}>
      <TextField
                
                fullWidth
                defaultValue={rowData?.noOfInstallments}
                value={installmentValue}
                onChange={handleInstallmentValue}
                label="Installments"
              />
      </Grid>
     </Grid>
     <Grid xs={12} md={6} sx={{marginTop:2}}>
      <TextField
      fullWidth
      label="User Remarks"
      onChange={handleCommentValue}/>
     </Grid>
  </DialogContent>
  <Stack alignItems="flex-end" sx={{ mb:2,display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
             
                <Button  sx={{marginRight:2}} onClick={handleClose} variant="outlined">Cancel</Button>
                <Button sx={{right:5}} variant="contained" color="primary" disabled={!isFormChanged} onClick={handleEditLoan}>Apply</Button>
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
{/* <RHFTextField name="noOfInstallments" label="No of Installments"/> */}
<RHFTextField name="paidAmount" label="Paid Amount"/>
</Grid>
<Grid item xs={12} md={6}>
<RHFTextField name="approverComments" label="Remarks"/>
</Grid>
  </Grid>

{/* <Grid container flexDirection="row" spacing={1}>
<Grid item sx={{marginTop:2}} xs={12} md={6}>
<RHFTextField name="interestRate" label="Interest Rate" />
</Grid>
<Grid item sx={{marginTop:2}} xs={12} md={6}>

<RHFTextField name="approverComments" label="Comments"/>
</Grid>
</Grid> */}
{(user?.roleID>3)?<Grid container flexDirection="row" sx={{marginTop:2}} xs={12} md={12}>

<RHFSelect name="paymentStatus" label="Payment Status">
  <MenuItem value="credited">Credited</MenuItem>
  <MenuItem value="denied">Denied</MenuItem>
</RHFSelect>
</Grid>:null}
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
label="Remarks"
placeholder='Remarks'
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
defaultPayload={defaultPayloadValue}
endpoint='/getLoanDetailsHr'
bodyData='data'
filterName="LoanSearchFilter"
rowActions={actionsBasedOnRoles}
onClickActions={onClickActions}
componentPage={componentPage}
count={count}
handleEditRowParent={handleLoanDetails}
/>  
    </>
  );
}