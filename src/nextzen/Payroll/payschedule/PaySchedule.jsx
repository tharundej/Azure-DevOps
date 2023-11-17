import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { _userList } from 'src/_mock';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify/iconify';

import {
  TextField,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Grid,
  useTheme,
  Snackbar,
  Alert,
  Dialog,
} from '@mui/material';
import GeneralForminfo from './GeneralForminfo';
import PayScheduleform from './PayScheduleform';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import EditPaySchedule from './EditPaySchedule';
import { button } from 'src/theme/overrides/components/button';
import FormProvider from 'src/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
// import useTheme from '@mui/material';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function PaySchedule({currentUser}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const TABLE_HEAD = [
    { id: 'employementType', label: 'Employee Type', type: 'text', minWidth: 140 },
    { id: 'payPcheduleType', label: 'Pay Schedule Type', type: 'text', minWidth: 140 },
    { id: 'basicPayPercentage', label: 'Basic Pay %', type: 'text', minWidth: 120 },
    { id: 'hraPercentage', label: 'HRA %', type: 'text', minWidth: 100 },
    { id: 'daPercentage', label: 'DA %', type: 'text', minWidth: 100 },
    { id: 'ltaPercentage', label: 'LTA %', type: 'text', minWidth: 100 },
    { id: 'employeePfPercentage', label: 'Employee PF %', type: 'text', minWidth: 100 },
    { id: 'employerPfPercentage', label: 'Employer PF %', type: 'text', minWidth: 100 },
    { id: 'esicPercentage', label: 'ESIC %', type: 'text', minWidth: 100 },
    { id: 'tdsPercentage', label: 'TDS %', type: 'text', minWidth: 100 },
  ];
  const actions = [
    { name: 'Edit', icon: 'hh', id: '1', type: 'serviceCall', endpoint: '/updateTimesheetStatus' },
    {
      name: 'Delete',
      icon: 'hh',
      path: 'jjj',
      type: 'serviceCall',
      endpoint: '/updateTimesheetStatus',
    },
  ];
  const bodyContent = [
    {
      employeeType: 'Permanent',
      payscheduleType: 'Weekly',
      payType: 'CTC',
      basicPay: '40',
      hra: '20',
      da: '8',
      employeePf: '6',
      employerPf: '6',
      tds: '20',
    },
  ];
  const NewUserSchema2 = Yup.object().shape({
    payPcheduleType: Yup.string(),
    tdsPercentage: Yup.number(),
  });
  const defaultValues2 = useMemo(
    () => ({
      payPcheduleType: currentUser?.payPcheduleType,
      tdsPercentage: currentUser?.tdsPercentage,
    }),
    [currentUser]
  );
  const methods2 = useForm({
    resolver: yupResolver(NewUserSchema2),
    defaultValues: defaultValues2, // Use defaultValues instead of defaultValues2
  });
 
  const defaultPayload = {
    count: 5,
    page: 0,
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

  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
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
        companyId: 'COMP1',
        payScheduleID: JSON.parse(rowdata.payScheduleId, 10),
      };
      const response = await axios.post(baseUrl + '/deletePaySchedule', data);
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
      setSnackbarMessage('Error While Deleting Pay Schedule. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const [showEdit, setShowEdit] = useState(false);
  const [tableEDitData, SetTableEditData] = useState({});
  const handleEditClose = () => setShowEdit(false);
  const handleClose2 = () => {
    setOpen(false);
    reset2();
  };
  const [isTextFieldVisible, setTextFieldVisible] = useState(false);
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
          onClick={handleOpenEdit}
          onClose={handleClose2}
          PaperProps={{
            sx: { maxWidth: 720 },
          }}
        >
          {isTextFieldVisible ? (
            // Render the first dialog when isTextFieldVisible is true
            <FormProvider
             methods={methods1} onSubmit={onSubmit1}>
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
                value={valueSelected.employee_type||null} // Use tableEDitData or an empty string
                onChange={ (e,newValue)=>handleSelectChange('employee_type',newValue||null)}
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
                  onChange={ (e,newValue)=>handleSelectChange('employee_type',newValue||null)}
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
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getallPaySchedule"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="PayScheduleFilterSearch"
        onClickActions={onClickActions}
        //  bodyData='data'
        // buttonFunction={buttonFunction}
      />
    </>
  );
}
PaySchedule.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
