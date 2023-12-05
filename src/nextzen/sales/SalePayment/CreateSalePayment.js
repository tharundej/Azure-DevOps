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
import Iconify from 'src/components/iconify/iconify';
// import ModalHeader from '../global/modalheader/ModalHeader';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function CreateSalePayment({ currentData, handleClose }) {
  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      ProductName: currentData?.ProductName || '',
      ProductCategory: currentData?.ProductCategory || '',
      hsnID: currentData?.hsnID || '',
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

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    try {
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addPurchasePayment', data).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

  return (

    <div >
      <ModalHeader heading={"Add New Sale Payment"}/>
      <FormProvider methods={methods} onSubmit={onSubmit}>

        {/* <DialogTitle>Add New Sale Payment</DialogTitle> */}


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
            <RHFTextField name="SO Number" label="SO Number" />
            <RHFTextField name="Invoice Number" label="Invoice Number" />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Invoice Date"
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
            <RHFTextField name="EWay Bill" label="EWay Bill" />
            <RHFTextField type="number" name="No of Instalments" label="No of Instalments" />
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
