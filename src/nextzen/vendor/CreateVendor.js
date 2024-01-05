import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import instance from 'src/api/BaseURL';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProductAPI, createProductAPI } from 'src/api/Accounts/Product';
import SnackBarComponent from '../global/SnackBarComponent';
import { createVendorAPI, updateVendorAPI } from 'src/api/Accounts/Vendor';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { formatDateToYYYYMMDD, formatDate } from 'src/nextzen/global/GetDateFormat';
import { getStateAPI } from 'src/api/Accounts/Common';
import ModalHeader from '../global/modalheader/ModalHeader';
import UserContext from '../context/user/UserConext';
import { City, Country, State } from 'country-state-city';

export default function CreateVendor({
  currentData,
  handleClose,
  getTableData,
  handleCountChange,
}) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    vendorCompanyName: Yup.string().required('vendor Company Name is Required'),
    vendorName: Yup.string().required('vendor Name is Required'),
    vendorPhoneNo: Yup.number().required('vendor Phone Number is Required'),
    vendorEmailID: Yup.string().required('vendor Email ID is Required'),
    address1: Yup.string().required('Address 1 is Required'),
    address2: Yup.string(),
    locationCity: Yup.string().required('City is Required'),
    state: Yup.string(),
    locationState: Yup.string(),
    // locationCountry: Yup.string().required('country is Required'),
    pincode: Yup.number().required('pincode is Required'),
    vendorPANNo: Yup.string().required('vendorPANNo is Required'),
    vendorGSTNo: Yup.string().required('vendorGSTNo is Required'),
    vendorTANNo: Yup.string(),
    vendorBankName: Yup.string().required('vendorBankName is Required'),
    vendorAccountHolderName: Yup.string().required('vendorAccountHolderName is Required'),
    vendorBankAccountNo: Yup.number().required('vendorBankAccountNo is Required'),
    vendorBankIFSCCode: Yup.string().required('vendorBankIFSCCode is Required'),
    bankBranchName: Yup.string().required('bankBranchName is Required'),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      vendorID: currentData?.vendorID || 0,
      companyID: currentData?.companyID || user?.companyID ? user?.companyID : '',
      vendorCompanyName: currentData?.vendorCompanyName || '',
      vendorName: currentData?.vendorName || '',
      vendorPhoneNo: currentData?.vendorPhoneNo || '',
      vendorEmailID: currentData?.vendorEmailID || '',
      address1: currentData?.address1 || '',
      address2: currentData?.address2 || '',
      locationCity: currentData?.locationCity || '',
      // state: currentData?.state || '',
      locationState: currentData?.locationState || '',
      stateCode: null,
      locationCountry: currentData?.locationCountry || '',
      pincode: currentData?.pincode || '',
      vendorPANNo: currentData?.vendorPANNo || '',
      vendorGSTNo: currentData?.vendorGSTNo || '',
      vendorTANNo: currentData?.vendorTANNo || '',
      vendorBankName: currentData?.vendorBankName || '',
      vendorAccountHolderName: currentData?.vendorAccountHolderName || '',
      vendorBankAccountNo: currentData?.vendorBankAccountNo || '',
      vendorBankIFSCCode: currentData?.vendorBankIFSCCode || '',
      bankBranchName: currentData?.bankBranchName || '',
      onboardingDate: currentData?.onboardingDate || '',
      offboardingDate: currentData?.offboardingDate || '',
      status: currentData?.status || 'Active',
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
    errors,
  } = methods;
  const values = watch();

  const [locationsOptions, setLocationsOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = { companyID: user?.companyID ? user?.companyID : '' };
  //     try {
  //       const response = await getStateAPI(data);
  //       console.log('location success', response);
  //       const stateNames = response.map((stateObj) => stateObj.state);
  //       setLocationsOptions(stateNames);
  //       console.log('defaultValues.state', defaultValues.state);
  //       const defaultLocation = defaultValues.state;
  //       setSelectedLocation(defaultLocation || stateNames[0]);
  //     } catch (error) {
  //       setErrorMessage(error.message);
  //       console.log('API request failed:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, [defaultValues.state]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [datesUsed, setDatesUsed] = useState({
    onboardingDate: defaultValues?.onboardingDate
      ? dayjs(defaultValues?.onboardingDate)
      : dayjs(new Date()),
    offboardingDate: defaultValues?.offboardingDate
      ? dayjs(defaultValues?.offboardingDate)
      : dayjs(new Date()),
  });
  const statusOptions = ['Active', 'In Active'];
  const [selectedStatus, setSelectedStatus] = useState(defaultValues.status || statusOptions[0]);
  console.log('defaultValues', defaultValues);
  const onSubmit = handleSubmit(async (data) => {
    data.status = selectedStatus;
    data.state = selectedLocation;
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
    data.onboardingDate = formatDateToYYYYMMDD(datesUsed?.onboardingDate);
    data.offboardingDate = formatDateToYYYYMMDD(datesUsed?.offboardingDate);
    try {
      console.log(data, 'data111ugsghghh');
      let response = '';
      if (currentData?.vendorID) {
        response = await updateVendorAPI(data);
      } else {
        response = await createVendorAPI(data);
      }
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset(); // Reset the form values
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      currentData?.vendorID ? handleCountChange() : getTableData();
    } catch (error) {
      console.log('error', error);
      if (error.response && error.response.data && error.response.data.code === 400) {
        // Handle the case where the asset already exists
        handleCallSnackbar(error.response.data.message, 'warning');
        console.log('request failed:', error.response.data.message);
      } else {
        // Handle other errors
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
        <ModalHeader heading={currentData?.vendorID ? 'Edit Vendor' : 'Add New Vendor'} />
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
              sm: 'repeat(4, 1fr)',
            }}
          >
            <RHFTextField name="vendorCompanyName" label="Vendor Company Name" />
            <RHFTextField name="vendorName" label="Vendor Name" />
            <RHFTextField name="vendorPhoneNo" label="Vendor Phone Number" />
            <RHFTextField name="vendorEmailID" label="Vendor Email ID" />
            <RHFTextField name="address1" label="Address Line 1" />
            <RHFTextField name="address2" label="Address Line 2" />

            {/* <RHFAutocomplete
              name="state"
              id="location-autocomplete"
              options={locationsOptions || []}
              value={selectedLocation}
              onChange={(event, newValue) => setSelectedLocation(newValue)}
              getOptionLabel={(option) => option} // Adjust property based on your API response
              renderInput={(params) => (
                <TextField {...params} label="Select State" variant="outlined" />
              )}
            /> */}
              {/* <RHFAutocomplete
              name="locationCountry"
              options={countries || []}
              value={countries?.find((option) => option.name === currentData?.locationCountry) ||selectedCountry}

              onChange={(event, newValue) => setSelectedCountry(newValue)}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Select Country" variant="outlined" />
              )}
            /> */}
            <RHFAutocomplete
              name="locationCountry"
              options={countries || []}
              value={
                countries?.find((option) => option.name === currentData?.locationCountry) ||
                selectedCountry
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
              value={
                states?.find((option) => option.name === currentData?.locationState) ||
                selectedState
              }
              onChange={(event, newValue) => setSelectedState(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select State" variant="outlined" />
              )}
            />
            <RHFAutocomplete
              name="locationCity"
              options={cities || []}
              value={
                cities?.find((option) => option.name === currentData?.locationCity) || selectedCity
              }
              onChange={(event, newValue) => setSelectedCity(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select City" variant="outlined" />
              )}
            />

            <RHFTextField name="pincode" label="Pincode" />
            <RHFTextField name="vendorPANNo" label="Vendor PAN Number" />
            <RHFTextField name="vendorGSTNo" label="Vendor GST Number" />
            <RHFTextField name="vendorTANNo" label="Vendor TAN Number" />
            <RHFTextField name="vendorBankName" label="Vendor Bank Name" />
            <RHFTextField name="vendorAccountHolderName" label="Vendor Account Holder Name" />
            <RHFTextField name="vendorBankAccountNo" label="Vendor Bank Account Number" />
            <RHFTextField name="vendorBankIFSCCode" label="Vendor Bank IFSC Code" />
            <RHFTextField name="bankBranchName" label="Bank Branch" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="On Boarding Date"
                  value={datesUsed?.onboardingDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      onboardingDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Off Boarding Date"
                  value={datesUsed?.offboardingDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      offboardingDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFAutocomplete
              name="status"
              id="status"
              options={statusOptions || []}
              value={selectedStatus}
              onChange={(event, newValue) => setSelectedStatus(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Status" variant="outlined" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            {currentData?.vendorID ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateVendor.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
