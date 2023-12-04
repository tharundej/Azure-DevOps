
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
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ModalHeader from '../../global/modalheader/ModalHeader';
// ----------------------------------------------------------------------
import { _userList } from "src/_mock";
import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';
import formatDateToYYYYMMDD from '../../global/GetDateFormat';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { SurendraBasicTable } from "src/nextzen/Table/SurendraBasicTable";


export default function MyCompoff({ currentUser ,}) {
  const compoff_type = [
    { compensantoryConfigurationId: null, compensantoryPolicies:""  },
    {   compensantoryConfigurationId: 11, compensantoryPolicies: "enchachment", id:0 },
    {   compensantoryConfigurationId: 12, compensantoryPolicies: "leave",  id:1},
   

  ]
  const compoff_type_edit = [
    { compensantoryConfigurationId: null, compensantoryPolicies:""  },
    {   compensantoryConfigurationId: 11, compensantoryPolicies: "enchachment", id:0 },
    {   compensantoryConfigurationId: 12, compensantoryPolicies: "leave",  id:1},
   

  ]
  const externalFilter = {
    
    "startDate":"",
    "endDate":"",
    "status":"",
    "compensantoryPolicies":"",
    "utilisation":""
  }

  const dialogConfig={
    title: 'My Compoff',
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
    // {
    //   id: "employeeName",
    //   label: " Employee Name",
    //   width: 180,
    //   type: "text",
    //   containesAvatar: false,

    //   secondaryText: "email",
    // },
    { id: "compensantoryPolicies", label: "Compensantory Policies", width: 180, type: "text" },
    { id: "startDate", label: "Start Date", width: 220, type: "text" },
    { id: "endDate", label: "End Date", width: 180, type: "text" },
    { id: "status", label: "Status", width: 100, type: "badge" },
    { id: "expireDate", label: "Expire Date", width: 180, type: "text" },
    { id: "approverName", label: "Approver Name", width: 180, type: "text" },
    // { id: '', width: 88 },
  ]

  const managerID =localStorage.getItem('reportingManagerID');
  const employeeID =localStorage.getItem('employeeID');
  const companyID =localStorage.getItem('companyID');

  const defaultPayload={

  
    "employeeId":employeeID,
    "companyId":companyID,
    "page":0,
    "search":"",
    "count":5,
    "externalFilters":{
      "startDate":"",
      "endDate":"",
      "status":"",
      "compensantoryPolicies":"",
      "utilisation":""
    },
    "sort":{
      "key":1,
      "orderBy":""
    }
   
}
  




  const actions = [
    // { name: "approve", icon: "hh", path: "jjj" },
    { name: "Edit", icon: "solar:pen-bold", path: "jjj"  , type:"edit" },
    { name: "Delete", icon: "solar:trash-bin-trash-bold", path: "jjj" , type:"delete"},
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
  const [selectedDates, setSelectedDates] = useState({
    startDate: "",
    endDate:"",
  });

  const handleDateChange = (date, dateType) => {
    const parsedDate = dayjs(date).format('YYYY-MM-DD');
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [dateType]: parsedDate,
    }));
  };

  console.log(selectedDates,"selectedDates")
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

  // const [delete,  SetDelete] = React.useState({

  //   compensatoryRequestId:"1"
      

  // });

  const [del, setDel]= React.useState({

    
    //  employeeId:employeeID,
    //   companyId:companyID,
    //   compensantoryRequestId:0
    companyId:companyID,
    compensantoryRequestId:0,
    employeeId:employeeID,

       

  })

  const [compoffId, setCompoffId]= useState();
  console.log(compoffId,"compoffId")

   // edit
   const [editData, setEditData]=useState({
  })

  const handleEditChange = (field, value) => {
    console.log(field,value,"sssssssss")
    
    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onSubmitEdit2 = async(editData, event) => {

    
    try {
      event.preventDefault();
      // editData.claim_type=editData?.claim_type?.label

     console.log(editData,"editDataeditData1")
      
      const response = await axios.post(baseUrl+"/EditMyCompoff", editData).then(
        (successData) => {
          console.log('sucess', successData);
         
          handleCloseEdit()
          // enqueueSnackbar(response?.data?.message,{variant:'success'})
        },
        (error) => {
          console.log('lllll', error);
          handleCloseEdit()
          // enqueueSnackbar(response?.data?.message,{variant:'error'})

        }
      );

      
    } catch (error) {

      // alert("api hit not done")
      handleCloseEdit()
      console.error(error);
      // enqueueSnackbar(response?.data?.message,{variant:'error'})
    }
  }

  console.log(editData,"editDataeditData")
  const onclickActions = (rowData,eventData) => {
    console.log(rowData,eventData, "CompoffAprrove from to basic table")
    if (rowData && eventData) {

      const updatedRowData = {
        ...rowData,
  employeeId:employeeID,
        companyId: companyID,
      };
    
      console.log("updatedRowData",updatedRowData)
      // setEditData(updatedRowData.compensantory_policies=== rowData?.compensantory_policies);
      setEditData(updatedRowData);
    
      

      if (eventData?.type === 'edit') {
        handleOpenEdit()
        console.log("kl")
      
      }
      else if(eventData?.type === 'delete'){
        console.log("delete")
        setDel(prevState => ({
              ...prevState,
              compensantoryRequestId:rowData?.compensantoryRequestId
              ,
          }));

          handle(del);

      }
          
        
       else{
      //   SetApprove(prevState => ({
      //     ...prevState,
      //     status: "Reject"
      // }));
      

    }
    }
 
    
    else {
          // navigate[event.eventData.route]

      }
    }
console.log(editData,"ppppppppppppppppppppp")

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


  // modal 
  
  const NewUserSchema = Yup.object().shape({
    
   
    companyId: Yup.string(),
    employeeId: Yup.string(),
    compensantoryPolicies: Yup.object(),
    // file_format: Yup.string(),
   
    startDate: Yup.string(),
    endDate: Yup.string(),
    approverId: Yup.string(),
    reason: Yup.string(),

    




  });

  const defaultValues = useMemo(
    () => ({
      // claim_amount: currentUser?.claim_amount || null ,
      
      // type_oc_claim: currentUser?.type_oc_claim|| '',
      // currency:currentUser?.currency|| '',

      companyId:currentUser?.companyId|| companyID,
      employeeId:currentUser?.employeeId|| employeeID,
      // compensantory_configuration_id:currentUser?.compoffId|| 11,
      compensantoryPolicies:compoffId || currentUser?.compensantoryPolicies || 9,
      startDate:currentUser?.startDate|| '',
      endDate:currentUser?.endDate|| '',
      approverId: currentUser?.approverId || managerID,
      reason: currentUser?.reason || '',





 

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
// const formData= new FormData();

  const values = watch();
 console.log(defaultValues,"defaultValues")
  const onSubmit = handleSubmit(async (data) => {
    
    console.log(data,"defaultValues111")
   
    data.startDate= selectedDates?.startDate;
    data.endDate= selectedDates?.endDate;
    try {
     
      console.log(data, 'formdata api in check');

      const response = await axios.post(baseUrl+'/AddMycompoffdetails', data).then(
        (successData) => {
          console.log('sucess', successData);
          handleClose()
          // enqueueSnackbar(response?.data?.message,{variant:'success'})
        },
        (error) => {
          console.log('lllll', error);
          handleClose()
          // enqueueSnackbar(response?.data?.message,{variant:'error'})
        }
      );

     
    } catch (error) {

      // alert("api hit not done")
      console.error(error);
      handleClose()
      // enqueueSnackbar(response?.data?.message,{variant:'error'})
    }
  });

  const  handle =(async (del) => {
    
    console.log(del,"del defaultValues111")
   

    try {
     
      // console.log(data, 'formdata api in check');

      const response = await axios.post(baseUrl+'/deleteMyCompoffDetails', del).then(
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

 
  

  return (
    <>
      <Helmet>
        <title> Dashboard: mycompoff</title>
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
         <ModalHeader heading="Apply Compoff"/>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {/* methods={methods} onSubmit={onSubmit} */}
          {/* <DialogTitle>Apply My Compoff</DialogTitle> */}

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
              

           
              <RHFAutocomplete
                name="compensantoryPolicies"
                label="Select Compoff Type"
                options={compoff_type}
                
                getOptionLabel={(option) => option.compensantoryPolicies} 
                isOptionEqualToValue={(option, value) => option === value}
               

             
             
                
               
              />
              {/* <RHFAutocomplete
                name="compensantory_policies"
                label="Select Project"
                options={compoff_type}
                getOptionLabel={(option) => option.compensantory_policies} 
                isOptionEqualToValue={(option, value) => option === value}
    
              />
                <RHFAutocomplete
                name="compensantory_policies"
                label="Select Activity"
                options={compoff_type}
                getOptionLabel={(option) => option.compensantory_policies} 
                isOptionEqualToValue={(option, value) => option === value}
    
              /> */}

{/* 
         <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={compoff_type}
            // value={id}
            getOptionLabel={(option) => option.compensantory_policies}
            onChange={(e, newValue) => {
              if (newValue) {
                setCompoffId(newValue.id);
              } else {
                setCompoffId(null);
              }
            }}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Select Compoff Type" />}
          /> */}

            


              
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Start Date"
                    value={selectedDates?.startDate}
                      onChange={(newValue) => handleDateChange(newValue, 'startDate')}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="End Date"
                    value={selectedDates.endDate}
                     onChange={(newValue) => handleDateChange(newValue, 'endDate')}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
              <RHFTextField name="reason" label="comments" />
            
             




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


      <Dialog
        fullWidth
        maxWidth={false}
        open={openEdit}
        // onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <ModalHeader heading="Edit Compoff"/>
        <FormProvider methods={methods} onSubmit={(event) => onSubmitEdit2(editData, event)}>
          {/* methods={methods} onSubmit={onSubmit} */}
          {/* <DialogTitle>Edit My Compoff</DialogTitle> */}

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
              
            
              <Autocomplete
                // name="type_oc_claim"
                label="Select Compoff Type"
                options={compoff_type_edit}
                bindLabel="label"
                getOptionLabel={(option) => option.compensantoryPolicies} // Use 'label' as the display label
                isOptionEqualToValue={(option, value) => option === value}
                value={editData?.compensantoryPolicies|| null}  
                {...console.log(editData?.compensantoryPolicies,"editData?.compensantoryPolicies")}
                 onChange={(event, newValue) => {console.log("newValue", newValue);handleEditChange('compensantoryPolicies', newValue)}}
                renderInput={(params) => (
                <TextField {...params} label="Select Compoff Type" variant="outlined" />
  )}
  
               
              />
             
            
             
             
             
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Start Date"
                    value={ dayjs( editData['startDate'] || null)}
                    onChange={(newValue) => {
                      
                      handleEditChange('startDate', formatDateToYYYYMMDD(newValue));
                    }}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="End Date"
                    value={ dayjs( editData['endDate'] || null)}
                    onChange={(newValue) => {
                      
                      handleEditChange('endDate', formatDateToYYYYMMDD(newValue));
                    }}
                    
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>

              <RHFTextField name="reason" label="Comments" />
            
             
             
             




            </Box>


          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleCloseEdit}>
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

         button="Apply Compoff"
      buttonFunction={handleOpen}
      filterContent={dialogConfig}
      dialogPayload={externalFilter}
         filterName="claimSearchFilter"
         onclickActions={onclickActions}
      />
    </>
  );
}
