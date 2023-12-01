import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from '../../Table/BasicTable';

import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Alert ,Snackbar} from '@mui/material';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useCallback, useMemo, useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFAutocomplete } from 'src/components/hook-form';
import { MobileTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function ShiftConfigView({currentUser}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const TABLE_HEAD = [
    { id: 'shiftName', label: 'Shift Name', type: 'text', minWidth: 180 },
    { id: 'startTime', label: 'Start Time', type: 'text', minWidth: 180 },
    { id: 'endTime', label: 'End Time', type: 'text', minWidth: 180 },
    // { id: 'shiftTerm', label: 'Shift Term', type: 'text', minWidth: 180 },
    { id: 'locationName', label: 'Location Name', type: 'text', minWidth: 180 },
  ];
  const [editData, setEditData] = useState();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [valueSelected, setValueSelected] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const [formData, setFormData] = useState({});
  const handleCloseEdit = () => setOpenEdit(false);
  const onClickActions = (rowdata, event) => {
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
        shiftConfigId: rowdata.shiftConfigId,
      };
      const response = await axios.post(baseUrl + '/deleteShiiftConfig', data);
      if(response?.status===200){
        setSnackbarSeverity('success');
         setSnackbarMessage('Shift Configuration Deleted Succuessfully!');
         setSnackbarOpen(true);
      
      console.log('sucess', response);
      }
    } catch (error) {
       setSnackbarSeverity('error');
       setSnackbarMessage('Error While Deleting Shift Configuration. Please try again.');
       setSnackbarOpen(true);
      console.log('error', error);
    }
  };
  const [startTime, setStartTime] = useState(dayjs('2022-04-17T15:30')); // State for Start Time
  const [endTime, setEndTime] = useState(dayjs('2022-04-17T15:30'));
  const actions = [
    { name: 'Edit', icon: 'hh', path: 'jjj', type: 'edit' },
    // { name: 'Delete', icon: 'hh', path: 'jjj' },
  ];

  const defaultPayload = {
    companyId: 'COMP2',
    locationId: 32,
    count: 5,
    search: '',
    page: 0,
    limit: 5,
    externalFilters: {
      shiftName: '',
      startTime: '',
      endTime: '',
    },
    sort: {
      key: 0,
      orderBy: '',
    },
  };

  const NewUserSchema1 = Yup.object().shape({
    ShiftName: Yup.string(),
    // ShiftTerm: Yup.string(),
  });

  const defaultValues1 = useMemo(
    () => ({
      ShiftName: currentUser?.ShiftName ,
      // ShiftTerm: currentUser?.ShiftTerm ,
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
  const ShiftNames = [
    { type:'General'},
    { type:'Morning'},
    { type:'AfterNoon'},
    { type:'Night'},
  ];
  const ShiftTerms = [{ type:'Weekly'},{ type:'Monthly'}];
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
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

  const getLocation = async () => {
    const payload = {
      companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/locationOnboardingDepartment',
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
        if (response?.status === 200) {
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
    data.companyId = 'COMP2';
    data.startTime = startTime.format('HH:mm:ss'); // Append Start Time
    data.endTime = endTime.format('HH:mm:ss'); // Append End Time
    data.locationID =( formData?.Location?.locationID)?formData?.Location?.locationID:valueSelected?.locationId
    data.shiftName=valueSelected?.shiftName
    data.shiftConfigId=valueSelected?.shiftConfigId
    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl+'/editShitConfig', data);
      if (response?.data?.status === '200') {
        handleCloseEdit();
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
        console.log('sucess', response);
        handleCloseEdit();
      }
      if (response?.data?.status === '400') {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Editing. Please try again.');
      setSnackbarOpen(true);
      handleCloseEdit();
      console.log(' ', error);
    }
  });
  const [locationType, setLocationType] = useState([]);
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
  setSnackbarOpen(false)
    setOpen(true);
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
    <Alert onClose={snackBarAlertHandleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
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
          {/* <DialogTitle>Edit Shift Config</DialogTitle> */}
          <ModalHeader heading="Edit Shift Configuration" />
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
                freeSolo
                placeholder="Press Enter to Add Custom"
                label="Shift Name"
                name="ShiftName"
                value={valueSelected?.shiftName}
                options={ShiftNames.map((name)=>name.type)}
                // getOptionLabel={(option) => option.type }
                onChange={(e, newValue) => handleSelectChange('shiftName', newValue || null)}
                renderInput={(params) => (
                  <TextField {...params} label="Shift Name" variant="outlined" />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  label="Start Time"
                  defaultValue={dayjs()}
                  onChange={(newValue) => setStartTime(newValue)}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  label="End Time"
                  defaultValue={dayjs()}
                  onChange={(newValue) => setEndTime(newValue)}
                />
              </LocalizationProvider>
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
            <Button variant="outlined"  onClick={handleCloseEdit}>
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
      endpoint="/getALLShiftConfig"
      defaultPayload={defaultPayload}
      rowActions={actions}
      onClickActions={onClickActions}
      filterName="ShiftConfigurationFilterSearch"
    />
    </>
  );
}
ShiftConfigView.propTypes = {
  currentUser: PropTypes.object,
};
