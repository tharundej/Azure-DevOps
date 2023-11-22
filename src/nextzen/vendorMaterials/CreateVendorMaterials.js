import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState } from 'react';
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
import { createVendorMaterialAPI, updateVendorMaterialAPI } from 'src/api/Accounts/VendorMaterials';

export default function CreateVendorMaterials({ currentData, handleClose, getTableData }) {
  const NewUserSchema = Yup.object().shape({
    materialName: Yup.string().required('MaterialName Name is Required'),
    hsnId: Yup.string().required('HSN ID is Required'),
    materialType: Yup.string().required('Material Type is Required'),
    gstRate: Yup.number().required('GST Rate is Required'),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      vendorID: currentData?.vendorID || 0,
      companyID: currentData?.companyID || 'COMP1',
      materialName: currentData?.materialName || '',
      hsnId: currentData?.hsnId || '',
      materialType: currentData?.materialType || '',
      gstRate: currentData?.gstRate || '',
      operationalDate: currentData?.operationalDate || '',
      closeDate: currentData?.closeDate || '',
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [datesUsed, setDatesUsed] = useState({
    operationalDate: defaultValues?.operationalDate
      ? dayjs(defaultValues?.operationalDate)
      : dayjs(new Date()),
    closeDate: defaultValues?.closeDate ? dayjs(defaultValues?.closeDate) : dayjs(new Date()),
  });
  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'In Active' },
  ];
  const [selectedStatus, setSelectedStatus] = useState(
    defaultValues.status || statusOptions[0].value
  );
  console.log('defaultValues', defaultValues);
  const onSubmit = handleSubmit(async (data) => {
    data.status = selectedStatus;
    data.operationalDate = formatDateToYYYYMMDD(datesUsed?.operationalDate);
    data.closeDate = formatDateToYYYYMMDD(datesUsed?.closeDate);
    try {
      console.log(data, 'data111ugsghghh');
      let response = '';
      if (currentData?.vendorID) {
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
        <DialogTitle>{currentData?.vendorID ? 'Edit' : 'Add New'} Vendor Material</DialogTitle>
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
            <RHFTextField name="materialName" label="Material Names" />
            <RHFTextField name="hsnId" label="HSN ID" />
            <RHFTextField name="materialType" label="Material Type" />
            <RHFTextField name="gstRate" label="GST Rate" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="on boarding Date"
                  value={datesUsed?.operationalDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      operationalDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="off boarding Date"
                  value={datesUsed?.closeDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      closeDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFAutocomplete
              name="status"
              id="status"
              options={statusOptions || []}
              value={statusOptions.find((option) => option.value === selectedStatus) || null}
              onChange={(event, newValue) => setSelectedStatus(newValue ? newValue.value : null)}
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

          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            {currentData?.vendorID ? 'Update' : 'Save'}
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
