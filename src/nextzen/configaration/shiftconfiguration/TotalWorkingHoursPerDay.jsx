import React, { useEffect, useState, useMemo, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import * as Yup from 'yup';
import { useTheme, alpha } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Scrollbar from 'src/components/scrollbar';
// import ExpenseClaimForm fro
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Snackbar, Alert, IconButton, CardActions, Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Iconify from 'src/components/iconify/iconify';
import Stack from '@mui/material/Stack';
import axiosInstance from 'src/utils/axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { bgGradient } from 'src/theme/css';
import { useSnackbar } from 'notistack';
import UserContext from 'src/nextzen/context/user/UserConext';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import instance from 'src/api/BaseURL';
import LoadingButton from '@mui/lab/LoadingButton';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { Container } from '@mui/system';


export default function TotalWorkingHourPerDay({ currentUser }) {
  const {enqueueSnackbar} = useSnackbar()
  
  const theme = useTheme();
  const color = 'primary';
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [valueSelected, setValueSelected] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const {user}  = useContext(UserContext) 
  const handleClose = () => {
    setOpen(false);
    setExpenseName(''); // Resetting the expenseName state to clear the value
    reset1();
  };
  const [dialogOpen, setDialogOpen] = useState(false);
 
  const handleOpenDialog = () => {
    setOpen(true);
    getLocation()
    setIsEditing(false);
  };
  const handleEditclose = () => {
    setOpen(false);
    setEditExpenseName(null);
    reset1();
  };
  const handleCloseDialog = () => {
    setOpen(false);
    reset1();
  };
  const [expenseConfigurations, setExpenseConfigurations] = useState([]);
  const [LocationData, setLocationData] = useState([]);
  const [CurrentLocationData, setCurrentLocationData] = useState([]);
  const [OvertimeData, setOvertimeData] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [editExpenseName, setEditExpenseName] = useState(null);
  const NewUserSchema1 = Yup.object().shape({
    maxHours: Yup.string().required('maxHours  is Required'),
  });
 
  const defaultValues1 = useMemo(
    () => ({
      maxHours : currentUser?.maxHours || null,
    }),
    [currentUser]
  );
 
  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1,
  });
 
  const {
    setValue: setValue1,
    handleSubmit,
    formState: { isSubmitting },
    reset: reset1,
  } = methods1;
  // const onSubmit1 = handleSubmit1(async () => {
  //   console.log("myrreee")
  //   try {
  //     // Assuming join() is a function that returns the locationID
  //     const data = {
  //       companyID: user?.companyID || '',
  //       locationID: join(),
  //       maxHours: '', // You may need to provide a value for maxHours
  //     };
  
  //     // Now, you can use the 'data' object as needed, for example, send it to an API
  //     // Example: const response = await api.post('/your-endpoint', data);
  
  //     // If you want to log the 'data' object, you can do:
  //     console.log('Submitted Data:', data);
  
  //   } catch (error) {
  //     console.error('Submission Error:', error);
  //   }
  // });

  const onSubmit1 = handleSubmit(async (formData) => {
    console.log('uyfgv', formData);
  
    try {
      const submitData = {
        companyID: (user?.companyID) ? user?.companyID : '',
        locationID:  join(), 
        maxHours :parseInt(formData?.maxHours),
      };
  
      const response = await instance.post('/addOvertime', submitData);
        
      // getTableData();
    await  getOvertime()
    setCurrentLocationData([])
      handleClose();
      enqueueSnackbar(response.data.message, { variant: 'success' });
      console.log('success', response);
    } catch (error) {
      console.log(error);
    }
  });


  // const onSubmit2 = handleSubmit1(async (data) => {
  //   data.companyId = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
  //   data.expenseConfigurationID = editExpenseName?.expenseConfigurationID;
  //   console.log(editExpenseName?.expenseConfigurationID, 'editExpenseName?.expenseConfigurationID');
  //   try {
  //     const response = await axiosInstance.post(baseUrl + '/updateExpenseConfig', data);
  //     console.log(response?.data);
  //     if (response?.data?.status === '200') {
  //       reset1();
  //       handleEditclose();
  //       getExpenseName();
  //       // setSnackbarSeverity('success');
  //       // setSnackbarMessage(response?.data?.message);
  //       // setSnackbarOpen(true);
  //       enqueueSnackbar(response?.data?.message,{variant:'success'})
  //       console.log('sucess', response);
  //     }
  //     if (response?.data?.status === '400') {
  //       reset1();
  //       // handleEditclose();
  //       // setSnackbarSeverity('error');
  //       // setSnackbarMessage(response?.data?.message);
  //       // setSnackbarOpen(true);
  //       enqueueSnackbar(response?.data?.message,{variant:'error'})
  //       console.log('sucess', response);
  //     }
  //   } catch (error) {
  //     setOpen(false);
  //     // setSnackbarSeverity('error');
  //     // setSnackbarMessage('UnExpected Error. Please try again.');
  //     // setSnackbarOpen(true);
  //     enqueueSnackbar(error.response.data.message,{variant:'error'})
  //     console.log('error', error);
  //   }
  // });

  const getOvertime = async () => {
    const payload = {
        companyID:(user?.companyID)?user?.companyID : '',
        // LocationID:parseInt( (user?.locationID)?user?.locationID : ''),
    };
    try {
      const response = await axiosInstance.post(baseUrl + '/getOvertime', payload);
      console.log(response?.data?.data);
      if (response?.data?.code === 200) {
        const data = response?.data?.data || []; // Access expenseName from the API response
        // setExpenseConfigurations(data);
        setOvertimeData(data)
      }
      if (response?.data?.code === 400) {
        // setSnackbarSeverity('error');
        // setSnackbarMessage(response?.data?.message);
        // setSnackbarOpen(true);
        enqueueSnackbar(response?.data?.message,{variant:'error'})
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message,{variant:'error'})
      console.error('Error Fetching Expense Configurations:', error);
    }
  };
 
  useEffect(() => {
   
      
    
  }, []);
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
  };
  const handleExpenseName = (value) => {
    console.log(value, 'valueeee');
    setValue1('expenseName', value);
   
    setExpenseName(value);
  };
  // console.log(expenseName, 'kkk');
  const handleAddExpenseConfig = (data) => {
    setExpenseConfigurations([...expenseConfigurations, data]);
 
    handleClose();
  };
  const handlleEdit = (data) => {
    setEditExpenseName(data);
    setIsEditing(true);
  };
  const ApiHitDelete= async(rowdata,event) => {
  

    
    try{
      const data ={
        dialytimesheetOtId: parseInt(rowdata?.dialytimesheetOtId),
      }
      const response = await instance.post("/deleteOvertime",data)
      if(response?.data?.statusCode == "200"){
        enqueueSnackbar(response?.data?.message, { variant: 'success' });
        await  getOvertime()
      }
    }catch(error){
      console.error("Error",error);
      enqueueSnackbar(response?.data?.message, { variant: 'error' });
      throw Error
    }

  }
  const getLocation = async ()=>{
    try{
      const data = {
        companyID : (user?.companyID)?user?.companyID : '',
      }
      const response = await instance.post("/GetLocationIDs",data)
      setLocationData(response?.data?.data)
    }catch(error){
      console.error("Error",error)
      throw Error
    }
  }
  const handleSelectEmployeChange = (event,values)=>{
    setCurrentLocationData(values)

  }
  const join = () =>{
    const arr = []
    for (let i = 0 ; i < CurrentLocationData?.length; i++){
      arr.push( parseInt (CurrentLocationData[i].locationID));
    }
    return arr
  }
  const defaultPayload ={
    "companyID":(user?.companyID)?user?.companyID : '',
    "count": 5,
    "page":0,
  }
  const TABLE_HEAD = [

    
    
    { id: "locationName", label: "Location", width: 520, type: "text" },

    { id: "maxHours", label: "Total Working Hours", width: 580, type: "text" },
  //   { id: "from_shift_group", label: "Old Shift Group Name", width: 180, type: "text" },

  //   // { id: "FromShiftgroup_Name", label: " From Shift Group Name", width: 220, type: "text" },
  //   { id: "to_shift_name", label: "New Shift Name", width: 220, type: "text" },
  //   { id: "to_shift_group", label: "New Shift Group Name", width: 220, type: "text" },
  //   { id: "start_date", label: "Swap Date", width: 220, type: "text" },
  ]
  const actions = [
    { name: "Delete", icon: "solar:trash-bin-trash-bold", id: "2", type: "serviceCall", endpoint: '/DeleteShiftRoaster'},
  ];
  const onClickActions =(rowdata,event)=>{
    if(event?.name==="Delete"){
      ApiHitDelete(rowdata,event)
    } 
  }
  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={snackBarAlertHandleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={snackBarAlertHandleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
 
      
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 320 },
        }}
      > 
        <FormProvider methods={methods1} onSubmit={onSubmit1}>
          <ModalHeader heading="Add Expense Configuration" />
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              // gridTemplateColumns={{
              //   xs: 'repeat(1, 1fr)',
              //   sm: 'repeat(2, 1fr)',
              // }}
              alignItems="center" // Align items vertically in the center
            >
              {/* <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}> */}
 
              <RHFTextField
                size="small"
                name="maxHours"
                label="Working Hours/Day"
                fullWidth
                // value={isEditing ? editExpenseName?.expenseName || '' : expenseName}
                // onChange={(e) => {
                //   setValue1('expenseName', e.target.value);
                //   if (isEditing) {
                //     setEditExpenseName({ ...editExpenseName, expenseName: e.target.value });
                //   } else {
                //     setExpenseName(e.target.value);
                //   }
                // }}
                onSubmit={(e) => {
                 setValue1(e.target.value);}}
                sx={{ margin: '0 auto' }}
              />
                 <Autocomplete
                    multiple
                    size="small"
                    disablePortal
                    id="hfh"
                    options={LocationData || []}
                    value={CurrentLocationData}
                    getOptionLabel={(option) => option.LocationName}
                    onChange={handleSelectEmployeChange}
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField 
                      // error={Employerror}
                      // helperText={(Employerror)? "please select the employe" : ""}
                       {...params} label=" Select employee" />}
                  />
                  
              {/* </div> */}
            </Box>
          </DialogContent>
 
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
                  type="submit"
                  sx={{backgroundColor:'#3B82F6'}}
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                >
                  {!currentUser ? 'Create User' : 'Save'}
                </LoadingButton>
            {/* <Button
              sx={{ backgroundColor: '#3B82F6' }}
              type="submit"
              variant="contained"
              // onSubmit={isEditing ? onSubmit2 : onSubmit1}
              //  onClick={onSubmit1}
               loading={isSubmitting}
            >
              Save
            </Button> */}
          </DialogActions>
        </FormProvider>
      </Dialog>
    


      <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  <Button   variant="contained"      sx={{ margin: '20px', color: 'white', backgroundColor: '#3B82F6' }} onClick={handleOpenDialog}> Add Total Work/Hour</Button>
</Container>
      <BasicTable 

headerData={TABLE_HEAD}
endpoint="/getOvertime"
bodyData='data'
defaultPayload={defaultPayload}
// filterName="SwapSearchFilter"
rowActions={actions}
onClickActions={onClickActions}

/>  
    </>
  );
}
 
TotalWorkingHourPerDay.propTypes = {
  currentUser: PropTypes.object,
};