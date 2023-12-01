import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { createFactoryAPI, updateFactoryAPI } from 'src/api/Accounts/Factory';
import { getStateAPI } from 'src/api/Accounts/Common';
import SnackBarComponent from '../global/SnackBarComponent';
import ModalHeader from '../global/modalheader/ModalHeader';

export default function CreateFactory({ currentData, handleClose, getTableData }) {
  const NewUserSchema = Yup.object().shape({
    locationName: Yup.string(),
    locationPhone: Yup.number(),
    locationEmailID: Yup.string(),
    locationAddressLine1: Yup.string(),
    locationAddressLine2: Yup.string(),
    locationCity: Yup.string(),
    locationPincode: Yup.number(),
    locationState: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      locationID: currentData?.locationID || 0,
      companyID: currentData?.companyID || JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      locationName: currentData?.locationName || '',
      locationPhone: currentData?.locationPhone || '',
      locationEmailID: currentData?.locationEmailid || '',
      locationAddressLine1: currentData?.addressLine1 || '',
      locationAddressLine2: currentData?.addressLine2 || '',
      locationCity: currentData?.locationCity || '',
      locationPincode: currentData?.locationPincode || '',
      locationState: currentData?.locationState || '',
      status: currentData?.status || '',
    }),
    [currentData]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();

  const [locationsOptions, setLocationsOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const data = { companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID, };
      try {
        const response = await getStateAPI(data);
        console.log('location success', response);
        const stateNames = response.map((stateObj) => stateObj.state);
        setLocationsOptions(stateNames);
        console.log('defaultValues.locationState', defaultValues.locationState);
        const defaultLocation = defaultValues.locationState;
        setSelectedLocation(defaultLocation || stateNames[0]);
      } catch (error) {
        setErrorMessage(error.message);
        console.log('API request failed:', error.message);
      }
    };

    fetchData();
  }, [defaultValues.locationState]);

  const statusOptions = ['Active', 'In Active'];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(defaultValues.status || statusOptions[0]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    data.locationState = selectedLocation;
    try {
      console.log('Create Factory Data', data);
      let response = '';
      if (currentData?.locationName) {
        response = await updateFactoryAPI(data);
      } else {
        response = await createFactoryAPI(data);
      }
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset();
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      currentData?.locationName ? '' : getTableData();
    } catch (error) {
      if (error.response) {
        handleCallSnackbar(error.response.data.Message, 'warning');
        console.log('request failed:', error.response.data.Message);
      } else {
        handleCallSnackbar(error.Message, 'warning');
        console.log('API request failed:', error.message);
      }
    }
  });
  const handleCallSnackbar = (message, severity) => {
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading={currentData?.locationName ? 'Edit Factory' : 'Add New Factory'} />
        <SnackBarComponent
          open={openSnackbar}
          onHandleCloseSnackbar={HandleCloseSnackbar}
          snacbarMessage={snacbarMessage}
          severity={severity}
        />
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
            <RHFTextField name="locationName" label="Name" />
            <RHFTextField name="locationPhone" label="Phone" />
            <RHFTextField name="locationEmailID" label="EmailID" />
            <RHFTextField name="locationAddressLine1" label="AddressLine1" />
            <RHFTextField name="locationAddressLine2" label="AddressLine2" />
            <RHFTextField name="locationCity" label="City" />
            <RHFTextField name="locationPincode" label="Pincode" />
            <RHFAutocomplete
              name="locationId"
              id="location-autocomplete"
              options={locationsOptions || []}
              value={selectedLocation}
              onChange={(event, newValue) => setSelectedLocation(newValue)}
              getOptionLabel={(option) => option} // Adjust property based on your API response
              renderInput={(params) => (
                <TextField {...params} label="Select Location State" variant="outlined" />
              )}
            />
            <RHFAutocomplete
              name="status"
              id="status"
              options={statusOptions || []}
              value={selectedStatus}
              onChange={(event, newValue) => setSelectedStatus(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select status Type" variant="outlined" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            {currentData?.locationName ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateFactory.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
