import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// @mui
import dayjs from 'dayjs';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';

export default function ComoffConfigurationForm({ currentUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const NewUserSchema1 = Yup.object().shape({
    compensatory: Yup.string().required('Expense Name is Required'),
    type: Yup.string().required('Department Name is Required'),
  });

  const defaultValues1 = useMemo(
    () => ({
      compensatory: currentUser?.compensatory || null,
      type: currentUser?.type || null,
    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });

  const {
    setValue: setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;
  const compensatorytypes = [{ type: 'Leave' }, { type: 'Incashment' }];
  const types = [{ type: 'Expiry Days' }, { type: 'Amount' }];

  //   const values = watch();

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = localStorage.getItem('companyID');
    console.log('submitted data111', data);

    try {
      const response = await axios.post(
        'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/addPaySchedule',
        data
      );
      console.log('sucess', response);
    } catch (error) {
      console.log('error', error);
    }
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px' }}
      >
        Add Comoff Config
      </Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <FormProvider methods={methods1} onSubmit={onSubmit1}>
          <DialogTitle>Add Comoff Config</DialogTitle>
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
              <RHFAutocomplete
                name="type"
                label="Type"
                options={compensatorytypes.map((name) => name.type)}
              />
              <RHFAutocomplete
                name="compensatory"
                label="Compensatory"
                options={types.map((name) => name.type)}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={onSubmit1}
              loading={isSubmitting1}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

ComoffConfigurationForm.propTypes = {
  currentUser: PropTypes.object,
};
