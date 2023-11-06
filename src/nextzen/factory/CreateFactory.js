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
    name: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      emailID: currentUser?.emailID || '',
      phoneNo: currentUser?.phoneNo || '',
      address: currentUser?.address || '',
      bankName: currentUser?.bankName || '',
      nameAsPerBank: currentUser?.nameAsPerBank || '',
      accountNo: currentUser?.accountNo || '',
      ifscCode: currentUser?.ifscCode || '',
      bankBranchName: currentUser?.bankBranchName || '',
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
  const [selectedStatus, setSelectedStatus] = useState(defaultValues.status || '');
  const handleStatusChange = (event, newValue) => {
    setSelectedStatus(newValue);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    data.status = selectedStatus;
    try {
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addFactory', data).then(
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
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="emailID" label="Email ID" />
            <RHFTextField name="phoneNo" label="Phone No" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="bankName" label=" Bank Name" />
            <RHFTextField name="nameAsPerBank" label="Name As Per Bank" />
            <RHFTextField name="accountNo" label="Account No" />
            <RHFTextField name="ifscCode" label="IFSC Code" />
            <RHFTextField name="bankBranchName" label="Bank Branch Name" />
            <RHFAutocomplete
              name="status"
              id="status-autocomplete"
              options={statusOptions || []}
              value={selectedStatus}
              onChange={(event, newValue) => setSelectedStatus(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Status" variant="outlined" />
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

CreateFactory.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.any,
};
