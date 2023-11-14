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
import { Alert, Snackbar } from '@mui/material';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

export default function GeneralForminfo({ currentUser }) {
  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  //   const [datesUsed, setDatesUsed] = useState({
  //     date_of_birth: dayjs(new Date()),
  //     joining_date: dayjs(new Date()),
  //     offer_date: dayjs(new Date()),
  //   });
  //   const router = useRouter();

  //   const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const handleClose2 = () => {
    setOpen(false);
    reset2();
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const NewUserSchema1 = Yup.object().shape({
    payPcheduleType: Yup.string().required('Payschedule Type is Required'),
    basicPayPercentage: Yup.number().required('Basic Pay is Required'),
    hraPercentage: Yup.number().required('hraPercentage is Required'),
    daPercentage: Yup.number().required('DA is Required'),
    employeePfPercentage: Yup.number().required('Employee PF is Required'),
    employerPfPercentage: Yup.number().required('Employer PF is Required'),
    ltaPercentage: Yup.number().required('LTA is Required'),
    esicPercentage: Yup.number().required('esic is Required'),
    tdsPercentage: Yup.number().required('TDS is Required'),
  });

  const NewUserSchema2 = Yup.object().shape({
    payPcheduleType: Yup.string().required('Payschedule Type is Required'),
    tdsPercentage: Yup.number().required('TDS is Required'),
  });

  const defaultValues1 = useMemo(
    () => ({
      payPcheduleType: currentUser?.payPcheduleType || '',
      basicPayPercentage: currentUser?.basicPayPercentage || null,
      hraPercentage: currentUser?.hraPercentage || null,
      daPercentage: currentUser?.daPercentage || null,
      employeePfPercentage: currentUser?.employeePfPercentage || null,
      employerPfPercentage: currentUser?.employerPfPercentage || null,
      ltaPercentage: currentUser?.ltaPercentage || null,
      esicPercentage: currentUser?.esicPercentage || null,
      tdsPercentage: currentUser?.tdsPercentage || null,
    }),
    [currentUser]
  );
  const defaultValues2 = useMemo(
    () => ({
      payPcheduleType: currentUser?.payPcheduleType || '',
      tdsPercentage: currentUser?.tdsPercentage || null,
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

  const payPcheduleTypes = [
    { type: '52-Once a week' },
    { type: '26-Once in a two weeks' },
    { type: '24- Twice a month' },
    { type: '12-Once a month' },
  ];
  //   const m2 = useForm();
  const employeepayTypes = [{ type: 'Permanent' }, { type: 'Contract' }];

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

  //   const values = watch();

  const onSubmit1 = handleSubmit1(async (data) => {
    data.employementType = selectedOption?.type;
    data.companyId = localStorage.getItem('companyID');
    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl + '/addPaySchedule', data);
      if (response?.status === 200 || 201 && response?.data?.success) {
        handleClose();
        setSnackbarSeverity('success');
        setSnackbarMessage('PayRoll Added Succuessfully!');
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      setOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Adding PayRoll. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  });

  const onSubmit2 = handleSubmit2(async (data) => {
    data.employementType = selectedOption?.type;
    data.companyId = localStorage.getItem('companyID');
    console.log('submitted data2222', data);

    try {
      const response = await axios.post(baseUrl + '/addPaySchedule', data);
      if (response?.status === 200 ||201 && response?.data?.success) {
        handleClose();
        setSnackbarSeverity('success');
        setSnackbarMessage('PayRoll Added Succuessfully!');
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      setOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Adding PayRoll. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  });

  const [selectedOption, setSelectedOption] = useState(null); // State to manage the selected option in Autocomplete
  const [isTextFieldVisible, setTextFieldVisible] = useState(false); // State to manage the visibility of the text field

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOption(newValue);

    // Check if the selected option should show the text field
    if (newValue && newValue.type === 'Permanent') {
      setTextFieldVisible(true);
    } else {
      setTextFieldVisible(false);
    }
  };

  const getOptionLabel = (employeepayType) => employeepayType.type;

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
        autoHideDuration={6000}
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
        sx={{ margin: '20px' }}
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
        {isTextFieldVisible ? (
          // Render the first dialog when isTextFieldVisible is true
          <FormProvider methods={methods1} onSubmit={onSubmit1}>
            {/* methods1={methods1} onSubmit={onSubmit} */}
            <DialogTitle>Add PayRoll</DialogTitle>
            <Autocomplete
              disablePortal
              name="employee_type"
              id="combo-box-demo"
              options={employeepayTypes}
              getOptionLabel={getOptionLabel}
              value={selectedOption} // Use selectedOption or an empty string
              onChange={handleAutocompleteChange}
              sx={{ width: 300, padding: '8px' }}
              renderInput={(params) => <TextField {...params} label="Employee Type" />}
            />
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
                  name="payPcheduleType"
                  label="Pay Schedule Type"
                  options={payPcheduleTypes.map((payPcheduleType) => payPcheduleType.type)}
                />
                <RHFTextField name="basicPayPercentage" label="Basic Pay %" />

                <RHFTextField name="hraPercentage" label="HRA %" />
                <RHFTextField name="daPercentage" label="DA %" />
                <RHFTextField name="employeePfPercentage" label="Employee PF %" />
                <RHFTextField name="employerPfPercentage" label="Employer PF %" />
                <RHFTextField name="ltaPercentage" label="LTA %" />
                <RHFTextField name="esicPercentage" label="ESIC %" />
                <RHFTextField name="tdsPercentage" label="TDS %" />
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
        ) : (
          <FormProvider methods={methods2} onSubmit={onSubmit2}>
            {/* methods1={methods1} onSubmit={onSubmit} */}
            <DialogTitle>Add PayRoll</DialogTitle>
            <Autocomplete
              disablePortal
              name="employee_type"
              id="combo-box-demo"
              options={employeepayTypes}
              getOptionLabel={getOptionLabel}
              value={selectedOption} // Use selectedOption or an empty string
              onChange={handleAutocompleteChange}
              sx={{
                width: 300,
                marginLeft: 1, // Adjust the left margin to align with other elements
                marginTop: 1,
              }}
              renderInput={(params) => <TextField {...params} label="Employee Type" />}
            />
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
                <div>
                <RHFAutocomplete
                  name="payPcheduleType"
                  label="Pay Schedule Type"
                  options={payPcheduleTypes.map((payPcheduleType) => payPcheduleType.type)}
                />
                  <RHFTextField name="tdsPercentage" label="TDS %" />
                </div>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleClose2}>
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                onClick={onSubmit2}
                loading={isSubmitting2}
              >
                Save
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}

GeneralForminfo.propTypes = {
  currentUser: PropTypes.object,
};
