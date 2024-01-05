import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
// sections
import { BasicTable } from "src/nextzen/Table/BasicTable";
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { baseUrl } from '../../global/BaseUrl';

import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// ----------------------------------------------------------------------
import { _userList } from "src/_mock";
import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { SurendraBasicTable } from "src/nextzen/Table/SurendraBasicTable";
import ModalHeader from '../../global/modalheader/ModalHeader';

export default function MyCompoff({ currentUser ,}) {
  const {enqueueSnackbar} = useSnackbar()
  const [count,setCount] = useState(0)
  const claim_type = [
    { code: '', label: '', phone: '' },
    { code: 'AD', label: 'Travel', phone: '376' },
    { code: 'AD', label: 'Medical', phone: '376' },
    { code: 'AD', label: 'Hotel', phone: '376' },

  ]

  const dialogConfig={
    title: 'Compoff Approve',
    fields: [

      // { type: 'datePicker', label: 'Expense Start Date', name: 'expensestartdate',category:"expense", value: new Date() },
      // { type: 'datePicker', label: 'Expense End Date', name: 'expenseenddate',category:"expense", value: new Date() },
      { type: 'datePicker', label: ' Start Date', name: 'startDate',category:"claim",  },
      { type: 'datePicker', label: ' End Date', name: 'endDate',category:"claim",  },
      // { type: 'Select', label: 'Claim Type ', category:"ClaimType",name:"claim_type", options: ['Hotel', 'Medical', 'Travel'] },
      { type: 'Select', label: 'Status',name: 'status', category:"status", options: ['Approved', 'Rejected', 'Pending'] },
      // { type: 'multiSelect', label: 'multiSelect Options', options: ['O 1', 'Opti 2', 'ption 3'] },
    ],
  }


  const TABLE_HEAD = [
     { id: "employeeId", label: "Employee ID", minWidth: "7pc", type: "text" },
    {
      id: "employeeName",
      label: " Employee Name",
      minWidth: "7pc",
      type: "text",
      containesAvatar: false,

      secondaryText: "email",
    },
      // { id: "projectName", label: "Project Name", width: 180, type: "text" },
      // { id: "compensantoryRequestId", label: "Compensantory ID", minWidth: "7pc", type: "text" },
    { id: "compensantoryPolicies", label: "Compensantory Policies", minWidth: "7pc", type: "text" },
    { id: "startDate", label: "Start Date", minWidth: "7pc", type: "date" },
    { id: "endDate", label: "End Date", minWidth: "7pc", type: "date" },
    { id: "requestDate", label: "Requested Date", minWidth: "7pc", type: "date" },
    { id: "numberOfDays", label: "Total Days", minWidth: "7pc", type: "text" },
    { id: "expireDate", label: "Expire Date", minWidth: "7pc", type: "date" },
    { id: "userComment", label: "Employee Comments ", minWidth: "7pc", type: "text" },
    // { id: "amount", label: "Approved Amount", minWidth: "7pc", type: "text" },
    { id: "approverComment", label: "Approver Comments", minWidth: "7pc", type: "text" },
    { id: "approvedDate", label: "Approved Date", minWidth: "7pc", type: "date" },
    { id: "approverName", label: "Approver Name", minWidth: "7pc", type: "text" },
    { id: "status", label: "Status", minWidth: "7pc", type: "badge" },
    // { id: '', width: 88 },
  ]
  const managerID =localStorage.getItem('reportingManagerID');
  const employeeID =localStorage.getItem('employeeID');
  const companyID =localStorage.getItem('companyID');
 

  const defaultPayload={

  
    "employeeid":employeeID,
    "companyId":companyID,
    // "ApprovalManagerId":employeeID,
    "page":0,
    "search":"",
    "count":5,
    "externalFilters":{
      "startDate":"",
      "enddate":"",
      "status":"",
      "compensantoryPolicies":"",
      "utilisation":""
    },
    "sort":{
      "key":1,
      "orderBy":""
    }
   
}
  


const externalFilter = {
    
  "startDate":"",
  "endDate":"",
  "status":"",
  "compensantoryPolicies":"",
  "utilisation":""
}

  const actions = [
    // { name: "Approve", icon: "charm:circle-tick", path: "jjj",  type:"status"},
    // { name: "Reject", icon: "charm:circle-cross", path: "jjj" ,type:"status" },
    // { name: "eerr", icon: "hh", path: "jjj" },
  ];
  const bodyContent = [
    {
      name: "Malli",
      email: "Malli@infobellIt.com",
      phoneNumber: "9879876789",
      company: "Infobell",
      role: "UI Developer",
      status: "active",
    },
  ];
  

 

  const [approve, setApprove]= React.useState({

    compensatoryRequestId:null,
        status: "",
        utilisation: null,
        companyId:companyID,
        employeeId:"",
        managerId:employeeID,
        comment:""

  })


  

  // console.log(approve,"approve data11111111")
  const onclickActions = (rowData,eventData) => {
    console.log(rowData,eventData, "CompoffAprrove from to basic table")
    if (rowData && eventData) {
      if (eventData?.type === 'status') {
        // handle(approve);
           if (eventData?.name === 'Approve'){
            setApprove(prevState => ({
              ...prevState,
              status: "Approved",
              employeeId:rowData?.employeeId,
              utilisation:rowData?.utilisation,
              compensatoryRequestId: rowData?.compensantoryRequestId,
              compensantoryPolicies: rowData?.compensantoryPolicies,

          }));
          // handle(approve);
          handleOpen()

        //   handle({...approve, ...{status: "Approved",
        //        utilisation:rowData?.utilisation,
        //       compensatoryRequestId: rowData?.compensantory_request_id,
        // }});
         

           }
          
        
       else{
        setApprove(prevState => ({
          ...prevState,
          status: "Rejected",
          employeeId:rowData?.employeeId,
          utilisation:rowData?.utilisation,
          compensatoryRequestId: rowData?.compensantoryRequestId,
          compensantoryPolicies: rowData?.compensantoryPolicies,
      }));
      
//       handle({...approve, ...{status: "Rejected",
//       utilisation:rowData?.utilisation,
//      compensatoryRequestId: rowData?.compensantoryRequestId,
// }});
      
      // handle(approve);
      handleOpen()
    }
    }
    
  }
    
    else {
          // navigate[event.eventData.route]

      }
    }
   
   
  
// console.log(approve,"outside approve")

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);


  // modal 
  
  const NewUserSchema = Yup.object().shape({
    claim_amount: Yup.string().required('Claim Amount is Required'),
    comments: Yup.string(),




  });

  const defaultValues = useMemo(
    () => ({
      amount: currentUser?.amount || null ,
      comment: currentUser?.comment || '',
      // type_oc_claim: currentUser?.type_oc_claim|| '',
      // currency:currentUser?.currency|| '',

      // company_id:currentUser?.company_id|| '',
      // employee_id:currentUser?.employee_id|| '',
      // expense_config_id:currentUser?.expense_config_id|| '',

    }),
    [currentUser]
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
console.log(defaultValues,"defaultValues")
  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');
    console.log(data,"defaultValues111")

    try {
      // data.company_id = '0001';
      // data.company_name = 'infbell';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
      // data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
      // data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

      console.log(data, 'data111ugsghghh');

      const response = await axios.post(baseUrl+'/q', data).then(
        (successData) => {
          // enqueueSnackbar(response?.data?.message,{variant:'success'})
          console.log('success', successData);
        },
        (error) => {
          console.log('lllll', error);
          // enqueueSnackbar(response?.data?.message,{variant:'error'})
        }
      );

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      // enqueueSnackbar(response?.data?.message,{variant:'error'})
      console.error(error);
    }
  });

  console.log(approve,"approve defaultValues111")
  const  handle =(async (approve,event) => {
    
   
   

    try {
      event.preventDefault();
      // console.log(data, 'formdata api in check');

      const response = await axios.post(baseUrl+'/UpdateMycompoffdetails', approve).then(
        (res) => {
          console.log('sucess', res);
          enqueueSnackbar(res?.data?.message,{variant:'success'})
          setCount(count+1)
          handleClose()
        },
        (error) => {
          console.log('lllll', error);
          enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
          handleClose()
        }
      );

      
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
      // alert("api hit not done")
      console.error(error);
      handleClose()
    }
  });
