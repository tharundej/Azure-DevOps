import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useCallback, useMemo, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import Iconify from 'src/components/iconify/iconify';
import axios from 'axios';

export const StatouryForm=(currentUser)=>{

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const NewUserSchema = Yup.object().shape({
  employee_id: Yup.string().required('Employee ID is Required'),
  employee_name: Yup.string().required(' Employee Name is Required'),
  state: Yup.string().required('State is Required'),
  aadhar_no: Yup.number().required('Aadhar Number is Required'),
  pan_no:Yup.number().required('Pan Number is required'),
  accountholder_name: Yup.string().required('Account holder name is Required'),
  bank_name: Yup.string().required('Bank Name is Required'),
  bank_branch: Yup.string().required('Bank Branch is Required'),
  account_no: Yup.number().required('Account Number is Required'),
  ifsc_code: Yup.number().required('IFSC Code is Required'),
  pf_no: Yup.number().required('PF Number is Required'),
  esic_no: Yup.number().required('ESIC Number is Required'),
  PT: Yup.number().required(' PT% is Required'),
  lwf: Yup.number().required('LWF% is Required'),
});

const defaultValues = useMemo(
  () => ({
    employee_id: currentUser?.employee_id || '',
    employee_name: currentUser?.employee_name || '',
    state: currentUser?.state || '',
    aadhar_no: currentUser?.aadhar_no || null,
    pan_no: currentUser?.pan_no || null,
    accountholder_name:currentUser?.accountholder_name || '',
    bank_name: currentUser?.bank_name || '',
    bank_branch:currentUser?.bank_branch || '',
    account_no:currentUser?.account_no || null,
    ifsc_code: currentUser?.ifsc_code || null,
    pf_no: currentUser?.pf_no || null,
    esic_no: currentUser?.esic_no || null,
    PT: currentUser?.PT || null,
    lwf: currentUser?.lwf || null,
  }),
  [currentUser]
);

const methods = useForm({
  resolver: yupResolver(NewUserSchema),
  defaultValues,
});
const payscheduleTypes = [{ type: 'Permanent' }, { type: 'Temporary' }];
//   const m2 = useForm();
const payTypes = [{ type: 'Weekly' }, { type: 'Monthly' }];
const {
  setValue,
  handleSubmit,
  formState: { isSubmitting },
} = methods;

//   const values = watch();

const onSubmit = handleSubmit(async (data) => {
  console.log('uyfgv');

  try {
    const response = await axios.post('http://localhost:8081/onboarding', data).then(
      (successData) => {
        console.log('sucess', successData);
      },
      (error) => {
        console.log('lllll', error);
      }
    );

    // await new Promise((resolve) => setTimeout(resolve, 500));
    // reset();
    // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
    // router.push(paths.dashboard.user.list);
    // console.info('DATA', data);
  } catch (error) {
    console.error(error);
  }
});

const handleDrop = useCallback(
  (acceptedFiles) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    if (file) {
      setValue('avatarUrl', newFile, { shouldValidate: true });
    }
  },
  [setValue]
);
return (
  <>
    <Button onClick={handleOpen}  variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}>Add Statoury</Button>
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {/* methods={methods} onSubmit={onSubmit} */}
        <DialogTitle>Add Statoury</DialogTitle>

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
            <RHFTextField name="employee_id" label="Employee ID " />
            <RHFTextField
              name="employee_name"
              label="Employee Name"
            />
            <RHFAutocomplete
              name="state"
              label="State"
              options={payTypes.map((payType) => payType.type)}
            />
            <RHFTextField name="aadhar_no" label="Aadhar Number" />
            <RHFTextField name="pan_no" label="Pan Number" />
            <RHFTextField name="accountholder_name" label="Account Holder Name" />
            <RHFTextField name="bank_name" label="Bank Name" />
            <RHFTextField name="bank_branch" label="Bank Branch" />
            <RHFTextField name="account_no" label="Account Number" />
            <RHFTextField name="ifsc_code" label="IFSC Code" />
            <RHFTextField name="pf_no" label="PF Number" />
            <RHFTextField name="esic_no" label="ESIC Number" />
            <RHFTextField name="PT" label="PT%" />
            <RHFTextField name="lwf" label="LWF%" />
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
    </Dialog>
  </>
);
}
// StatouryForm.propTypes = {
//     currentUser: PropTypes.object,
//   };