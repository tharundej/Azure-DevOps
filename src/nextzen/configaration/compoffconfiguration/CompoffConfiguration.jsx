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
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { width } from '@mui/system';
import { Snackbar, Alert } from '@mui/material';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function ComoffConfigurationForm({ currentUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleClose2 = () => {
    setOpen(false);
    reset2();
  };

  const [selectedOption, setSelectedOption] = useState(null); // State to manage the selected option in Autocomplete
  const [isTextFieldVisible, setTextFieldVisible] = useState(false);
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOption(newValue);

    // Check if the selected option should show the text field
    if (newValue) {
      if (newValue.type === 'Leave') {
        setTextFieldVisible(true);
      } else if (newValue.type === 'Encashment') {
        setTextFieldVisible(false);
      }
    }
  };

  const getOptionLabel = (compensatory) => compensatory.type;

  const NewUserSchema1 = Yup.object().shape({
    expiryDays: Yup.number().required('Expiry Days is Required'),
  });

  const NewUserSchema2 = Yup.object().shape({
    amount: Yup.number().required('Amount is Required'),
  });

  const defaultValues1 = useMemo(
    () => ({
      expiryDays: currentUser?.expiryDays || null,
    }),
    [currentUser]
  );

  const defaultValues2 = useMemo(
    () => ({
      amount: currentUser?.amount || null,
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

  const compensatorytypes1 = [{ type: 'Leave' }, { type: 'Encashment' }];

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
    data.compensantoryPolicies = selectedOption?.type;

    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl + '/addCompensantoryConfiguration', data);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleClose();
        console.log('sucess', response?.data?.message);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleClose();
        console.log('sucess', response?.data?.code);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Deleting Leave Period. Please try again.');
      setSnackbarOpen(true);
      handleClose();
      console.log('error', error);
    }
  });

  const onSubmit2 = handleSubmit2(async (data) => {
    data.companyId = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
    data.compensantoryPolicies = selectedOption?.type;
    console.log('submitted data2222', data);

    try {
      const response = await axios.post(baseUrl + '/addCompensantoryConfiguration', data);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleClose();
        console.log('sucess', response?.data?.code);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleClose();
        console.log('sucess', response?.data?.code);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Deleting Leave Period. Please try again.');
      setSnackbarOpen(true);
      handleClose();
      console.log('error', error);
    }
  });
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
        sx={{ margin: '20px', backgroundColor: '#3B82F6' }}
      >
        Add Configuration
      </Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 360 },
        }}
      >
        {isTextFieldVisible ? (
          <FormProvider methods={methods1} onSubmit={onSubmit1}>
            <ModalHeader heading=" Add Compensantory Configuration" />

            <DialogContent>
              <Autocomplete
                disablePortal
                name="compensatory"
                id="combo-box-demo"
                options={compensatorytypes1}
                getOptionLabel={getOptionLabel}
                value={selectedOption} // Use selectedOption or an empty string
                onChange={handleAutocompleteChange}
                sx={{ width: 300, padding: '8px', marginTop: '15px' }}
                renderInput={(params) => <TextField {...params} label="Compensatory" />}
              />
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
                <RHFTextField
                  name="expiryDays"
                  label="Expiry Days"
                  sx={{ width: 280, marginLeft: 1.5 }}
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
        ) : (
          <FormProvider methods={methods2} onSubmit={onSubmit2}>
            <ModalHeader heading=" Add Compensantory Configuration" />

            <DialogContent>
              <Autocomplete
                disablePortal
                name="compensatory"
                id="combo-box-demo"
                options={compensatorytypes1}
                getOptionLabel={getOptionLabel}
                value={selectedOption} // Use selectedOption or an empty string
                onChange={handleAutocompleteChange}
                sx={{ width: 300, padding: '8px', marginTop: '15px' }}
                renderInput={(params) => <TextField {...params} label="Compensatory" />}
              />
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
                <RHFTextField
                  name="amount"
                  label="% of Basic Pay"
                  sx={{ width: 280, marginLeft: 1.5 }}
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
                sx={{ backgroundColor: '#3B82F6' }}
                type="submit"
                variant="contained"
                onClick={onSubmit2}
              >
                Save
              </Button>
            </DialogActions>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}

ComoffConfigurationForm.propTypes = {
  currentUser: PropTypes.object,
};
