import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import {
  Dialog,
  Grid,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from '@mui/material';
import { Container } from '@mui/system';
import { BasicTable } from '../../../Table/BasicTable';
import Iconify from 'src/components/iconify/iconify';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { da } from 'date-fns/locale';
import { useSnackbar } from 'notistack';

export default function LeaveType({ currentUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const [editData, setEditData] = useState();
  const [valueSelected, setValueSelected] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const leaveTypeNames = [{ type: 'Annual' }, { type: 'Month' }];
  const TABLE_HEAD = [
    { id: 'leaveTypeName', label: 'Leave Name', type: 'text', minWidth: 180 },
    { id: 'gender', label: 'Gender', type: 'text', minWidth: 180 },
    {
      id: 'totalNumberLeave',
      label: 'Total Number Of Leaves Per Year',
      type: 'text',
      minWidth: 280,
    },
    // { id: 'leavePeriodType', label: 'Term Type', type: 'text', minWidth: 180 },
    { id: 'leaveTakeRange', label: 'Max Continuous Leaves', type: 'text', minWidth: 200 },
    { id: 'upperCapLimit', label: 'Max Leaves Hold', type: 'text', minWidth: 180 },
  ];
  const actions = [
    { name: 'Edit', icon: 'solar:pen-bold', path: 'jjj' },
    // { name: 'Delete', icon: 'hh', path: 'jjj' },
  ];
  const defaultPayload = {
    count: 10,
    page: 0,
    search: '',
    //  "companyId": "COMP20",
    companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    externalFilters: {
      leaveTypeName: '',
    },
    sort: {
      key: 1,
      orderBy: '',
    },
  };
  const NewUserSchema1 = Yup.object().shape({
    LeaveName: Yup.string(),
    totalNumberLeave: Yup.number(),
    leaveTypeName: Yup.string(),
    upperCapLimit: Yup.number(),
    leaveTakeRange: Yup.number(),
  });

  const [formData, setFormData] = useState({});
  const [locationType, setLocationType] = useState([]);
  const [selectedDates, setSelectedDates] = useState(dayjs());
  const [leaveNames, setLeaveNames] = useState([]);
  const defaultValues1 = useMemo(
    () => ({
      LeaveName: currentUser?.LeaveName,
      totalNumberLeave: currentUser?.totalNumberLeave,
      leaveTypeName: currentUser?.leaveTypeName,
      upperCapLimit: currentUser?.upperCapLimit,
      leaveTakeRange: currentUser?.leaveTakeRange,
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
  const handleSelectChange = (field, value) => {
    console.log('hi',value)
    setValueSelected((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleGenderChange = (_, value) => {

    setValueSelected((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const fetchLeaveNames = async () => {
    const response = await axios.post(baseUrl + '/GetMasterLeaveDetails');
    if (response?.data?.statusCode === '200') {
      console.log(response?.data?.data, 'coal');
      setLeaveNames(response?.data?.data);
    }
  };

  useEffect(() => {
    fetchLeaveNames();
  }, []);
  console.log(valueSelected, 'valueeeeeeeeeeeeeeeeeeee');
  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyID = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
    data.leaveTakeRange = JSON.parse(valueSelected.leaveTakeRange, 10);
    data.leaveTypeName = valueSelected.leaveTypeName;
    data.totalNumberLeave = JSON.parse(valueSelected.totalNumberLeave, 10);
    data.upperCapLimit = JSON.parse(valueSelected.upperCapLimit, 10);
    data.leaveTypeID = JSON.parse(valueSelected.leaveTypeID, 10);
    data.gender = valueSelected?.gender;
    // data.leavePeriodID=JSON.parse(valueSelected.leavePeriodID,10)
    // data.leavePeriodType=valueSelected.leavePeriodType
    // data.locationID = formData?.Location?.locationID;
    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl + '/editLeaveType2', data);
      if (response?.data?.code === 200) {
        // setSnackbarSeverity('success');
        // setSnackbarMessage(response?.data?.message);
        // setSnackbarOpen(true);
        // handleClose();
        enqueueSnackbar(response?.data?.message, { variant: 'success' });
        handleCloseEdit();
        setCount(count + 1);
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        // setSnackbarSeverity('error');
        // setSnackbarMessage(response?.data?.message);
        // setSnackbarOpen(true);
        // handleCloseEdit();
        enqueueSnackbar(response?.data?.message, { variant: 'error' });
        console.log('sucess', response);
      }
    } catch (error) {
      // setSnackbarSeverity('error');
      // setSnackbarMessage('Error While Adding Leave Type. Please try again.');
      // setSnackbarOpen(true);
      // handleCloseEdit();
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
      console.log('error', error);
    }
  });
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      
      setEditData(rowdata);
      setValueSelected(rowdata);

      handleOpenEdit();
      console.log(rowdata, 'edidataaaa');
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
        companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
        leaveTypeID: rowdata.leaveTypeID,
      };
      const response = await axios.post(baseUrl + '/deleteLeaveType', data);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('error');
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
  const genders = [
    {
      type: 'Male',
    },
    {
      type: 'Female',
    },
    {
      type: 'Others',
    },
  ];


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
        <FormProvider methods={methods1} onSubmit={onSubmit1}>
          <ModalHeader heading="Edit Leave Type" />
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
                name="leaveTypeName"
                options={leaveNames.map((name) => name?.leaveName)}
                
                value={valueSelected?.leaveTypeName}
                label="Leave Name"
                onChange={(e,value) => handleSelectChange('leaveTypeName', value)}
              />
              {/* <RHFTextField
                name="LeaveName"
                label="Leave Name"
                value={valueSelected?.leaveTypeName}
                onChange={(e) => handleSelectChange('leaveTypeName', e.target.value)}
              /> */}
              <RHFTextField
                name="totalNumberLeave"
                label="Total Number Of Leaves Per Year"
                value={valueSelected?.totalNumberLeave}
                onChange={(e) => handleSelectChange('totalNumberLeave', e.target.value)}
              />
              <RHFTextField
                name="upperCapLimit"
                label="Max Leaves Hold"
                value={valueSelected?.upperCapLimit}
                onChange={(e) => handleSelectChange('upperCapLimit', e.target.value)}
              />
              <RHFTextField
                name="leaveTakeRange"
                label="Max Continuous Leaves"
                value={valueSelected?.leaveTakeRange}
                onChange={(e) => handleSelectChange('leaveTakeRange', e.target.value)}
              />
              <Autocomplete
                 multiple
                name="gender"
                label="Gender"
                options={genders.map((name) => name.type)}
                // getOptionLabel={(option) => option.type || undefined}
                value={valueSelected?.gender}
                onChange={handleGenderChange}
                renderInput={(params) => (
                  <TextField {...params} label="Gender" variant="outlined" />
                )}
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
      </Dialog>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getLeaveType"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="LeaveTypeFilterSearch"
        onClickActions={onClickActions}
        count={count}
      />
    </>
  );
}
LeaveType.propTypes = {
  currentUser: PropTypes.object,
};
