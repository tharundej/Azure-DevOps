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

export default function SalaryAdvanceForm({ currentUser,handleClose }) {
  
  const [datesUsed, setDatesUsed] = useState({
    start_date: dayjs(new Date()),
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
    requestAmount: Yup.string(),
    // start_date: Yup.string(),
    // end_date: Yup.string(),
    // due_date: Yup.string().required('First Name is Required'),
    commentStatus: Yup.string(),
   
   
  });

  const defaultValues = useMemo(
    () => ({
   
        requestAmount: currentUser?.requestAmount || '',
        start_date: currentUser?.start_date || '',
        end_date: currentUser?.end_date || '',
        due_date: currentUser?.due_date || '',
        commentStatus: currentUser?.commentStatus || '',
  
   
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
    console.log("🚀 ~ file: SalaryAdvanceForm.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      // data.company_id = '0001';
      // data.company_name = 'infbell';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.due_date = formatDateToYYYYMMDD(datesUsed?.due_date);
      // data.end_date = formatDateToYYYYMMDD(datesUsed?.end_date);
      // data.start_date = formatDateToYYYYMMDD(datesUsed?.start_date);
      // data.selectedActivity = selectedActivity;
      data.companyID = "COMP1";
      data.employeeID = "info4";

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addSalaryAdvance', data).then(
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
                Enter Your requestAmount to Request Salary In Advace 
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
                <RHFTextField name="requestAmount" label=" Enter Amount" />
   
                <RHFTextField name="commentStatus" label="Commen" />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Apply Salary Advance'}
                </LoadingButton>
                <Button sx={{backgroundColor:"#d12317",ml:"5px"}} onClick={handleClose}>Cancel</Button>
              </Stack>
           
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}

SalaryAdvanceForm.propTypes = {

  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
