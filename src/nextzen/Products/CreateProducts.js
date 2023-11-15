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

export default function CreateProducts({ currentData, handleClose }) {
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

      const response = await instance.post('addProducts', data).then(
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
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>ADD New Products</DialogTitle>

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
            <RHFTextField name="ProductName" label="Product Name" />
            <RHFTextField name="ProductCategory" label="Product Category" />
            <RHFTextField name="hsnID" label="HSN ID" />
            
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

CreateProducts.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
