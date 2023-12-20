// import React from 'react'

// export default function VerifyOtp  ()  {
//   return (

//     <div>

//     <h1>haaaadghhhhhhhhhhhhhhhhhhhhhhi</h1>
//    </div>
//   )

// }

import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// auth
import { useAuthContext } from 'src/auth/hooks';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';
// hooks
import { useCountdownSeconds } from 'src/hooks/use-countdown';
// assets
import { EmailInboxIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
import axios, { endpoints } from 'src/utils/axios';
import { Alert, CardContent, Snackbar } from '@mui/material';
import { baseUrl } from '../global/BaseUrl';
import { useState } from 'react';
import { Alert as MuiAlert } from '@mui/material';
// ----------------------------------------------------------------------

export default function VerifyOtp({ onHandleNextIncrement , handleStep }) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);

  const { confirmRegister, resendCodeRegister } = useAuthContext();

  const { countdown, counting, startCountdown } = useCountdownSeconds(60);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
  const [isSubmittingLoad, setIsSubmittingLoad] = useState(true);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const VerifySchemaSchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  });

  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchemaSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const handleBackToRegister = () => {
    handleStep(0)(); // Call the handleStep function to navigate back to the first step
  };
  const email = localStorage.getItem('email');
      const emailWhileUpdate = localStorage.getItem('emailWhileUpdate');

      // Check if email is null, then use emailWhileUpdate
      const selectedEmail = email !== null ? email : emailWhileUpdate;
      const maskEmail = (email) => {
        const [username, domain] = email.split('@');
        const maskedUsername = username.substr(0, Math.min(username.length, 3)) + '...'; // Masking part of the username
        const maskedDomain = '...' + domain.substr(Math.max(0, domain.length - 6)); // Masking part of the domain
        return maskedUsername + '@' + maskedDomain;
      };
      
      // Displaying masked email in the UI
      const maskedEmail = selectedEmail ? maskEmail(selectedEmail) : '';
  const onSubmit = handleSubmit(async (data) => {
    setIsSubmittingLoad(false);
    try {
      
      const payload = {
        email: selectedEmail,
        otp: data.code,
      };
      console.log(data, 'ttttttttttt');
      const response = await axios.post(baseUrl + '/verifyRegisterOtp', payload);
      console.log(response?.data.code);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Email Sent Succuessfully!');
        setSnackbarOpen(true);

        console.log('sucess', response);

        // router.push(paths.auth.jwt.createpassword);
      }
      if (response?.data?.code === 400 || 401) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
      //   await confirmRegister?.(data.email, data.code);
      //   router.push(paths.auth.jwt.login);t
      setIsSubmittingLoad(false);
      onHandleNextIncrement();
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('An Unexcepted Error Occuried!');
      setSnackbarOpen(true);
      console.log('error', error);
      setIsSubmittingLoad(false);
    }
  });

  const handleResendCode = useCallback(async () => {
    try {
      startCountdown();
      
      const email = localStorage.getItem('email');
      const emailWhileUpdate = localStorage.getItem('emailWhileUpdate');

      // Check if email is null, then use emailWhileUpdate
      const selectedEmail = email !== null ? email : emailWhileUpdate;
      await resendCodeRegister?.(values.email);
      const payload = {
        // email:values.email,
        email: selectedEmail,
      };
      console.log(values, 'llllllll');
      const response = await axios.post(baseUrl + '/resendOtp', payload);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Email Sent Succuessfully!');
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
      // onHandleNextIncrement()
    } catch (error) {
      console.error(error);
    }
  }, [resendCodeRegister, startCountdown, values.email]);
  const handleLoadingButton = () => {
    setTimeout(() => {
      setIsSubmittingLoad(false);
    }, 600);
  };
  const renderForm = (
    <Stack spacing={3} alignItems="center">
      {/* <RHFTextField
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
      /> */}

      <RHFCode name="code" />

      <LoadingButton
        sx={{ width: '80px' }}
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Verify
      </LoadingButton>

      <Typography variant="body2">
        {`Don’t have a code? `}
        <Link
          variant="subtitle2"
          onClick={handleResendCode}
          sx={{
            cursor: 'pointer',
            ...(counting && {
              color: 'text.disabled',
              pointerEvents: 'none',
            }),
          }}
        >
          Resend code {counting && `(${countdown}s)`}
        </Link>
      </Typography>

      <Link
        onClick={handleBackToRegister}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign up
      </Link>
    </Stack>
  );
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
  };
  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Grid container flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="h3">Please check your {maskedEmail}!</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Please enter the OTP to Verify and Create your Password.
          </Typography>
        </Grid>
      </Stack>
    </>
  );

  return (
    <CardContent>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {renderForm}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000} // Adjust the duration as needed
          onClose={snackBarAlertHandleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Alert
            onClose={snackBarAlertHandleClose}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </FormProvider>
    </CardContent>
  );
}
