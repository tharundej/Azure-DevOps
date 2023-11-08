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
    { code: 'AD', label: 'Travel', value:0, phone: '376' },
    { code: 'AD', label: 'Medical',value:1, phone: '376' },
    { code: 'AD', label: 'Hotel', value:2, phone: '376' },

  ]
  const compoff_type = [
    { code: '', label: '', phone: '' },
    { code: 'AD', label: 'Travel', id:0, phone: '376' },
    { code: 'AD', label: 'Medical leave', id:1,phone: '376' },
    { code: 'AD', label: 'Hotel ', id:1,phone: '376' },

  ]
  const currency = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

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


   // modal edit
   const [openEdit,setOpenEdit]=React.useState(false);

   const handleOpenEdit = () => {
     setOpenEdit(true);
   }
   const handleCloseEdit = () => setOpenEdit(false);


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
    comment: Yup.string(),
    file_name: Yup.string(),
    company_id: Yup.string(),
    employee_id: Yup.string(),
    currency: Yup.string(),
    expense_date:Yup.string(),
    file_format: Yup.string(),
    file: Yup.mixed(),
    expense_config_id:Yup.number(),

    




  });

  const defaultValues = useMemo(
    () => ({
      claim_amount: currentUser?.claim_amount || null ,
      comment: currentUser?.comment || '',
      // type_oc_claim: currentUser?.type_oc_claim|| '',
      currency:currentUser?.currency|| '$',

      company_id:currentUser?.company_id || 'COMP2',
      employee_id:currentUser?.employee_id || 'ibm3',
      expense_config_id:currentUser?.expense_config_id|| 2,
      expense_date:currentUser?.expense_date|| "2023-11-12",

      file_format:currentUser?.file_format|| "pdf",
      file:currentUser?.file,
      // formData.append("expense_date", "2023-11-12"); file_format:jpg

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

  

 // formdata and not json
const formData= new FormData();

const values = watch();
console.log(defaultValues,"defaultValues")
const onSubmit = handleSubmit(async (data) => {
  console.log('uyfgv');
  console.log(data,"defaultValues111")
  // formData.append("file", null );
  // formData.append("claim_amount", 1234 );
  // formData.append("company_id", "COMP2" );
  // formData.append("employee_id", "ibm3" );
  // formData.append("currency", "$");
  // formData.append("expense_config_id", 2);
  // formData.append("expense_date", "2023-11-12");

  const formDataForRequest = new FormData();
  for (const key in data) {
    formDataForRequest.append(key, data[key]);
  }


  try {
    // data.company_id = '0001';
    // data.company_name = 'infbell';
    // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
    // data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
    // data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
    // data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);



    console.log(formData, 'formdata api in check');

    const response = await axios.post('http://192.168.1.115:3000/erp/applyClaim', formDataForRequest).then(
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
  const [editData, setEditData]=useState()

  const onclickActions = (rowData,eventData) => {
    console.log(rowData,eventData, "CompoffAprrove from to basic table")
    if (rowData && eventData) {
      setEditData(rowData)
      if (eventData?.type === 'edit') {

        handleOpenEdit()
        console.log("kl")
      
      }
      
        
       else{
     

    }
    }
 
    
    else {
          // navigate[event.eventData.route]

      }
    }


console.log(editData,"editData")
  const serviceCall = (endpoint, payload) => {

  }

  return (
    <>
      <Helmet>
        <title> Dashboard: myclaims</title>
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
                options={claim_type.map((claimtype) =>claimtype.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
             
              />



              <RHFAutocomplete
                name="currency"
                label="currency"
                options={currency.map((claimtype) => claimtype.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
            
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


              <RHFTextField name="claim_amount" label="Claim Amount" />
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


      <Dialog
        fullWidth
        maxWidth={false}
        open={openEdit}
        // onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {/* methods={methods} onSubmit={onSubmit} */}
          <DialogTitle>Edit My Claim</DialogTitle>

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
             

              {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}
              {/* <RHFTextField name="reason" label="Employee Name" /> */}
              <RHFAutocomplete
                name="Claim Type"
                label="Claim Type"
                options={compoff_type}
               
                getOptionLabel={(option) => option.label} // Use 'label' as the display label
                isOptionEqualToValue={(option, value) => option === value}
                value={editData?.claim_type} 
               
              />
             
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Claim Date"
                    // value={item?.to}
                    onChange={(newValue) => {
                      // handleChangeDate(newValue, 'to');
                    }}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
              <RHFTextField name="approverName"  label="Claim Amount" value={editData?.claim_amount} />
             
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Expense Date"
                    // value={item?.to}
                    onChange={(newValue) => {
                     // handleChangeDate(newValue, 'End');
                    }}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
            
             




            </Box>


          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleCloseEdit}>
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
      onclickActions={onclickActions}

      // searchFilterheader={searchFilterheader}
       
      />
    </>
  );
}
MyClaims.propTypes = {
  currentUser: PropTypes.object,
};

