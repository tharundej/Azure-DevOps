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
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
 
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { SurendraBasicTable } from "src/nextzen/Table/SurendraBasicTable";
import { ConfirmDialog } from 'src/components/custom-dialog';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import { Typography } from '@mui/material';
 
export default function CompoffApprove({ currentUser ,}) {
  const compoff_type = [
    { compensantoryConfigurationId: null, compensantoryPolicies:""  },
    {   compensantoryConfigurationId: 11, compensantoryPolicies: "Enchachment", id:0 },
    {   compensantoryConfigurationId: 12, compensantoryPolicies: "Leave",  id:1},
   
 
  ]
  const [count,setCount] = useState(0)
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
  const { enqueueSnackbar } = useSnackbar();
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
    //   minWidth: "7pc",
    //   type: "text",
    //   containesAvatar: false,
 
    //   secondaryText: "email",
    // },
    // { id: "projectName", label: "Project Name", width: 180, type: "text" },
    // { id: "compensantoryRequestId", label: "Compensantory ID", minWidth: "8pc", type: "text" },
    { id: "compensantoryPolicies", label: "Compensantory Policies", minWidth: "8pc", type: "text" },
    { id: "startDate", label: "Start Date", minWidth: "7pc", type: "date" },
    { id: "endDate", label: "End Date", minWidth: "7pc", type: "date" },
    { id: "requestDate", label: "Requested Date", minWidth: "7pc", type: "date" },
    { id: "numberOfDays", label: "Total Days", minWidth: "7pc", type: "text" },
    { id: "expireDate", label: "Expire Date", minWidth: "7pc", type: "date" },
    { id: "userComment", label: "My Comments ", minWidth: "7pc", type: "text" },
    // { id: "amount", label: "Approved Amount", minWidth: "7pc", type: "text" },
    { id: "approverComment", label: "Approver Comments", minWidth: "7pc", type: "text" },
    { id: "approvedDate", label: "Approved Date", minWidth: "7pc", type: "date" },
    { id: "approverName", label: "Approver Name", minWidth: "7pc", type: "text" },
    { id: "status", label: "Status", minWidth: "7pc", type: "badge" },
   
    ,
    { id: '', width: 88 },
   
  ]
 
  const managerID =localStorage.getItem('reportingManagerID');
  const employeeID =localStorage.getItem('employeeID');
  const companyID =localStorage.getItem('companyID');
 
  const defaultPayload={
 
 
    "employeeId":"",
    "companyId":companyID,
    "ApprovalManagerId":employeeID,
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
    startDate: null,
    endDate:null,
    error:"",
    errorend:""
  });
 
  const handleDateChange = (newValue, dateFieldName) => {
    const selectedDateValue = dayjs(newValue).format("YYYY-MM-DD");
    const currentDate = dayjs().format("YYYY-MM-DD");
 
    if (dateFieldName === "startDate") {
      const lastMonthDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
      if (dayjs(selectedDateValue).isAfter(lastMonthDate) || dayjs(selectedDateValue).isSame(currentDate)) {
        setSelectedDates((prev) => ({
          ...prev,
          [dateFieldName]: selectedDateValue,
          error: "",
        }));
      } else {
        setSelectedDates((prev) => ({
          ...prev,
          error: "Plaese Select Valid  Start Date.",
        }));
      }
    }

    
    
 
    if (dateFieldName === "endDate") {
      if ( selectedDates.startDate &&
        (dayjs(selectedDateValue).isSame(selectedDates.startDate) ||
          dayjs(selectedDateValue).isAfter(selectedDates.startDate))
      ) {
        setSelectedDates((prev) => ({
          ...prev,
          [dateFieldName]: selectedDateValue,
          error: "",
          errorend: ""
        }));
      } else {
        setSelectedDates((prev) => ({
          ...prev,
          errorend: "Plaese Select Valid  End Date.",
        }));
      }
    }
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
        (res) => {
          console.log('sucess', res);
         enqueueSnackbar(res?.data?.message,{variant:'success'})
          handleCloseEdit()
          setCount(count+1)
          // enqueueSnackbar(res?.data?.message,{variant:'success'})
        },
        (error) => {
          console.log('lllll', error);
          handleCloseEdit()
          enqueueSnackbar(error?.response?.data?.message,{variant:'warning'})
 
        }
      );
 
     
    } catch (error) {
 
      // alert("api hit not done")
      handleCloseEdit()
      console.error(error);
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
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
        compensantoryPolicies:{   compensantoryConfigurationId: rowData?.compensantoryConfigurationId, compensantoryPolicies: rowData?.compensantoryPolicies,},
      };
      // {   compensantoryConfigurationId: 11, compensantoryPolicies: "enchachment", id:0 },
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
              compensantoryRequestId:rowData?.compensantoryRequestId,
              employeeId:employeeID,
        companyId: companyID
             
          }));
          setConfirmDeleteOpen(true);
          // handle(del);
          // handle({...del, ...{
          //  compensantoryRequestId:rowData?.compensantoryRequestId
          // ,}});
       
 
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
 
  const maxDate = dayjs();
  const minDate = dayjs().subtract(1, 'month');
  // modal
  const [Id, setId] = useState();
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
      companyId:currentUser?.companyId|| companyID,
      employeeId:currentUser?.employeeId|| Id,
      // compensantory_configuration_id:currentUser?.compoffId|| 11,
      compensantoryPolicies:compoffId || currentUser?.compensantoryPolicies ,
      startDate:currentUser?.startDate|| '',
      endDate:currentUser?.endDate|| '',
      approverId: currentUser?.approverId || employeeID,
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
   
    console.log(data,"defaultValues11122")
    data.employeeId= Id;
    data.startDate= selectedDates?.startDate;
    data.endDate= selectedDates?.endDate;
    try {
     
      console.log(data, 'formdata api in check233');
 
      const response = await axios.post(baseUrl+'/AddMycompoffdetails', data).then(
        (res) => {
          console.log('sucesspppp', res);
          if (res?.data?.code === "400" || 400){
            enqueueSnackbar(res?.data?.message, { variant: 'success' })
          }
          handleClose()
          enqueueSnackbar(res?.data?.message,{variant:'success'})
          setCount(count+1)
        },
        (error) => {
          console.log('lllll', error);
          handleClose()
          enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
        }
      );
 
     
    } catch (error) {
 
      // alert("api hit not done")
      console.error(error);
      handleClose()
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
    }
  });
 
 
  const handleDeleteConformed =()=>{
    console.log("handletseaaaaaaaaaaaaaaa")
    handle(del)
  }
  const  handle =(async (del) => {
   
    console.log(del,"del defaultValues111")
   
 
    try {
     
      // console.log(data, 'formdata api in check');
 
      const response = await axios.post(baseUrl+'/deleteMyCompoffDetails', del).then(
        (res) => {
          console.log('sucess', res);
          enqueueSnackbar(res?.data?.message,{variant:'success'})
          handleCancelDelete()
          setCount(count+1)
        },
        (error) => {
          console.log('lllll', error);
          enqueueSnackbar(error?.response?.data?.message,{variant:'warning'})
          handleCancelDelete()
        }
      );
 
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
 
      // alert("api hit not done")
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
      console.error(error);
      handleCancelDelete()
    }
  });
