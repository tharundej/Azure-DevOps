import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState ,forwardRef,useImperativeHandle} from 'react';
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

import {
    _roles,
    JOB_SKILL_OPTIONS,
    JOB_BENEFIT_OPTIONS,
    JOB_EXPERIENCE_OPTIONS,
    JOB_EMPLOYMENT_TYPE_OPTIONS,
    JOB_WORKING_SCHEDULE_OPTIONS,
  } from 'src/_mock';

import formatDateToYYYYMMDD from '../../../global/GetDateFormat';

const   CurrentWork=forwardRef((props,ref)=> {

  const currentUser=props.currentUser;

  useImperativeHandle(ref,()=>({
    childFunctionGeneral(){
     onSubmit();
      
    }
  }))

 

  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
   department_name:Yup.string(),
   desgination:Yup.string()
  });

  const defaultValues = useMemo(
    
    () => ({
        department_name:currentUser?.department_name || "",
        desgination:currentUser?.designiation || ""
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
    console.log(data,'general information');

    try {
      data.company_id = 'comp1';
      data.company_name = 'DXC';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
      data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
      data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

      

      const response = await axios.post('http://192.168.152.94:3001/erp/onBoarding', data).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
         

          <Grid xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
            <RHFAutocomplete
                name="department_name"
                label="Departement Name"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(propss, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...propss} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              />
               <RHFAutocomplete
                name="desgination"
                label="Desgination"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(propss, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...propss} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              />
                <RHFTextField name="first_name" label="First Name " />
               

               
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </Stack>

             
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
})

CurrentWork.propTypes = {
  currentUser: PropTypes.object,
};

export default CurrentWork;