import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// @mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { useContext } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';
import { LoadingScreen } from 'src/components/loading-screen';
// import {useSnackbar} from '../../../components/snackbar'
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export default function GeneralForminfo({ currentUser,getTableData }) {
  const [open, setOpen] = useState(false);
  const esicValue =4 
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const handleClose2 = () => {
    setOpen(false);
    reset2();
  };
  const handleClose3 = () => {
    setOpen(false);
    reset3();
  };
  const [isCessRequried ,setIsCessREquired] =useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isTDSVisible, setTDSVisible] = useState(false);
  const NewUserSchema1 = Yup.object().shape({
    payScheduleType: Yup.string().required('Payschedule Type is Required'),
    basicPayPercentage: Yup.number().required('Basic Pay is Required'),
    hraPercentage: Yup.number().required('hraPercentage is Required'),
    daPercentage: Yup.number().required('DA is Required'),
    employeePfPercentage: Yup.number().required('Employee PF is Required'),
    employerPfPercentage: Yup.number().required('Employer PF is Required'),
    ltaPercentage: Yup.number(),
    esicPercentage: Yup.number(),
    tdsPercentage: Yup.number(),
  
    medicalAllowance: Yup.number(),
  });

  const NewUserSchema2 = Yup.object().shape({
    payScheduleType: Yup.string().required('Payschedule Type is Required'),
    tdsPercentage: Yup.number().required('TDS is Required'),
  });
  const NewUserSchema3 = Yup.object().shape({
    payScheduleType: Yup.string().required('Payschedule Type is Required'),
  });
  const {enqueueSnackbar} = useSnackbar()
  // const baseUrl ="https://2d56hsdn-3001.inc1.devtunnels.ms/erp"
    // const baseUrl = ' https://2d56hsdn-3001.inc1.devtunnels.ms/erp'
    const {user} = useContext(UserContext)
    const empId =  (user?.employeeID)?user?.employeeID:''
    const cmpId= (user?.companyID)?user?.companyID:''
  const roleId = (user?.roleID)?user?.roleID:''
  const token  =  (user?.accessToken)?user?.accessToken:''
  const defaultValues1 = useMemo(
    () => ({
      payPcheduleType: currentUser?.payPcheduleType,
      basicPayPercentage: currentUser?.basicPayPercentage,
      hraPercentage: currentUser?.hraPercentage,
      daPercentage: currentUser?.daPercentage,
      employeePfPercentage: currentUser?.employeePfPercentage,
      employerPfPercentage: currentUser?.employerPfPercentage,
      ltaPercentage: currentUser?.ltaPercentage,
      esicPercentage: currentUser?.esicPercentage,
      tdsPercentage: currentUser?.tdsPercentage,
      // foodAllowance: currentUser?.foodAllowance,
      // travelAllowance: currentUser?.travelAllowance,
      medicalAllowance: currentUser?.medicalAllowance
    }),
    [currentUser]
  );
  const defaultValues2 = useMemo(
    () => ({
      // employementType: currentUser?.employementType || '',
      payPcheduleType: currentUser?.payPcheduleType,
      tdsPercentage: currentUser?.tdsPercentage,
    }),
    [currentUser]
  );
  const defaultValues3 = useMemo(
    () => ({
      // employementType: currentUser?.employementType || '',
      payPcheduleType: currentUser?.payPcheduleType,
    }),
    [currentUser]
  );
  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });

  const methods2 = useForm({
    resolver: yupResolver(NewUserSchema2),
    defaultValues: defaultValues2, // Use defaultValues instead of defaultValues2
  });
  const methods3 = useForm({
    resolver: yupResolver(NewUserSchema3),
    defaultValues: defaultValues3, // Use defaultValues instead of defaultValues2
  });
  const [selectedOption, setSelectedOption] = useState(null); // State to manage the selected option in Autocomplete
  const [isTextFieldVisible, setTextFieldVisible] = useState(); // State to manage the visibility of the text field
