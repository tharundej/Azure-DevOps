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

export default function AddEmployeShift({ currentUser }) {
  const [datesUsed, setDatesUsed] = useState({
    Select_grade: dayjs(new Date()),
    Select_Department: dayjs(new Date()),
    Due_Date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Select_Shift: Yup.string(),
    shiftGroupName: Yup.string(),
    Select_Department: Yup.string(),
    Select_Designation: Yup.string(),
    Select_grade: Yup.string().required('First Name is Required'),
    End_Date: Yup.string(),
   
   
  });

  const defaultValues = useMemo(
    () => ({
   
        Select_Shift: currentUser?.Select_Shift || '',
        shiftGroupName: currentUser?.shiftGroupName || '',
        Select_Department: currentUser?.Select_Department || '',
        Select_Designation: currentUser?.Select_Designation || '',
        Select_grade: currentUser?.Select_grade || '',
        End_Date: currentUser?.End_Date || '',
  
   
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
      data.shiftConfigurationId = 3;
      data.supervisorId = 'ibm4';
      data.ShiftTerm = 'weekly';
      data.supervisorId = 'ibm4';
      data.departmentId = '';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
      // data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
      // data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

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
             Add Employee Shift Here ...
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
               

  <RHFSelect name="shiftGroupName" label="Shift Group Name ">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect>

<RHFSelect name="Select_Shift" label="Select Shift">

  <option value="full_day" >Full Day</option>

  <option value="first_half" >First Half</option>

  <option value="second_half" >Second Half</option>

  </RHFSelect>


<RHFSelect name="Select_Department" label="Select Department">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect>
<RHFSelect name="Select_Designation" label="Select Designation">

<option value="full_day" >HR</option>

<option value="first_half" >Manager</option>

<option value="second_half" >Developer</option>

</RHFSelect>
<RHFSelect name="Select_grade" label="Select Grade">

<option value="full_day" >HR</option>

<option value="first_half" >Manager</option>

<option value="second_half" >Developer</option>

</RHFSelect>

<Autocomplete

  multiple

  id="Primary Skills"

  options={top100Films.map((option) => option.title)}

  freeSolo


  renderTags={(value1, getTagProps) =>

    value1.map((option, index1) => (

      <Chip variant="outlined" label={option} {...getTagProps({ index1 })} />

    ))

  }

  renderInput={(params) => (

    <TextField

      {...params}

      variant="filled"

      label="Select Employe"

      placeholder="Favorites"

    />

  )}

/>
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Add  Employe To Shift'}
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

AddEmployeShift.propTypes = {
  currentUser: PropTypes.object,
};