console.log(approve?.compensantoryPolicies,"approve?.compensantoryPolicies")
  return (
    <>
      <Helmet>
        <title> Dashboard: compoffapprove</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        // onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
         <ModalHeader heading={`${(approve?.status==="Approved")? "Approve":"Reject"}  Compoff`} />
        <FormProvider methods={methods} onSubmit={(event) => handle(approve, event)}>
          {/* methods={methods} onSubmit={onSubmit} */}
          {/* <DialogTitle>Update Compoff</DialogTitle> */}

          <DialogContent>
    
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
             
             
             <TextField  label="Compensantory Policies" value={approve?.compensantoryPolicies || ''}  InputProps={{
    readOnly: true,
  }} />

              <TextField name="comment" label="Comment" 
               value={approve.comment}
               onChange={(e) => setApprove((prevState) => ({ ...prevState, comment: e.target.value }))}/>
             




            </Box>


          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>


      <SurendraBasicTable
        endpoint="/GetMycompoffdetails"
        defaultPayload={defaultPayload}
        headerData={TABLE_HEAD}
        rowActions={actions}
        bodyData = 'data'

        // button="Apply Compoff"
        buttonFunction={handleOpen}
        filterContent={dialogConfig}
        dialogPayload={externalFilter}
           filterName="claimSearchFilter"
        // filterName="claimSearchFilter"
         onclickActions={onclickActions}
         count={count}
      />
    </>
  );
}
