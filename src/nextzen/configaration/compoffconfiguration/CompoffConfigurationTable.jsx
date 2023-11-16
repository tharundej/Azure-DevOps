import * as React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { fileData } from 'src/components/file-thumbnail';

export default function CompoffConfigurationTable({ currentUser }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
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
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const [editData, setEditData] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const TABLE_HEAD = [
    { id: 'compensantoryPolicies', label: 'Compensatory', type: 'text', minWidth: 180 },
    { id: 'expiryDays', label: 'Expiry Days', type: 'text', minWidth: 180 },
    { id: 'amount', label: 'Amount', type: 'text', minWidth: 180 },
  ];
  const actions = [
    { name: 'Edit', icon: 'hh', path: 'jjj', endpoint: '/' },
    { name: 'Delete', icon: 'hh', path: 'jjj' },
  ];

  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyId: 'COMP1',
    externalFilters: {
      compensantoryPolicies: '',
    },
    sort: {
      key: 1,
      orderBy: '',
    },
  };
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditData(rowdata);
      setSelectedOption(rowdata);
      setValueSelected(rowdata)
      handleOpenEdit();
      buttonFunction(rowdata, event);
    } else if (event?.name === 'Delete') {
      deleteFunction(rowdata, event);
    }
  };
  const buttonFunction = (rowdata) => {
    setShowEdit(true);
    setEditData(rowdata);
    console.log(rowdata, 'rowdataaaaaaaaaaaaaa');
  };
  const deleteFunction = async (rowdata, event) => {
    console.log('iam here ');
    try {
      console.log(rowdata, 'rowData:::::');
      const data = {
        companyID: 'COMP1',
        compensantoryConfigurationID: rowdata.compensantoryConfigurationID,
      };
      const response = await axios.post(baseUrl + '/deleteCompensantoryConfiguration', data);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Deleting Leave Type. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  };
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(true);
  };
  const [valueSelected, setValueSelected] = useState(); // State to manage the selected option in Autocomplete
  const [isTextFieldVisible, setTextFieldVisible] = useState(false);
  const handleAutocompleteChange = (field, value) => {
    console.log(field, value, 'valllllllllll');
    if (value && value.type === 'Leave') {
      setTextFieldVisible(true);
    }  else  {
      setTextFieldVisible(false);
    }
  
    setValueSelected((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // Check if the selected option should show the text field
    console.log(valueSelected, 'valueeeee');
  };
  const handleForms = (field, newValue) => {
   console.log(field,'dfghjkl')
   
     
      // setValueSelected((prevData) => ({
      //   ...prevData,
      //   [field]: newValue,
      // }));
  };


  const NewUserSchema1 = Yup.object().shape({
    expiryDays: Yup.number(),
  });

  const NewUserSchema2 = Yup.object().shape({
    amount: Yup.number(),
  });

  const defaultValues1 = useMemo(
    () => ({
      expiryDays: currentUser?.expiryDays ,
    }),
    [currentUser]
  );

  const defaultValues2 = useMemo(
    () => ({
      amount: currentUser?.amount ,
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

  const compensatorytypes1 = [{ type: 'Leave' }, { type: 'Incashment' }];
  const getOptionLabel = (compensatory) => compensatory.type;
  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = 'COMP1';
    data.compensantoryPolicies = valueSelected?.compensantoryPolicies?.type
    data.expiryDays=JSON.parse(valueSelected?.expiryDays,10)
    data.compensantoryConfigurationID=valueSelected?.compensantoryConfigurationID
    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl + '/editCompensantoryConfiguration', data);
      console.log('sucess', response);
    } catch (error) {
      console.log('error', error);
    }
  });

  const onSubmit2 = handleSubmit2(async (data) => {
    data.companyId = 'COMP1';
    data.compensantoryPolicies = valueSelected?.compensantoryPolicies?.type
    data.amount=JSON.parse(valueSelected?.amount,10)
    data.compensantoryConfigurationID=valueSelected?.compensantoryConfigurationID
    console.log('submitted data2222', data);

    try {
      const response = await axios.post(baseUrl + '/editCompensantoryConfiguration', data);
      console.log('sucess', response);
    } catch (error) {
      console.log('error', error);
    }
  });

  const [isLargeDevice, setIsLargeDevice] = React.useState(window.innerWidth > 530);

  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth > 530);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(valueSelected, 'valueeeeeeeeeeeeeeeeeeee');


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
        open={openEdit}
        onClick={handleOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        {isTextFieldVisible ? (
          <FormProvider methods={methods1} onSubmit={onSubmit1}>
            <DialogTitle>Edit Comoff Config</DialogTitle>

            <DialogContent>
              <Autocomplete
                disablePortal
                name="compensatory"
                id="combo-box-demo"
                options={compensatorytypes1}
                getOptionLabel={getOptionLabel}
                value={valueSelected?.compensantoryPolicies || null} // Use selectedOption or an empty string
                sx={{ width: 300, padding: '8px' }}
                onChange={ (e,newValue)=>handleAutocompleteChange('compensantoryPolicies',newValue||null)}
                renderInput={(params) => (
                  <TextField {...params} label="Compensantory" variant="outlined" />
                )}
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
                  value={valueSelected?.expiryDays}
                  onChange={(e) => handleAutocompleteChange('expiryDays', e.target.value)}
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
            <DialogTitle>Edit Comoff Config</DialogTitle>

            <DialogContent>
              <Autocomplete
                disablePortal
                name="compensatory"
                id="combo-box-demo"
                options={compensatorytypes1}
                getOptionLabel={getOptionLabel}
                value={valueSelected?.compensantoryPolicies||null} // Use selectedOption or an empty string
                sx={{ width: 300, padding: '8px' }}
                onChange={ (e,newValue)=>handleAutocompleteChange('compensantoryPolicies',newValue||null)}
                renderInput={(params) => (
                  <TextField {...params} label="Compensantory" variant="outlined" />
                )}
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
                  label="amount"
                  value={valueSelected?.amount}
                  onChange={(e) => handleAutocompleteChange('amount', e.target.value)}
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
                onClick={onSubmit2}
                loading={isSubmitting2}
              >
                Save
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        )}
      </Dialog>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getallCompensantoryConfiguration"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="CompoffFilterSearch"
        onClickActions={onClickActions}
      />
    </>
  );
}
CompoffConfigurationTable.propTypes = {
  currentUser: PropTypes.object,
};
