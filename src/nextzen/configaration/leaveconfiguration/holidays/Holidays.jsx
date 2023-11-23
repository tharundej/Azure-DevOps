import * as React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { useState, useMemo, useEffect } from 'react';
import {
  Alert,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'rsuite';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function Holidays({ currentUser }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const TABLE_HEAD = [
    { id: 'holidayName', label: 'Holiday Name', type: 'text', minWidth: 180 },
    { id: 'holidayDate', label: 'Holiday Date', type: 'text', minWidth: 180 },
    { id: 'fulldayHalfday', label: 'Full Day/Half Day', type: 'text', minWidth: 180 },
    { id: 'repeatAnnualy', label: 'Repeats Anually', type: 'text', minWidth: 180 },
    { id: 'locationName', label: 'Locations', type: 'text', minWidth: 180 },
  ];
  const actions = [
    { name: 'Edit', icon: 'solar:pen-bold', path: 'jjj' },
    // { name: 'Delete', icon: 'hh', path: 'jjj', endpoint: '/' },
  ];
  // const bodyContent = [
  //   {
  //     employeeType: 'Permanent',
  //     payscheduleType: 'Weekly',
  //     payType: 'CTC',
  //     basicPay: '40',
  //     hra: '20',
  //     da: '8',
  //     employeePf: '6',
  //     employerPf: '6',
  //     tds: '20',
  //   },
  // ];
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyId: 'COMP1',
    externalFilters: {
      holidayName: '',
      holidayDate: '',
      repeatAnnualy: '',
      fulldayHalfday: '',
      locationName: '',
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
        companyID: 'COMP1',
        holidayID: rowdata.holidayID,
      };
      const response = await axios.post(baseUrl + '/deleteHoliday', data);
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
  const [formData, setFormData] = useState({});
  const [selectedDates, setSelectedDates] = useState(dayjs());
  const [locationType, setLocationType] = useState([]);
  const [valueSelected, setValueSelected] = useState();
  const NewUserSchema1 = Yup.object().shape({
    holidayName: Yup.string(),
    fulldayHalfday: Yup.string(),
    repeatAnnualy: Yup.string(),
  });

  const RepeatsAnuallys = [{ type: 'Yes' }, { type: 'No' }];
  const Fullday_halfdays = [{ type: 'Fullday' }, { type: 'Halfday' }];

  const defaultValues1 = useMemo(
    () => ({
      holidayName: currentUser?.holidayName,
      fulldayHalfday: currentUser?.fulldayHalfday,
      repeatAnnualy: currentUser?.repeatAnnualy,
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
  //   const values = watch();
  const getLocation = async () => {
    const payload = {
      companyID: 'COMP1',
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
    data.companyId = 'COMP1';
    data.holidayDate = formatDateToYYYYMMDD(selectedDates);
    data.locationID = formData?.Location?.locationID;
    data.holidayName=valueSelected?.holidayName
    data.repeatAnnualy=valueSelected?.repeatAnnualy?.type

    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl + '/editHoliday', data);
      console.log('sucess', response);
    } catch (error) {
      console.log('error', error);
    }
  });
  const handleDateChanges = (date) => {
    setSelectedDates(date);
  };
  const handleAutocompleteChange = (name, selectedValue, selectedOption) => {
    console.log(name, selectedValue, selectedOption);
    setFormData({
      ...formData,
      [name]: selectedValue,
      locationID: selectedOption?.locationID,
      locationName: selectedOption?.locationName,
    });
  };

  console.log(formData, 'formdata for location');
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
        <ModalHeader heading="Edit Holiday" />
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
              <RHFTextField
                name="holidayName"
                label="Holiday Name"
                value={valueSelected?.holidayName}
                  onChange={(e) => handleSelectChange('holidayName', e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Holiday Date"
                    // value={editData?.holidayDate}
                    onChange={handleDateChanges}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Autocomplete
                name="fulldayHalfday"
                label="FullDay/HalfDay"
                value={valueSelected?.fulldayHalfday || null}
                options={Fullday_halfdays}
                getOptionLabel={(option) => option.type }
                onChange={(e, newValue) => handleSelectChange('fulldayHalfday', newValue || null)}
                renderInput={(params) => (
                  <TextField {...params} label="Fullday/Halfday" variant="outlined" />
                )}
              />
              <Autocomplete
                name="repeatAnnualy"
                label="Repeats Anually"
                value={valueSelected?.repeatAnnualy}
                // onChange = {(e) => handleSelectChange('repeatAnnualy', e.target.value)}
                options={RepeatsAnuallys}
                getOptionLabel={(option) => option.type}
                onChange={(e, newValue) => handleSelectChange('repeatAnnualy', newValue || null)}
                renderInput={(params) => (
                  <TextField {...params} label="Repeat Annualy" variant="outlined" />
                )}
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
                  handleAutocompleteChange('Location', newValue, selectedOption)
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
        endpoint="/getallHoliday"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="holidaysFilterSearch"
        onClickActions={onClickActions}
      />
    </>
  );
}
Holidays.propTypes = {
  currentUser: PropTypes.object,
};
