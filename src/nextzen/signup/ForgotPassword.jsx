import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// auth
import { useAuthContext } from 'src/auth/hooks';
// assets
import { PasswordIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import axios from 'axios';
import { Alert, CardContent, Snackbar } from '@mui/material';
import { baseUrl } from '../global/BaseUrl';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function AmplifyForgotPasswordView() {
  const { forgotPassword } = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false)
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const ForgotPasswordSchema = Yup.object().shape({
    companyEmail: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    companyEmail: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        companyEmail: data.companyEmail,
      };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseUrl +'/checkUserExists',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
          'Content-Type': 'text/plain',
        },
        data: payload,
      };
      axios
        .request(config)
        .then((response) => {
          if(response?.data?.code===200 ){
            setSnackbarSeverity('success');
             setSnackbarMessage('Email Sent Succuessfully!');
             setSnackbarOpen(true);
          
          console.log('sucess', response);
          router.push(paths.auth.jwt.otpverification);

          }
          if(response?.data?.code===400  ){
            setSnackbarSeverity('error');
            setSnackbarMessage(response?.data?.message);
             setSnackbarOpen(true);
          
          console.log('sucess', response);
    
          }
        })
      } catch (error) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
       console.log('error', error);
     }
    });
  
      
  const renderForm = (
    <Stack spacing={3} alignItems="center" sx={{maxWidth: '400px',
    mx: 'auto', // Center horizontally
    my: 'auto',}} >
      <RHFTextField name="companyEmail" label="Email address"  />

      <LoadingButton
        // fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Send Request
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Grid container flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="h3">Forgot your password?</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please enter your email to request a password reset OTP.
          </Typography>
        </Grid>
      </Stack>
    </>
  );
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  setSnackbarOpen(false)
    setOpen(true);
  };
  return (
    <CardContent>
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      <Snackbar
    open={snackbarOpen}
    autoHideDuration={4000}
    onClose={snackBarAlertHandleClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Alert onClose={snackBarAlertHandleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
      {snackbarMessage}
    </Alert>
  </Snackbar>
      {renderForm}
    </FormProvider>
    </CardContent>
  );
}
