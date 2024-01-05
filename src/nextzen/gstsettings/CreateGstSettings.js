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
import { getLocationAPI, getStateAPI } from 'src/api/Accounts/Common';
import SnackBarComponent from '../global/SnackBarComponent';
import ModalHeader from '../global/modalheader/ModalHeader';
import UserContext from '../context/user/UserConext';
import { City, Country, State } from 'country-state-city';
import {
  createAccountInformationAPI,
  updateAccountInformationAPI,
  creategstInformationAPI
} from 'src/api/Accounts/Settings';

export default function CreateGstSettings({
  currentData,
  handleClose,
  getTableData,
  handleCountChange,
}) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    // locationName: Yup.string(),
    // businessEmailId: Yup.string().email('Invalid email format').required('Email is required'),
    GSTNo: Yup.string().required('Gst no. is required'),
    PanNo: Yup.string().required('Gst no. is required'),
    TanNo: Yup.string().required('TanNo. is required'),
  });

  const defaultValues = useMemo(
    () => ({
      // accountInformationId: currentData?.accountInformationId || 0,
      // locationID: currentData?.locationID || 0,
      // companyID: currentData?.companyID || user?.companyID ? user?.companyID : '',
      // bankName: currentData?.bankName || '',
      // bankAccountNo: currentData?.bankAccountNo || '',
      // accountHolderName: currentData?.accountHolderName || '',
      // ifscCode: currentData?.ifscCode || '',
      // bankBranch: currentData?.bankBranch || '',
      // msmeUamNo: currentData?.msmeUamNo || '',
      // businessEmailId: currentData?.businessEmailId || '',
      GSTNo: currentData?.GSTNo || '',
      PanNo: currentData?.PanNo || '',
      TanNo: currentData?.TanNo || '',
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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [selectedFactory, setSelectedFactory] = useState();
  const [factoryOptions, setFactoryOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const fetchFactory = async () => {
    const data = { companyID: user?.companyID ? user?.companyID : '' };
    try {
      const response = await getLocationAPI(data);
      setFactoryOptions(response);
      setSelectedFactory(defaultValues.locationID);
    } catch (error) {
      setErrorMessage(error.message);
      console.log('API request failed:', error.message);
    }
  };
  useEffect(() => {
    fetchFactory();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log('oooo', data);
    // data.locationID = selectedFactory;
    data.GSTNo = parseInt(data.GSTNo);
    data.PanNo = parseInt(data.PanNo);
    data.TanNo = parseInt(data.TanNo);
    // data.accountInformationId= currentData?.accountInformationId || 0;
    data.companyID= currentData?.companyID || user?.companyID ? user?.companyID : '';


    try {
      console.log('Create Factory Data', data);
      let response = ''
      // creategstInformationAPI(data);
      if (currentData?.PanNo) {
        // response = 'await updateAccountInformationAPI(data)';
        response = ''
      } else {
        response = await creategstInformationAPI(data);
      }
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset();
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      currentData?.PanNo ? handleCountChange() : getTableData();
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
        {/* <ModalHeader
          heading={
            currentData?.accountInformationId
              ? 'Edit Account Information'
              : 'Add New Account Information'
          }
        /> */}
         <ModalHeader heading={"Add New Gst settings"} />
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
            {/* <RHFAutocomplete
              name="locationID"
              id="locationID"
              options={factoryOptions || []}
              value={factoryOptions.find((option) => option.locationID === selectedFactory) || null}
              onChange={(event, newValue) =>
                setSelectedFactory(newValue ? newValue.locationID : null)
              }
              getOptionLabel={(option) => option.locationName}
              renderInput={(params) => (
                <TextField {...params} label="Select Factory / Branch Name" variant="outlined" />
              )}
            /> */}
            {/* <RHFTextField name="bankName" label="Bank Name" /> */}
            {/* <RHFTextField
              name="bankAccountNo"
              label="Bank Account No"
              pattern="[0-9]*"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 20);
              }}
            /> */}
            <RHFTextField name="GSTNo" label="GSTNo" />
            <RHFTextField name="PanNo" label="PanNo" />
            <RHFTextField name="TanNo" label="TanNo" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>



          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            {currentData?.GSTNo ? 'Update' : 'Save'}

          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateGstSettings.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