// conform dialog for delete
const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
 
const handleCancelDelete = () => {
  // setDelData(null);
  setDel(null);
  setConfirmDeleteOpen(false);
};
 
 
 
useEffect(() => {
  getEmployeeList();
  console.log("useEffecttt");
}, []);
 
 
 
// employee list
const [selectedEmployee, setSelectedEmployee] = useState(null);
 
const handleEmployeeChange = (event, value) => {
  // 'value' will be the selected option
  setSelectedEmployee(value);
 
  // If you want to store only the employeeId in a separate state, you can do this:
  if (value) {
    setId(value.employeeId);
  } else {
    setId(null);
  }
};
 
 
console.log(Id,"ooooooooooooo")
const[employeeList, setEmployeeList]= useState()
const getEmployeeList = async()=>{
  try {
    const dataPayload = {    
      projectManager:employeeID,
        companyId:companyID,
 
    };
    const response = await axios.post(baseUrl+'/getEmpForPm', dataPayload).then(
      (response) => {
        console.log('sucesswww9999w', response);
       
        setEmployeeList(response?.data?.list)
        // enqueueSnackbar(response?.data?.message, { variant: 'success' })
     
      },
      (error) => {
        console.log('lllll', error);
        // enqueueSnackbar(error?.response?.data?.message, { variant: 'warning' })
     
      }
    );
 
 
   
  } catch (error) {
    // Handle any errors (e.g., network error, request failure, etc.)
    console.error('Error:', error);
    // enqueueSnackbar(error?.response?.data?.message, { variant: 'warning' })
    throw error; // Re-throw the error or handle it according to your needs
  }
}
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
 
           <RHFAutocomplete
                name="compensantoryPolicies"
                label="Select Employee"
                options={employeeList || []}
               
                getOptionLabel={(option) => option.employeeName}
                isOptionEqualToValue={(option, value) => option === value}
                onChange={handleEmployeeChange}
                value={selectedEmployee}
     
           
              />
     {/* <RHFAutocomplete
               name="compensantoryPolicies"
               label="Select Compoff Type"
                required
                options={compoff_type.map((compoffType) => compoffType.compensantoryPolicies)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
 
              /> */}
 
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Compoff Start Date"
                    value={selectedDates?.startDate}
                      onChange={(newValue) => handleDateChange(newValue, 'startDate')}
                      maxDate={maxDate} 
                      minDate={minDate}
                  /> {selectedDates?.error && (
                    <Typography color="error" variant="caption">
                      {selectedDates.error}
                    </Typography>
                  )}
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Compoff End Date"
                    value={selectedDates.endDate}
                     onChange={(newValue) => handleDateChange(newValue, 'endDate')}
                      maxDate={maxDate} 
                    minDate={minDate}
                  />
                   {selectedDates?.errorend && (
                  <Typography color="error" variant="caption">
                    {selectedDates.errorend}
                  </Typography>
                )}
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
              <RHFTextField name="reason" label="Comments" />
           
             
 
 
 
 
            </Box>
 
 
          </DialogContent>
 
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
 
            {!selectedDates?.errorend && !selectedDates?.error &&  <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
              Save
            </LoadingButton>}
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
                    label="Compoff Start Date"
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
                    label="Compoff End Date"
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
 
      <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConformed}
        itemName="Delete Compoff "
        message={`Are you sure you want to delete  Commpoff`}
       
      />
 
 
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
         count={count}
      />
    </>
  );
}
 