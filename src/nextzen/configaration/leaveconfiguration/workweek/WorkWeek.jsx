import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from '../../../Table/BasicTable';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Alert, Snackbar } from '@mui/material';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { useSnackbar } from 'notistack';
export default function WorkWeek({ currentUser }) {
  const {enqueueSnackbar} = useSnackbar()
  const [formData, setFormData] = useState({});
  const [locationType, setLocationType] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [valueSelected, setValueSelected] = useState();
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const NewUserSchema1 = Yup.object().shape({
    day: Yup.string(),
    action: Yup.string(),
  });

  const defaultValues1 = useMemo(
    () => ({
      day: currentUser?.day,
      action: currentUser?.action,
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

  const TABLE_HEAD = [
    { id: 'day', label: 'Day', type: 'text', minWidth: 280 },
    { id: 'action', label: 'Action', type: 'text', minWidth: 280 },
    { id: 'locationName', label: 'Location', type: 'text', minWidth: 280 },
  ];
  const actions = [
    { name: 'Edit', icon: 'solar:pen-bold', path: 'jjj' },
    // { name: 'View', icon: 'hh', path: 'jjj' },
  ];
  const defaultPayload = {
    count: 10,
    page: 0,
    search: '',
    companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    externalFilters: {
      locationName: '',
    },
    sort: {
      key: 1,
      orderBy: '',
    },
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
    data.locationID = valueSelected?.locationID
    data.day=valueSelected?.day
    data.action=valueSelected?.action
    data.workweekID=JSON.parse(valueSelected?.workweekID,10)
    console.log('submitted data111', data);
    handleCloseEdit()
    try {
      const response = await axios.post(baseUrl + '/editWorkWeekV2', data);
      if (response?.data?.code === 200) {
        // setSnackbarSeverity('success');
        // setSnackbarMessage(response?.data?.message);
        // setSnackbarOpen(true);
        enqueueSnackbar(response?.data?.message,{variant:'success'})
        handleClose();
        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        // setSnackbarSeverity('error');
        // setSnackbarMessage(response?.data?.message);
        // setSnackbarOpen(true);
        // handleClose();
        enqueueSnackbar(response?.data?.message,{variant:'error'})
        console.log('sucess', response);
      }
    } catch (error) {
      // setSnackbarSeverity('error');
      // setSnackbarMessage('UnExpected Error. Please try again.');
      // setSnackbarOpen(true);
      // handleClose();
      enqueueSnackbar(error.response.data.message,{variant:'error'})
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
  const handleAutocompleteChange = (name, selectedValue, selectedOption) => {
    console.log(name, selectedValue, selectedOption);
    setFormData({
      ...formData,
      [name]: selectedValue,
      locationID: selectedOption?.locationID,
      locationName: selectedOption?.locationName,
    });
    const filed ='locationID'
    const filed2='locationName'
    setValueSelected((prevData) => ({
      ...prevData,
      [filed]: selectedValue?.locationID,
      [filed2]: selectedValue?.locationName,
    }));
  };
  const DayTypes = [
    { type: 'Monday' },
    { type: 'Tuesday' },
    { type: 'Wednesday' },
    { type: 'Thursday' },
    { type: 'Friday' },
    { type: 'Saturday' },
    { type: 'Sunday' },
  ];
  const actionTypes = [{ type: 'Full Day' }, { type: 'Half Day' }, { type: 'Holiday' }];

  const [editData, setEditData] = useState();

  const onclickActions = (rowdata, event) => {
    console.log(rowdata, event, 'CompoffAprrove from to basic table');
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
        holidayID: rowdata.holidayID,
      };
      const response = await axios.post(baseUrl + '/deleteHolidayV2', data);
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
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
        <ModalHeader heading="Edit Work Week" />
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
                options={DayTypes.map((name)=>name.type)}
                name="day"
                label="Day"
                value={valueSelected?.day||null}
              
                // getOptionLabel={(option) => option.type }
                onChange={(e, newValue) => handleSelectChange('day', newValue || null)}
                renderInput={(params) => (
                  <TextField {...params} label="Day" variant="outlined" />
                )}
              />
              <Autocomplete
                options={actionTypes.map((name)=>name.type)}
                name="action"
                label="Action"
                // getOptionLabel={(option) => option.type }
                onChange={(e, newValue) => handleSelectChange('action', newValue || null)}
                renderInput={(params) => (
                  <TextField {...params} label="Action" variant="outlined" />
                )}
                value={valueSelected?.action||null}
              />
              <Autocomplete
                disablePortal
                name="Location"
                id="combo-box-demo"
                options={locationType?.map((employeepayType) => ({
                  label: employeepayType.locationName,
                  value: employeepayType.locationName,
                  ...employeepayType,
                }))}
                value={valueSelected?.locationName}
                onChange={(event, newValue, selectedOption) =>
                  handleAutocompleteChange('locationName', newValue, selectedOption)
                }
                renderInput={(params) => <TextField {...params} label="Location" />}
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
             sx={{backgroundColor:'#3B82F6'}}
            type="submit"
              variant="contained"
              onClick={onSubmit1}
              >
            Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getallWorkWeek"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="WorkWeekFilterSearch"
        onClickActions={onclickActions}
      />
    </>
  );
}
WorkWeek.propTypes = {
  currentUser: PropTypes.object,
};
