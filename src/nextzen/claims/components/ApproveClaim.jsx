import React, { useState, useMemo, useEffect } from 'react';

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
import { baseUrl } from '../../global/BaseUrl';

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





export default function ApproveClaim({ currentUser }) {

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
      id: "employeeName",
      label: " Employee Name",
      width: 180,
      type: "text",
      containesAvatar: false,

      secondaryText: "email",
    },
    { id: "claimType", label: "Claim Type", width: 180, type: "text" },
    { id: "claimDate", label: "Claim Date", width: 220, type: "text" },
    { id: "claimAmount", label: "Claim Amount", width: 180, type: "text" },
    { id: "approveAmount", label: "Max Approve Amount", width: 200, type: "text" },
    { id: "expenseDate", label: "Expense Date", width: 100, type: "text" },
    { id: "approverName", label: "Approver Name", width: 100, type: "text" },
    { id: "status", label: "Status", width: 100, type: "badge" },


    // { id: '', width: 88 },
  ]



  const defaultPayload={

    "companyId":"COMP2",
    "count":5,
    "page":0,
    "search":"",
    "externalFilter":{
    "claimType":"",
    "claimStartDate":"",
    "claimEndDate":"",
    "status":""
}, 
    "sort":{
    "key":0,
    "order":""
}
   
}
const handleClick=()=>{
    console.log("fn passing ")
}

const externalFilter = {
  // claimStartDate: "",
  // claimEndDate: "",
  expenseStartDate: "",
  expenseEndDate: "",
  // status: "",
  paymentstatus: ""
}


const dialogConfig={
  title: 'Approve Claim Filters',
  fields: [

    { type: 'datePicker', label: 'Expense Start Date', name: 'expenseStartDate',category:"expense", value: new Date() },
    { type: 'datePicker', label: 'Expense End Date', name: 'expenseEndDate',category:"expense", value: new Date() },
    // { type: 'datePicker', label: 'Claim Start Date', name: 'claimStartDate',category:"claim",  },
    // { type: 'datePicker', label: 'Claim End Date', name: 'claimEndDate',category:"claim",  },
    // { type: 'Select', label: 'Select Options', category:"status",name:"status", options: ['Option 1', 'Option 2', 'Option 3'] },
    { type: 'Select', label: 'Status',name: 'paymentstatus', category:"paymentstatus", options: ['Approve', 'Reject', 'Pending'] },
    // { type: 'multiSelect', label: 'multiSelect Options', options: ['O 1', 'Opti 2', 'ption 3'] },
  ],
} 
const actions = [
  { name: "Approve", icon: "hh", path: "jjj",  type:"status"},
  { name: "Reject", icon: "hh", path: "jjj" ,type:"status" },
  // { name: "eerr", icon: "hh", path: "jjj" },
];
  const searchFilterheader = [

    { name: "Approve", icon: "hh", id: 'approve', type: "serviceCall", endpoint: '/accept' },
    { name: "View", icon: "hh", id: 'view' },
    { name: "Edit", icon: "hh", id: 'edit' },
    { name: "Delete", icon: "hh", id: 'delete' },
  ];
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      claim_amount: currentUser?.claim_amount || '',
      comments: currentUser?.comments || '',
      // image_name: currentUser?.image_name || '',
      // image_data: currentUser?.image_data || '',


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

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');

    try {
      data.company_id = '0001';
      data.company_name = 'infbell';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
      data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
      data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

      console.log(data, 'data111ugsghghh');

      const response = await axios.post(baseUrl+'onboarding', data).then(
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

  // const onclickActions = (event) => {
  //   console.log( "my claims from to basic table")
  //   console.log(event)
  //   if (event && event?.eventData) {
  //     if (event?.eventData?.type === 'serviceCall') {
  //       // serviceCall(event.eventData.endpoint,event.rowData)
        
  //     } else {
  //         // navigate[event.eventData.route]
  //     }
  //   }
  // }


  const [approve, setApprove]= React.useState({

    // compensatoryRequestId:"1",
    //     status: "",
    //     utilisation: "1"
    companyId:"COMP2",
    employeeId:"ibm3",
    expenseClaimId :"13" ,
    approverManagerId:"ibm1",
    status:""
 

  })

  useEffect(()=>{
    handle(approve);
  },[approve])


  // console.log(approve,"approve data11111111")
  const onclickActions = (rowData,eventData) => {
    console.log(rowData,eventData, "CompoffAprrove from to basic table")
    if (rowData && eventData) {
      if (eventData?.type === 'status') {
        // handle(approve);
           if (eventData?.name === 'Approve'){
            setApprove(prevState => ({
              ...prevState,
              status: "Approve"
          }));
          // handle(approve);
          console.log(approve,"approve api")

           }
          
        
       else{
        setApprove(prevState => ({
          ...prevState,
          status: "Reject"
      }));
      // handle(approve);
      console.log(approve,"reject api")

    }
    }
  }
    
    else {
          // navigate[event.eventData.route]

      }
    }
   

    const  handle =(async (approve) => {
    
      console.log(approve,"approve defaultValues111")
     
  
      try {
       
        // console.log(data, 'formdata api in check');
  
        const response = await axios.post(baseUrl+'/updateClaimStatus', approve).then(
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
  
        alert("api hit not done")
        console.error(error);
      }
    });

  const serviceCall = (endpoint, payload) => {

  }
  return (
    <>
      <Helmet>
        <title> Dashboard: ApproveClaim</title>
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

      
      <SurendraBasicTable

      endpoint="/getAllClaims"
      defaultPayload={defaultPayload}
      headerData={TABLE_HEAD}
      rowActions={actions}
      bodyData = 'data'
      filterName="claimSearchFilter"
      filterContent={dialogConfig}
      dialogPayload={externalFilter}
      onclickActions={onclickActions}
      // searchFilterheader={searchFilterheader}
       
      />
    </>
  );
}
ApproveClaim.propTypes = {
  currentUser: PropTypes.object,
};

