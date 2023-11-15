import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useCountdownSeconds } from 'src/hooks/use-countdown';
// auth
import { useAuthContext } from 'src/auth/hooks';
// assets
import { SentIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFCode } from 'src/components/hook-form';
import axios from 'axios';
import { CardContent, Snackbar } from '@mui/material';
import { baseUrl } from '../global/BaseUrl';
import { useState } from 'react';
import { Alert as MuiAlert } from '@mui/material';
// ----------------------------------------------------------------------

export default function AmplifyNewPasswordView() {
  const { newPassword, forgotPassword } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const password = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { countdown, counting, startCountdown } = useCountdownSeconds(60);

  const VerifySchema = Yup.object().shape({
    // code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must meet the requirements.'
    )
    .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    code: '',
    // email: email || '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
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

      const payload ={
        "password":data.password
    }
    const response = await axios.post(baseUrl+'/newPassword', payload);
    console.log(response?.data.code)
    if(response?.data?.code===200 ){
      setSnackbarSeverity('success');
       setSnackbarMessage('Email Sent Succuessfully!');
       setSnackbarOpen(true);
    
    console.log('sucess', response);
        router.push(paths.auth.jwt.login);
      }
      if(response?.data?.code===400  ){
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
         setSnackbarOpen(true);
      
      console.log('sucess', response);

      }
      // await newPassword?.(data.email, data.code, data.password);

      // router.push(paths.auth.jwt.login);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(response?.data?.message);
      setSnackbarOpen(true);
     console.log('error', error);
    }
  });

  // const handleResendCode = useCallback(async () => {
  //   try {
  //     startCountdown();
  //     await forgotPassword?.(values.email);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [forgotPassword, startCountdown, values.email]);

  const renderForm = (
    <Stack spacing={3} alignItems="center" sx={{
      maxWidth: '400px',
      mx: 'auto', // Center horizontally
      my: 'auto', // Center vertically
    }}>
      {/* <RHFTextField
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
      /> */}

      {/* <RHFCode name="code" /> */}

      <RHFTextField
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
      />

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
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
      />

      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Update Password
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
      <SentIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Typography variant="h3">Set New Password</Typography>

        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          We&apos;ve sent a 6-digit confirmation email to your email.
          <br />
          Please enter the code in below box to verify your email.
        </Typography> */}
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
    </CardContent>
  );
}
