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
} from 'src/components/hook-form';
import axios from 'axios';

import { Autocomplete } from '@mui/lab';
import formatDateToYYYYMMDD from '../global/GetDateFormat';

export default function AddTimeProject({ currentUser }) {
  const [datesUsed, setDatesUsed] = useState({
    Start_date: dayjs(new Date()),
    End_date: dayjs(new Date()),
    Due_Date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Project_Name: Yup.string(),
    Start_date: Yup.string(),
    End_date: Yup.string(),
    Due_Date: Yup.string().required('First Name is Required'),
    Status: Yup.string(),
   
   
  });

  const defaultValues = useMemo(
    () => ({
   
        Project_Name: currentUser?.Project_Name || '',
        Start_date: currentUser?.Start_date || '',
        End_date: currentUser?.End_date || '',
        Due_Date: currentUser?.Due_Date || '',
        Status: currentUser?.Status || '',
  
   
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
                ADD YOUR  POJECT  HERE .....
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
                <RHFTextField name="Project_Name" label=" Project Name  " />
                <span>
                    <Typography sx={{marginLeft:'5px'}}>
                        Previous Project id was 2 next is 3
                    </Typography>
                </span>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Start date"
                      value={datesUsed?.Start_date}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          Start_date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="End date"
                      value={datesUsed?.End_date}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          date_of_birth: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Due Date"
                      value={datesUsed?.Due_Date}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          Due_Date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
                <RHFTextField name="Status" label="Status" />
     <Typography sx={{marginLeft:'5px'}}>
        Add Project Activities Here Based on Project Nature ...
     </Typography>
     <br/>
     <Grid md={10} xs={12} item>

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

      label="Activity Name"

      placeholder="Favorites"

    />

  )}

/>

</Grid>

              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}

AddTimeProject.propTypes = {
  currentUser: PropTypes.object,
};
