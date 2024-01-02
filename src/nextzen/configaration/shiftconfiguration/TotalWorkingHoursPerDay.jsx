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
   
    getOvertime();
    
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
  const ApiHitDelete= async(itm) => {
  console.log("🚀 ~ file: TotalWorkingHoursPerDay.jsx:243 ~ ApiHitDelete ~ itm:", itm)
  

    
    try{
      const data ={
        dialytimesheetOtId: parseInt(itm?.dialytimesheetOtId),
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
      <Grid container spacing={4} sx={{padding:"0px" ,margin:"10px"}}>
      <Grid
          lg={2}
          md={2}
          xs={4}
          onClick={handleOpenDialog}
          sx={{
            ...bgGradient({
              direction: '135deg',
              startColor: alpha(theme.palette[color].light, 0.2),
              endColor: alpha(theme.palette[color].main, 0.2),
            }),
            p: 3,
            borderRadius: 2,
            // color: `${color}.darker`,
            backgroundColor: 'common.white',
            padding: '10px',
            margin: '10px',
            boxShadow: '3',
            height: '20vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            width: '180px',
          }}
        >
          <AddCircleIcon sx={{ fontSize: 50 }} />
        </Grid>
        {/* <Grid container spacing={1}> */}

{/* </Grid> */}

        {OvertimeData.map((config , index) => (
          <Grid
          lg={3}
          md={3}
          xs={12}
          sx={{
            ...bgGradient({
              direction: '135deg',
              startColor: alpha(theme.palette[color].light, 0.2),
              endColor: alpha(theme.palette[color].main, 0.2),
            }),
            p: 3,
            borderRadius: 2,
            // color: `${color}.darker`,
            backgroundColor: 'common.white',
            padding: '10px',
            margin: '10px',
            boxShadow: '3',
           
          }}
          >
            <>
            <Grid container alignItems="flex-end" justifyContent="flex-end" flexDirection="row">
                            {/* <IconButton onClick={() => {
                              const item = itm;
                              handleAddEducation([item], "updateWorkDetails");
                            }}>
                              <Iconify icon="material-symbols:edit" />
                            </IconButton> */}
                            <IconButton
                             onClick={ (e)=>{ApiHitDelete(config)}} 
                            sx={{ marginLeft: 1 }}>
                              <Iconify icon="material-symbols:delete" />
                            </IconButton>
                          </Grid>

                          <Grid container alignItems="center" justifyContent="center" flexDirection="column">
                        <Typography variant='h5'>
                          {config?.locationName}
                         
                        </Typography>
                  
                  
                        <Typography variant='h6'>{config?.maxHours} HRS Per Day</Typography>
                  
                        {/* <Typography component="span">
                          {formatDate(itm?.startDate)} - {formatDate(itm?.endDate)}
                          <Stack lg={12}></Stack>
                        </Typography> */}
                      </Grid>
            </>
            {/* <div style={{padding:"0px"}}>
             
            <IconButton onClick={() => setEditExpenseName(config)} style={{display:"flex" ,float:"right"}}>
                <Iconify icon="material-symbols:edit" />
              </IconButton>
            
              <Typography variant="body1">{config?.locationName}</Typography>
              <Typography variant="body1"> {config?.maxHours} HRS Per Day</Typography>

            </div> */}
          </Grid>
        ))}

 
        {/* {editExpenseName && (
          <Dialog
            fullWidth
            maxWidth={false}
            open={true} // Open the dialog when editing an expense
            onClose={() => setEditExpenseName(null)} // Close the dialog when canceled
            PaperProps={{
              sx: { maxWidth: 320 },
            }}
          >
            <FormProvider methods={methods1} >
             
              <ModalHeader heading="Edit Expense Configuration" />
              <DialogContent>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  marginTop={2}
                  // Adjust width and center the text field
                  alignItems="center"
                >
                  <RHFTextField
                    size="small"
                    name="expenseName"
                    label="Expense Name"
                    fullWidth
                    value={editExpenseName?.expenseName || ''}
                    onChange={(e) => {
                      setValue1('expenseName', e.target.value); // Update the form value
                       setEditExpenseName({ ...editExpenseName, expenseName: e.target.value }); // Update state
                    }}
                    sx={{ margin: '0 auto' }}
                  />
                </Box>
              </DialogContent>
 
              <DialogActions>
                <Button variant="outlined" onClick={() => setEditExpenseName(null)}>
                  Cancel
                </Button>
                <Button
                  sx={{ backgroundColor: '#3B82F6' }}
                  type="submit"
                  variant="contained"
                  onSubmit={onSubmit2}
                  onClick={onSubmit2}
                >
                  Save
                </Button>
              </DialogActions>
            </FormProvider>
          </Dialog>
        )} */}
        <Grid />

      </Grid>
    </>
  );
}
 
TotalWorkingHourPerDay.propTypes = {
  currentUser: PropTypes.object,
};