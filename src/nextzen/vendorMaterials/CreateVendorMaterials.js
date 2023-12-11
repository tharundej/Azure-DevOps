import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import SnackBarComponent from '../global/SnackBarComponent';
import { createVendorMaterialAPI, updateVendorMaterialAPI } from 'src/api/Accounts/VendorMaterials';
import { getTaxs, getVendorAPI } from 'src/api/Accounts/Common';
import ModalHeader from '../global/modalheader/ModalHeader';
import UserContext from '../context/user/UserConext';

export default function CreateVendorMaterials({ currentData, handleClose, getTableData }) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    materialName: Yup.string().required('MaterialName Name is Required'),
    hsnId: Yup.number().required('HSN ID is Required'),
    materialType: Yup.string().required('Material Type is Required'),
    gstRate: Yup.string(),
    materialPrice: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      materialID: currentData?.id || 0,
      vendorID: currentData?.vendorId || 0,
      companyID: currentData?.companyID || user?.companyID ? user?.companyID : '',
      materialName: currentData?.materialName || '',
      hsnId: currentData?.hsnId || '',
      materialType: currentData?.materialType || '',
      gstRate: currentData?.gstRate || '',
      materialPrice: currentData?.materialPrice || 0,
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
  const [vendorOptions, setVendorOptions] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState();
  const [taxsOptions, setTaxsOptions] = useState([]);
  const [selectedTaxs, setSelectedTaxs] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchVendor = async () => {
      const data = { companyID: user?.companyID ? user?.companyID : '' };
      try {
        const response = await getVendorAPI(data);
        setVendorOptions(response);
        console.log('currentData.vendorID', currentData.vendorId);
        console.log('currentData.vend', defaultValues.vendorID);
        setSelectedVendor(
          defaultValues.vendorID || (response.length > 0 ? response[0].vendorID : null)
        );
      } catch (error) {
        setErrorMessage(error.message);
        console.log('API request failed:', error.message);
      }
    };
    const fetchTaxs = async () => {
      try {
        const response = await getTaxs();
        console.log('Tax responce:', response);
        setTaxsOptions(response);
        setSelectedTaxs(defaultValues.gstRate || (response.length > 0 ? response[0].value : null));
      } catch (error) {
        console.log('Tax API Error', error);
      }
    };
    fetchVendor();
    fetchTaxs();
  }, []);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  console.log('defaultValues', defaultValues);
  const onSubmit = handleSubmit(async (data) => {
    data.vendorID = selectedVendor;
    data.gstRate = selectedTaxs;
    try {
      console.log(data, 'data111ugsghghh');
      let response = '';
      if (currentData?.id) {
        response = await updateVendorMaterialAPI(data);
      } else {
        response = await createVendorMaterialAPI(data);
      }
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset(); // Reset the form values
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      currentData?.id ? '' : getTableData();
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
        <ModalHeader
          heading={currentData?.id ? 'Edit Vendor Material' : 'Add New Vendor Material'}
        />
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
            <RHFAutocomplete
              name="vendorID"
              id="vendorID"
              options={vendorOptions || []}
              value={vendorOptions?.find((option) => option.vendorID === selectedVendor) || null}
              onChange={(event, newValue) => setSelectedVendor(newValue ? newValue.vendorID : null)}
              getOptionLabel={(option) => option.vendorName} // Specify the property to display in the input
              renderInput={(params) => (
                <TextField {...params} label="Select Vendor Name" variant="outlined" />
              )}
            />

            <RHFTextField name="materialName" label="Material Names" />
            <RHFTextField name="hsnId" label="HSN ID" />
            <RHFTextField name="materialType" label="Material Type" />
            <RHFTextField name="materialPrice" label="Material Price" />
            <RHFAutocomplete
              name="gstRate"
              id="gstRate"
              options={taxsOptions || []}
              value={taxsOptions?.find((option) => option.value === selectedTaxs) || null}
              onChange={(event, newValue) => setSelectedTaxs(newValue ? newValue.value : null)}
              renderInput={(params) => (
                <TextField {...params} label="Select Tax" variant="outlined" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            {currentData?.id ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateVendorMaterials.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
