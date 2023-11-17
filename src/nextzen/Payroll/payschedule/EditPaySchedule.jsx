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

export default function EditPaySchedule({ currentUser, handleClose, tableEDitData }) {
  console.log('tableEDitData:', tableEDitData);

  // useEffect(() => {
  //   getEmployeReport();
  // }, []);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(true);
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
  const [selectedOption, setSelectedOption] = useState(tableEDitData); // State to manage the selected option in Autocomplete
  const [autoCompleteChange, setAutoCompleteChange] = useState();
  const [valueSelected, setValueSelected] = useState(tableEDitData);
  console.log(valueSelected,'valueSelectedeeeeeeee')

  const handleSelectChange = (field,value) => {
    // console.log('values:', value);
    // console.log('event', event.target.value);
    // setSelectedOption(value);
    console.log(field,value,'valllllllllll')
    setValueSelected((prevData)=>({
      ...prevData,
      [field]:value,

    }));
    console.log(valueSelected,"valueeeeeeeeeeeeeeeeeeee")
    // tableEDitData.payScheduleType = event.target.value;
    // tableEDitData.basicPayPercentage = event.target.value;
    // tableEDitData.hraPercentage = event.target.value;
    // tableEDitData.daPercentage = event.target.value;
    // tableEDitData.employeePfPercentage = event.target.value;
    // tableEDitData.employerPfPercentage = event.target.value;
    // tableEDitData.ltaPercentage = event.target.value;
    // tableEDitData.esicPercentage = event.target.value;
    // tableEDitData.tdsPercentage = event.target.value;
    // Check if the selected option should show the text field
    
  };
  const handleForms=(event,value)=>{
    console.log(selectedOption,"selectedOption")
    setSelectedOption(value)
    if (value && value.type === 'Permanent') {
      setTextFieldVisible(true);
    } else {
      setTextFieldVisible(false);
    }
  }
  console.log('deb', valueSelected);
  const NewUserSchema1 = Yup.object().shape({
    payScheduleType: Yup.string(),
    basicPayPercentage: Yup.number(),
    hraPercentage: Yup.number(),
    daPercentage: Yup.number(),
    employeePfPercentage: Yup.number(),
    employerPfPercentage: Yup.number(),
    ltaPercentage: Yup.number(),
    esicPercentage: Yup.number(),
    tdsPercentage: Yup.number(),
  });

  const NewUserSchema2 = Yup.object().shape({
    payPcheduleType: Yup.string(),
    tdsPercentage: Yup.number(),
  });

  const defaultValues1 = useMemo(
    () => ({
      payScheduleType: currentUser?.payScheduleType,
      basicPayPercentage: currentUser?.basicPayPercentage,
      hraPercentage: currentUser?.hraPercentage,
      daPercentage: currentUser?.daPercentage,
      employeePfPercentage: currentUser?.employeePfPercentage,
      employerPfPercentage: currentUser?.employerPfPercentage,
      ltaPercentage: currentUser?.ltaPercentage,
      esicPercentage: currentUser?.esicPercentage,
      tdsPercentage: currentUser?.tdsPercentage,
    }),
    [currentUser]
  );
  const defaultValues2 = useMemo(
    () => ({
      payPcheduleType: currentUser?.payPcheduleType,
      tdsPercentage: currentUser?.tdsPercentage,
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



  const employeepayTypes = [{ type: 'Permanent' }, { type: 'Contract' }];
  const payPcheduleTypes = [
    { type: '52-Once a week' },
    { type: '26-Once in a two weeks' },
    { type: '24- Twice a month' },
    { type: '12-Once a month' },
  ];
  const getOptionLabel = (employeepayType) => employeepayType.type;

  const onSubmit1 = handleSubmit1(async (data) => {
    data.employementType=valueSelected.employementType
    console.log('valueSelectedaaaaaaaaaa', data);

    data.company_id = 'COMP1';

    console.log(data, 'valueSelected111ugsghghh');

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
    // data.employee_type = valueSelected?.employementType;
    data.employementType=valueSelected.employementType
    data.tdsPercentage = JSON.parse(valueSelected?.tdsPercentage, 10);

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
  useEffect(() => {
    // Automatically open the dialog when the component mounts
    setOpen(true);
  }, []); 
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
      {/* <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px' }}
      >
        Edit PayRoll
      </Button> */}
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
                <Autocomplete
              disablePortal
              name="employee_type"
              id="combo-box-demo"
              options={employeepayTypes}
              getOptionLabel={getOptionLabel}
              value={valueSelected.employee_type} // Use tableEDitData or an empty string
              onChange={handleForms}
              sx={{ width: 300, padding: '8px' }}
              renderInput={(params) => <TextField {...params} label="Employee Type" />}
            />
                <RHFAutocomplete
                  name="payScheduleType"
                  label="Pay Schedule Type"
                  value={valueSelected.payScheduleType}
                  options={payPcheduleTypes.map((payscheduleType) => payscheduleType.type)}
                  onChange={(e) => handleSelectChange('payPcheduleType', e.target.value)}
                />
                <RHFTextField
                  name="basicPayPercentage"
                  label="Basic Pay %"
                  value={valueSelected.basicPayPercentage}
                  onChange={(e) => handleSelectChange('basicPayPercentage', e.target.value)}
                />

                <RHFTextField
                  name="hraPercentage"
                  label="HRA %"
                  value={valueSelected.hraPercentage}
                  onChange={(e) => handleSelectChange('hraPercentage', e.target.value)}
                />
                <RHFTextField name="daPercentage" label="DA %" value={valueSelected.daPercentage} 
                onChange={(e) => handleSelectChange('daPercentage', e.target.value)}
                />
                <RHFTextField
                  name="employeePfPercentage"
                  label="Employee PF %"
                  value={valueSelected.employeePfPercentage}
                  onChange={(e) => handleSelectChange('employeePfPercentage', e.target.value)}
                />
                <RHFTextField
                  name="employerPfPercentage"
                  label="Employer PF %"
                  value={valueSelected.employerPfPercentage}
                  onChange={(e) => handleSelectChange('employerPfPercentage', e.target.value)}
                />
                <RHFTextField
                  name="ltaPercentage"
                  label="LTA %"
                  value={valueSelected.ltaPercentage}
                  onChange={(e) => handleSelectChange('ltaPercentage', e.target.value)}
                />
                <RHFTextField
                  name="esicPercentage"
                  label="ESIC %"
                  value={valueSelected.esicPercentage}
                  onChange={(e) => handleSelectChange('esicPercentage', e.target.value)}
                />
                <RHFTextField
                  name="tdsPercentage"
                  label="TDS %"
                  value={valueSelected.tdsPercentage}
                  onChange={(e) => handleSelectChange('tdsPercentage', e.target.value)}
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleCloseEdit}>
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
                name="employee_type"
                id="combo-box-demo"
                options={employeepayTypes}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={(option, value) => option.type === value.type}
                getOptionSelected={(option, value) => option.type === value.type}
                value={tableEDitData.employee_type} // Use tableEDitData or an empty string
                onChange={handleForms}
                sx={{
                  width: 300,
                  margin: 'auto',
                  marginTop: 1,
                }}
                renderInput={(params) => <TextField {...params} label="Employee Type" />}
              />
              <RHFAutocomplete
                name="payPcheduleType"
                label="Pay Schedule Type"
                options={payPcheduleTypes.map((payPcheduleType) => payPcheduleType.type)}
                sx={{ width: '100%', marginRight: '5%' }} // Adjust width and margin as needed
              />
                  <RHFTextField
                    name="tdsPercentage"
                    label="TDS %"
                    value={valueSelected?.tdsPercentage}
                    onChange={(e) => handleSelectChange("tdsPercentage", e.target.value)}
                    sx={{ width: '100%' }} 
                  />
                
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined"onClick={handleCloseEdit}>
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