const [isHourWage ,setIsHourWage] =useState(false)
const [isDaily,setIsDaily ] =useState(false)
const [isContract,setIsContract ] =useState(false)
  const payPcheduleTypes = [
  
    { type: 'Twice a month' },
    { type: 'Once a month' },
   
  ];
  const payPcheduleTypes1 = [
    { type: 'Once a week' },
   
    { type: 'Twice a month' },
    { type: 'Once a month' },
  
  ];
  const payPcheduleTypes2 = [
 
    {type: 'Once a Day'},
  ];

  const payPcheduleTypes3 = [
    
    {type: 'Once a Hour'}
  ];
  //   const m2 = useForm();
  const employeepayTypes = [{ type: 'Permanent' }, { type: 'Contract' },{type:'Daily Wages'},{type:'Hour Wages'}];

  const {
    setValue: setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;

  const {
    setValue: setValue2,
    handleSubmit: handleSubmit2,
    formState: { isSubmitting: isSubmitting2 },
    reset: reset2,
  } = methods2;

  const {
    setValue: setValue3,
    handleSubmit: handleSubmit3,
    formState: { isSubmitting: isSubmitting3 },
    reset: reset3,
  } = methods3;
  //   const values = watch();
  // const [selectedOption, setSelectedOption] = useState(null);
  const [payScheduleType, setPayScheduleType] = useState('');


  const onSubmit1 = handleSubmit1(async (data) => {
    console.log('submitted data111', data);
    data.employee_type = selectedOption?.type;
    data.companyId = cmpId;
    data.esicPercentage =esicValue

    try {
      const response = await axios.post(baseUrl + '/addPaySchedule', data);
     
      if (response?.data?.code === 200   )
          {
        handleClose();
        enqueueSnackbar(response.data.message,{variant:'success'})
        // setLoading(false)
        getTableData()
        console.log('sucess', response);
      }
      if (response?.data?.code ===400) {
        handleClose();
        enqueueSnackbar(response.data.message,{variant:'error'})
        // setLoading(false)
        getTableData()
        console.log('sucess', response);
      }
    } catch (error) {
      enqueueSnackbar("Something Went Wrong!",{variant:'error'})
      // setLoading(false)
      console.log('error', error);
    }
  });
  console.log(selectedOption?.type ,"selectedOption?.type")
  const onSubmit2 = handleSubmit2(async (data) => {
    data.employee_type = selectedOption?.type;
    console.log(selectedOption?.type ,"selectedOption?.type")
    data.companyId = cmpId,
    console.log('submitted data2222', data);

    try {
      const response = await axios.post(baseUrl + '/addPaySchedule', data);
      console.log(response.data ,"responseinpayroll")
      console.log(response.data ,"responseinpayroll")
      if (response?.data?.code === 200   )
      {
    
    handleClose();
    enqueueSnackbar(response?.data?.message,{variant:'success'})
    // setLoading(false)
    getTableData()
    console.log('sucess', response);
  }
 if (response?.data?.code === 400) {
    console.log(response?.data?.code ,"responseinpayroll")
    handleClose();
    enqueueSnackbar(response.data.message,{variant:'error'})
    // setLoading(false)
    getTableData()
    console.log('sucess', response);
  }
} catch (error) {
  enqueueSnackbar("Something Went Wrong!",{variant:'error'})
  // setLoading(false)
  console.log('error', error);
}
  });

  const onSubmit3 = handleSubmit3(async (data) => {
    data.employee_type = selectedOption?.type;
    data.companyId = cmpId,
    console.log('form3', data);

    try {
      const response = await axios.post(baseUrl + '/addPaySchedule', data);
      console.log(response.data ,"responseinpayroll")
      console.log(response.data ,"responseinpayroll")
      if (response?.data?.code === 200   )
      {
    reset3()
    handleClose();
    enqueueSnackbar(response?.data?.message,{variant:'success'})
    // setLoading(false)
    getTableData()
    console.log('sucess', response);
  }
 if (response?.data?.code === 400) {
    console.log(response?.data?.code ,"responseinpayroll")
    // handleClose();
    reset3()
    enqueueSnackbar(response.data.message,{variant:'error'})
    // setLoading(false)
    getTableData()
    console.log('sucess', response);
  }
} catch (error) {
  enqueueSnackbar("Something Went Wrong!",{variant:'error'})
  // setLoading(false)
  console.log('error', error);
}
  });
 
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOption(newValue);

    // Check if the selected option should show the text field
    if (newValue && newValue.type === 'Permanent') {
      setTextFieldVisible(true);
    } else {
      setTextFieldVisible(false);
    }
    if (newValue && (newValue.type === 'Daily Wages' )) {
      setTDSVisible(true);
      setIsHourWage(false)
      setIsDaily(true)
    } else  if (newValue && ( newValue.type === 'Hour Wages')) {
      
     
      setIsHourWage(true)
      setIsDaily(false)
      setTDSVisible(true);
    } else {
      // setTDSVisible(false);
      setIsHourWage(false)
      setIsDaily(false)
      setTDSVisible(false)
     
      
    }
   console.log("which is value " , isHourWage ,"hours" , isTDSVisible ,"tsdvisible" , )

  };

  const getOptionLabel = (employeepayType) => employeepayType.type;

  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
  };
  useEffect(() => {
    console.log("useEffect")
    // Check the selected option and set the payScheduleType accordingly
    if (selectedOption && selectedOption.type === 'Hour Wages') {
      setPayScheduleType('Hour a day');
    } else if (selectedOption && selectedOption.type === 'Daily Wages') {
      setPayScheduleType('Once a day');
    } 
  }, [selectedOption]);
  const handleSwitchChange = (name, checked) => {
    // Map the boolean value to 1 or 0

    console.log(checked ,"checked")
    const mappedValue = checked ? 1 : 0;
  setIsCessREquired(checked)
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: mappedValue,
    // }));
  
    // setFieldErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: '',
    // }));
  };
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
      <Button
        onClick={handleOpen}
        variant="contained"
        // startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px',color:'white',backgroundColor:'#3B82F6'}}
      >
        Add PayRoll
      </Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        {isTextFieldVisible && !isTDSVisible ? (
          <FormProvider methods={methods1} onSubmit={onSubmit1}>
            <ModalHeader heading="Add PayRoll" />

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
             <RHFAutocomplete
                  disablePortal
                  name="employementType"
                  id="combo-box-demo"
                  options={employeepayTypes}
                  getOptionLabel={getOptionLabel}
                  isOptionEqualToValue={(option, value) => option.type === value.type}
                  getOptionSelected={(option, value) => option.type === value.type}
                  value={selectedOption}
                  onChange={handleAutocompleteChange}
                  sx={{ width: '100%', marginRight: '5%' }} 
                  renderInput={(params) => <TextField {...params} label="Employee Type" />}
                />

                <RHFAutocomplete
                  name="payScheduleType"
                  label="Pay Schedule Type"
                  disabled={selectedOption && (selectedOption.type === 'Hour Wages' || selectedOption.type === 'Daily Wages')}
                  value={payScheduleType}
                  onChange={(event, newValue) => setPayScheduleType(newValue)}
                  options={payPcheduleTypes?.map((name) => name.type)}
                 
                />
                <RHFTextField name="basicPayPercentage" label="Basic Pay %" />

                <RHFTextField name="hraPercentage" label="HRA %" />
                <RHFTextField name="daPercentage" label="DA %" />
                <RHFTextField name="employeePfPercentage" label="Employee PF %" />
                <RHFTextField name="employerPfPercentage" label="Employer PF %" />
                <RHFTextField name="ltaPercentage" label="LTA %" />
                <RHFTextField name="esicPercentage" label="ESIC %"  value={esicValue} dis={true}/>
                <RHFTextField name="tdsPercentage" label="TDS %" />
                <RHFTextField name="medicalAllowance" label="Medical Allowance %" />
                <FormControlLabel
  control={
    <Switch
      name="cessrequried"
      checked={isCessRequried} // Assuming formData.policyCitizenshipType is a boolean
      onChange={(event) => handleSwitchChange('cessrequried', event.target.checked)}
    />
  }
  label="CESS Required"
/>
                {/* <RHFTextField name="travelAllowance" label="Travel Allowance %" /> */}
                {/* <RHFTextField name="foodAllowance" label="Food Allowance %" /> */}
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              {/* <LoadingButton
                type="submit"
                variant="contained"
                onClick={onSubmit1}
                loading={isSubmitting1}
              >
                Save
              </LoadingButton> */}
              <Button
               sx={{backgroundColor:'#3B82F6'}}
               variant="contained"
               onClick={onSubmit1}>
                Save
                </Button>
            </DialogActions>
          </FormProvider>
        ) : !isTDSVisible && (
          <FormProvider methods={methods2} onSubmit={onSubmit2}>
            <ModalHeader heading="Add PayRoll " />
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
           <RHFAutocomplete
                  disablePortal
                  name="employementType"
                  id="combo-box-demo"
                  options={employeepayTypes}
                  getOptionLabel={getOptionLabel}
                  isOptionEqualToValue={(option, value) => option.type === value.type}
                  getOptionSelected={(option, value) => option.type === value.type}
                  value={selectedOption}
                  onChange={handleAutocompleteChange}
                  sx={{ width: '100%', marginRight: '5%' }} 
                  renderInput={(params) => <TextField {...params} label="Employee Type" />}
                />

                <RHFAutocomplete
                  name="payScheduleType"
                  label="Pay Schedule Type"
                  options={payPcheduleTypes1.map((name) => name.type)}
                  // disabled={selectedOption && (selectedOption.type === 'Hour Wages' || selectedOption.type === 'Daily Wages')}
                  // value={payScheduleType}
                  // onChange={(event, newValue) => setPayScheduleType(newValue)}
                  // options={payPcheduleTypes.map((name) => name.type)}
                  sx={{ width: '100%', marginRight: '5%' }} // Adjust width and margin as needed
                />
               
                  <RHFTextField
                    name="tdsPercentage"
                    label="TDS %"
                    sx={{ width: '100%' }}
                  />
                
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleClose2}>
                Cancel 
              </Button>
              {/* <LoadingButton
                type="submit"
                variant="contained"
                onClick={onSubmit2}
                loading={isSubmitting2}
              >
                Save
              </LoadingButton> */}
              <Button
             sx={{backgroundColor:'#3B82F6'}}
             variant="contained"
             onClick={onSubmit2}
             type="submit"
             >Save
             </Button>
            </DialogActions>
          </FormProvider>
        )}
        {(isTDSVisible && isDaily) &&
         <FormProvider methods={methods3} onSubmit={onSubmit3}>
         <ModalHeader heading="Add PayRoll " />
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
        <RHFAutocomplete
               disablePortal
               name="employementType"
               id="combo-box-demo"
               options={employeepayTypes}
               getOptionLabel={getOptionLabel}
               isOptionEqualToValue={(option, value) => option.type === value.type}
               getOptionSelected={(option, value) => option.type === value.type}
               value={selectedOption}
               onChange={handleAutocompleteChange}
               sx={{ width: '100%', marginRight: '5%' }} 
               renderInput={(params) => <TextField {...params} label="Employee Type" />}
             />

             <RHFAutocomplete
               name="payScheduleType"
               label="Pay Schedule Type"
              //  disabled={selectedOption && (selectedOption.type === 'Hour Wages' || selectedOption.type === 'Daily Wages')}
              //  value={payScheduleType}
              //  onChange={(event, newValue) => setPayScheduleType(newValue)}
               options={payPcheduleTypes2.map((name) => name.type)}
              
               sx={{ width: '100%', marginRight: '5%' }} // Adjust width and margin as needed
             />
           </Box>
         </DialogContent>

         <DialogActions>
           <Button variant="outlined" onClick={handleClose3}>
             Cancel 
           </Button>
           <Button
          sx={{backgroundColor:'#3B82F6'}}
          variant="contained"
          onClick={onSubmit3}
          type="submit"
          >Save
          </Button>
         </DialogActions>
       </FormProvider>
        }

