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

export default function CreatePurchaseOrder({ currentData, handleClose }) {
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

      const response = await instance.post('addPurchaseOrder', data).then(
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
  const initialContent = (
    <Box
      rowGap={3}
      columnGap={2}
      display="grid"
      marginTop={2}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(5, 1fr)',
      }}
    >
      <RHFTextField name="Material Name" label="Material Name" />
      <RHFTextField name="HSN Code" label="HSN Code" />
      <RHFTextField name="Unit Of Measure" label="Unit Of Measure" />
      <RHFTextField name="Quantity" label="Quantity" />
      <RHFTextField name="Rate" label="Rate" />
    </Box>
  );
  const [contentList, setContentList] = useState([initialContent]);
  const handleButtonClick = () => {
    const newContent = initialContent;
    setContentList([...contentList, newContent]);
  };

  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>ADD New Purchase Order</DialogTitle>

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
            <RHFTextField name="PO Number" label="PO Number" />
            <RHFTextField name="PO Date" label="PO Date" />
            <RHFTextField name="Expected Delivery Date" label="Expected Delivery Date" />
            <RHFTextField name="Payment Term" label="Payment Term" />
            <RHFTextField name="Vendor Name" label="Vendor Name" />
            <RHFTextField name="Vendor Address" label="Vendor Address" />
            <RHFTextField name=" Vendor PAN" label=" Vendor PAN" />
            <RHFTextField name=" Vendor GST No" label=" Vendor GST No" />
            <RHFTextField name="Email ID" label="Email ID" />
            <RHFTextField name="Contact No" label="Contact No" />
            <RHFTextField name="Vendor Location" label="Vendor Location" />
            <RHFTextField name="Company Name" label="Company Name" />
            <RHFTextField name="Company  Address" label="Company  Address" />
            <RHFTextField name="Company  GST" label="Company  GST" />
            <RHFTextField name="Company  PAN" label="Company  PAN" />
            <RHFTextField name="Factory Shipping Address" label="Factory Shipping Address" />
          </Box>
          <Box
            marginTop={2}
            display="flex"
            justifyContent="space-between" // Align items to the right
            alignItems="center"
          >
            <h2>Purchase Material</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ margin: '20px' }}
            >
              Add
            </Button>
          </Box>
          {contentList.map((content, index) => (
            <div key={index}>{content}</div>
          ))}
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

CreatePurchaseOrder.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
