import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useContext, useEffect, useMemo, useState } from 'react';
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
import UserContext from '../context/user/UserConext';
import { City, Country, State } from 'country-state-city';

export default function CreateFactory({ currentData, handleClose, getTableData }) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    locationName: Yup.string(),
    locationPhone: Yup.string().matches(
      /^[1-9]\d{9}$/,
      'Phone must be 10 digits and should not start with 0'
    ),
    locationEmailID: Yup.string().email('Invalid email format').required('Email is required'),
    locationAddressLine1: Yup.string(),
    locationAddressLine2: Yup.string(),
    locationCity: Yup.string(),
    locationPincode: Yup.string().matches(
      /^[1-9]\d{5}$/,
      'Pincode must be 6 digits and should not start with 0'
    ),
    locationState: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      locationID: currentData?.locationID || 0,
      companyID: currentData?.companyID || user?.companyID ? user?.companyID : '',
      locationName: currentData?.locationName || '',
      locationPhone: currentData?.locationPhone || '',
      locationEmailID: currentData?.locationEmailid || '',
      locationAddressLine1: currentData?.addressLine1 || '',
      locationAddressLine2: currentData?.addressLine2 || '',
      locationPincode: currentData?.locationPincode || '',
      locationCity: currentData?.locationCity || '',
      locationState: currentData?.locationState || '',
      locationState: currentData?.locationState || '',
      locationStateCode: currentData?.locationStateCode || '',
      locationCountry: currentData?.locationCountry || '',
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
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ isoCode: 'IN', name: 'India' });
  const [selectedState, setSelectedState] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const mockCountries = Country.getAllCountries();
    setCountries(mockCountries);
  }, []);
  useEffect(() => {
    console.log({ selectedCountry });
    const fetchStates = async () => {
      if (selectedCountry) {
        const statesList = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates(statesList);
        const selectedState =
          statesList.find((state) => state.name === currentData?.locationState) || statesList[0];
        setSelectedState(selectedState);
      } else {
        setStates([]);
      }
    };
    fetchStates();
  }, [selectedCountry]);
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        const cities = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
        setCities(cities);
        const selectedCity =
          cities.find((city) => city.name === currentData?.locationCity) || cities[0];
        setSelectedCity(selectedCity);
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedState]);

  const statusOptions = ['Active', 'In Active'];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(defaultValues.status || statusOptions[0]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    data.locationCountry = selectedCountry
      ? {
          isoCode: selectedCountry.isoCode,
          name: selectedCountry.name,
        }
      : null;
    data.locationState = selectedState
      ? {
          isoCode: selectedState.isoCode,
          name: selectedState.name,
        }
      : null;
    data.locationCity = selectedCity
      ? {
          isoCode: selectedCity.isoCode,
          name: selectedCity.name,
        }
      : null;
    try {
      data.locationPhone = parseInt(data.locationPhone);
      data.locationPincode = parseInt(data.locationPincode);
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
        handleCallSnackbar(error.response.data.message, 'warning');
        console.log('request failed:', error.response.data.message);
      } else {
        handleCallSnackbar(error.message, 'warning');
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
            <RHFTextField name="locationName" label="Factory / location Name" />
            <RHFTextField
              name="locationPhone"
              label="Phone"
              pattern="[0-9]*"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
              }}
            />
            <RHFTextField name="locationEmailID" label="Email ID" />
            <RHFTextField name="locationAddressLine1" label="Address Line 1" />
            <RHFTextField name="locationAddressLine2" label="Address Line 2" />
            <RHFAutocomplete
              name="locationCountry"
              options={countries || []}
              value={
                countries?.find((option) => option.name === currentData?.locationCountry) || selectedCountry
              }
              onChange={(event, newValue) => setSelectedCountry(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select Country" variant="outlined" />
              )}
            />
            <RHFAutocomplete
              name="locationState"
              options={states || []}
              value={states?.find((option) => option.name === currentData?.locationState) || selectedState}
              onChange={(event, newValue) => setSelectedState(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select State" variant="outlined" />
              )}
            />
            <RHFAutocomplete
              name="locationCity"
              options={cities || []}
              value={cities?.find((option) => option.name === currentData?.locationCity) || selectedCity}
              onChange={(event, newValue) => setSelectedCity(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select City" variant="outlined" />
              )}
            />
            <RHFTextField
              name="locationPincode"
              label="Pincode"
              pattern="[0-9]*"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
              }}
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


