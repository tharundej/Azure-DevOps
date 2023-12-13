import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { formatDateToYYYYMMDD } from 'src/nextzen/global/GetDateFormat';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import UserContext from '../context/user/UserConext';
import { getLocationAPI } from 'src/api/Accounts/Common';
import { createExpensesAPI, updateExpensesAPI } from 'src/api/Accounts/Expenses';
import ModalHeader from '../global/modalheader/ModalHeader';
import SnackBarComponent from '../global/SnackBarComponent';

export default function CreateExpenses({ currentData, handleClose, handleCountChange }) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    invoiceNO: Yup.string().required(),
    totalAmount: Yup.number().required(),
    paidAmount: Yup.number().required(),
    totalLiter: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      companyID: user?.companyID ? user?.companyID : '',
      expensesID: currentData?.expenseID || '',
      locationID: currentData?.locationID || '',
      expenseType: currentData?.expenseType || '',
      expenseDate: currentData?.expenseDate || '',
      vehicleRegNO: currentData?.vehicleRegNO || '',
      vehicleType: currentData?.vehicleType || '',
      totalLiter: currentData?.totalLiter || '0',
      fuelType: currentData?.fuelType || '',
      itemName: currentData?.itemName || '',
      invoiceNO: currentData?.invoiceNO || '',
      invoiceDate: currentData?.invoiceDate || '',
      totalAmount: currentData?.totalAmount || '',
      paidAmount: currentData?.paidAmount || '',
      quantity: currentData?.quantity || '',
      rate: currentData?.rate || '',
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
  const [datesUsed, setDatesUsed] = useState({
    expenseDate: defaultValues?.expenseDate ? dayjs(defaultValues?.expenseDate) : dayjs(new Date()),
    invoiceDate: defaultValues?.invoiceDate ? dayjs(defaultValues?.invoiceDate) : dayjs(new Date()),
  });
  const [type, setType] = useState(defaultValues?.expenseType == 'Others' ? false : true);
  const [selectedValue, setSelectedValue] = useState(defaultValues.expenseType || 'Fuel');
  const [factoryOptions, setFactoryOptions] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const statusOptions = ['Paid', 'Unpaid'];
  const [selectedStatus, setSelectedStatus] = useState(defaultValues.status || statusOptions[0]);
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    event.target.value == 'Others' ? setType(false) : setType(true);
  };
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
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    data.expenseDate = formatDateToYYYYMMDD(datesUsed?.expenseDate);
    data.invoiceDate = formatDateToYYYYMMDD(datesUsed?.invoiceDate);
    data.locationID = selectedFactory;
    data.expenseType = selectedValue;
    data.status = selectedStatus;
    try {
      console.log(data, 'data111ugsghghh');
      let response = '';
      if (currentData?.expenseID) {
        response = await updateExpensesAPI(data);
      } else {
        response = await createExpensesAPI(data);
      }
      if (handleCountChange) handleCountChange();
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset(); // Reset the form values
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
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
  const HandleInputChange = (e) => {
    setValue(e?.target?.name, e?.target?.value);
    const parsedQuantity = parseFloat(watch(`quantity`));
    const parsedPrice = parseFloat(watch(`rate`));
    setValue(`totalAmount`, parsedQuantity * parsedPrice);
  };
  return (
    <div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading={currentData.expenseID ? 'Update Expense' : 'Add New Expense'} />
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
            <RadioGroup
              row
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={selectedValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="Fuel" name="expenseType" control={<Radio />} label="Fuel" />
              <FormControlLabel
                value="Vehicle"
                name="expenseType"
                control={<Radio />}
                label="Vehicle"
              />
              <FormControlLabel
                value="Others"
                name="expenseType"
                control={<Radio />}
                label="Others"
              />
            </RadioGroup>
            <RHFAutocomplete
              name="locationID"
              id="locationID"
              options={factoryOptions || []}
              value={factoryOptions.find((option) => option.locationID === selectedFactory) || null}
              onChange={(event, newValue) =>
                setSelectedFactory(newValue ? newValue.locationID : null)
              }
              getOptionLabel={(option) => option.locationName}
              renderInput={(params) => (
                <TextField {...params} label="Select Factory / Location Name" variant="outlined" />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Expense Date *"
                  value={datesUsed?.expenseDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      expenseDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFTextField name="invoiceNO" label="invoice NO" />
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
            {type && (
              <>
                <RHFTextField name="vehicleType" label="Vehicle Type" />
                <RHFTextField name="vehicleRegNO" label="Vehicle No" />
                <RHFTextField type="number" name="totalLiter" label="Total Liter" />
                <RHFTextField name="fuelType" label="Fuel Type" />
              </>
            )}
            {type == false && (
              <>
                <RHFTextField name="itemName" label="Item Name" />
                <RHFTextField
                  type="number"
                  onChange={(e) => HandleInputChange(e)}
                  name="quantity"
                  label="Quantity"
                  defaultValue={0}
                />
                <RHFTextField
                  type="number"
                  onChange={(e) => HandleInputChange(e)}
                  name="rate"
                  label="Rate"
                  defaultValue={0}
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
              </>
            )}
            <RHFTextField type="number" name="totalAmount" label="Total Amount" />
            <RHFTextField type="number" name="paidAmount" label="Paid Amount" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            {currentData.expenseID ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateExpenses.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
  handleCountChange: PropTypes.func,
};
