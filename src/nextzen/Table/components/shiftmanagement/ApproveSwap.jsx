import PropTypes from 'prop-types'
import * as Yup from 'yup';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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

import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import { Autocomplete, TextField } from '@mui/material';
import instance from 'src/api/BaseURL';
import UserContext from 'src/nextzen/context/user/UserConext';

export default function ApproveSwap({ currentUser ,ApproveClose , status,rowData,}) {

  const [datesUsed, setDatesUsed] = useState({

    startDate: dayjs(new Date()),
  });
  const router = useRouter();
  const {user} = useContext(UserContext)

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
  
    comment: Yup.string(),
   
  });

  const defaultValues = useMemo(
    () => ({
   
        comment: currentUser?.comment || '',


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
  useEffect(() => {
  
    // getShiftGroupName()
  }, [])


  // states



  
  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');

    try {
    
  const data = {
    status:status,
    employee_shift_swap_id:parseInt( rowData.employeeShiftSwapId),
    employee_id:(user?.employeeID)?user?.employeeID : '',
    company_id:(user?.companyID)?user?.companyID : '',
    new_shift_group_id:parseInt(rowData.toShiftGroupId),
    start_date:formatDateToYYYYMMDD( datesUsed.startDate),
    

  }
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('/ApproveSwap', data).then(
        (successData) => {

            ApproveClose()

          enqueueSnackbar(response.data.message,{variant:'success'})

          console.log('sucess', successData);
        },
        (error) => {
          enqueueSnackbar(error.message,{variant:'Error'})

          console.log('lllll', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

  const handleClose = ()=>{
    ApproveClose()
  }
  return (
    <div style={{ paddingTop: '20px' }}>
    <FormProvider methods={methods} onSubmit={onSubmit}>
    <Grid container spacing={3}>

<Grid xs={12} md={12}>
<Grid sx={{ padding: '8px' }}>
  <Typography sx={{ marginLeft: '5px' }}>
    Update Swap Request
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





{status=="Approve" &&
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          sx={{ width: '100%', paddingLeft: '3px' }}
          label="Start Date"
          value={datesUsed?.startDate}
          defaultValue={dayjs(new Date())}
          onChange={(newValue) => {
            setDatesUsed((prev) => ({
              ...prev,
              startDate: newValue,
            }));
          }}
        />
      </DemoContainer>
    </LocalizationProvider>    }   
    
 
<RHFTextField name="comment" label="Comments " />



  </Box>


      <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
              <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Update Swap'}
              </LoadingButton>
              <Button  sx={{ml:"5px"}} onClick={handleClose}>Cancel</Button>
            </Stack>
</Card>
</Grid>
</Grid>
    </FormProvider>
  </div>
  );
}

ApproveSwap.propTypes = {
  currentUser: PropTypes.object,
  ApproveClose: PropTypes.func, 
};
