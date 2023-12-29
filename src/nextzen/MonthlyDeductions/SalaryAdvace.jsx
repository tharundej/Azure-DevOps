import * as React from 'react';
import {TextField,MenuItem,Grid,Typography, DialogContent,Dialog,Button,Stack}from '@mui/material';
import { _userList } from 'src/_mock';
import { useState , useCallback,useMemo,forwardRef} from 'react';
import { BasicTable } from '../Table/BasicTable';
import SalaryAdvanceForm from './SalaryAdvaceForm';
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useSnackbar} from '../../components/snackbar';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useForm, Controller } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useContext } from 'react';
import UserContext from '../context/user/UserConext';
import ModalHeader from '../global/modalheader/ModalHeader';
export default function SalaryAdvace({defaultPayload,componentPage}) {
  const {user} = useContext(UserContext)
  const [count,setCount] = useState(0)
    const {enqueueSnackbar} = useSnackbar()
      const TABLE_HEAD = [
        {
    
          id: "employeeId",
    
          label: "Employee Id",
          minWidth:"8pc",
    
          type: "text",
    
         
        },
    
        { id: "employeeName", label: "Employee Name", minWidth: "9pc", type: "text" },
    
        { id: "requestDate", label: "Request Date", minWidth: "8pc", type: "date" },
    
        { id: "requestAmount", label: "Request Amount", minWidth: "9pc", type: "text" },
    
        { id: "paidDate", label: "Approved Date", minWidth: "9pc", type: "date" },
        { id: "paidAmount", label: "Approved Amount", minWidth: "10pc", type: "text" },
        { id: "approverName", label: "Approver", minWidth: "7pc", type: "text" },
        { id: "comments", label: "User Remarks", minWidth: "8pc", type: "text" },
        { id: "hrComments", label: "HR Remarks", minWidth: "8pc", type: "text" },
        { id: "paymentStatus", label: "Payment Status", minWidth: "9pc", type: "text" },
        { id: "status", label: "Status", minWidth: "7pc",type: "badge"},
        // { id: '', width: 88 },
    
      ];
    
     
    
      const actualActions = [
    
        { name: "Approve",id:'approved',type:'serviceCall',endpoint:"/approveSalaryAdvance",icon:"charm:circle-tick"},
        { name: "Reject",id:'rejected',type:'serviceCall',endpoint:"/approveSalaryAdvance",icon:"charm:circle-cross"},
    
      ];

      const defaultActions=[
        { name: "Edit",id:'edit',type:'editform',endpoint:"/updateSalaryAdvance",icon:"solar:pen-bold" },
      ]
     
      const generateRowActions = () => {
        const userRoleID = user?.roleID; 
        const actions = (componentPage==="MyRequests")?defaultActions:actualActions
        return actions;
      };
    
      const actionsBasedOnRoles = generateRowActions();
      

      const [showForm, setShowForm] = useState  (false);
      const [showApproveForm,setApproveForm]= useState(false);
      const [showRejectForm,setRejectForm]= useState(false);
      const [showEditForm,setShowEditForm]= useState(false);
      const [commentsValue,setCommentsValue]=useState("");
      const [rowData,setRowData] = useState();
      const handleClose = () => {
        setShowForm(false);
        setAmountValue();
        setShowEditForm(false);
        setApproveForm(false);
        setRejectForm(false);
      };
      const handleTimeForm =()=>{
        setShowForm(true)
      } 
  const defaultPayloadValue=(defaultPayload)?defaultPayload:
  {
    "count": 10,
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
      "paidAmount":""
    },
    "sort": {
      "key": 1,
      "orderBy": "saId"
    }
  }
  const onClickActions=(rowdata,event)=>{
   
    if(event?.name==="Approve")
    {
      setRowData(rowdata)
      setApproveForm(true)
    }
    else if(event?.name==="Reject"){
      setRowData(rowdata)
      setRejectForm(true)
    }
    else if (event?.name==="Edit"){
      setRowData(rowdata)
      setShowEditForm(true);
    }
  
  }

  const handleComments= (e)=>{
    setCommentsValue(e.target.value);
  }

  const NewUserSchema = Yup.object().shape({
    paymentStatus:Yup.string(),
    saId:Yup.number(),
    paidAmount:Yup.number(),
    hrComments:Yup.string(),
    status:Yup.string(),
    employeeId:Yup.string()
  })
 
  const defaultValues = useMemo(

    () => ({ 
      
    paymentStatus:"",
    saId:0,
    paidAmount:"",
    hrComments:"",
    status:"approved",
    employeeId:(user?.employeeID)?user?.employeeID:'',
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
      url: baseUrl + `/approveSalaryAdvance`,
      data: obj
    
    }

    axios.request(config).then((response) => {
      enqueueSnackbar(response.data.message,{variant:'success'})
      setCount(count+1)
      handleClose();
    })
      .catch((error) => {
        enqueueSnackbar(error.message,{variant:'Error'})
        handleClose();
      });
  }
  const onSubmit = handleSubmit(async (data)=>{
    data.saId=rowData?.saId

    try{
      apihit(data)
    }
    catch (error){
      console.error(error)
    }
  });


  const handleEditSalary=()=>{
   var payload = {
      "saId":rowData?.saId,
      "requestAmount":parseInt(amountValue)
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url: baseUrl + `/updateSalaryAdvance`,
    data: payload
  
  }
  axios.request(config).then((response) => {
      handleClose()
    enqueueSnackbar(response.data.message,{variant:'success'})
    setCount(count+1)
  
  })
    .catch((error) => {
      enqueueSnackbar(error.message,{variant:'Error'})
      handleClose()
    });
  
  }
   
  const handleSalaryReject=()=>{
    var payload =
    {
      "employeeId":(user?.employeeID)?user?.employeeID:'',
      "saId":rowData?.saId,
      "paidAmount":rowData?.paidAmount,
      "hrComments":commentsValue,
      "status":"rejected",
      "paymentStatus":rowData?.paymentStatus
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url: baseUrl + `/approveSalaryAdvance`,
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
const [amountValue,setAmountValue] = useState();
  const handleChange = useCallback((event) => {
    setAmountValue(event.target.value);
  }, []);
      
  return (
    <>
   
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
    <ModalHeader heading="Edit Request"/>
  <DialogContent>
  <Grid container spacing={2}>
    
      <Grid  xs={12} md={12} sx={{marginLeft:5,marginTop:2}}>
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
  <Button  sx={{mr:"4px"}} onClick={handleClose} variant="outlined">Cancel</Button>
               <Button variant="contained" sx={{marginRight:2}} color="primary" disabled={amountValue===undefined || 0} onClick={handleEditSalary}>Apply</Button>
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
<Grid container flexDirection="row" spacing={2}>
<Grid item md={6} xs={12}>
<RHFTextField name="paidAmount" label="Paid Amount"/>
</Grid>

<Grid item xs={12} md={6}>

<RHFTextField name="hrComments" label="Comments"/>

</Grid>
</Grid>
{(user?.roleID>3)?<Grid sx={{marginTop:2}}>
  <RHFSelect name="paymentStatus" label="Payment Status">
  <MenuItem value="credited">Credited</MenuItem>
  <MenuItem value="denied">Denied</MenuItem>
</RHFSelect>
</Grid>:null}
<Grid>

  </Grid>
<Button variant="contained" color="primary" sx={{float:"right",right:5,marginTop:2,color:"white"}} type="submit">Approve Request</Button>
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
<div style={{display:"flex",justifyContent:"right",marginBottom:4}}>
<Button  onClick={()=>setRejectForm(false)} sx={{marginRight:2}} variant="outlined">Cancel</Button>
<Button variant="contained" color="primary" sx={{float:'right',right:5}}  onClick={handleSalaryReject}>Reject</Button>
</div>
</Dialog>
      )
    }
    <BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayloadValue}
endpoint='/searchSalaryAdvance'
filterName='SalaryFilter'
rowActions={actionsBasedOnRoles}
bodyData="data"
componentPage={componentPage}
onClickActions={onClickActions}
count={count}
/>  
    </>
  );
}