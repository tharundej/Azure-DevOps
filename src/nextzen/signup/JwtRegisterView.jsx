import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_FOR_CREATE_PASSWORD,} from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField ,RHFAutocomplete} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();
  

  const RegisterSchema = Yup.object().shape({
    cin:Yup.number().required('CIN is required'),
    company_name: Yup.string().required('Compnay name required'),
    company_registration_no:Yup.number().required('Company Registration Number is required'),
    company_ceo_name: Yup.string().required('CEO name required'),
    company_type: Yup.string().required('Compnay type required'),
    email_id: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone_no:Yup.number().required('Phone No is required'),
    first_name: Yup.string().required('First name required'),
    middle_name: Yup.string(),
    last_name: Yup.string().required('Last name required'),
    security_q1: Yup.string().required('Security Question required'),
    security_a1: Yup.string().required('Answer required'),
    security_q2: Yup.string().required('Security Question required'),
    security_a2: Yup.string().required('Answer required'),
  });

  const defaultValues = {
    cin:'',
    company_name:'',
    company_registration_no:'',
    company_ceo_name:'',
    company_type:'',
    email_id:'',
    phone_no:'',
    first_name:'',
    middle_name:'',
    last_name:'',
    security_q1:'',
    security_a1:'',
    security_q2:'',
    security_a2:'',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // console.log(data, 'rammmm');
          
      await register?.(data.cin, data.company_name, data.company_registration_no, data.company_ceo_name,data.company_type,data.email_id,data.phone_no,data.first_name,data.middle_name,data.last_name,data.security_q1,data.security_a1,data.security_q2,data.security_a2);

      // router.push(returnTo || PATH_AFTER_LOGIN);
      router.push(returnTo ||  PATH_FOR_CREATE_PASSWORD);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative',alignItems:'center'}} >
      <Typography variant="h4" >Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5} >
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));
  const companyTypes=[
    {type: 'Public'},
    {type: 'Private'}
  ]
  const securityQuestions=[
    {question:'What is your mother maiden name'},
    {question:'What is your favorite childhood pet name?'},
    {question:'What is your favorite book or author?'},
    {question:'In what city were you born?'},
    {question:'What is your favorite food or dish?'},
  ]

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
 
        <Box sx={{ flexGrow: 1 }}>
        
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Grid container  spacing={2}>
        <Grid item xs={12} md={4}>
        <RHFTextField name="cin" label="CIN" />
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFTextField name="company_name" label="Company Name" />
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFTextField name="company_registration_no" label="Company Registration No" />
        </Grid>
        <Grid item xs={12} md={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Company date of ncorporation" />
      </DemoContainer>
    </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFTextField name="company_ceo_name" label="Company Ceo Name" />
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFAutocomplete 
        name="company_type" 
        label="Company Type" 
        options={companyTypes.map((companyType)=>companyType.type)}  />
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFTextField name="email_id" label="Email" />
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFTextField name="phone_no" label="Phone No" />
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFTextField name="first_name" label="first Name" />
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFTextField name="middle_name" label="Middle Name" />
        </Grid>
        <Grid item xs={12} md={4}>
        <RHFTextField name="last_name" label="Last Name" />
        </Grid>
        <Grid item xs={12} md={12}>
        <RHFAutocomplete name="security_q1" label="Security Question-1" 
        options={securityQuestions.map((securityQuestion)=>securityQuestion.question)}/>
        </Grid>
        <Grid item xs={12} md={12}>
        <RHFTextField name="security_a1" label="Security answer" />
        </Grid>
        <Grid item xs={12} md={12}>
        <RHFAutocomplete 
        name="security_q2" 
        label="Security Question-2" 
        options={securityQuestions.map((securityQuestion)=>securityQuestion.question)}/>
        </Grid>
        <Grid item xs={12} md={12}>
        <RHFTextField name="security_a2" label="Security answer" />
        </Grid>
      </Grid>
      </CardContent>
      <CardActions>
      <LoadingButton
          // fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={{ display: 'block', margin: '0 auto' }}
        >
          Create account
        </LoadingButton>
      </CardActions>
      </Card>
      
    </Box>

        {/* <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

        {/* <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </LoadingButton> */}
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
}
