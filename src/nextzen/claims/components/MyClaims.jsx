import React, { useState, useMemo } from 'react';

import { Helmet } from "react-helmet-async";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// sections
import { BasicTable } from "src/nextzen/Table/BasicTable";
import { SurendraBasicTable } from 'src/nextzen/Table/SurendraBasicTable';
import Button from '@mui/material/Button';
// ----------------------------------------------------------------------

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { _userList } from "src/_mock";
import { paths } from 'src/routes/paths';
import Grid from '@mui/material/Grid';
import { useRouter } from 'src/routes/hooks';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import Search from "src/nextzen/search/search";
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
// _mock
import { USER_STATUS_OPTIONS } from 'src/_mock';
// assets
import { countries } from 'src/assets/data';

import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import formatDateToYYYYMMDD from '../../global/GetDateFormat';






export default function MyClaims({ currentUser ,}) {

  const claim_type = [
    { code: '', label: '', phone: '' },
    { code: 'AD', label: 'Travel', phone: '376' },
    { code: 'AD', label: 'Medical', phone: '376' },
    { code: 'AD', label: 'Hotel', phone: '376' },

  ]

  // const defaultPayload = {
  //   "count":5,
  //   "page":0
  // }
  // const TABLE_HEAD = [
  //   {
  //     // id: "name",
  //     id: "employee_name",
  //     label: " Employee Name",
      
  //     type: "text",
  //     containesAvatar: false,

  //     secondaryText: "email",
  //   },
  //   { id: "claim_type", label: "Claim Type",  type: "text" },
  //   { id: "claim_date", label: "Claim Date",  type: "text" },
  //   { id: "claim_amount", label: "Claim Amount",  type: "text" },
  //   { id: "expense_date", label: "Expense Date",  type: "text" },
  //   { id: "approve_amount", label: "Approval Amount",  type: "text" },
  //   { id: "approver_name", label: "Approver Name",  type: "text" },
  //   { id: "status", label: "Status",  type: "badge" },
  //   // { id: "leave_type", label: "Comments", width: 100, type: "badge" },
  //   // { id: "leave_type", label: "Status", width: 100, type: "badge" },
  //   // { id: '', width: 88 },
  // ]
  const TABLE_HEAD = [
    {
      id: "employeename",
      label: " Employee Name",
      width: 180,
      type: "text",
      containesAvatar: false,

      secondaryText: "email",
    },
    { id: "claim_type", label: "Claim Type", width: 180, type: "text" },
    { id: "claim_date", label: "Claim Date", width: 220, type: "text" },
    { id: "claim_amount", label: "Claim Amount", width: 180, type: "text" },
    { id: "expense_date", label: "Expense Date", width: 100, type: "text" },
    { id: "approver_name", label: "Approver Name", width: 100, type: "text" },
    { id: "status", label: "Status", width: 100, type: "badge" },


    // { id: '', width: 88 },
  ]



  const defaultPayload={

    "employee_id":"ibm3",
    "page":0,
    "count":5,
    "search":"",
    "externalFilters":{
      "claim_start_date":"",
      "claim_end_date":"",
      "status":"",
      "claim_type":""
    },
    "sort":{
       "key":1,
       "orderBy":""

  }
    
   
}
const handleClick=()=>{
    console.log("fn passing ")
}

  
  const searchFilterheader = [

    { name: "Approve", icon: "hh", id: 'approve', type: "serviceCall", endpoint: '/accept' },
    { name: "View", icon: "hh", id: 'view' },
    { name: "Edit", icon: "hh", id: 'edit' },
    { name: "Delete", icon: "hh", id: 'delete' },
  ];

  const externalFilter = {
    
    claim_start_date: "",
    claim_end_date: "",
    status: "",
    claim_type: ""

  }
   const dialogConfig={
    title: 'Claim Filters',
    fields: [

      // { type: 'datePicker', label: 'Expense Start Date', name: 'expensestartdate',category:"expense", value: new Date() },
      // { type: 'datePicker', label: 'Expense End Date', name: 'expenseenddate',category:"expense", value: new Date() },
      { type: 'datePicker', label: 'Claim Start Date', name: 'claim_start_date',category:"claim",  },
      { type: 'datePicker', label: 'Claim End Date', name: 'claim_end_date',category:"claim",  },
      { type: 'Select', label: 'Claim Type ', category:"ClaimType",name:"claim_type", options: ['Hotel', 'Medical', 'Travel'] },
      { type: 'Select', label: 'Status',name: 'status', category:"status", options: ['Approve', 'Reject', 'Pending'] },
      // { type: 'multiSelect', label: 'multiSelect Options', options: ['O 1', 'Opti 2', 'ption 3'] },
    ],
  } 
  const bodyContent = [
    {
      name: "Surendra",
      email: "suri@infobellIt.com",
      phoneNumber: "9879876789",
      company: "Infobell",
      role: "UI Developer",
      status: "active",
    },
  ];
  // mui modal related
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);


  const actions = [

    // { name: "Approve", icon: "hh", id: 'approve', type: "serviceCall", endpoint: '/accept' },
    // { name: "View", icon: "hh", id: 'view', type: "edit", function: {handleOpen }},
    { name: "Edit", icon: "hh", id: 'edit',type: "edit", },
    // { name: "Delete", icon: "hh", id: 'delete' },
  ];
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    height: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  // form related data

  const handleChangeDate = (newValue, index, name) => {
    // const newObj = defaultValues;
    // newObj[index][name] = new Date(newValue);
    // setDefaultValues(newObj);
  };
  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

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

      const response = await axios.post('http://192.168.0.184:3001/erp/q', data).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  // for upload docmunt

  const onclickActions = (event) => {
    console.log( "my claims from to basic table")
    console.log(event)
    if (event && event?.eventData) {
      if (event?.eventData?.type === 'serviceCall') {
        // serviceCall(event.eventData.endpoint,event.rowData)
        
      } else {
          // navigate[event.eventData.route]
      }
    }
  }


  const serviceCall = (endpoint, payload) => {

  }

  return (
    <>
      <Helmet>
        <title> Dashboard: myclaims</title>
      </Helmet>

      {/* <Button onClick={handleOpen}  variant='outlined' >Apply Claim</Button> */}
      {/* <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField fullWidth label="Search">o</TextField>
        </Grid>
        <Grid item xs={6}>
          <Button sx={{ alignSelf: "center" }} variant="contained" onClick={handleOpen}>Open modal</Button>
          <Button variant="contained" >Filter</Button>
          <Button variant="contained" >exports</Button>
        </Grid>
       
      </Grid> */}

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
                      handleChangeDate(newValue, 'to');
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

      endpoint="GetMyClaims"
      defaultPayload={defaultPayload}
      headerData={TABLE_HEAD}
      rowActions={actions}
      bodyData = 'data'
      filterName="claimSearchFilter"


      button="Apply Claim"
      buttonFunction={handleOpen}
      filterContent={dialogConfig}
      dialogPayload={externalFilter}

      // searchFilterheader={searchFilterheader}
       
      />
    </>
  );
}
MyClaims.propTypes = {
  currentUser: PropTypes.object,
};

