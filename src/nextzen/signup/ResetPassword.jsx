import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Container, Link, Snackbar, Alert } from '@mui/material';
import PasswordIcon from 'src/assets/icons/password-icon';
import { baseUrl } from '../global/BaseUrl';
import axiosInstance from 'src/utils/axios';
import { da } from 'date-fns/locale';
import { useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import logout from 'src/auth/context/jwt/auth-provider';

// ----------------------------------------------------------------------

export default function ChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const password = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const defaultValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));

      const payload = {
        emailId: localStorage.getItem('companyEmail'),
        password: data.newPassword,
      };
      const config = {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1MjcxMTEsInJhbmRvbSI6Nzk5MjR9.f4v9qRoF8PInZjvNmB0k2VDVunDRdJkcmE99qZHZaDA',
          // 'Content-Type': 'application/json'
        },
      };
      const response = await axiosInstance.post(baseUrl + `/resetPassword`, payload, config);
      if (response?.data?.status === "200") {
        router.push(paths.auth.jwt.login);
        enqueueSnackbar(response?.data?.message,{variant:'success'})
        // handleClose();
      } else if (response?.data?.status === "400") {
        enqueueSnackbar(response?.data?.message,{variant:'error'})
      }
      // reset();
      // enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 1 }}>
        <Grid container flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="h3">Reset your password</Typography>
        </Grid>
      </Stack>
    </>
  );
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(true);
  };
  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        <Stack
          spacing={3}
          alignItems="center"
          sx={{
            maxWidth: '400px',
            mx: 'auto', // Center horizontally
            my: 'auto',
          }}
        >

          <RHFTextField
            name="newPassword"
            label="New Password"
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
            helperText={
              <Stack component="span" direction="row" alignItems="center">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be
                minimum 6+
              </Stack>
            }
          />

          <RHFTextField
            name="confirmNewPassword"
            type={password.value ? 'text' : 'password'}
            label="Confirm New Password"
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

          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
          >
          Reset Password
          </Button>
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
            Return to login
          </Link>
        </Stack>
        {/* </Container> */}
      </FormProvider>
    </>
  );
}
