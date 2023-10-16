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
import SnackBar from 'src/nextzen/global/SnackBar';

import formatDateToYYYYMMDD from '../../../global/GetDateFormat';


const   GeneralInformation=forwardRef((props,ref)=> {

 
  const [openSnackBar,setopenSnackBar]=useState(false);
  const [severitySnackbar,setseveritySnackbar]=useState("");
  const [messageSnackbar,setmessageSnackbar]=useState('');


  const currentUser=props.currentUser;

  useImperativeHandle(ref,()=>({
    childFunctionGeneral(){
      onSubmit();




      
    }
  }))

  const handleCloseSnackBar=()=>{
    setopenSnackBar(false)
  }

 

  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    company_id: Yup.string(),
    company_name: Yup.string(),
    image_name: Yup.string(),
    image_data: Yup.string(),
    first_name: Yup.string().required('First Name is Required'),
    middle_name: Yup.string(),
    last_name: Yup.string('Last Name is Required'),
    email_id: Yup.string().email().required('Email is Required'),
    contact_number: Yup.number(),
    emergency_contact_number: Yup.number(),
    date_of_birth: Yup.string(),
    father_name: Yup.string(),
    mother_name: Yup.string(),
    marital_status: Yup.string(),
    nationality: Yup.string(),
    religion: Yup.string(),
    blood_group: Yup.string(),
    offer_date: Yup.string(),
    joining_date: Yup.string(),
    p_address_line1: Yup.string().required('Address is Required'),
    p_address_line2: Yup.string(),
    p_city: Yup.string().required('City is Required'),
    p_state: Yup.string().required('State is Required'),
    p_pincode: Yup.number().required('Pin Code is Required'),
    r_address_line1: Yup.string(),
    r_address_line2: Yup.string(),
    r_city: Yup.string(),
    r_state: Yup.string(),
    r_pincode: Yup.number(),

    // first_name: Yup.string().required('First Name is required'),

    // middle_name: Yup.string().required('Middle Name is required'),

    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Address is required'),
    // country: Yup.string().required('Country is required'),
    // company: Yup.string().required('Company is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role is required'),
    // zipCode: Yup.string().required('Zip code is required'),
    // avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    // status: Yup.string(),
    // isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    
    () => ({
      // company_id: currentUser?.company_id || '',
      // company_name: currentUser?.company_name || '',
      // image_name: currentUser?.image_name || '',
      // image_data: currentUser?.image_data || '',
      first_name: currentUser?.first_name || '',
      middle_name: currentUser?.middle_name || '',
      last_name: currentUser?.last_name || '',
      email_id: currentUser?.email_id || '',
      contact_number: currentUser?.contact_number || undefined,
      emergency_contact_number: currentUser?.emergency_contact_number || undefined,
      date_of_birth: currentUser?.date_of_birth || '',
      father_name: currentUser?.father_name || '',
      mother_name: currentUser?.mother_name || '',
      marital_status: currentUser?.marital_status || '',
      nationality: currentUser?.nationality || '',
      religion: currentUser?.religion || '',
      blood_group: currentUser?.blood_group || '',
      offer_date: currentUser?.offer_date || '',
      joining_date: currentUser?.joining_date || '',
      p_address_line1: currentUser?.p_address_line1 || '',
      p_address_line2: currentUser?.p_address_line2 || '',
      p_city: currentUser?.p_city || '',
      p_state: currentUser?.p_state || '',
      p_pincode: currentUser?.p_pincode || undefined,
      r_address_line1: currentUser?.r_address_line1 || '',
      r_address_line2: currentUser?.r_address_line2 || '',
      r_city: currentUser?.r_city || '',
      r_state: currentUser?.r_state || '',
      r_pincode: currentUser?.r_pincode || undefined,
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

  const ApiHitGeneralInformation=(dataGeneral)=>{
        const data1 = dataGeneral;
        let emp_id;
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://192.168.0.193:3001/erp/onBoarding',
          headers: { 
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc1OTksInJhbmRvbSI6MjAxOX0.jcut3PMaM8Sem9s6tB5Llsp1dcii2dxJwaU2asmn-Zc', 
            'Content-Type': 'text/plain'
          },
          data : data1
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setopenSnackBar(true);
          setseveritySnackbar("success");
          setmessageSnackbar("Onboarded Sucessfully")
          
          props.nextStep();
        })
        .catch((error) => {
          console.log(error);
          setopenSnackBar(true);
          setseveritySnackbar("warning");
          setmessageSnackbar("User Alredy Present")
        });

  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data,'general information');

    try {
      data.company_id = 'comp1';
      data.company_name = 'DXC';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
      data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
      data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

      
       ApiHitGeneralInformation(data);
      // const response = await axios.post('http://192.168.152.94:3001/erp/onBoarding', data).then(
      //   (successData) => {
      //     console.log('sucess', successData);
      //     console.log(props)
      //     if(props){

      //       props.nextStep();
      //     }
      //   },
      //   (error) => {
      //     console.log('lllll', error);
      //   }
      // );

      

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
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              {currentUser && (
                <Label
                  color={

                    
                    (values.status === 'active' && 'success') ||
                    (values.status === 'banned' && 'error') ||
                    'warning'
                  }
                  sx={{ position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="avatarUrl"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              {currentUser && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value !== 'active'}
                          onChange={(event) =>
                            field.onChange(event.target.checked ? 'banned' : 'active')
                          }
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              <RHFSwitch
                name="isVerified"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Card>
          </Grid>

          <Grid  xs={12} md={8}>
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

                
                
                <RHFTextField name="first_name" label="First Name " />
                <RHFTextField name="middle_name" label="Middle Name " />
                <RHFTextField name="last_name" label="Last Name " />
                <RHFTextField name="email_id" label="Email Id " />
                <RHFTextField name="contact_number" label="Contact Number " />
                <RHFTextField name="emergency_contact_number" label="Emergency Contact Number " />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Birth"
                      value={datesUsed?.date_of_birth}
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
                <RHFTextField name="father_name" label="Father Name " />
                <RHFTextField name="mother_name" label="Mother Name " />
                <RHFTextField name="marital_status" label="Martial Status " />
                <RHFTextField name="nationality" label="Nationality " />
                <RHFTextField name="religion" label="Religion " />
                <RHFTextField name="blood_group" label="Blood Group " />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Offer Date"
                      value={datesUsed?.date_of_birth}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          offer_date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Joining Date"
                      value={datesUsed?.date_of_birth}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          joining_date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
                <RHFTextField name="p_address_line1" label="Permanent Address Line1 " />
                <RHFTextField name="p_address_line2" label="Permanent Address Line2 " />
                <RHFTextField name="p_city" label="City " />
                <RHFTextField name="p_state" label="State " />
                <RHFTextField name="p_pincode" label="Pincode " />
                <RHFTextField name="r_address_line1" label="Resendial Address Line1" />
                <RHFTextField name="r_address_line2" label="Resendial Address Line2" />
                <RHFTextField name="r_city" label="Resendial City " />
                <RHFTextField name="r_state" label="Resendial State " />
                <RHFTextField name="r_pincode" label="Resendial Pincode" />
           

                {/* <RHFTextField name="name" label="Full Name" />
                <RHFTextField name="email" label="Email Address" />
                <RHFTextField name="phoneNumber" label="Phone Number" />

                <RHFAutocomplete
                  name="country"
                  label="Country"
                  options={countries.map((country) => country.label)}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderOption={(props, option) => {
                    const { code, label, phone } = countries.filter(
                      (country) => country.label === option
                    )[0];

                    if (!label) {
                      return null;
                    }

                    return (
                      <li {...props} key={label}>
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

                <RHFTextField name="state" label="State/Region" />
                <RHFTextField name="city" label="City" />
                <RHFTextField name="address" label="Address" />
                <RHFTextField name="zipCode" label="Zip/Code" />
                <RHFTextField name="company" label="Company" />
                <RHFTextField name="role" label="Role" /> */}
              </Box>

             
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <SnackBar open={openSnackBar} severity={severitySnackbar} message={messageSnackbar} handleCloseSnackBar={handleCloseSnackBar}/>
    </div>
  );
})

GeneralInformation.propTypes = {
  currentUser: PropTypes.object,
  nextStep: PropTypes.any,
};

export default GeneralInformation;