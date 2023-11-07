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

export default function WorkWeekForm({ currentUser}) {
  const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const NewUserSchema1 = Yup.object().shape({
    monday: Yup.string().required('Monday is Required'),
    tuesday: Yup.string().required('Tuesday Required'),
    wednesday: Yup.string().required('Wednesday Required'),
    thursday: Yup.string().required('Thursday Required'),
    friday: Yup.string().required('Friday Required'),
    saturday: Yup.string().required('Saturday Required'),
    sunday: Yup.string().required('Sunday Required'),
  });


  const defaultValues1 = useMemo(
    () => ({
      monday: currentUser?.monday || null,
      tuesday: currentUser?.tuesday || null,
      wednesday: currentUser?.wednesday || null,
      thursday: currentUser?.thursday || null,
      friday: currentUser?.friday || null,
      saturday: currentUser?.saturday || null,
      sunday: currentUser?.sunday || null,

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
  const DayTypes = [
    {type: "Full Day"},
    {type: "Half Day"},
    {type: "Non-Working Day"}
  ];

 
  return (
    <>
      <Button onClick={handleOpen}  variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}>Add Work Week</Button>
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
                <RHFAutocomplete options={DayTypes.map((DayType) => DayType.type)}name="monday" label="Monday" />
                <RHFAutocomplete options={DayTypes.map((DayType) => DayType.type)}name="tuesday" label="Tuesday" />
                <RHFAutocomplete options={DayTypes.map((DayType) => DayType.type)}name="wednesday" label="Wednesday" />
                <RHFAutocomplete options={DayTypes.map((DayType) => DayType.type)}name="thursday" label="Thursday" />
                <RHFAutocomplete options={DayTypes.map((DayType) => DayType.type)}name="friday" label="Friday" />
                <RHFAutocomplete options={DayTypes.map((DayType) => DayType.type)}name="saturday" label="Saturday" />
                <RHFAutocomplete options={DayTypes.map((DayType) => DayType.type)}name="sunday" label="Sunday"/>
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

WorkWeekForm.propTypes = {
  currentUser: PropTypes.object,
};
