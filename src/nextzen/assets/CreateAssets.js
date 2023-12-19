import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, reset } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { createAssetsAPI, updateAssetsAPI } from '../../api/Accounts/Assets';
import SnackBarComponent from '../global/SnackBarComponent';
import FormProvider, { RHFTextField, RHFAutocomplete } from '../../components/hook-form';
import { formatDateToYYYYMMDD, formatDate } from 'src/nextzen/global/GetDateFormat';
import { getLocationAPI, getTaxs } from 'src/api/Accounts/Common';
import ModalHeader from '../global/modalheader/ModalHeader';
import UserContext from 'src/nextzen/context/user/UserConext';

export default function CreateAssets({
  currentData,
  handleClose,
  getTableData,
  handleCountChange,
}) {
  const { user } = useContext(UserContext);
  const newUserSchema = Yup.object().shape({
    assetsName: Yup.string().required('Asset Name is Required'),
    poNumber: Yup.string().required('PO Number is Required'),
    poValue: Yup.number().positive().required('PO Value is Required'),
    invoiceNumber: Yup.string().required('Invoice Number is Required'),
    supplierName: Yup.string().required('Supplier Name is Required'),
    supplierEmailId: Yup.string().required('Supplier Email Id is Required'),
    supplierContactNumber: Yup.number().required('Supplier Contact Number is Required'),
    totalAmount: Yup.number().positive().required('Total Amount is Required'),
    quantity: Yup.number().positive(),
    price: Yup.number().positive(),
    modelName: Yup.string().required(),
  });

  const defaultValues = useMemo(
    () => ({
      assetsId: currentData?.assetId || 0,
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
      companyId: currentData?.companyId || user?.companyID ? user?.companyID : '',
      operationalDays: currentData?.operationalDays || '',
      quantity: currentData?.quantity || 1,
      modelName: currentData?.moduleName || '',
      gstRate: currentData?.gstRate || 0,
      price: currentData?.price || 1,
    }),
    [currentData]
  );

  const methods = useForm({
    resolver: yupResolver(newUserSchema),
    defaultValues,
  });

  const {
    register,
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    errors,
  } = methods;
  const [selectedTaxs, setSelectedTaxs] = useState();
  const HandleChangeTax = (value) => {
    console.log('parsed', value);
    setSelectedTaxs(value);
    setValue('gstRate', value);
    updateCalculatedValues();
  };
  const HandleInputChnage = (e) => {
    setValue(e?.target?.name, e?.target?.value);
    updateCalculatedValues();
  };
  const updateCalculatedValues = () => {
    const parsedQuantity = parseFloat(watch('quantity'));
    const parsedPrice = parseFloat(watch('price'));
    const parsedGstRate = parseFloat(watch('gstRate'));
    const calculatedAmount =
      isNaN(parsedQuantity) || isNaN(parsedPrice) ? 0 : parsedQuantity * parsedPrice;
    const calculatedGstAmount =
      isNaN(calculatedAmount) || isNaN(parsedGstRate)
        ? 0
        : (calculatedAmount * parsedGstRate) / 100;
    const calculatedTotalAmount =
      isNaN(calculatedAmount) || isNaN(calculatedGstAmount)
        ? 0
        : calculatedAmount + calculatedGstAmount;
    setValue('amount', calculatedAmount);
    setValue('gstAmount', calculatedGstAmount);
    setValue('totalAmount', calculatedTotalAmount);
  };

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
  const [taxsOptions, setTaxsOptions] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const data = { companyID: user?.companyID ? user?.companyID : '' };
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
    const fetchTaxs = async () => {
      try {
        const response = await getTaxs();
        console.log('Tax responce:', response);
        console.log('defaultValues.gstRate', defaultValues.gstRate);
        setTaxsOptions(response);
        setSelectedTaxs(defaultValues.gstRate || (response.length > 0 ? response[0].value : 0));
        setValue('gstRate', defaultValues.gstRate || (response.length > 0 ? response[0].value : 0));
        updateCalculatedValues();
      } catch (error) {
        console.log('Tax API Error', error);
      }
    };
    fetchTaxs();
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
      currentData?.assetId > 0 ? handleCountChange() : getTableData();
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
    <div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading={currentData?.assetId ? 'Edit Assets' : 'Add New Assets'} />
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
                <TextField {...params} label="Assets type" variant="outlined" />
              )}
            />
            <RHFTextField name="modelName" label="Model Name *" />
            <RHFTextField name="poNumber" label="PO Number *" />
            <RHFTextField type="number" name="poValue" label="PO Value *" />
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
            <RHFTextField name="invoiceNumber" label="Invoice Number *" />
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
            <RHFTextField
              name="quantity"
              type="number"
              onChange={HandleInputChnage}
              label="Quantity *"
            />
            <RHFTextField name="price" type="number" onChange={HandleInputChnage} label="Price *" />
            <RHFAutocomplete
              name="gstRate"
              id="gstRate"
              options={taxsOptions || []}
              value={taxsOptions.find((option) => option.value === parseInt(selectedTaxs)) || null}
              onChange={(event, newValue) => HandleChangeTax(newValue ? newValue.value : 0)}
              renderInput={(params) => (
                <TextField {...params} label="Select Tax" variant="outlined" />
              )}
            />
            <RHFTextField
              name="amount"
              label="Amount"
              InputProps={{
                readOnly: true,
              }}
            />
            <RHFTextField
              InputProps={{
                readOnly: true,
              }}
              name="gstAmount"
              label="GST Amount"
            />
            <RHFTextField
              InputProps={{
                readOnly: true,
              }}
              name="totalAmount"
              label="Total Amount *"
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
