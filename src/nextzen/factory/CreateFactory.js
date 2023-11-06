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

export default function CreateFactory({ currentUser, handleClose }) {
  const NewUserSchema = Yup.object().shape({
    project_name: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      project_name: currentUser?.project_name || '',
      start_date: currentUser?.start_date || '',
      end_date: currentUser?.end_date || '',
      due_date: currentUser?.due_date || '',
      status: currentUser?.status || '',
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

  const statusOptions = ['Active', 'Inactive'];

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');

    try {
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addProject', data).then(
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
        <DialogTitle>ADD New Factory</DialogTitle>

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
            <RHFTextField name="Name" label="Name" />
            <RHFTextField name="Email ID" label="Email ID" />
            <RHFTextField name="Phone No" label="Phone No" />
            <RHFTextField name="Address" label="Address" />
            <RHFTextField name=" Bank Name" label=" Bank Name" />
            <RHFTextField name="Name As Per Bank" label="Name As Per Bank" />
            <RHFTextField name="Account No" label="Account No" />
            <RHFTextField name="IFSC Code" label="IFSC Code" />
            <RHFTextField name="Bank Branch Name" label="Bank Branch Name" />
            <RHFTextField name="status" label="status" />
            {/* <RHFAutocomplete
              id="status-autocomplete"
              options={statusOptions}
              value=""
              renderInput={(params) => (
                <TextField {...params} label="Select Status" variant="outlined" />
              )}
            /> */}
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

CreateFactory.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.any,
};
