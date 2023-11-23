import * as Yup from 'yup';
import test from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { alpha, useTheme } from '@mui/material/styles';
// @mui
import dayjs from 'dayjs';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
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
import Logo from 'src/components/logo';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_FOR_CREATE_PASSWORD, PATH_FOR_VERIFY } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import formatDateToYYYYMMDD from '../global/GetDateFormat'
import { borderColor } from '@mui/system';
// ----------------------------------------------------------------------
const StyledContainer = styled('div')({
  background: 'url("/assets/background/office-supplies.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
});
import { bgGradient } from 'src/theme/css';

export default function JwtRegisterView() {
  const { register } = useAuthContext();
  const theme = useTheme();


  const [datesUsed, setDatesUsed] = useState({
    companyDateOfIncorporation: dayjs(new Date()),
  });
  
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    

    cin: Yup.string()
    .required('CIN is required')
  .matches(/^[\dA-Z]+$/, 'CIN should only contain uppercase letters and digits')
  .test('len', 'CIN should be exactly 21 characters long', (val) => val && val.length === 21),
    companyName: Yup.string().required('Compnay Name required').matches(/^[A-Za-z\s]+$/, 'Compnay Name must contain only letters and spaces'),
    companyRegistrationNo: Yup.number().required('Company Registration Number is required'),
    companyCeoName: Yup.string().required('Company Ceo Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Company Ceo Name must contain only letters and spaces'),
    companyType: Yup.string().required('Compnay type required'),
    emailId: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    // companyDateOfIncorporation: Yup.string().required('Date of corporation is required'),
    phoneNo:  Yup.number()
    .required('Phone No is Required')
    .typeError("Field should only contain numbers")
    .test('non-zero-start', 'Number should not start with 0', (value) => value > 0),
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[A-Za-z\s]+$/, 'First name must contain only letters and spaces'),
    middleName: Yup.string(),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[A-Za-z\s]+$/, 'Last name must contain only letters and spaces'),
    // securityQ1: Yup.string().required('Security Question required'),
    // securityA1: Yup.string().required('Answer required'),
    // securityQ2: Yup.string().required('Security Question required'),
    // securityA2: Yup.string().required('Answer required'),
  });

  const defaultValues = {
    cin: '',
    companyName: '',
    companyRegistrationNo: null,
    companyCeoName: '',
    companyDateOfIncorporation: '',
    companyType: '',
    emailId: '',
    phoneNo: null,
    firstName: '',
    middleName: '',
    lastName: '',
    // securityQ1: '',
    // securityA1: '',
    // securityQ2: '',
    // securityA2: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
    mode: 'onChange'
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      // console.log(data, 'rammmm');
      console.log(data)
      await register?.(
        data.cin,
        data.companyName,
        data.companyRegistrationNo,
      
        
        formatDateToYYYYMMDD(
          datesUsed.companyDateOfIncorporation
        )
        ,
        data.companyCeoName,
        data.companyType,
        data.emailId,
        parseInt(data.phoneNo, 10),
        data.firstName,
        data.middleName,
        data.lastName,
        // data.securityQ1,
        // data.securityA1,
        // data.securityQ2,
        // data.securityA2
      );

      // router.push(returnTo || PATH_AFTER_LOGIN);
       router.push(returnTo || PATH_FOR_VERIFY);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
      setSnackbarOpen(true);
    }
  });

  const renderHead = (<>


    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
 
    <Stack spacing={2} sx={{ mb: 5, position: 'relative', alignItems: 'center' }}>
      <Typography variant="h4">Register</Typography>

      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Typography variant="h4"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="h4">
          Sign In
        </Link>
      </Stack>
    </Stack>
    </>
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

  const companyTypes = [{ type: 'Public' }, { type: 'Private' }];

  // const securityQuestions1 = [
  //   { question: 'What is your mother maiden name?' },
  //   { question: 'What is your favorite childhood pet name?' },
  //   { question: 'What is your favorite book or author?' },
  //   { question: 'In what city were you born?' },
  //   { question: 'What is your favorite food or dish?' },
  // ];
  // const securityQuestions2 = [
  //   { question: 'What is your mother maiden name?' },
  //   { question: 'What is your favorite childhood pet name?' },
  //   { question: 'What is your favorite book or author?' },
  //   { question: 'In what city were you born?' },
  //   { question: 'What is your favorite food or dish?' },
  // ];

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack style={{ padding: '10px' }} spacing={3.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        
        <Box sx={{ flexGrow: 1 }}>
          {/* <Card sx={{ minWidth: 275, background: '#ffffffc9' }}> */}
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="cin" label="CIN" maxLength={21}  color="secondary" focused />
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="companyName" label="Company Name"  color="secondary" focused/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="companyRegistrationNo" label="Company Registration No"  color="secondary" focused maxLength={21}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
        
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                       
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="Company Date of Incorporation"
                        // value={datesUsed.date_of_incorporation || dayjs(new Date())}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          console.log(newValue)
                          setDatesUsed((prev) => ({
                            companyDateOfIncorporation: newValue,
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="companyCeoName" label="Company Ceo Name"  color="secondary" focused maxLength={50} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFAutocomplete
                    name="companyType"
                    label="Company Type"
                    options={companyTypes.map((companyType) => companyType.type)}
                    color="secondary" focused
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="emailId" label="Email"  color="secondary" focused />
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="phoneNo" label="Phone No" maxLength={10}  color="secondary" focused/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="firstName" label="First Name"  color="secondary" focused maxLength={20}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="middleName" label="Middle Name"  color="secondary" focused maxLength={20}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <RHFTextField name="lastName" label="Last Name"  color="secondary" focused maxLength={20}/>
                </Grid>
                {/* <Grid item xs={12} md={12}>
                  <RHFAutocomplete
                    name="securityQ1"
                    label="Security Question-1"
                    options={securityQuestions1.map(
                      (securityQuestion1) => securityQuestion1.question
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <RHFTextField name="securityA1" label="Security answer" />
                </Grid>
                <Grid item xs={12} md={12}>
                  <RHFAutocomplete
                    name="securityQ2"
                    label="Security Question-2"
                    options={securityQuestions1.map(
                      (securityQuestion1) => securityQuestion1.question
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <RHFTextField name="securityA2" label="Security answer" />
                </Grid> */}
              </Grid>
            </Stack>
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
          {/* </Card> */}
        </Box>
      </Stack>
    </FormProvider>
  );

  return (
    <StyledContainer>
      <div style={{ backgroundColor: '', height: '100%' }}>
        {renderHead}

        {renderForm}

        {renderTerms}
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="error">
          {errorMsg}
        </MuiAlert>
        </Snackbar>
      </div>
    </StyledContainer>
  );
}
