import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
// routes
import { useRouter } from 'src/routes/hooks';
// assets
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios, { Axios } from 'axios';
import instance from 'src/api/BaseURL';
import { Autocomplete } from '@mui/lab';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

export default function EditPaySchedule({ currentUser, handleClose, tableEDitData,handleEditAPICALL }) {
  console.log('tableEDitData:', tableEDitData);

  useEffect(() => {
    getEmployeReport();
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose1 = () => {
    setOpen(false);
    reset1();
  };
  const handleClose2 = () => {
    setOpen(false);
    reset2();
  };
  const [isTextFieldVisible, setTextFieldVisible] = useState(false); // State to manage the visibility of the text field
  const [selectedOption, setSelectedOption] = useState(null); // State to manage the selected option in Autocomplete

  const handleSelectChange = (event, values) => {
    console.log('values:', values);
    setSelectedOption(values);

    // Check if the selected option should show the text field
    if (values && values.type === 'Permanent') {
      setTextFieldVisible(true);
    } else {
      setTextFieldVisible(false);
    }
  };

  const NewUserSchema1 = Yup.object().shape({
    payScheduleType: Yup.string().required('Payschedule Type is Required'),
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
    tdsPercentage: Yup.number().required('TDS is Required'),
  });

  const defaultValues1 = useMemo(
    () => ({
      payScheduleType: currentUser?.payScheduleType || '',
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

  const getEmployeReport = async () => {
    try {
      const data = {
        count: 5,
        page: 1,
        search: '',
        companyId: 'COMP1',
        externalFilters: {
          payscheduleType: '',
          employmentType: '',
          basicPayPercentage: '',
          hraPercentage: '',
          daPercentage: '',
          ltaPercentage: '',
          employerPfPercentage: '',
          employeePfPercentage: '',
          esicPercentage: '',
          tdsPercentage: '',
        },
        sort: {
          key: 1,
          orderBy: '',
        },
      };
      const response = await axios.post(baseUrl + '/getallPaySchedule', data);
      console.log('response.data:', response.data);
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  const employeepayTypes = [{ type: 'Permanent' }, { type: 'Contract' }];
  const payscheduleTypes = [
    { type: '52-Once a week' },
    { type: '26-Once in a two weeks' },
    { type: '24- Twice a month' },
    { type: '12-Once a month' },
  ];
  const getOptionLabel = (employeepayType) => employeepayType.type;

  const onSubmit1 = handleSubmit1(async (data) => {
    console.log('data:', data);

    data.company_id = 'COMP1';
  
    data.payScheduleType = tableEDitData.payScheduleType;
    data.basicPayPercentage = tableEDitData.basicPayPercentage;
    data.hraPercentage = tableEDitData.hraPercentage;
    data.daPercentage = tableEDitData.daPercentage;
    data.employeePfPercentage = tableEDitData.employeePfPercentage;
    data.employerPfPercentage = tableEDitData.employerPfPercentage;
    data.ltaPercentage = tableEDitData.ltaPercentage;
    data.esicPercentage = tableEDitData.esicPercentage;
    data.tdsPercentage = tableEDitData.tdsPercentage;


    console.log(data, 'data111ugsghghh');

    try {
      const response = await axios.post(baseUrl + '/editPaySchedule', data);
      if (response?.data?.code === 200 || 201) {
        handleClose1();
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      console.error(error);
    }
  });
  const onSubmit2 = handleSubmit2(async (data) => {
    console.log('data:', data);
    data.company_id = 'COMP1';

    data.tdsPercentage = tableEDitData.tdsPercentage;

    console.log(data, 'data111ugsghghh');

    try {
      const response = await axios.post(baseUrl + '/editPaySchedule', data);
      if (response?.data?.code === 200 || 201) {
        handleClose2();
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      setOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage(response?.data?.message);
      setSnackbarOpen(true);
      console.log('error', error);
    }
  });
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(true);
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
        Edit PayRoll
      </Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose2}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        {isTextFieldVisible ? (
          // Render the first dialog when isTextFieldVisible is true
          <FormProvider methods={methods1} onSubmit={onSubmit1}>
            <DialogTitle>Edit PayRoll</DialogTitle>
            <Autocomplete
              disablePortal
              name="employee_type"
              id="combo-box-demo"
              options={employeepayTypes}
              getOptionLabel={getOptionLabel}
              value={tableEDitData.employee_type} // Use selectedOption or an empty string
              onChange={handleSelectChange}
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
                  name="payScheduleType"
                  label="Pay Schedule Type"
                  value={tableEDitData.payScheduleType}
                  options={payscheduleTypes.map((payscheduleType) => payscheduleType.type)}
                />
                <RHFTextField
                  name="basicPayPercentage"
                  label="Basic Pay %"
                  value={tableEDitData.basicPayPercentage}
                />

                <RHFTextField
                  name="hraPercentage"
                  label="HRA %"
                  value={tableEDitData.hraPercentage}
                />
                <RHFTextField name="daPercentage" label="DA %" value={tableEDitData.daPercentage} />
                <RHFTextField
                  name="employeePfPercentage"
                  label="Employee PF %"
                  value={tableEDitData.employeePfPercentage}
                />
                <RHFTextField
                  name="employerPfPercentage"
                  label="Employer PF %"
                  value={tableEDitData.employerPfPercentage}
                />
                <RHFTextField
                  name="ltaPercentage"
                  label="LTA %"
                  value={tableEDitData.ltaPercentage}
                />
                <RHFTextField
                  name="esicPercentage"
                  label="ESIC %"
                  value={tableEDitData.esicPercentage}
                />
                <RHFTextField
                  name="tdsPercentage"
                  label="TDS %"
                  value={tableEDitData.tdsPercentage}
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleClose1}>
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
            <DialogTitle>Edit PayRoll</DialogTitle>
            <Autocomplete
              disablePortal
              name="employee_type"
              id="combo-box-demo"
              options={employeepayTypes}
              getOptionLabel={getOptionLabel}
              value={tableEDitData.employee_type} // Use selectedOption or an empty string
              onChange={handleSelectChange}
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
                  <RHFTextField
                    name="tdsPercentage"
                    label="TDS %"
                    value={tableEDitData.tdsPercentage}
                  />
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
EditPaySchedule.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
