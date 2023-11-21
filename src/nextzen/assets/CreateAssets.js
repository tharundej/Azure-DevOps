import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, reset } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { createAssetsAPI, updateAssetsAPI } from '../../api/Accounts/Assets';
import SnackBarComponent from '../global/SnackBarComponent';
import FormProvider, { RHFTextField, RHFAutocomplete } from '../../components/hook-form';
import formatDateToYYYYMMDD from '../global/GetDateFormat';
import { getLocationAPI } from 'src/api/Accounts/Common';

export default function CreateAssets({ currentData, handleClose, getTableData }) {
  const newUserSchema = Yup.object().shape({
    // locationId: Yup.string().required('location is Required'),
    assetsName: Yup.string().required('Asset Name is Required'),
    // assetsType: Yup.string().required('Asset Type is Required'),
    poNumber: Yup.string().required('PO Number is Required'),
    // poDate: Yup.date().required('PO Date is Required'),
    poValue: Yup.number().positive().required('PO Value is Required'),
    invoiceNumber: Yup.string().required('Invoice Number is Required'),
    // invoiceDate: Yup.date().required('Invoice Date is Required'),
    // assetsStartDate: Yup.date().required('Assets Date is Required'),
    // warrantyDate: Yup.date().required('Warranty Date is Required'),
    supplierName: Yup.string().required('Supplier Name is Required'),
    supplierEmailId: Yup.string().required('Supplier Email Id is Required'),
    supplierContactNumber: Yup.number().required('Supplier Contact Number is Required'),
    // expiryDate: Yup.date().required('Expiry Date is Required'),
    // lapseOfWarrantyDate: Yup.date().required('Lapse Of Warranty Date is Required'),
    totalAmount: Yup.number().positive().required('Total Amount is Required'),
  });

  const defaultValues = useMemo(
    () => ({
      assetsId: currentData?.assetId || '',
      locationId: currentData?.locationId || '',
      assetsName: currentData?.assetsName || '',
      assetsType: currentData?.assetsType || '',
      poNumber: currentData?.poNumber || '',
      poDate: currentData?.poDate || '',
      poValue: currentData?.poValue || '',
      invoiceNumber: currentData?.invoiceNo || '',
      invoiceDate: currentData?.Invoice_date || '',
      assetsStartDate: currentData?.startDate || '',
      warrantyDate: currentData?.warrantyDate || '',
      supplierName: currentData?.supplierName || '',
      supplierEmailId: currentData?.supplierEmail || '',
      supplierContactNumber: currentData?.supplierContact || '',
      expiryDate: currentData?.expiryDate || '',
      lapseOfWarrantyDate: currentData?.lapseOfWarrantyDate || '',
      amount: currentData?.amount || '',
      gstAmount: currentData?.gstAmount || '',
      totalAmount: currentData?.totalAmount || '',
      assetsCondition: currentData?.assetCondition || '',
      updatedDate: currentData?.updatedDate || '',
      deleteBit: currentData?.deleteBit || 0,
      companyId: currentData?.companyId || 'COMP1',
      operationalDays: currentData?.operationalDays || '',
    }),
    [currentData]
  );

  const methods = useForm({
    resolver: yupResolver(newUserSchema),
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

  const assetsConditionOptions = ['In Use', 'Scrap & Sold', 'Spare', 'Scrap', 'Under Maintenance'];
  const asstesTypeOptions = ['Electronic1', 'Electronic2'];
  const [selectedassetsCondition, setSelectedassetsCondition] = useState(
    defaultValues.assetsCondition || ''
  );
  const [selectedAssetsType, setSelectedAssetsType] = useState(defaultValues.assetsType || '');
  const [locationsOptions, setLocationsOptions] = useState([
    { locationID: '', locationName: 'Select Location *' },
  ]);
  const [selectedLocation, setSelectedLocation] = useState(
    defaultValues.locationId || locationsOptions[0]
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [datesUsed, setDatesUsed] = useState({
    poDate: defaultValues?.poDate ? dayjs(defaultValues?.poDate) : dayjs(new Date()),
    invoiceDate: defaultValues?.invoiceDate ? dayjs(defaultValues?.invoiceDate) : dayjs(new Date()),
    assetsStartDate: defaultValues?.assetsStartDate
      ? dayjs(defaultValues?.assetsStartDate)
      : dayjs(new Date()),
    warrantyDate: defaultValues?.warrantyDate
      ? dayjs(defaultValues?.warrantyDate)
      : dayjs(new Date()),
    expiryDate: defaultValues?.expiryDate ? dayjs(defaultValues?.expiryDate) : dayjs(new Date()),
    lapseOfWarrantyDate: defaultValues?.lapseOfWarrantyDate
      ? dayjs(defaultValues?.lapseOfWarrantyDate)
      : dayjs(new Date()),
    updatedDate: defaultValues?.updatedDate ? dayjs(defaultValues?.updatedDate) : dayjs(new Date()),
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = { companyID: 'COMP1' };
      try {
        const response = await getLocationAPI(data);
        console.log('location success', response);
        setLocationsOptions(response);
        const defaultLocation = response.find(
          (location) => location.locationID === defaultValues.locationId
        );
        setSelectedLocation(defaultLocation || response[0]);
      } catch (error) {
        setErrorMessage(error.message);
        console.log('API request failed:', error.message);
      }
    };

    fetchData();
  }, [defaultValues.locationId]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddAssets ~ onSubmit ~ data:', data);
    data.locationId = selectedLocation.locationID;
    data.assetsType = selectedAssetsType;
    data.assetsCondition = selectedassetsCondition;
    data.poDate = formatDateToYYYYMMDD(datesUsed?.poDate);
    data.invoiceDate = formatDateToYYYYMMDD(datesUsed?.invoiceDate);
    data.assetsStartDate = formatDateToYYYYMMDD(datesUsed?.assetsStartDate);
    data.warrantyDate = formatDateToYYYYMMDD(datesUsed?.warrantyDate);
    data.expiryDate = formatDateToYYYYMMDD(datesUsed?.expiryDate);
    data.lapseOfWarrantyDate = formatDateToYYYYMMDD(datesUsed?.lapseOfWarrantyDate);
    data.updatedDate = formatDateToYYYYMMDD(datesUsed?.updatedDate);
    try {
      console.log(data, 'data111ugsghghh');
      let response = '';
      if (currentData?.assetId) {
        response = await updateAssetsAPI(data);
      } else {
        response = await createAssetsAPI(data);
      }
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset(); // Reset the form values
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      currentData?.assetId ? '' : getTableData();
    } catch (error) {
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
        <DialogTitle>{currentData?.assetId ? 'Edit' : 'Add New'} Assets</DialogTitle>
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
              sm: 'repeat(3, 1fr)',
            }}
          >
            <RHFAutocomplete
              name="locationId"
              id="location-autocomplete"
              options={locationsOptions || []}
              value={selectedLocation}
              onChange={(event, newValue) => setSelectedLocation(newValue)}
              getOptionLabel={(option) => option.locationName}
              renderInput={(params) => (
                <TextField {...params} label="Select Location" variant="outlined" />
              )}
            />
            <RHFTextField name="assetsName" label="Assets Name *" />
            <RHFAutocomplete
              name="assetsType"
              id="type-autocomplete"
              options={asstesTypeOptions || []}
              value={selectedAssetsType}
              onChange={(event, newValue) => setSelectedAssetsType(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Assets type *" variant="outlined" />
              )}
            />
            <RHFTextField name="poNumber" label="PO Number *" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="PO Date"
                  value={datesUsed?.poDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      poDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFTextField type="number" name="poValue" label="PO Value *" />
            <RHFTextField name="invoiceNumber" label="Invoice No *" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Invoice Date *"
                  value={datesUsed?.invoiceDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      invoiceDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Start Date *"
                  value={datesUsed?.assetsStartDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      assetsStartDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Warranty Date *"
                  value={datesUsed?.warrantyDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      warrantyDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFTextField name="supplierName" label="Supplier Name *" />
            <RHFTextField name="supplierEmailId" label="Supplier Email Id *" />
            <RHFTextField
              type="number"
              name="supplierContactNumber"
              label="Supplier Contact Number *"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Expiry Date *"
                  value={datesUsed?.expiryDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      expiryDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="lapse Of Warranty Date *"
                  value={datesUsed?.lapseOfWarrantyDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      lapseOfWarrantyDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFTextField type="number" name="amount" label="Amount" />
            <RHFTextField type="number" name="gstAmount" label="GST Amount" />
            <RHFTextField type="number" name="totalAmount" label="Total Amount *" />

            <RHFAutocomplete
              name="assetsCondition"
              id="assetsCondition-autocomplete"
              options={assetsConditionOptions || []}
              value={selectedassetsCondition}
              onChange={(event, newValue) => setSelectedassetsCondition(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Assets Condition" variant="outlined" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            {currentData?.assetId ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateAssets.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
