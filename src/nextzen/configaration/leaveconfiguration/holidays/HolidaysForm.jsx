import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';

export default function HolidaysForm({ currentUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const formattedDate = dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const NewUserSchema1 = Yup.object().shape({
    holidayName: Yup.string().required('holiday Name is Required'),
    // date: Yup.string().required('leave Period Name is Required'),
    fulldayHalfday: Yup.string().required('Fullday/Halfday is Required'),
    repeatAnnualy: Yup.string().required('Repeat Annualy is Required'),
    Locations: Yup.string().required('Location is Required'),
  });

  const RepeatsAnuallys = [{ type: 'Yes' }, { type: 'No' }];
  const Fullday_halfdays = [{ type: 'Fullday' }, { type: 'Halfday' }];

  const defaultValues1 = useMemo(
    () => ({
      holidayName: currentUser?.holidayName || null,
      // holidayDate: currentUser?.holidayDate || null,
      fulldayHalfday: currentUser?.fulldayHalfday || null,
      repeatAnnualy: currentUser?.repeatAnnualy || null,
      Locations: currentUser?.Locations || null,
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

  //   const values = watch();

  useEffect(() => {
    const locationPayload = {
      companyID: 'COMP1',
    };
    const response = axios.post(
      'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/locationOnboardingDepartment',
      locationPayload
    );
    console.log(response?.locationID, 'hiiiiiiii');
  }, []);

  const Locationss = [
    {
      type: 'India',
    },
  ];
  
  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = localStorage.getItem('companyID');
    data.holidayDate = formatDateToYYYYMMDD(selectedDate);
    data.locationID=34
    console.log('submitted data111', data);

    try {
      const response = await axios.post(
        'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/addHoliday',
        data
      );
      console.log('sucess', response);
    } catch (error) {
      console.log('error', error);
    }
  });
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px' }}
      >
        Add Holidays
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
          <DialogTitle>Add Holidays</DialogTitle>
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
              <RHFTextField name="holidayName" label="Holiday Name" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DesktopDatePicker']}>
                  <DemoItem label="holidayDate">
                    <DesktopDatePicker value={selectedDate} onChange={handleDateChange} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              <RHFAutocomplete
                name="fulldayHalfday"
                label="FullDay/HalfDay"
                options={Fullday_halfdays.map((Fullday_halfday) => Fullday_halfday.type)}
              />
              <RHFAutocomplete
                name="repeatAnnualy"
                label="Repeats Anually"
                options={RepeatsAnuallys.map((RepeatsAnually) => RepeatsAnually.type)}
              />
              <RHFAutocomplete
                name="Locations"
                label="Locations"
                options={Locationss.map((Locations) => Locations.type)}
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

HolidaysForm.propTypes = {
  currentUser: PropTypes.object,
};
