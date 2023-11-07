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

export default function CreateCustomers({ currentData, handleClose }) {
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

  const statusOptions = ['Active', 'In Active'];
  const [selectedStatus, setSelectedStatus] = useState(defaultValues.status || '');

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    data.status = selectedStatus;
    try {
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addCustomers', data).then(
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
    <div className="modal-container">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>ADD New Customers</DialogTitle>

        <DialogContent className="modal-content">
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
            <RHFTextField name="Factory Name" label="Factory Name" />
            <RHFTextField name="Customer ID" label="Customer ID" />
            <RHFTextField name="Customer Name" label="Customer Name" />
            <RHFTextField name="Customer Company Name" label="Customer Company Name" />
            <RHFTextField name="Email ID" label="Email ID" />
            <RHFTextField name="Customer Address" label="Customer Address" />
            <RHFTextField name="Phone No" label="Phone No" />
            <RHFTextField name="GST No" label="GST No" />
            <RHFTextField name="PAN No" label="PAN No" />
            <RHFTextField name="Customer PAN No" label="Customer PAN No" />

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

CreateCustomers.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
