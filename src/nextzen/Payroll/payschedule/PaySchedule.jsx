import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GeneralForminfo from './GeneralForminfo';
import PayScheduleform from './PayScheduleform';
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import EditPaySchedule from './EditPaySchedule';
import { button } from 'src/theme/overrides/components/button';
import FormProvider from 'src/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { parse } from 'date-fns';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import UserContext from 'src/nextzen/context/user/UserConext';
import { useContext } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSnackbar } from '../../../components/snackbar';
// import useTheme from '@mui/material';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function PaySchedule({ currentUser }) {
  const { enqueueSnackbar } = useSnackbar();

  // const baseUrl ="https://2d56hsdn-3001.inc1.devtunnels.ms/erp"
  // const baseUrl = ' https://2d56hsdn-3001.inc1.devtunnels.ms/erp'
  const { user } = useContext(UserContext);
  const empId = user?.employeeID ? user?.employeeID : '';
  const cmpId = user?.companyID ? user?.companyID : '';
  const roleId = user?.roleID ? user?.roleID : '';
  const token = user?.accessToken ? user?.accessToken : '';
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [valueSelected, setValueSelected] = useState();
  const [isTextFieldVisible, setTextFieldVisible] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [isTDSVisible, setTDSVisible] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenEdit(false);
    reset1();
  };
  const [count, setCount] = useState();

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const TABLE_HEAD = [
    { id: 'employementType', label: 'Employee Type', type: 'text', minWidth: 140 },
    { id: 'payPcheduleType', label: 'Pay Schedule Type', type: 'text', minWidth: 180 },
    { id: 'basicPayPercentage', label: 'Basic Pay %', type: 'text', minWidth: 120 },
    { id: 'hraPercentage', label: 'HRA %', type: 'text', minWidth: 100 },
    { id: 'daPercentage', label: 'DA %', type: 'text', minWidth: 100 },
    { id: 'ltaPercentage', label: 'LTA %', type: 'text', minWidth: 100 },
    { id: 'employeePfPercentage', label: 'Employee PF %', type: 'text', minWidth: 140 },
    { id: 'employerPfPercentage', label: 'Employer PF %', type: 'text', minWidth: 140 },
    { id: 'esicPercentage', label: 'ESIC %', type: 'text', minWidth: 100 },
    { id: 'tdsPercentage', label: 'TDS %', type: 'text', minWidth: 100 },
  ];

  const actions = [
    {
      name: 'Edit',
      icon: 'solar:pen-bold',
      id: '1',
      type: 'serviceCall',
      endpoint: '/updateTimesheetStatus',
    },
    {
      name: 'Delete',
      icon: 'solar:trash-bin-trash-bold',
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
  const defaultPayload = {
    count: 10,
    page: 0,
    search: '',
    companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
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
    // employementType:Yup.string(),
  });

  const NewUserSchema2 = Yup.object().shape({
    // employementType:Yup.string(),
    payPcheduleType: Yup.string(),
    tdsPercentage: Yup.number(),
  });

  const NewUserSchema3 = Yup.object().shape({
    payPcheduleType: Yup.string(),
  });

  const defaultValues1 = useMemo(
    () => ({
      payPcheduleType: currentUser?.payPcheduleType,
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

  const defaultValues3 = useMemo(
    () => ({
      payPcheduleType: currentUser?.payPcheduleType,
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

  const methods3 = useForm({
    resolver: yupResolver(NewUserSchema3),
    defaultValues: defaultValues3, // Use defaultValues instead of defaultValues2
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

  const {
    setValue: setValue3,
    handleSubmit: handleSubmit3,
    formState: { isSubmitting: isSubmitting3 },
    reset: reset3,
  } = methods3;

  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      buttonFunction(rowdata, event);
      handleOpenEdit();
    } else if (event?.name === 'Delete') {
      deleteFunction(rowdata, event);
    }
  };
  const buttonFunction = (rowdata) => {
    setShowEdit(true);
    setValueSelected(rowdata);

    {
      rowdata?.employementType === 'Contract'
        ? setTextFieldVisible(false)
        : setTextFieldVisible(true);
    }
    // setEditData(rowdata);
    console.log(rowdata, 'rowdataaaaaaaaaaaaaa');
  };

  console.log(valueSelected, 'valueeeeee');
  const deleteFunction = async (rowdata, event) => {
    console.log('iam here ');
    try {
      console.log(rowdata, 'rowData:::::');
      const data = {
        companyId: cmpId,
        payScheduleID: JSON.parse(rowdata.payScheduleId, 10),
      };
      const response = await axios.post(baseUrl + '/deletePaySchedule', data);

      if (response?.data?.code === 200) {
        handleClose();
        enqueueSnackbar(response.data.message, { variant: 'success' });
        // setLoading(false)
        setCount(count + 1);
      }
      if (response?.code === 400) {
        handleClose();
        enqueueSnackbar(response.data.message, { variant: 'error' });
        // setLoading(false)
        setCount(count + 1);
      }
    } catch (error) {
      enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      // setLoading(false)
      console.log('error', error);
    }
  };
  const employeepayTypes = ['Permanent', 'Contract', 'Daily Wise', 'Hour Wise'];
  const payPcheduleTypes = [
    { type: '52-Once a week' },
    { type: '26-Once in a two weeks' },
    { type: '24- Twice a month' },
    { type: '12-Once a month' },
    {type: '366- Once a day'},
    {type: 'Hour a day'}
  ];
  const [showEdit, setShowEdit] = useState(false);
  const [tableEDitData, SetTableEditData] = useState({});
  const handleEditClose = () => setShowEdit(false);

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

  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(true);
  };
  const getOptionLabel = (employeepayType) => employeepayType;

  // const getOptionLabel1 = (payPcheduleType) => payPcheduleType.type;
  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyID = cmpId;
    // (data.employementType = valueSelected?.employementType?.type),

    (data.payPcheduleType = valueSelected?.payPcheduleType?.type),
      (data.employee_type = valueSelected?.employementType),
      (data.basicPayPercentage = JSON.parse(valueSelected?.basicPayPercentage, 10)),
      (data.daPercentage = JSON.parse(valueSelected?.daPercentage, 10)),
      (data.employeePfPercentage = JSON.parse(valueSelected?.employeePfPercentage, 10)),
      (data.employerPfPercentage = JSON.parse(valueSelected?.employerPfPercentage, 10)),
      (data.esicPercentage = JSON.parse(valueSelected?.esicPercentage, 10)),
      (data.hraPercentage = JSON.parse(valueSelected?.hraPercentage, 10)),
      (data.ltaPercentage = JSON.parse(valueSelected?.ltaPercentage, 10)),
      (data.tdsPercentage = JSON.parse(valueSelected?.tdsPercentage, 10)),
      (data.payScheduleId = valueSelected?.payScheduleId);
    // (data.employementType = valueSelected?.employementType),
    data.payScheduleType = valueSelected?.payPcheduleType;
    console.log('valueSelectedaaaaaaaaaa', data);

    console.log(valueSelected?.employementType?.type, 'abc');

    try {
      const response = await axios.post(baseUrl + '/editPaySchedule', data);
      if (response?.data?.code === 200) {
        handleClose();
        enqueueSnackbar(response.data.message, { variant: 'success' });
        // setLoading(false)
        setCount(count + 1);
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        handleClose();
        enqueueSnackbar(response.data.message, { variant: 'error' });
        // setLoading(false)

        console.log('sucess', response);
      }
    } catch (error) {
      enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      // setLoading(false)
      console.log('error', error);
    }
  });

  const onSubmitEdit2 = async (valueSelected, event) => {
    console.log(valueSelected, 'editData');
    try {
      event.preventDefault();
      const payload = {
        tdsPercentage: JSON.parse(valueSelected?.tdsPercentage, 10),
        companyId: cmpId,
        payScheduleId: valueSelected?.payScheduleId,
        employee_type: valueSelected?.employementType,
        payScheduleType: valueSelected?.payPcheduleType,
      };
      console.log(payload, 'payload');
      const response = await axios.post(baseUrl + '/editPaySchedule', payload);
      if (response?.data?.code === 200) {
        handleClose();
        enqueueSnackbar(response.data.message, { variant: 'success' });
        // setLoading(false)
        setCount(count + 1);
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        handleClose();
        enqueueSnackbar(response.data.message, { variant: 'error' });
        // setLoading(false)
        setCount(count + 1);
        console.log('sucess', response);
      }
    } catch (error) {
      enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      // setLoading(false)
      console.log('error', error);
    }
  };

  const onSubmitEdit3 = async (valueSelected, event) => {
    console.log(valueSelected, 'editData');
    try {
      event.preventDefault();
      const payload = {
        companyId: cmpId,
        payScheduleId: valueSelected?.payScheduleId,
        employee_type: valueSelected?.employementType,
        payScheduleType: valueSelected?.payPcheduleType,
      };
      console.log(payload, 'payload');
      const response = await axios.post(baseUrl + '/editPaySchedule', payload);
      if (response?.data?.code === 200) {
        handleClose();
        enqueueSnackbar(response.data.message, { variant: 'success' });
        // setLoading(false)
        setCount(count + 1);
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        handleClose();
        enqueueSnackbar(response.data.message, { variant: 'error' });
        // setLoading(false)
        setCount(count + 1);
        console.log('sucess', response);
      }
    } catch (error) {
      enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      // setLoading(false)
      console.log('error', error);
    }
  };
  const handleSelectChange = (field, value) => {
    console.log('values:', value);
    // console.log('event', event.target.value);

    setValueSelected((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  console.log(valueSelected, 'valllllllllll');
  const handleAutocompleteChange = (field, value) => {
    console.log(field, 'field1');
    setSelectedOption(value);
    if (value) {
      if (value === 'Permanent') {
        setTextFieldVisible(true);
        const updatedValueSelected = { ...valueSelected };
        updatedValueSelected.employementType = value;
        setValueSelected(updatedValueSelected);
      } else if (value === 'Contract') {
        setTextFieldVisible(false);
        const updatedValueSelected = { ...valueSelected };
        updatedValueSelected.employementType = value;
        setValueSelected(updatedValueSelected);
      }
      if (newValue && (newValue.type === 'Hour Wise' || newValue.type === 'Daily Wise')) {
        setTDSVisible(true);
      } else {
        setTDSVisible(false);
      }
    }
  };
  console.log(valueSelected?.employementType, 'empltype');
  //   useEffect(()=>{
  // console.log("calling useEffect")
  //   },[valueSelected?.employementType])
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
        {valueSelected?.employementType === 'permanent' ||
          (valueSelected?.employementType === 'Permanent' && (
            // Render the first dialog when isTextFieldVisible is true
            <FormProvider methods={methods1} onSubmit={onSubmit1}>
              <ModalHeader heading="Edit PayRoll" />
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
                  {console.log(valueSelected, 'employeetype')}
                  <Autocomplete
                    name="employementType"
                    label="Pay Schedule Type"
                    value={valueSelected?.employementType || null}
                    options={employeepayTypes}
                    // getOptionLabel={(option) => option.type}
                    onChange={(e, newValue) =>
                      handleSelectChange('employementType', newValue || null)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Employement Type" variant="outlined" />
                    )}
                  />
                  <Autocomplete
                    name="payScheduleType"
                    label="Pay Schedule Type"
                    value={valueSelected?.payPcheduleType || null}
                    options={payPcheduleTypes.map((name) => name.type)}
                    // getOptionLabel={(option) => option.type}
                    onChange={(e, newValue) =>
                      handleSelectChange('payPcheduleType', newValue || null)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Pay Pchedule Type" variant="outlined" />
                    )}
                  />
                  <RHFTextField
                    name="basicPayPercentage"
                    label="Basic Pay %"
                    value={valueSelected?.basicPayPercentage}
                    onChange={(e) => handleSelectChange('basicPayPercentage', e.target.value)}
                  />

                  <RHFTextField
                    name="hraPercentage"
                    label="HRA %"
                    value={valueSelected?.hraPercentage}
                    onChange={(e) => handleSelectChange('hraPercentage', e.target.value)}
                  />
                  <RHFTextField
                    name="daPercentage"
                    label="DA %"
                    value={valueSelected?.daPercentage}
                    onChange={(e) => handleSelectChange('daPercentage', e.target.value)}
                  />
                  <RHFTextField
                    name="employeePfPercentage"
                    label="Employee PF %"
                    value={valueSelected?.employeePfPercentage}
                    onChange={(e) => handleSelectChange('employeePfPercentage', e.target.value)}
                  />
                  <RHFTextField
                    name="employerPfPercentage"
                    label="Employer PF %"
                    value={valueSelected?.employerPfPercentage}
                    onChange={(e) => handleSelectChange('employerPfPercentage', e.target.value)}
                  />
                  <RHFTextField
                    name="ltaPercentage"
                    label="LTA %"
                    value={valueSelected?.ltaPercentage}
                    onChange={(e) => handleSelectChange('ltaPercentage', e.target.value)}
                  />
                  <RHFTextField
                    name="esicPercentage"
                    label="ESIC %"
                    value={valueSelected?.esicPercentage}
                    onChange={(e) => handleSelectChange('esicPercentage', e.target.value)}
                  />
                  <RHFTextField
                    name="tdsPercentage"
                    label="TDS %"
                    value={valueSelected?.tdsPercentage}
                    onChange={(e) => handleSelectChange('tdsPercentage', e.target.value)}
                  />
                </Box>
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" onClick={handleCloseEdit}>
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
                  variant="contained"
                  onClick={onSubmit1}
                  type="submit"
                >
                  Save
                </Button>
              </DialogActions>
            </FormProvider>
          ))}
        {valueSelected?.employementType === 'contract' ||
          (valueSelected?.employementType === 'Contract' && (
            <FormProvider
              methods={methods2}
              onSubmit={(event) => onSubmitEdit2(valueSelected, event)}
            >
              <ModalHeader heading="Edit PayRoll" />
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
                  {console.log(valueSelected?.employementType, 'employeetype')}

                  <Autocomplete
                    name="employementType"
                    label="Pay Schedule Type"
                    value={valueSelected?.employementType || null}
                    options={employeepayTypes}
                    // getOptionLabel={(option) => option.type}
                    onChange={(e, newValue) =>
                      handleSelectChange('employementType', newValue || null)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Employement Type" variant="outlined" />
                    )}
                  />
                  {console.log('valueSelected?.payPcheduleType ', valueSelected?.payPcheduleType)}
                  <Autocomplete
                    name="employementType"
                    label="Pay Schedule Type"
                    value={valueSelected?.payPcheduleType || null}
                    options={payPcheduleTypes.map((name) => name.type)}
                    // getOptionLabel={(option) => option.type}
                    onChange={(e, newValue) =>
                      handleSelectChange('payPcheduleType', newValue || null)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Pay Pchedule Type" variant="outlined" />
                    )}
                  />
                  <RHFTextField
                    name="tdsPercentage"
                    label="TDS %"
                    value={valueSelected?.tdsPercentage}
                    onChange={(e) => handleSelectChange('tdsPercentage', e.target.value)}
                    sx={{ width: '100%' }}
                  />
                </Box>
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" onClick={handleCloseEdit}>
                  Cancel
                </Button>
                <Button
                  sx={{ backgroundColor: '#3B82F6' }}
                  variant="contained"
                  onClick={(event) => onSubmitEdit2(valueSelected, event)}
                  type="submit"
                >
                  Save
                </Button>
              </DialogActions>
            </FormProvider>
          ))}
        {(valueSelected?.employementType === 'Hour Wise' ||
          valueSelected?.employementType === 'Daily Wise') && (
          <FormProvider
            methods={methods3}
            onSubmit={(event) => onSubmitEdit3(valueSelected, event)}
          >
            <ModalHeader heading="Edit PayRoll" />
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
                {console.log(valueSelected?.employementType, 'employeetype')}

                <Autocomplete
                  name="employementType"
                  label="Pay Schedule Type"
                  value={valueSelected?.employementType || null}
                  options={employeepayTypes}
                  // getOptionLabel={(option) => option.type}
                  onChange={(e, newValue) =>
                    handleSelectChange('employementType', newValue || null)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Employement Type" variant="outlined" />
                  )}
                />
                {console.log('valueSelected?.payPcheduleType ', valueSelected?.payPcheduleType)}
                <Autocomplete
                  name="employementType"
                  label="Pay Schedule Type"
                  value={valueSelected?.payPcheduleType || null}
                  options={payPcheduleTypes.map((name) => name.type)}
                  // getOptionLabel={(option) => option.type}
                  onChange={(e, newValue) =>
                    handleSelectChange('payPcheduleType', newValue || null)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Pay Pchedule Type" variant="outlined" />
                  )}
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleCloseEdit}>
                Cancel
              </Button>
              <Button
                sx={{ backgroundColor: '#3B82F6' }}
                variant="contained"
                onClick={(event) => onSubmitEdit3(valueSelected, event)}
                type="submit"
              >
                Save
              </Button>
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
        count={count}
      />
    </>
  );
}
PaySchedule.propTypes = {
  currentUser: PropTypes.object,
};
