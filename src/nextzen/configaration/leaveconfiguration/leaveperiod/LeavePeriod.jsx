import * as React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import {baseUrl} from '../../../global/BaseUrl';
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFAutocomplete } from 'src/components/hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from '@mui/lab';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function LeavePeriod({ currentUser }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedDates, setSelectedDates] = useState(dayjs());
  const [selectedDates2, setSelectedDates2] = useState(dayjs());
  const [locationType, setLocationType] = useState([]);
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
  const [showEdit, setShowEdit] = useState(false);
  const [valueSelected, setValueSelected] = useState();
  const NewUserSchema1 = Yup.object().shape({
    leavePeriodType: Yup.string(),
  });

  const defaultValues1 = useMemo(
    () => ({
      leavePeriodType: currentUser?.leavePeriodType,
    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });
  const leavePeriodNames = [{ type: 'Financial Year' }, { type: 'Year' }];
  const {
    setValue: setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;
  const TABLE_HEAD = [
    { id: 'leavePeriodType', label: 'Leave Period Type', type: 'text', minWidth: 280 },
    { id: 'startDate', label: 'Start Date', type: 'text', minWidth: 280 },
    { id: 'endDate', label: 'End date', type: 'text', minWidth: 180 },
  ];
  const actions = [
    { name: 'Edit', icon: 'solar:pen-bold', path: 'jjj' },
    // { name: 'Delete', icon: 'solar:trash-bin-trash-bold', path: 'jjj' },
  ];

  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    externalFilters: {
      leavePeriodType: '',
    },
    sort: {
      key: 1,
      orderBy: '',
    },
  };
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditData(rowdata);
      setValueSelected(rowdata);
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
        companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
        leavePeriodID: rowdata.leavePeriodID,
      };
      const response = await axios.post(baseUrl + '/deleteLeavePeriod', data);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleCloseEdit();
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        handleCloseEdit();
        console.log('sucess', response);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Deleting Leave Period. Please try again.');
      setSnackbarOpen(true);
      handleCloseEdit();
      console.log('error', error);
    }
  };

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
  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
    data.leavePeriodType = valueSelected?.leavePeriodType || null;
    data.startDate = formatDateToYYYYMMDD(selectedDates);
    data.endDate = formatDateToYYYYMMDD(selectedDates2);
    data.leavePeriodID = valueSelected?.leavePeriodID;
    // data.locationID = formData?.Location?.locationID;
    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl + '/editLeavePeriod', data);
      if (response?.data?.code === 200) {
        handleClose();
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        handleClose();
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Adding Leave Period. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  });
  const handleDateChanges = (date) => {
    setSelectedDates(date);
  };
  const handleDateChanges2 = (date) => {
    setSelectedDates2(date);
  };
  const handleSelectChange = (field, value) => {
    // console.log('values:', value);
    // console.log('event', event.target.value);
    // setSelectedOption(value);
    console.log(field, value, 'valllllllllll');
    setValueSelected((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  console.log(valueSelected, 'valueeeeeeeeeeeeeeeeeeee');
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
    setOpen(false);
  };

  React.useEffect(() => {}, []);
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
          <ModalHeader heading="Edit Leave Period" />

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
                name="leavePeriodType"
                label="Leave Period Type"
                options={leavePeriodNames.map((name) => name.type)}
                value={valueSelected?.leavePeriodType || null}
                //  getOptionLabel={(option) => option.type} // Use 'label' as the display label
                // isOptionEqualToValue={(option, value) => option.value === value}
                onChange={(e, newValue) => handleSelectChange('leavePeriodType', newValue || null)}
                renderInput={(params) => (
                  <TextField {...params} label="Leave Period Type" variant="outlined" />
                )}
                sx={{marginTop:'8px'}}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Start Date"
                    value={selectedDates2}
                    // onChange={handleDateChanges2}
                    onChange={(e, newValue) => handleSelectChange('startDate', newValue || null)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="End Date"
                    value={selectedDates}
                    onChange={handleDateChanges}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
        endpoint="/getAllLeavePeriod"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="LeavePeriodFilterSearch"
        onClickActions={onClickActions}
        
      />
    </>
  );
}
LeavePeriod.propTypes = {
  currentUser: PropTypes.object,
};
