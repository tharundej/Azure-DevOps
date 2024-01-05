import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert, Snackbar } from '@mui/material';
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
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { useSnackbar } from 'notistack';

export default function WorkWeekForm({ currentUser ,getTableData}) {
  const {enqueueSnackbar} = useSnackbar()
  const [formData, setFormData] = useState({});
  const [locationType, setLocationType] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const NewUserSchema1 = Yup.object().shape({
    day: Yup.string().required('Day is Required'),
    action: Yup.string().required('Action Required'),
  });

  const defaultValues1 = useMemo(
    () => ({
      day: currentUser?.day || null,
      action: currentUser?.action || null,
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

  const getLocation = async () => {
    const payload = {
      companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/locationOnboardingDepartment',
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
        if (response.status === 200) {
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

  //   const values = watch();

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = localStorage.getItem('companyID');
    // data.locationID = formData?.Location?.locationID;
    data.locationID = formData?.Location.map((name) => name.locationID);
    console.log('submitted data111', data);
    // handleClose()
    try {
      const response = await axios.post(baseUrl + '/AddWorkWeekV2', data);
      if (response?.data?.code === 200) {
        getTableData()
        // setSnackbarSeverity('success');
        // setSnackbarMessage(response?.data?.message);
        // setSnackbarOpen(true);
        enqueueSnackbar(response?.data?.message,{variant:'success'})
        handleClose();
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        // setSnackbarSeverity('error');
        // setSnackbarMessage(response?.data?.message);
        // setSnackbarOpen(true);
        // handleClose();
        enqueueSnackbar(response?.data?.message,{variant:'error'})
        console.log('sucess', response?.data);
      }
    } catch (error) {
      // setSnackbarSeverity('error');
      // setSnackbarMessage('UnExpected Error. Please try again.');
      // setSnackbarOpen(true);
      // handleClose();
      enqueueSnackbar(error.response.data.message,{variant:'error'})
      console.log('error', error);
    }
  });
  const DayTypes = [
    { type: 'Monday' },
    { type: 'Tuesday' },
    { type: 'Wednesday' },
    { type: 'Thursday' },
    { type: 'Friday' },
    { type: 'Saturday' },
    { type: 'Sunday' },
  ];
  const actionTypes = [
    { type: 'Full Day' },
    { type: 'First Half' },
    { type: 'Second Half' },
    { type: 'Holiday' },
  ];
  const handleAutocompleteChange = (name, selectedValue, selectedOption) => {
    console.log(name, selectedValue, selectedOption);
    setFormData({
      ...formData,
      [name]: selectedValue,
      locationId: selectedOption?.locationID,
      locationName: selectedOption?.locationName,
    });
  };
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
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
        sx={{ margin: '20px', color: 'white', backgroundColor: '#3B82F6' }}
      >
        Add Work Week
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
          <ModalHeader heading="Add Work Week" />
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
                options={(DayTypes && DayTypes.length) ? DayTypes.map((DayType) => DayType.type) : []}
                name="day"
                label="Day"
                // multiple
              />
              <RHFAutocomplete
                options={actionTypes.map((actionType) => actionType.type)}
                name="action"
                label="Action"
              />
              <Autocomplete
                disablePortal
                multiple
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
            {/* <LoadingButton
                type="submit"
                variant="contained"
                onClick={onSubmit1}
                loading={isSubmitting1}
              >
                Save
              </LoadingButton> */}
            <Button
              sx={{ backgroundColor: '#3B82F6' }}
              type="submit"
              variant="contained"
              onClick={onSubmit1}
            >
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

WorkWeekForm.propTypes = {
  currentUser: PropTypes.object,
};
