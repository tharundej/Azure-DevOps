import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';

import formatDateToYYYYMMDD from '../global/GetDateFormat';

export default function TimeForm({ currentUser }) {
  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    employee_id: Yup.string(),
    Employe_Name: Yup.string(),
    Project_Name: Yup.string(),
    Activity_Name: Yup.string(),
    monday: Yup.string().required('First Name is Required'),
    tuesday: Yup.string(),
    wednseday: Yup.string('Last Name is Required'),
    thursday: Yup.string().email().required('Email is Required'),
    friday: Yup.string(),
    saturday : Yup.string(),
    sunday: Yup.string(),
    Total_hours: Yup.string(),
    Comment: Yup.string(),
   
  });

  const defaultValues = useMemo(
    () => ({
   
      employee_id: currentUser?.employee_id || '',
      Employe_Name: currentUser?.Employe_Name || '',
      Project_Name: currentUser?.Project_Name || '',
      Activity_Name: currentUser?.Activity_Name || '',
      monday: currentUser?.monday || '',
      tuesday: currentUser?.tuesday || '',
      wednseday: currentUser?.wednseday || '',
      thursday: currentUser?.thursday || '',
      friday: currentUser?.friday || '',
      saturday: currentUser?.saturday || '',
      sunday: currentUser?.sunday || '',
      Total_hours: currentUser?.Total_hours || '',
      Comment: currentUser?.Comment || '',
   
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
      data.company_id = 'COMP2';
      data.activity_id = '1';
      data.project_id = '9';
      data.date_of_activity = '2023-11-11';
      data.start_time = '2023-10-17 11:50:02.023';
      data.end_time = '2023-10-17 11:50:02.023';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
      // data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
      // data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

      console.log(data, 'data111ugsghghh');

      const response = await axios.post('https://898vmqzh-5001.inc1.devtunnels.ms/erp/addmytimesheet', data).then(
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
        <Grid container spacing={3}>
 <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'8px'}}>
                ADD YOUR TIMELINE TO PROJECT IS HERE .....
              </Typography>
              <Typography sx={{marginLeft:'8px'}}>
                Time Sheet
              </Typography>
            </Grid>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(7, 1fr)',
                }}
              >
                <RHFTextField name="employee_id" label="Employe id  " />
                <RHFTextField name="Employe_Name" label=" Employe Name " />
                <RHFTextField name="Project_Name" label="Project Name  " />
                <RHFTextField name="Activity_Name" label="Activity Name " />
                <RHFTextField name="monday" label="monday" />
                <RHFTextField name="tuesday" label="tuesday" />
                <RHFTextField name="wednseday" label="wednseday" />
                <RHFTextField name="thursday" label="thursday" />
                <RHFTextField name="friday" label="friday" />
                <RHFTextField name="saturday" label="saturday " />
                <RHFTextField name="sunday" label="sunday " />
                <RHFTextField name="Total_hours" label="Total hours" />
                <RHFTextField name="Comment" label="Comment" />
             
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Add  Timeline'}
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

TimeForm.propTypes = {
  currentUser: PropTypes.object,
};
