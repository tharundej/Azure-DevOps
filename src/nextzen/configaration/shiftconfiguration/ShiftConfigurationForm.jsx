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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// @mui
import dayjs from 'dayjs';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Alert, Snackbar } from '@mui/material';

export default function ShiftConfigurationForm({ currentUser }) {
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [locationType, setLocationType] = useState([]);
  const [startTime, setStartTime] = useState(dayjs('2022-04-17T15:30')); // State for Start Time
  const [endTime, setEndTime] = useState(dayjs('2022-04-17T15:30'));
  const NewUserSchema1 = Yup.object().shape({
    ShiftName: Yup.string().required('Shift Name is Required'),
    ShiftTerm: Yup.string().required('Shift Term is Required'),
  });

  const defaultValues1 = useMemo(
    () => ({
      ShiftName: currentUser?.ShiftName || null,
      ShiftTerm: currentUser?.ShiftTerm || null,
    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });

  const {
    setValue: setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;
  const ShiftNames = [
    { type:'General'},
    { type:'Morning'},
    { type:'AfterNoon'},
    { type:'Night'},
  ];
  const ShiftTerms = [{ type:'Weekly'},{ type:'Monthly'}];

  const handleAutocompleteChange = (name, selectedValue, selectedOption) => {
    console.log(name, selectedValue, selectedOption);
    setFormData({
      ...formData,
      [name]: selectedValue,
      locationID: selectedOption?.locationID,
      locationName: selectedOption?.locationName,
    });
  };

  const getLocation = async () => {
    const payload = {
      companyID: 'COMP1',
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/locationOnboardingDepartment',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo ',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response?.status === 200) {
          const rowsData = response?.data?.data;
          setLocationType(rowsData);
          console.log(JSON.stringify(response?.data?.data), 'result');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  useEffect(() => {
    const fetchData = async () => {
      getLocation();
    };
    fetchData();
  }, []);
  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = 'COMP2';
    data.startTime = startTime.format('HH:mm:ss'); // Append Start Time
    data.endTime = endTime.format('HH:mm:ss'); // Append End Time
    data.locationID = formData?.Location?.locationID;
    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl+'/addShiftConfig', data);
      if(response?.status===200){
        handleClose();
        setSnackbarSeverity('success');
         setSnackbarMessage('Shift Configuration Added Succuessfully!');
         setSnackbarOpen(true);
      
      console.log('sucess', response);
      }
    } catch (error) {
      setOpen(true);
       setSnackbarSeverity('error');
       setSnackbarMessage('Error While Adding Shift Configuration. Please try again.');
       setSnackbarOpen(true);
      console.log('error', error);
    }
  });
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
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px' }}
      >
        Add ExpensiveConfig
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
        <FormProvider methods={methods1} onSubmit={onSubmit1}>
          <DialogTitle>Add ExpensiveConfig</DialogTitle>
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
                freeSolo
                placeholder="Press Enter to Add Custom"
                label="Shift Name"
                name="ShiftName"
                options={ShiftNames.map((name)=>name.type)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  label="Start Time"
                  defaultValue={dayjs('2022-04-17T15:60')}
                  onChange={(newValue) => setStartTime(newValue)}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  label="End Time"
                  defaultValue={dayjs('2022-04-17T15:30')}
                  onChange={(newValue) => setEndTime(newValue)}
                />
              </LocalizationProvider>
              <RHFAutocomplete
                freeSolo
                placeholder="Press Enter to Add Custom"
                label="Shift Term"
                name="ShiftTerm"
                options={ShiftTerms.map((ShiftTerm) => ShiftTerm.type)}
              />

              <Autocomplete
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
              />
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

ShiftConfigurationForm.propTypes = {
  currentUser: PropTypes.object,
};
