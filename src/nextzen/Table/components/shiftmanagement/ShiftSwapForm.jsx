import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import TextField from '@mui/material/TextField';

import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
// routes
import { useRouter } from 'src/routes/hooks';
// assets
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFSelect,
} from 'src/components/hook-form';
import axios from 'axios';

import { Autocomplete } from '@mui/lab';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import { Button } from '@mui/material';

export default function ShiftSwapForm({ currentUser }) {
  const [datesUsed, setDatesUsed] = useState({
    FromShiftGroup_Name1: dayjs(new Date()),
    ToShiftGroup_Name: dayjs(new Date()),
    Swap_Date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Select_Employe: Yup.string(),
    FromShiftGroup_Name: Yup.string(),
    ToShiftGroup_Name: Yup.string(),
    FromShiftGroup_Name1: Yup.string().required('First Name is Required'),
    Select_Employe1: Yup.string(),
    ToShiftGroup_Name1: Yup.string(),
    Swap_Date: Yup.string(),
   
   
  });

  const defaultValues = useMemo(
    () => ({
   
        Select_Employe: currentUser?.Select_Employe || '',
        FromShiftGroup_Name: currentUser?.FromShiftGroup_Name || '',
        ToShiftGroup_Name: currentUser?.ToShiftGroup_Name || '',
        FromShiftGroup_Name1: currentUser?.FromShiftGroup_Name1 || '',
        Select_Employe1: currentUser?.Select_Employe1 || '',
        ToShiftGroup_Name1: currentUser?.ToShiftGroup_Name1 || '',
        Swap_Date: currentUser?.Swap_Date || '',

  
   
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const m2 = useForm();

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
    console.log('uyfgv');

    try {
      data.company_id = '0001';
      data.company_name = 'infbell';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
      data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
      data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

      console.log(data, 'data111ugsghghh');

      const response = await axios.post('http://localhost:8081/onboarding', data).then(
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

 
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
  ];
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>

          <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'5px'}}>
              Employee Shift Swap Here ...
              </Typography>
            </Grid>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
               
<RHFSelect name="FromShiftGroup_Name1" label="From Shift Group Name ">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect>

<RHFSelect name="Select_Employe" label="Select Employe">

  <option value="full_day" >Full Day</option>

  <option value="first_half" >First Half</option>

  <option value="second_half" >Second Half</option>

  </RHFSelect>

<RHFSelect name="ToShiftGroup_Name" label="To Shift GroupName">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect>
<br/>
<Stack>
    <Typography>
        Select second Employe To Swap...
    </Typography>
</Stack>
<br/>
<RHFSelect name="FromShiftGroup_Name" label="To Shift GroupName">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect>

<RHFSelect name="Select_Employe1" label="Select Employe">

  <option value="full_day" >Full Day</option>

  <option value="first_half" >First Half</option>

  <option value="second_half" >Second Half</option>

  </RHFSelect>

  <RHFSelect name="ToShiftGroup_Name1" label="To Shift GroupName">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Swap Date"
                      value={datesUsed?.Swap_Date}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          Swap_Date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                




              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Swap Shift'}
                </LoadingButton>
                <Button sx={{backgroundColor:"#d12317",ml:"5px"}}>Cancel</Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}

ShiftSwapForm.propTypes = {
  currentUser: PropTypes.object,
};
