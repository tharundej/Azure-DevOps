import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import UserContext from 'src/nextzen/context/user/UserConext';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import instance from 'src/api/BaseURL';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify/iconify';
// import ModalHeader from '../global/modalheader/ModalHeader';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { createSalesPaymentAPI } from 'src/api/Accounts/SalePayment';
import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';
import { formatDateToYYYYMMDD, formatDate } from 'src/nextzen/global/GetDateFormat';

export default function CreateSalePayment({ currentData, handleClose }) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),
  });


  const defaultValues = useMemo(
    () => ({
      companyID: currentData?.companyID || user?.companyID ? user?.companyID : '',
      soNumber: currentData?.soNumber || '',
      invoiceNumber: currentData?.invoiceNumber || '',
      ProductName: currentData?.ProductName || '',
      ProductCategory: currentData?.ProductCategory || '',
      hsnID: currentData?.hsnID || '',
      status: currentData?.status || '',
      paidDate: currentData?.paidDate || '',
    }),
    [currentData]
  );
  const [datesUsed, setDatesUsed] = useState({
    paidDate: defaultValues?.paidDate
      ? dayjs(defaultValues?.paidDate)
      : dayjs(new Date()),
  });

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

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    data.paidDate = formatDateToYYYYMMDD(datesUsed?.paidDate);

    try {
      data.locationPhone = parseInt(data.locationPhone);
      data.locationPincode = parseInt(data.locationPincode);

      console.log('Create Factory Data', data);
      let response = '';
      if (currentData?.invoiceNumber) {
        response = '';
      } else {
        response = await createSalesPaymentAPI(data);
      }
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset();
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      // currentData?.locationName ? handleCountChange() : getTableData();
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

    <div >
      <ModalHeader heading={"Add New Sale Payment"}/>
      <FormProvider methods={methods} onSubmit={onSubmit}>

        {/* <DialogTitle>Add New Sale Payment</DialogTitle> */}
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
            <RHFTextField name="SoNumber" label="SO Number" />
            <RHFTextField name="InvoiceNumber" label="Invoice Number" />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Paid Date"
                  value={datesUsed?.paidDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      paidDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFTextField name="EWay Bill" label="EWay Bill" />
            <RHFTextField type="number" name="No of Instalments" label="Number of Instalments" />
            <RHFTextField type="number" name="Received Amount" label="Received Amount" />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Due Date"
                  // value={datesUsed?.expectedDeliveryDate}
                  defaultValue={dayjs(new Date())}
                  // onChange={(newValue) => {
                  //   setDatesUsed((prev) => ({
                  //     ...prev,
                  //     expectedDeliveryDate: newValue,
                  //   }));
                  // }}
                />
              </DemoContainer>
            </LocalizationProvider>


          </Box>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateSalePayment.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
