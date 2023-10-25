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
import instance  from 'src/api/BaseURL';
import { Autocomplete } from '@mui/lab';
import { Button } from '@mui/material';
import formatDateToYYYYMMDD from '../global/GetDateFormat';

export default function ApplyLoan({ currentUser }) {
  
  const [datesUsed, setDatesUsed] = useState({
    No_instalment: dayjs(new Date()),
    end_date: dayjs(new Date()),
    due_date: dayjs(new Date()),
    // activity_name:[]
  });
  const [selectedActivity, setSelectedActivity] = useState([]);

  const handleSelectChange = (event, values) => {
    setSelectedActivity(values);
  };
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Amount: Yup.string(),
    // No_instalment: Yup.string(),
    // end_date: Yup.string(),
    // due_date: Yup.string().required('First Name is Required'),
    Comment: Yup.string(),
   
   
  });

  const defaultValues = useMemo(
    () => ({
   
        Amount: currentUser?.Amount || '',
        No_instalment: currentUser?.No_instalment || '',
        end_date: currentUser?.end_date || '',
        due_date: currentUser?.due_date || '',
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
const [sendData, setSendData] = useState({
  projectId : '',  
})
  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: ApplyLoan.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      // data.company_id = '0001';
      // data.company_name = 'infbell';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.due_date = formatDateToYYYYMMDD(datesUsed?.due_date);
      data.end_date = formatDateToYYYYMMDD(datesUsed?.end_date);
      data.No_instalment = formatDateToYYYYMMDD(datesUsed?.No_instalment);
      data.selectedActivity = selectedActivity;
      data.company_id = "0001";

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addProject', data).then(
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
              <Typography sx={{marginLeft:'5px'}}>
                Enter Your Amount to Request Salary In Advace 
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
                <RHFTextField name="Amount" label=" Enter Amount" />
                <RHFTextField name="No_instalment" label=" No Of Instalment" />
                <RHFTextField name="Comment" label="Comment" />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Apply Loan'}
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

ApplyLoan.propTypes = {
  currentUser: PropTypes.object,
};
