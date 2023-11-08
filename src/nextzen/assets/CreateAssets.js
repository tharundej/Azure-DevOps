import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { createAssetsAPI } from 'src/api/Accounts/Assets';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import formatDateToYYYYMMDD from '../global/GetDateFormat';

export default function CreateAssets({ currentUser, handleClose }) {
  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      locationId: currentUser?.locationId || '',
      assetsName: currentUser?.assetsName || '',
      assetsType: currentUser?.assetsType || '',
      poNumber: currentUser?.poNumber || '',
      poDate: currentUser?.poDate || '',
      poValue: currentUser?.poValue || '',
      invoiceNumber: currentUser?.invoiceNumber || '',
      invoiceDate: currentUser?.invoiceDate || '',
      assetsStartDate: currentUser?.assetsStartDate || '',
      warrantyDate: currentUser?.warrantyDate || '',
      supplierName: currentUser?.supplierName || '',
      supplierEmailId: currentUser?.supplierEmailId || '',
      supplierContactNumber: currentUser?.supplierContactNumber || '',
      expiryDate: currentUser?.expiryDate || '',
      lapseOfWarrantyDate: currentUser?.lapseOfWarrantyDate || '',
      amount: currentUser?.amount || '',
      gstAmount: currentUser?.gstAmount || '',
      totalAmount: currentUser?.totalAmount || '',
      assetsCondition: currentUser?.assetsCondition || '',
      updatedDate: currentUser?.updatedDate || '',
      deleteBit: currentUser?.deleteBit || 1,
      companyId: currentUser?.companyId || 'COMP1',
    }),
    [currentUser]
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

  const assetsConditionOptions = ['In Use', 'Scrap & Sold', 'Spare', 'Scrap', 'Under Maintenance'];
  const [selectedassetsCondition, setSelectedassetsCondition] = useState(
    defaultValues.assetsCondition || ''
  );
  const asstesTypeOptions = ['Electronic1', 'Electronic2'];
  const [selectedAssetsType, setSelectedAssetsType] = useState(defaultValues.assetsType || '');
  const lcoationsOptions = [
    { id: 0, value: 'Select Location' },
    { id: 30, value: 'loca1' },
    { id: 31, value: 'loca2' },
  ];
  const [selectedLocation, setSelectedLocation] = useState(
    defaultValues.locationId || lcoationsOptions[0]
  );
  const [errorMessage, setErrorMessage] = useState();
  const [datesUsed, setDatesUsed] = useState({
    poDate: dayjs(new Date()),
    invoiceDate: dayjs(new Date()),
    assetsStartDate: dayjs(new Date()),
    warrantyDate: dayjs(new Date()),
    expiryDate: dayjs(new Date()),
    lapseOfWarrantyDate: dayjs(new Date()),
    updatedDate: dayjs(new Date()),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddAssets ~ onSubmit ~ data:', data);
    data.locationId = selectedLocation.id;
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
      const response = await createAssetsAPI(data);
      console.log('success', response);
    } catch (error) {
      setErrorMessage(error.message);
      console.log('API request failed:', error.message);
    }
  });
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Add New Assets</DialogTitle>
        <DialogContent>
          <h3 style={{ color: 'red' }}>{errorMessage}</h3>
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
              name="locationId"
              id="location-autocomplete"
              options={lcoationsOptions || []}
              value={selectedLocation}
              onChange={(event, newValue) => setSelectedLocation(newValue)}
              getOptionLabel={(option) => option.value}
              renderInput={(params) => (
                <TextField {...params} label="Select Location" variant="outlined" />
              )}
            />
            <RHFTextField name="assetsName" label="Assets Name" />
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
            <RHFTextField name="poNumber" label="PO Number" />
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
            <RHFTextField type="number" name="poValue" label="PO Value" />
            <RHFTextField name="invoiceNumber" label="Invoice No" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Invoice Date"
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
                  label="Start Date"
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
                  label="Warranty Date"
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
            <RHFTextField name="supplierName" label="Supplier Name" />
            <RHFTextField name="supplierEmailId" label="Supplier Email Id" />
            <RHFTextField
              type="number"
              name="supplierContactNumber"
              label="Supplier Contact Number"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Expiry Date"
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
                  label="lapse Of Warranty Date"
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
            <RHFTextField type="number" name="totalAmount" label="Total Amount" />

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

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateAssets.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.any,
};
