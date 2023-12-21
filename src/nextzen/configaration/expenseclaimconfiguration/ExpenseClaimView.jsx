import React, { useEffect, useState, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import * as Yup from 'yup';
import { useTheme, alpha } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Scrollbar from 'src/components/scrollbar';
import ExpenseClaimForm from './ExpensiveClaimForm';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Snackbar, Alert, IconButton } from '@mui/material';
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
export default function ExpenseClaimView({ currentUser }) {
  const theme = useTheme();
  const color = 'primary';
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [valueSelected, setValueSelected] = useState();
  const handleClose = () => {
    setOpen(false);
    setExpenseName(''); // Resetting the expenseName state to clear the value
    reset1();
  };
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
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
  const [expenseName, setExpenseName] = useState('');
  const [editExpenseName, setEditExpenseName] = useState(null);
  const NewUserSchema1 = Yup.object().shape({
    expenseName: Yup.string().required('Expense Name is Required'),
  });

  const defaultValues1 = useMemo(
    () => ({
      expenseName: currentUser?.expenseName || null,
    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1,
  });

  const {
    setValue: setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
    console.log('submitted data111', data);

    try {
      const response = await axiosInstance.post(baseUrl + '/addExpenseConfig', data);
      console.log(response?.data);
      if (response?.data?.code === 200) {
        reset1();
        handleAddExpenseConfig(data);
        handleCloseDialog();

        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        // handleAddExpenseConfig(data);
        reset1();
        handleCloseDialog();
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        console.log('sucess', response);
      }
    } catch (error) {
      setOpen(false);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Adding Shift Configuration. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  });
  const onSubmit2 = handleSubmit1(async (data) => {
    data.companyId = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
    data.expenseConfigurationID = editExpenseName?.expenseConfigurationID;
    console.log(editExpenseName?.expenseConfigurationID, 'editExpenseName?.expenseConfigurationID');
    try {
      const response = await axiosInstance.post(baseUrl + '/updateExpenseConfig', data);
      console.log(response?.data);
      if (response?.data?.status === '200') {
        reset1();
        handleEditclose();
        getExpenseName();
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        console.log('sucess', response);
      }
      if (response?.data?.status === '400') {
        handleEditclose();
        reset1();
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        console.log('sucess', response);
      }
    } catch (error) {
      setOpen(false);
      setSnackbarSeverity('error');
      setSnackbarMessage('UnExpected Error. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  });
  const getExpenseName = async () => {
    const payload = {
      companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    };
    try {
      const response = await axiosInstance.post(baseUrl + '/getExpenseName', payload);
      console.log(response?.data?.data);
      if (response?.data?.code === 200) {
        const data = response?.data?.data || []; // Access expenseName from the API response
        setExpenseConfigurations(data);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error Fetching Expense Configurations:', error);
    }
  };

  useEffect(() => {
    getExpenseName();
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
                name="expenseName"
                label="Expense Name"
                fullWidth
                value={expenseName}
                onChange={(e) => handlleEdit(e.target.value)}
                sx={{ margin: '0 auto' }} // Adjust width and center the text field
              />
              {/* </div> */}
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
              onSubmit={onSubmit1}
            >
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>

      <Grid container spacing={2} sx={{ p: 3 }}>
        {expenseConfigurations.map((config, index) => (
          <Grid
            lg={2}
            md={2}
            xs={4}
            sx={{
              ...bgGradient({
                direction: '135deg',
                startColor: alpha(theme.palette[color].light, 0.2),
                endColor: alpha(theme.palette[color].main, 0.2),
              }),
              p: 3,
              borderRadius: 2,
              color: `${color}.darker`,
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
            <div style={{ textAlign: 'center' }}>
              <Typography variant="subtitle1">{config?.expenseName}</Typography>
              <IconButton onClick={() => setEditExpenseName(config)}>
                <Iconify icon="material-symbols:edit" />
              </IconButton>
            </div>
          </Grid>
        ))}

        {editExpenseName && (
          <Dialog
            fullWidth
            maxWidth={false}
            open={true} // Open the dialog when editing an expense
            onClose={() => setEditExpenseName(null)} // Close the dialog when canceled
            PaperProps={{
              sx: { maxWidth: 320 },
            }}
          >
            <FormProvider methods={methods1} onSubmit={onSubmit2}>
              {/* Form fields */}
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
        )}
        <Grid />
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
            color: `${color}.darker`,
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
      </Grid>
    </>
  );
}

ExpenseClaimView.propTypes = {
  currentUser: PropTypes.object,
};
