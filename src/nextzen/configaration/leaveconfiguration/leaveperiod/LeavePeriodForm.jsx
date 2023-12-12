import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatDateToYYYYMMDD, formatDate } from 'src/nextzen/global/GetDateFormat';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Alert, Snackbar } from '@mui/material';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import UserContext from 'src/nextzen/context/user/UserConext';
import { ApiHitleavePeriodType } from 'src/nextzen/global/roledropdowns/RoleDropDown';

export default function LeavePeriodForm({ currentUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const user = useContext(UserContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formData, setFormData] = useState({});
  const [selectedDates, setSelectedDates] = useState(dayjs());
  const [selectedDates2, setSelectedDates2] = useState(dayjs());
  const [locationType, setLocationType] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [leavePeriodType, setLeavePeriodType] = useState('');
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const leavePeriodNames = [{ type: 'Financial Year' }, { type: 'Year' }];
  const handleLeavePeriodTypeChange = (event, value) => {
    setLeavePeriodType(value);
    // console.log(leavePeriodType,'leavePeriodType');
    const currentYear = dayjs().year();
    if (value === 'Year') {
      setSelectedStartDate(dayjs(`${currentYear}-01-01`));
      setSelectedEndDate(dayjs(`${currentYear}-12-31`));
    } else if (value === 'Financial Year') {
      const nextYear = currentYear + 1;
      setSelectedStartDate(dayjs(`${currentYear}-04-01`));
      setSelectedEndDate(dayjs(`${nextYear}-03-31`));
    }
  };
  console.log(leavePeriodType,'leavePeriodType');
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const NewUserSchema1 = Yup.object().shape({
    leavePeriodType: Yup.string()
  });

  const defaultValues1 = useMemo(
    () => ({
      leavePeriodType: currentUser?.leavePeriodType || null,
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

  //   const values = watch();
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
  useEffect(() => {
    if (open) {
      async function call() {
        try {
          const Obj = {
            companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          };
          const leaveperiod = await ApiHitleavePeriodType(Obj);
          var optionsArr = { ...options };

          optionsArr.leavePeriodType = leaveperiod;
          // optionsArr.leavePeriodType=desgination;
          console.log(optionsArr, 'optionsArr');

          setOptions(optionsArr);
        } catch (error) {}
      }

      call();
    }
  }, [open]);
  const onSubmit1 = handleSubmit1(async (data) => {
    (data.companyId = JSON.parse(localStorage.getItem('userDetails'))?.companyID),
      (data.startDate = formatDateToYYYYMMDD(selectedDates));
    data.endDate = formatDateToYYYYMMDD(selectedDates2);
    // data.locationID = formData?.Location?.locationID;
    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl + '/addLeavePeriod', data);
      if (response?.data?.code === 200) {
        handleClose();
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleClose();
        reset1();
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleClose();
        console.log('sucess', response);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Adding Leave Period. Please try again.');
      setSnackbarOpen(true);
      handleClose();
      console.log('error', error);
    }
  });
  const handleDateChanges = (date) => {
    setSelectedDates(date);
  };
  const handleDateChanges2 = (date) => {
    setSelectedDates2(date);
  };
  const handleAutocompleteChange = (name, selectedValue, selectedOption) => {
    console.log(name, selectedValue, selectedOption);
    setFormData({
      ...formData,
      [name]: selectedValue,
      locationID: selectedOption?.locationID,
      locationName: selectedOption?.locationName,
    });
  };

  console.log(formData, 'formdata for location');

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
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px', color: 'white', backgroundColor: '#3B82F6' }}
      >
        Add Leave Period
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
          <ModalHeader heading="Add Leave Period" />
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={3}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFAutocomplete
                name="leavePeriodType"
                label="Leave Period Type"
                options={leavePeriodNames.map((name) => name?.type)}
                value={leavePeriodType}
                onChange={(event, value) => {
                  setValue1('leavePeriodType', value); // Update form value
                  handleLeavePeriodTypeChange(event, value); // Handle state update
                }}
                sx={{ marginBottom: '-1px' }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px', marginTop: '-4px' }}
                    label="Start Date"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    // value={null}
                    maxDate={new dayjs()}
                    // onChange={handleDateChanges2}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="End Date"
                    value={selectedEndDate}
                    minDate={selectedStartDate} // Ensure end date cannot be before the selected start date
                    onChange={handleEndDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
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

LeavePeriodForm.propTypes = {
  currentUser: PropTypes.object,
};