{isHourWage &&  
         <FormProvider methods={methods3} onSubmit={onSubmit3}>
         <ModalHeader heading="Add PayRoll Hourly" />
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
       <RHFAutocomplete
               disablePortal
               name="employementType"
               id="combo-box-demo"
               options={employeepayTypes}
               getOptionLabel={getOptionLabel}
               isOptionEqualToValue={(option, value) => option.type === value.type}
               getOptionSelected={(option, value) => option.type === value.type}
               value={selectedOption}
               onChange={handleAutocompleteChange}
               sx={{ width: '100%', marginRight: '5%' }} 
               renderInput={(params) => <TextField {...params} label="Employee Type" />}
             />

             <RHFAutocomplete
               name="payScheduleType"
               label="Pay Schedule Type"
              //  disabled={selectedOption && (selectedOption.type === 'Hour Wages' || selectedOption.type === 'Daily Wages')}
              //  value={payScheduleType}
              //  onChange={(event, newValue) => setPayScheduleType(newValue)}
               options={payPcheduleTypes3.map((name) => name.type)}
              
               sx={{ width: '100%', marginRight: '5%' }} // Adjust width and margin as needed
             /> 
  
           </Box>
         </DialogContent>

         <DialogActions>
           <Button variant="outlined" onClick={handleClose3}>
             Cancel 
           </Button>
           <Button
          sx={{backgroundColor:'#3B82F6'}}
          variant="contained"
          onClick={onSubmit3}
          type="submit"
          >Save
          </Button>
         </DialogActions>
       </FormProvider>
        }
      </Dialog>
    </>
  );
}

GeneralForminfo.propTypes = {
  currentUser: PropTypes.object,
};
