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


export default function CompoffApprove({ currentUser ,}) {
  const {enqueueSnackbar} = useSnackbar()
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
      { type: 'datePicker', label: ' Start Date', name: 'start_date',category:"claim",  },
      { type: 'datePicker', label: ' End Date', name: 'end_date',category:"claim",  },
      // { type: 'Select', label: 'Claim Type ', category:"ClaimType",name:"claim_type", options: ['Hotel', 'Medical', 'Travel'] },
      { type: 'Select', label: 'Status',name: 'status', category:"status", options: ['Approve', 'Reject', 'Pending'] },
      // { type: 'multiSelect', label: 'multiSelect Options', options: ['O 1', 'Opti 2', 'ption 3'] },
    ],
  }


  const TABLE_HEAD = [
    {
      id: "employeename",
      label: " Employee Name",
      width: 180,
      type: "text",
      containesAvatar: false,

      secondaryText: "email",
    },
    { id: "compensantory_policies", label: "Compensantory Policies", width: 180, type: "text" },
    { id: "start_date", label: "Start Date", width: 220, type: "text" },
    { id: "end_date", label: "End Date", width: 180, type: "text" },
    { id: "status", label: "Status", width: 100, type: "badge" },
    { id: "expire_date", label: "Expire Date", width: 180, type: "text" },
    { id: "approver_name", label: "Approver Name", width: 180, type: "text" },
    // { id: '', width: 88 },
  ]
  const managerID =localStorage.getItem('reportingManagerID');
  const employeeID =localStorage.getItem('employeeID');
  const companyID =localStorage.getItem('companyID');

  const defaultPayload={

  
    "employee_id":"",
    "company_id":companyID,
    "page":0,
    "search":"",
    "count":5,
    "externalFilters":{
      "start_date":"",
      "end_date":"",
      "status":"",
      "compensantory_policies":"",
      "utilisation":""
    },
    "sort":{
      "key":1,
      "orderBy":""
    }
   
}
  


const externalFilter = {
    
  "start_date":"",
  "end_date":"",
  "status":"",
  "compensantory_policies":"",
  "utilisation":""
}

  const actions = [
    { name: "Approve", icon: "hh", path: "jjj",  type:"status"},
    { name: "Reject", icon: "hh", path: "jjj" ,type:"status" },
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
  

  // useEffect=(()=>{
  //   onclickActions()
  // },[approve])

  const [approve, setApprove]= React.useState({

    compensatoryRequestId:"",
        status: "",
        utilisation: "",
        companyId:companyID,
        employeeId:employeeID,
        managerId:managerID,

  })


  // useEffect(()=>{
  //   handle(approve);
  // },[approve])

  // console.log(approve,"approve data11111111")
  const onclickActions = (rowData,eventData) => {
    console.log(rowData,eventData, "CompoffAprrove from to basic table")
    if (rowData && eventData) {
      if (eventData?.type === 'status') {
        // handle(approve);
           if (eventData?.name === 'Approve'){
          //   setApprove(prevState => ({
          //     ...prevState,
          //     status: "Approve",
          //     utilisation:`${rowData?.utilisation}`,
          //     compensatoryRequestId: `${rowData?.compensantory_request_id}`,

          // }));
          // handle(approve);

          handle({...approve, ...{status: "Approve",
               utilisation:`${rowData?.utilisation}`,
              compensatoryRequestId: `${rowData?.compensantory_request_id}`,
        }});
         

           }
          
        
       else{
      //   setApprove(prevState => ({
      //     ...prevState,
      //     status: "Reject",
      //     utilisation:`${rowData?.utilisation}`,
      //     compensatoryRequestId: `${rowData?.compensantory_request_id}`,
      // }));
      
      handle({...approve, ...{status: "Reject",
      utilisation:`${rowData?.utilisation}`,
     compensatoryRequestId: `${rowData?.compensantory_request_id}`,
}});
      
      // handle(approve);
    }
    }
    
  }
    
    else {
          // navigate[event.eventData.route]

      }
    }
   
   
  
console.log(approve,"outside approve")

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
      type_oc_claim: currentUser?.type_oc_claim|| '',
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
          enqueueSnackbar(response?.data?.message,{variant:'success'})
          console.log('success', successData);
        },
        (error) => {
          console.log('lllll', error);
          enqueueSnackbar(response?.data?.message,{variant:'error'})
        }
      );

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      enqueueSnackbar(response?.data?.message,{variant:'error'})
      console.error(error);
    }
  });


  const  handle =(async (approve) => {
    
    console.log(approve,"approve defaultValues111")
   

    try {
     
      // console.log(data, 'formdata api in check');

      const response = await axios.post(baseUrl+'/UpdateMycompoffdetails', approve).then(
        (response) => {
          console.log('sucess', response);
          // enqueueSnackbar(response?.data?.message,{variant:'success'})
        },
        (error) => {
          console.log('lllll', error);
          enqueueSnackbar(response?.data?.message,{variant:'error'})
        }
      );

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      // enqueueSnackbar(response?.data?.message,{variant:'error'})
      // alert("api hit not done")
      console.error(error);
    }
  });

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
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {/* methods={methods} onSubmit={onSubmit} */}
          <DialogTitle>Apply All Claims</DialogTitle>

          <DialogContent>
            {/* <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert> */}


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
              {/* <RHFSelect name="status" label="Status">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect> */}

              {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}
              <RHFAutocomplete
                name="type_oc_claim"
                label="Type Of Claim"
                options={claim_type.map((claimtype) => claimtype.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                // renderOption={(props, option) => {
                //   const { code, label, phone } = countries.filter(
                //     (country) => country.label === option
                //   )[0];

                //   if (!label) {
                //     return null;
                //   }

                //   return (
                //     <li {...props} key={label}>
                //       <Iconify
                //         key={label}
                //         icon={`circle-flags:${code.toLowerCase()}`}
                //         width={28}
                //         sx={{ mr: 1 }}
                //       />
                //       {label} ({code}) +{phone}
                //     </li>
                //   );
                // }}
              />
              {/* <RHFAutocomplete
                name="country"
                label=" Currency for Reimbursement"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              /> */}


              <RHFTextField name="amount" label="Claim Amount" />
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="To"
                    // value={item?.to}
                    onChange={(newValue) => {
                     // handleChangeDate(newValue, 'to');
                    }}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
              <RHFTextField name="comment" label="comments" />
              {/* <RHFTextField name="phoneNumber" label=" Attachment" /> */}
              <Grid sx={{ alignSelf: "flex-end" }}>

                <Controller
                  name="file"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="file"
                      accept=".doc, .pdf"
                    />
                  )}
                />
              </Grid>
              <TextField
                fullWidth
                variant="outlined"
                InputLabelProps={{ htmlFor: 'contained-button-file' }}
                label="Upload Document"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <input
                        accept=".doc,.pdf"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                      />
                      <label htmlFor="contained-button-file">
                        {/* <CloudUploadIcon /> */}
                        <CloudUploadIcon />
                      </label>
                    </InputAdornment>
                  ),
                }}
              />




            </Box>


          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
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
      />
    </>
  );
}
