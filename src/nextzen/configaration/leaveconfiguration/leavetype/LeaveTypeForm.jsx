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
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';

export default function LeaveTypeForm({ currentUser}) {
  const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const NewUserSchema1 = Yup.object().shape({
    LeaveTypeId: Yup.number().required('Leave Type Id is Required'),
    LeaveName: Yup.number().required('Leave Name is Required'),
    StartDate: Yup.number().required('Start Date is Required'),
    TotalNumberOfLeaves: Yup.number().required('Total Number Of Leaves is Required'),
    TermType: Yup.number().required('Term Type is Required'),
    ElUpperCapLimit: Yup.number().required('El Upper Cap Limit is Required'),
    ElTakenRange: Yup.number().required('El Taken Range is Required'),
  });


  const defaultValues1 = useMemo(
    () => ({
      LeaveTypeId: currentUser?.LeaveTypeId || null,
      LeaveName: currentUser?.LeaveName || null,
      StartDate: currentUser?.StartDate || null,
      TotalNumberOfLeaves: currentUser?.TotalNumberOfLeaves || null,
      TermType: currentUser?.TermType || null,
      ElUpperCapLimit: currentUser?.ElUpperCapLimit || null,
      ElTakenRange: currentUser?.ElTakenRange || null,

    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });


  const {
    setValue:setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;



  //   const values = watch();

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId=localStorage.getItem('companyID')
    console.log('submitted data111', data);

    try {
      const response = await axios.post('https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/addPaySchedule', data);
      console.log('sucess',response);
    } catch (error) {
      console.log('error', error);
    }
  });



//   const handleDrop1 = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];

//       const newFile = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });

//       if (file) {
//         setValue1('avatarUrl', newFile, { shouldValidate: true });
//       }
//     },
//     [setValue1]
//   );
 
  return (
    <>
      <Button onClick={handleOpen}  variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}>Add Leave Type</Button>
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
            <DialogTitle>Add Leave Type</DialogTitle>
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
                <RHFTextField name="LeaveTypeId" label="Leave Type Id" />
                <RHFTextField name="LeaveName" label="Leave Name" />
                <RHFTextField name="StartDate" label="Start Date" />
                <RHFTextField name="ElUpperCapLimit" label="EL Upper Cap Limit" />
                <RHFTextField name="TermType" label="Term Type" />
                <RHFTextField name="ElTakenRange" label="EL Taken Range"/>
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

LeaveTypeForm.propTypes = {
  currentUser: PropTypes.object,
};
