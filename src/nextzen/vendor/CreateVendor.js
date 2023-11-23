import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
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
import formatDateToYYYYMMDD from '../global/GetDateFormat';
import { getStateAPI } from 'src/api/Accounts/Common';

export default function CreateVendor({ currentData, handleClose, getTableData }) {
  const NewUserSchema = Yup.object().shape({
    vendorCompanyName: Yup.string().required('vendor Company Name is Required'),
    vendorName: Yup.string().required('vendor Name is Required'),
    vendorPhoneNo: Yup.number().required('vendor Phone No is Required'),
    vendorEmailID: Yup.string().required('vendor Email ID is Required'),
    address1: Yup.string().required('Address 1 is Required'),
    address2: Yup.string(),
    city: Yup.string().required('City is Required'),
    state: Yup.string(),
    country: Yup.string().required('country is Required'),
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
      companyID: currentData?.companyID || 'COMP1',
      vendorCompanyName: currentData?.vendorCompanyName || '',
      vendorName: currentData?.vendorName || '',
      vendorPhoneNo: currentData?.vendorPhoneNo || '',
      vendorEmailID: currentData?.vendorEmailID || '',
      address1: currentData?.address1 || '',
      address2: currentData?.address2 || '',
      city: currentData?.city || '',
      state: currentData?.state || '',
      stateCode: null,
      country: currentData?.country || '',
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
  useEffect(() => {
    const fetchData = async () => {
      const data = { companyID: 'COMP1' };
      try {
        const response = await getStateAPI(data);
        console.log('location success', response);
        const stateNames = response.map((stateObj) => stateObj.state);
        setLocationsOptions(stateNames);
        console.log('defaultValues.state', defaultValues.state);
        const defaultLocation = defaultValues.state;
        setSelectedLocation(defaultLocation || stateNames[0]);
      } catch (error) {
        setErrorMessage(error.message);
        console.log('API request failed:', error.message);
      }
    };

    fetchData();
  }, [defaultValues.state]);

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
      currentData?.vendorID ? '' : getTableData();
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
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{currentData?.vendorID ? 'Edit' : 'Add New'} Vendor</DialogTitle>
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
            <RHFTextField name="vendorCompanyName" label="Vendor Company Names" />
            <RHFTextField name="vendorName" label="Cendor Name" />
            <RHFTextField name="vendorPhoneNo" label="Vendor Phone No" />
            <RHFTextField name="vendorEmailID" label="Vendor Email Id" />
            <RHFTextField name="address1" label="Address 1" />
            <RHFTextField name="address2" label="Address 2" />
            <RHFTextField name="city" label="City" />
            <RHFAutocomplete
              name="state"
              id="location-autocomplete"
              options={locationsOptions || []}
              value={selectedLocation}
              onChange={(event, newValue) => setSelectedLocation(newValue)}
              getOptionLabel={(option) => option} // Adjust property based on your API response
              renderInput={(params) => (
                <TextField {...params} label="Select Location State" variant="outlined" />
              )}
            />
            <RHFTextField name="country" label="Country" />
            <RHFTextField name="pincode" label="Pincode" />
            <RHFTextField name="vendorPANNo" label="Vendor PAN No" />
            <RHFTextField name="vendorGSTNo" label="Vendor GST No" />
            <RHFTextField name="vendorTANNo" label="Vendor TAN No" />
            <RHFTextField name="vendorBankName" label="Vendor Bank Name" />
            <RHFTextField name="vendorAccountHolderName" label="Vendor Account Holder Name" />
            <RHFTextField name="vendorBankAccountNo" label="Vendor Bank Account No" />
            <RHFTextField name="vendorBankIFSCCode" label="Vendor Bank IFSC Code" />
            <RHFTextField name="bankBranchName" label="Bank Branch Name" />
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
                <TextField {...params} label="Select Status Type" variant="outlined" />
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
