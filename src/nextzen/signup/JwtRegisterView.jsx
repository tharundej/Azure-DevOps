import * as Yup from 'yup';
import test from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { alpha, useTheme } from '@mui/material/styles';
// @mui
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
import formatDateToYYYYMMDD from '../global/GetDateFormat';
import { borderColor } from '@mui/system';
import { number } from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
// ----------------------------------------------------------------------
const StyledContainer = styled('div')({
  // background: 'url("/assets/background/office-supplies.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
});
import { bgGradient } from 'src/theme/css';
import { Axios } from 'axios';
import axiosInstance from 'src/utils/axios';
import Textfield from 'src/sections/_examples/mui/textfield-view/textfield';
import SignUpDialog from './SignUpDialog';

export default function JwtRegisterView({onHandleNextIncrement}) {
  console.log(onHandleNextIncrement,'onHandleNextIncrement')
  const { register } = useAuthContext();
  const theme = useTheme();

  const [datesUsed, setDatesUsed] = useState({
    companyDateOfIncorporation: new Date(),
  });

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  //uploader handler
  const [imageData, setImageData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [countryNames, setCountryNames] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [citiesNames, setCitiesNames] = useState([]);
  const [citySelected, setCitySelected] = useState(null);
  const [countrySelected, setCountrySelected] = useState(null);
  const [valueSelected, setValueSelected] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedFile(file);
      setImageData([{ name: file.name, data: reader.result }]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const RegisterSchema = Yup.object().shape({
    cin: Yup.string()
      .required('CIN is Required')
      .matches(/^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/, {
        message: 'Invalid CIN format',
        excludeEmptyString: true,
      })
      .test(
        'firstChar',
        'First character must be U or L',
        (value) => value.charAt(0) === 'U' || value.charAt(0) === 'L'
      )
      .test(
        'secondPart',
        'Next 5 characters must be numbers',
        (value) => /^\d{5}$/.test(value.substring(1, 6)) // Adjusted substring indices
      )
      .test(
        'thirdPart',
        'Next 2 characters must be letters',
        (value) => /^[A-Z]{2}$/.test(value.substring(6, 8)) // Adjusted substring indices
      )
      .test(
        'fourthPart',
        'Next 4 characters must be numbers',
        (value) => /^\d{4}$/.test(value.substring(8, 12)) // Adjusted substring indices
      )
      .test(
        'fifthPart',
        'Next 3 characters must be letters',
        (value) => /^[A-Z]{3}$/.test(value.substring(12, 15)) // Adjusted substring indices
      )
      .test(
        'sixthPart',
        'Last 6 characters must be numbers',
        (value) => /^\d{6}$/.test(value.substring(15, 21)) // Adjusted substring indices
      ),
    companyName: Yup.string()
      .required('Company Name Required')
      .matches(
        /^[A-Za-z0-9\s@\-_.*#!^<>%+$^(){}|]+$/,
        'Company Name must contain only alphanumeric characters and Spichal Charters'
      ),
    companyRegistrationNo: Yup.string()
      .required('Registration Number is Required')
      .matches(/^[0-9]+$/, 'Registration Number must contain only numbers'),
    companyCeoName: Yup.string()
      .required('CEO Name is Required')
      .matches(/^[A-Za-z ]+$/, 'CEO Name must contain only letters and spaces'),
    companyType: Yup.string().required('Company Type Required'),
    emailId: Yup.string()
      .required('Email is Required')
      .email('Email must be a valid email address'),
    phoneNo: Yup.string()
      .required('Phone No is Required')
      .matches(/^[0-9]+$/, 'Phone No must contain only numbers'),
    firstName: Yup.string()
      .required('First Name is Required')
      .matches(/^[A-Za-z\s]+$/, 'First Name must contain only letters and spaces'),
    middleName: Yup.string()
      .nullable()
      .matches(/^[A-Za-z\s]*$/, 'Middle Name must contain only letters and spaces')
      .notRequired(),
    lastName: Yup.string()
      .required('Last Name is Required')
      .matches(/^[A-Za-z ]+$/, 'Last Name must contain only letters and spaces'),
    companyAddressLine1: Yup.string().required('Address Line 1 is Required'),
    companyAddressLine2: Yup.string(),
    // companyCity: Yup.string().required('City is Required'),
    // companyState: Yup.string().required('State is Required'),
    companyPincode: Yup.string()
      .matches(/^[0-9]+$/, 'Pin Code must contain only numbers')
      .required('Pin code is Required'),
    empIdPrefix: Yup.string().required('Employee ID type Required'),
    // companyCountry: Yup.string().required('Please select a country.').matches(/^[A-Za-z]+$/,'Please select a country.'),
    // companyState:Yup.string().required('Please select a state.').matches(/^[A-Za-z]+$/,'Please select a state.'),
    // companyCity: Yup.string().required('Please select a city.').matches(/^[A-Za-z]+$/,'Please select a city.'),
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
    companyAddressLine1: '',
    companyAddressLine2: '',
    companyCity: '',
    companyState: '',
    companyPincode: '',
    empIdPrefix: '',
    companyCountry: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
    mode: 'onChange',
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
  //  const handleState =(e,value)=>{
  //   setValueSelected(value);
  //   console.log(value)
  //     let data = JSON.stringify({
  //       "country": "India",
  //       "state": valueSelected
  //     });

  //     let config = {
  //       method: 'post',
  //       maxBodyLength: Infinity,
  //       url: 'https://countriesnow.space/api/v0.1/countries/state/cities',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       data : data
  //     };

  //     axiosInstance.request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       setCitesNames(response?.data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //  }
  // const states = ()=>{
  //   let data = JSON.stringify({
  //     "country": "India"
  //   });

  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'https://countriesnow.space/api/v0.1/countries/states',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data : data
  //   };

  //   axiosInstance.request(config)
  //   .then((response) => {
  //     console.log("response.data.states", response.data.data.states);
  //     setStateNames(response?.data?.data?.states)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }
  // // const cites = ()=>{
  // //   let data = JSON.stringify({
  // //     "country": "India",
  // //     "state": ""
  // //   });

  // //   let config = {
  // //     method: 'post',
  // //     maxBodyLength: Infinity,
  // //     url: 'https://countriesnow.space/api/v0.1/countries/state/cities',
  // //     headers: {
  // //       'Content-Type': 'application/json'
  // //     },
  // //     data : data
  // //   };

  // //   axiosInstance.request(config)
  // //   .then((response) => {
  // //     console.log(JSON.stringify(response.data));
  // //   })
  // //   .catch((error) => {
  // //     console.log(error);
  // //   });
  // // }
  // useEffect(()=>{
  //   states()
  //   handleState()
  // },[])
  useEffect(() => {
    fetchCountry();
    handleCountry();
    handleStateChange();
  }, []);

  const handleCountry = (value) => {
    setCountrySelected(value);
    if (value) {
      let data = {
        country: value,
      };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://countriesnow.space/api/v0.1/countries/states',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        data: data,
      };

      axiosInstance
        .request(config)
        .then((response) => {
          setStateNames(response?.data?.data?.states || []);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setStateNames([]);
    }
  };
  const fetchCountry = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://countriesnow.space/api/v0.1/countries/states/',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    };

    axiosInstance
      .request(config)
      .then((response) => {
        setCountryNames(response?.data?.data || []);
        console.log(response?.data?.data, 'country');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(countrySelected, 'kkk');
  const handleCity = (value) => {
    setCitySelected(value);
  };
  const handleStateChange = (value) => {
    setValueSelected(value);

    // if (!valueSelected) {
    //   setError('Please select a state.'); // Set error if no value is selected
    //   return; // Prevent form submission
    // }
    if (value) {
      let data = {
        country: countrySelected,
        state: value,
      };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://countriesnow.space/api/v0.1/countries/state/cities',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        data: data,
      };

      axiosInstance
        .request(config)
        .then((response) => {
          setCitiesNames(response?.data?.data || []);
          console.log(response?.data?.data, 'cites');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCitiesNames([]);
    }
  };
  // const base64String = imageData[0]?.data;
  // console.log( imageData[0]?.data)

  // const base64WithoutHeader = base64String.split(',')[1];
  //   console.log(base64WithoutHeader);

  // console.log(imageData[0]?.data.split(',')[1]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // if (!data.companyCountry || !data.companyState || !data.companyCity) {
      //   setErrorMsg('Please select country, state, and city.');
      //   console.log('errorrrrrrrrrr')
      //   return;
      // }
      console.log(data);
      await register?.(
        data.cin,
        data.companyName,
        parseInt(data.companyRegistrationNo, 10),

        formatDateToYYYYMMDD(datesUsed.companyDateOfIncorporation),
        data.companyCeoName,
        data.companyType,
        data.emailId,
        parseInt(data.phoneNo, 10),
        data.firstName,
        data.middleName,
        data.lastName,
        data.companyAddressLine1,
        data.companyAddressLine2,
        (data.companyCountry = countrySelected),
        (data.companyCity = citySelected),
        (data.companyState = valueSelected),
        parseInt(data.companyPincode, 10),
        data.empIdPrefix,
        (data.logoName = imageData[0]?.name),
        (data.companyLogo = imageData[0]?.data.split(',')[1])
      );

      onHandleNextIncrement()
      
      // router.push(returnTo || PATH_AFTER_LOGIN);
      router.push(returnTo || PATH_FOR_VERIFY);
    } catch (error) {
      // onHandleNextIncrement()

      console.error(error);
      // reset();

      setErrorMsg(typeof error === 'string' ? error : error.message);
      // setSnackbarOpen(true);
    }
  });

  const renderHead = (
    <>
      {/* <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          m: { xs: 2, md: 5 },
        }}
      /> */}

      <Stack spacing={2} sx={{ mb: 5, position: 'relative', alignItems: 'center' }}>
        {/* <Typography variant="h4">Register</Typography> */}

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

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack style={{ padding: '10px' }} spacing={3.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Box sx={{ flexGrow: 1 }}>
          {/* <Card sx={{ minWidth: 275, background: '#ffffffc9' }}> */}
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="cin"
                  label={
                    <span>
                      CIN<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  placeholder=" Ex: L67190MH2020PLC123456"
                  maxLength={21}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="companyName"
                  label={
                    <span>
                      Company Name<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="companyRegistrationNo"
                  label={
                    <span>
                      Registration Number<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  maxLength={8}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Date of Incorporation"
                      // value={datesUsed.date_of_incorporation || dayjs(new Date())}
                      value={null}
                      //  defaultValue={dayjs(new Date())}
                      minDate={dayjs().subtract(300, 'year')}
                      maxDate={dayjs()}
                      onChange={(newValue) => {
                        console.log(newValue);
                        setDatesUsed((prev) => ({
                          companyDateOfIncorporation: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="companyCeoName"
                  label={
                    <span>
                      CEO Name<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  maxLength={50}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFAutocomplete
                  name="companyType"
                  label={
                    <span>
                      Company Type<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  options={companyTypes.map((companyType) => companyType.type)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="emailId"
                  label={
                    <span>
                      Email ID<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="phoneNo"
                  label={
                    <span>
                      Phone Number<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  maxLength={10}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="firstName"
                  label={
                    <span>
                    Contact Person First Name<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  maxLength={30}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField name="middleName" label="Contact Person Middle Name" maxLength={30} type="text" />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="lastName"
                  label={
                    <span>
                    Contact Person    Last Name<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  maxLength={30}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="companyAddressLine1"
                  label={
                    <span>
                      Permanent Address Line 1 <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  maxLength={40}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="companyAddressLine2"
                  label={<span>Permanent Address Line 2</span>}
                  maxLength={40}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  name="companyCountry"
                  value={countrySelected || null}
                  onChange={(event, value) => handleCountry(value)}
                  options={countryNames.map((countries) => countries.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          Country <span style={{ color: 'red' }}>*</span>
                        </span>
                      }
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  name="companyState"
                  id="companyState"
                  value={valueSelected || null}
                  onChange={(event, value) => handleStateChange(value)}
                  options={stateNames.map((state) => state.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          State <span style={{ color: 'red' }}>*</span>
                        </span>
                      }
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  id="companyCity"
                  options={citiesNames}
                  value={citySelected || null}
                  getOptionLabel={(option) => option}
                  onChange={(e, value) => handleCity(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          City <span style={{ color: 'red' }}>*</span>
                        </span>
                      }
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="companyPincode"
                  label={
                    <span>
                      Pin Code<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  maxLength={6}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="empIdPrefix"
                  label={
                    <span>
                      Employee ID Prefix<span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  maxLength={4}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="file-input">
                    <span style={{ display: 'flex', flexDirection: 'row' }}>
                      <Button
                        style={{ height: 'fit-content', backgroundColor:'#3B82F6'}}
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Logo<span style={{ color: 'red' }}> *</span>
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                      </Button>
                      {selectedFile && (
                        <div>
                          <div
                            style={{
                              width: '100px',
                              height: '100px',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              display: 'inline-block',
                            }}
                          >
                            <img
                              src={imageData[0]?.data}
                              alt={selectedFile.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                          {/* <button onClick={handleDelete}>Delete</button> */}
                        </div>
                      )}
                    </span>
                  </label>
                  {/* Empty space for alignment */}
                  <div style={{ width: '10px' }}></div>
                </div>
              </Grid>
              <Grid item xs={12} md={8}></Grid>
            </Grid>
          </Stack>
          <CardActions style={{ marginTop: '30px',display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
            <Stack direction="row" alignItems="center" spacing={1} style={{marginBottom:'10px'}}>
            <Typography variant="h5"> Already have an account? </Typography>

            <Link href={paths.auth.jwt.login} component={RouterLink} variant="h5">
              Sign In
            </Link>
            </Stack>
            <Button
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              onClick={onSubmit}
              //  loading={isSubmitting}
              style={{ display: 'block', margin: '5 auto', backgroundColor: '#3B82F6' }}
            >
              Create Account
            </Button>
          </CardActions>
          {/* </Card> */}
        </Box>
      </Stack>
    </FormProvider>
  );

  return (
    <StyledContainer>
      <div style={{ backgroundColor: '', height: '100%' }}>
        {renderForm}

        {/* {renderHead} */}

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

      <SignUpDialog />
    </StyledContainer>
  );
}
JwtRegisterView.propTypes = {
  onHandleNextIncrement: PropTypes.func,
};