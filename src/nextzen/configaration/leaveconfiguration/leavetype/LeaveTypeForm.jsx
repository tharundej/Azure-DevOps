import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// @mui
import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import { Alert, Snackbar } from '@mui/material';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

export default function LeaveTypeForm({ currentUser}) {
  const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const NewUserSchema1 = Yup.object().shape({
    LeaveName: Yup.string().required('Leave Name is Required'),
    totalNumberLeave: Yup.number().required('Total Number Of Leaves is Required'),
    leaveTypeName: Yup.string().required('Term Type is Required'),
    upperCapLimit: Yup.number().required('El Upper Cap Limit is Required'),
    leaveTakeRange: Yup.number().required('El Taken Range is Required'),
  });

  const [formData, setFormData] = useState({});
  const [locationType, setLocationType] = useState([]);
  const [selectedDates, setSelectedDates] = useState(dayjs());

  const defaultValues1 = useMemo(
    () => ({
      LeaveName: currentUser?.LeaveName || null,
      totalNumberLeave: currentUser?.totalNumberLeave || null,
      leaveTypeName: currentUser?.leaveTypeName || null,
      upperCapLimit: currentUser?.upperCapLimit || null,
      leaveTakeRange: currentUser?.leaveTakeRange || null,

    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });


  const {
    setValue:setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;



  //   const values = watch();

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId=localStorage.getItem('companyID')
    // data.locationID = formData?.Location?.locationID;
    console.log('submitted data111', data);

    try {
      const response = await axios.post(
        'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/addLeaveType',
        data
      );
      if(response?.data?.code===200  ){
        setSnackbarSeverity('success');
         setSnackbarMessage(response?.data?.message);
         setSnackbarOpen(true);
         handleClose()
      
      console.log('sucess', response);

      }
      if(response?.data?.code===400  ){
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
         setSnackbarOpen(true);
      
      console.log('sucess', response);

      }
    
  } catch (error) {
    setSnackbarSeverity('error');
    setSnackbarMessage('Error While Adding Leave Type. Please try again.');
    setSnackbarOpen(true);
   console.log('error', error);
 }
  });
  // const getLocation = async () => {
  //   const payload = {
  //     companyID: 'COMP1',
  //   };

  //   const config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/locationOnboardingDepartment',
  //     headers: {
  //       Authorization:
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo ',
  //       'Content-Type': 'text/plain',
  //     },
  //     data: payload,
  //   };
  //   const result = await axios
  //     .request(config)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const rowsData = response?.data?.data;
  //         setLocationType(rowsData);
  //         console.log(JSON.stringify(response?.data?.data), 'result');

  //         console.log(response);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   //  console.log(result, 'resultsreults');
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     getLocation();
  //   };
  //   fetchData();
  // }, []);

  const handleDateChanges = (date) => {
    setSelectedDates(date);
  };
  const leaveTypeNames=[
    {type:'Annual'},
    {type:'Month'}
  ]

const handleAutocompleteChange = (name, selectedValue, selectedOption) => {
  console.log(name, selectedValue, selectedOption);
  setFormData({
    ...formData,
    [name]: selectedValue,
    locationID: selectedOption?.locationID,
    locationName: selectedOption?.locationName,
  });
};
const snackBarAlertHandleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
setSnackbarOpen(false)
  setOpen(true);
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
    <Alert onClose={snackBarAlertHandleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
      {snackbarMessage}
    </Alert>
  </Snackbar>
      <Button onClick={handleOpen}  variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}>Add Leave Type</Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}

      >  
          <FormProvider methods={methods1} onSubmit={onSubmit1}>
            <DialogTitle sx={{alignItems:'center',justifyContent:'center',display:'flex'}}>Add Leave Type</DialogTitle>
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
                {/* <Autocomplete
                disablePortal
                name="Location"
                id="combo-box-demo"
                options={locationType?.map((employeepayType) => ({
                  label: employeepayType.locationName,
                  value: employeepayType.locationName,
                  ...employeepayType,
                }))}
                onChange={(event, newValue, selectedOption) =>
                  handleAutocompleteChange('Location', newValue, selectedOption)
                }
                renderInput={(params) => <TextField {...params} label="Location" />}
              /> */}
                <RHFTextField name="LeaveName" label="Leave Name"/>
                <RHFTextField name="totalNumberLeave" label="Total Number Of Leaves" />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Start Date"
                    value={selectedDates}
                    onChange={handleDateChanges}
                  />
                </DemoContainer>
              </LocalizationProvider> */}
                <RHFTextField name="upperCapLimit" label="EL Upper Cap Limit" />
                <RHFAutocomplete name="leaveTypeName" label="Term Type" options={leaveTypeNames.map((name)=>name.type)}/>
                <RHFTextField name="leaveTakeRange" label="Leave Take Range"/>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                onClick={onSubmit1}
                loading={isSubmitting1}
              >
                Save
              </LoadingButton>
            </DialogActions>
          </FormProvider>
      </Dialog>
    </>
  );
}

LeaveTypeForm.propTypes = {
  currentUser: PropTypes.object,
};
