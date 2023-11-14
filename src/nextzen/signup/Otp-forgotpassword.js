import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
import { Grid, Snackbar } from '@mui/material';
import { column } from 'stylis';
import { baseUrl } from '../global/BaseUrl';
import { useState } from 'react';
import { Alert as MuiAlert } from '@mui/material';
// ----------------------------------------------------------------------

export default function VerifyOtp() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const { confirmRegister, resendCodeRegister } = useAuthContext();

  const { countdown, counting, startCountdown } = useCountdownSeconds(60);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
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

  const onSubmit = handleSubmit(async (data) => {
    try {
        const apiUrl=baseUrl+'/verifyOtp';
        const payload={
          otp:parseInt(data.code, 10)
        }
        const response = await axios.post(apiUrl,payload);
        console.log(response?.data.code)
        if(response?.data?.code===200 ){
          setSnackbarSeverity('success');
           setSnackbarMessage('Email Sent Succuessfully!');
           setSnackbarOpen(true);
        
        console.log('sucess', response);
            router.push(paths.auth.jwt.setpassword);
          }
          if(response?.data?.code===400 ||202 ){
            setSnackbarSeverity('error');
            setSnackbarMessage(response?.data?.message);
             setSnackbarOpen(true);
          
          console.log('Error', response);
    
          }
    //   await confirmRegister?.(data.email, data.code);
    //   router.push(paths.auth.jwt.login);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(response?.data?.message);
      setSnackbarOpen(true);
     console.log('error', error);
    }
  });

  const handleResendCode = useCallback(async () => {
    try {
      startCountdown();
      await resendCodeRegister?.(values.email);
       const response = await axios.post(baseUrl+'/resendOtpToUser');
       if(response?.data?.code===200||201||202 ){
        setSnackbarSeverity('success');
         setSnackbarMessage('OTP Sent Succuessfully!');
         setSnackbarOpen(true);
      
      console.log('sucess', response);
        }
        if(response?.data?.code===400  ){
          setSnackbarSeverity('error');
          setSnackbarMessage(response?.data?.message);
           setSnackbarOpen(true);
        
        console.log('sucess', response);
  
        }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(response?.data?.message);
      setSnackbarOpen(true);
     console.log('error', error);
    }
  }, [resendCodeRegister, startCountdown, values.email]);

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
        sx={{width:'80px'}}
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
        component={RouterLink}
        href={paths.auth.jwt.createpassword}
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
      <EmailInboxIcon sx={{ height: 96 }} />
      <Stack spacing={1} sx={{ my: 5 }}>
      <Grid container flexDirection="column" justifyContent="center" alignContent="center">
        <Typography variant="h3">Please check your email!</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Please enter the OTP to Verify and Reset your Password.
        </Typography>
        </Grid>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
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
    </FormProvider>
  );
}
