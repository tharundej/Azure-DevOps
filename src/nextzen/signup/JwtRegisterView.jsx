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
import { Country, State, City } from 'country-state-city';
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
import { formatDateToYYYYMMDD, formatDate } from 'src/nextzen/global/GetDateFormat';
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
import { color } from '@mui/system';
import baseImageUrl, { baseUrl } from '../global/BaseUrl';

export default function JwtRegisterView({ onHandleNextIncrement }) {
  console.log(onHandleNextIncrement, 'onHandleNextIncrement');
  const [pcountryIsoCode, setPCoutryIsoCode] = useState('');
  const [logoUploaded, setLogoUploaded] = useState(false);
  const { register } = useAuthContext();
  const [shouldCallGetCompany, setShouldCallGetCompany] = useState(true);
  const theme = useTheme();
  const [options, setOptions] = useState({
    countryOptions: [],
    stateOptions: [],
  });
  const [datesUsed, setDatesUsed] = useState({
    companyDateOfIncorporation: null,
  });
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
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
  const [button, setButton] = useState(true);
  const [companyId, setCompanyId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [empIdPrefix, setEmpIdPrefix] = useState(false);
  const [cinFilled, setCinFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);
  const [regNoFilled, setRegNoFilled] = useState(false);
  const [LogoError, setLogoError] = useState(false);
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
    if (e.target.files && e.target.files.length > 0) {
      setLogoUploaded(true);
      // setLogoError(true)
    }
   
  };
  const handleFormSubmit = () => {
    if (!logoUploaded) {
      console.error('Please upload a logo');
      alert("Please upload a logo")
      return; 
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
    companyRegistrationNo: Yup.number().required('Registration Number is Required'),
    // .matches(/^[0-9]+$/, 'Registration Number must contain only numbers'),
    companyCeoName: Yup.string()
      .required('CEO Name is Required')
      .matches(/^[A-Za-z ]+$/, 'CEO Name must contain only letters and spaces'),
    companyType: Yup.string().required('Company Type Required'),
    emailId: Yup.string()
      .required('Email is Required')
      .email('Email must be a valid email address'),
    phoneNo: Yup.number().required('Phone No is Required'),
    //.matches(/^[0-9]+$/, 'Phone No must contain only numbers'),
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
    companyCity: Yup.object().required('City is Required'),
    companyState: Yup.object().required('State is required'),
    companyDateOfIncorporation: Yup.string(),
    companyCountry: Yup.object().required('Country is Required'),
    companyPincode: Yup.number('Pincode is Required').required('Pin code is Required'),
    empIdPrefix: Yup.string() .nullable()
    .matches(/^[A-Za-z\s]*$/, 'Employee ID must contain only letters and spaces').required('Employee ID type Required'),
  });

  const defaultValues = {
    cin: '',
    companyName: '',
    companyRegistrationNo: undefined,
    companyCeoName: '',
    companyDateOfIncorporation: '',
    companyType: '',
    emailId: '',
    phoneNo: '',
    firstName: '',
    middleName: '',
    lastName: '',
    companyAddressLine1: '',
    companyAddressLine2: '',

    companyPincode: '',
    empIdPrefix: '',
    companyCity: undefined,
    companyState: undefined,
    companyCountry: undefined,
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
  useEffect(() => {
    const obj = Country.getAllCountries();
    const newArray = { ...options };
    newArray.countryOptions = obj;
    // newArray.rcountryOptions=obj;

    setOptions(newArray);
  }, []);
  const onChnageAutoComplete = (obj) => {
    console.log(obj, 'objjjjj');
    const objCountry = {
      country: obj?.name,
    };
    const newArray = { ...options };

    async function stateOptions() {
      try {
        // console.log(State.getStatesOfCountry(obj?.isoCode),'State.getStatesOfCountry(countryCode)')
        // const stateOptions1=await ApiHitStates(objCountry)
        newArray.stateOptions = State.getStatesOfCountry(obj?.isoCode);
        setPCoutryIsoCode(obj?.isoCode || '');
        // console.log(stateOptions1,'stateOptionsSatet')
      } catch (e) {}
    }
    stateOptions();

    setOptions(newArray);
    console.log(newArray, 'newArraynewArray');
  };
  const onChnageAutoCompleteState = (obj) => {
    const objState = {
      country: obj?.name,
    };
    const newArray = { ...options };

    async function stateOptions() {
      try {
        // const cityOptions1=await ApiHitCities(objState)
        newArray.cityOptions = City.getCitiesOfState(pcountryIsoCode, obj?.isoCode);
        console.log(City.getCitiesOfState(pcountryIsoCode, obj?.isoCode), 'stateOptionsSatet');
      } catch (e) {
        console.log(City.getCitiesOfState(pcountryIsoCode, obj?.isoCode), 'stateOptionsSatet');
      }
    }
    stateOptions();

    setOptions(newArray);
    console.log(newArray, 'newArraynewArray');
  };

  // const base64String = imageData[0]?.data;
  // console.log( imageData[0]?.data)

  // const base64WithoutHeader = base64String.split(',')[1];
  //   console.log(base64WithoutHeader);

  // console.log(imageData[0]?.data.split(',')[1]);

  const onSubmit = handleSubmit(async (data) => {

    try {
      if (!data.companyCountry || !data.companyState || !data.companyCity) {
        setErrorMsg('Please select country, state, and city.');
        console.log('errorrrrrrrrrr');
        return;
      }
      if(!logoUploaded){
        setLogoError(true)
      }
      else{
      console.log(data, 'hhfhfhh');
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
        (data.companyCountry = data?.companyCountry || { name: '', isoCode: '' }),
        (data.companyCity = data?.companyCity || { name: '', isoCode: '' }),
        (data.companyState = data?.companyState || { name: '', isoCode: '' }),
        parseInt(data.companyPincode, 10),
        data.empIdPrefix,
        (data.logoName = imageData[0]?.name),
        (data.companyLogo = imageData[0]?.data.split(',')[1])
      );
    
      onHandleNextIncrement();
    }
   

     
    
      // router.push(returnTo || PATH_AFTER_LOGIN);
      // router.push(returnTo || PATH_FOR_VERIFY);
    } catch (error) {
      // onHandleNextIncrement()

      console.error(error);
      // reset();

      setErrorMsg(typeof error === 'string' ? error : error.message);
      // setSnackbarOpen(true);
    }
  });
  // Inside JwtRegisterView component
  const handleCINChange = async (newValue) => {
    callApiIfAllFieldsFilled();
    try {
      const response = await axiosInstance.post(baseUrl + '/getCompany', {
        cin: newValue,
      });

      if (response?.data?.code === 200) {
        // setSnackbarSeverity('success');
        // setSnackbarMessage(response?.data?.message);
        // setSnackbarOpen(true);
        setCompanyId(response?.data?.data?.companyId);

        setEmpIdPrefix(true);
        setImageData([{ name: 'sais', data: baseImageUrl + response?.data?.data?.logoName }]);
        setImageUrl(baseImageUrl + response?.data?.data?.logoName);
        const keyMappings = {
          companyId: 'companyId',
          cin: 'cin',
          companyName: 'companyName',
          companyRegistrationNo: 'companyRegistrationNo',
          companyDateOfIncorporation: 'companyDateOfIncorporation',
          companyEmailId: 'emailId',
          companyCeoName: 'companyCeoName',
          companyType: 'companyType',
          companyPhoneNo: 'phoneNo',
          companyAddressLine1: 'companyAddressLine1',
          companyAddressLine2: 'companyAddressLine2',
          companyCity: 'companyCity',
          companyState: 'companyState',
          companyCountry: 'companyCountry',
          companyPincode: 'companyPincode',
          empIdPrefix: 'empIdPrefix',
          firstName: 'firstName',
          lastName: 'lastName',
          middleName: 'middleName',
        };

        const dataFromResponse = response?.data?.data;
        Object.keys(keyMappings).forEach((key) => {
          if (dataFromResponse.hasOwnProperty(key)) {
            console.log(key, 'companyLogo');
            if (key === 'companyCountry') {
              console.log(dataFromResponse[key], 'tre');
            }
            if (key === 'companyDateOfIncorporation') {
              const obj = {
                companyDateOfIncorporation: dataFromResponse[key],
              };
              setDatesUsed(obj);

              console.log(
                dataFromResponse[key],
                'dataFromResponse[key]',
                dataFromResponse[key] ? dayjs(dataFromResponse[key]).toDate() : null
              );
              // methods.setValue(keyMappings[key], dataFromResponse[key]? dayjs(dataFromResponse[key]).toDate() : null);
            }
            else if (key === 'companyRegistrationNo') {
              methods.setValue(keyMappings[key],dataFromResponse[key].toString());
            } 
            else {
              methods.setValue(keyMappings[key], dataFromResponse[key]);
            }
          }
        });

        console.log('success', response);
        setButton(false);
      }

      if (response?.data?.code === 400) {
        console.log('error', response);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log(imageUrl, 'image');
  const handleEmailBlur = () => {
    callApiIfAllFieldsFilled();
  };

  const handleRegistrationNoBlur = () => {
    callApiIfAllFieldsFilled();
  };
  const callApiIfAllFieldsFilled = async () => {
    const cinValue = methods.getValues('cin');
    const emailValue = methods.getValues('emailId');
    const regNoValue = methods.getValues('companyRegistrationNo');
    if (cinValue !== null && emailValue !== null && regNoValue !== null) {
      try {
        const payload = {
          cin: cinValue,
          email: emailValue,
          companyRegistrationNo: regNoValue,
        };

        console.log(payload, 'Payload before API call');

        const response = await axiosInstance.post(baseUrl + '/checkRegisterFields', payload);
        if (response?.data?.code === 409) {
          setSnackbarSeverity('error');
          setSnackbarMessage(response?.data?.message);
          setSnackbarOpen(true);
          console.log('API call successful');
          // setShouldCallGetCompany(false)
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };
  const onSubmit1 = handleSubmit(async (data) => {
    try {
      const payload = {
        cin: data.cin,
        companyName: data.companyName,
        companyRegistrationNo: parseInt(data.companyRegistrationNo, 10),
        // companyDateOfIncorporation: formatDateToYYYYMMDD(
        //   datesUsed.companyDateOfIncorporation
        // ),
        companyCeoName: data.companyCeoName,
        companyType: data.companyType,
        companyEmailId: data.emailId,
        companyPhoneNo: parseInt(data.phoneNo, 10),
        firstName: data.firstName,
        // middleName: data.middleName,
        lastName: data.lastName,
        companyAddressLine1: data.companyAddressLine1,
        companyAddressLine2: data.companyAddressLine2,
        companyCountry: data?.companyCountry || { name: '', isoCode: '' },
        companyCity: data?.companyCity || { name: '', isoCode: '' },
        companyState: data?.companyState || { name: '', isoCode: '' },
        companyPincode: parseInt(data.companyPincode, 10),
        empIdPrefix: data.empIdPrefix,
        logoName: imageData[0]?.name,
        companyLogo: imageData[0]?.data.split(',')[1],
        companyId: companyId,
      };

      console.log(payload);
      if (data.companyDateOfIncorporation != 'NaN-NaN-NaN') {
        data.companyDateOfIncorporation = formatDateToYYYYMMDD(
          datesUsed.companyDateOfIncorporation
        );
      }
      if (data.middleName != '') {
        data.middleName = data.middleName;
      }
      if(!logoUploaded){
        setLogoError(true)
      }
      else{
        
     
      const response = await axiosInstance.post(baseUrl + '/updateCompanyWhileRegister', payload);
      console.log(response);
      if (response?.data?.code === 200) {
        localStorage.setItem('emailWhileUpdate', response?.data?.data?.email);
        onHandleNextIncrement();
      }
      if (response?.data?.code === 400) {
        console.log('kkkk');
      }
    }} catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
      // setSnackbarOpen(true);
    }
  });

  useEffect(() => {
    const cinValue = methods.getValues('cin');
    handleCINChange(cinValue);
  }, [methods.getValues('cin')]);

  // Rest of your component...

  const renderHead = (
    <>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          m: { xs: 2, md: 5 },
        }}
      />
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
                  onBlur={() => {
                    const cinValue = methods.getValues('cin');
                    handleCINChange(cinValue);
                  }}
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
                  onBlur={handleRegistrationNoBlur}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  sx={{ width: '100%' }}
                  fullWidth
                  value={
                    datesUsed?.companyDateOfIncorporation
                      ? dayjs(datesUsed?.companyDateOfIncorporation).toDate()
                      : null
                  }
                  // minDate={dayjs().subtract(300, 'year')}
                  // maxDate={dayjs()}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setDatesUsed((prev) => ({
                      companyDateOfIncorporation: newValue,
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="yyyy-MM-dd"
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date of Incorporation"
                  maxDate={new Date()}
                />
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
                  onBlur={handleEmailBlur}
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
                <RHFTextField
                  name="middleName"
                  label="Contact Person Middle Name"
                  maxLength={30}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="lastName"
                  label={
                    <span>
                      Contact Person Last Name<span style={{ color: 'red' }}>*</span>
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
                <RHFAutocomplete
                  name="companyCountry"
                  label={
                    <span>
                      Country <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  options={options?.countryOptions || []}
                  getOptionLabel={(option) => option.name}
                  onChnageAutoComplete={onChnageAutoComplete}
                  renderOption={(props, option) => (
                    <li {...props} key={option.name}>
                      {option.name}
                    </li>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFAutocomplete
                  name="companyState"
                  label={
                    <span>
                      State <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  options={options?.stateOptions || []}
                  getOptionLabel={(option) => option.name}
                  onChnageAutoComplete={onChnageAutoCompleteState}
                  renderOption={(props, option) => (
                    <li {...props} key={option.name}>
                      {option.name}
                    </li>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFAutocomplete
                  name="companyCity"
                  label={
                    <span>
                     City <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  options={options?.cityOptions || []}
                  getOptionLabel={(option) => option.name}
                  // onChnageAutoComplete={onChnageAutoCompleteState}
                  renderOption={(props, option) => (
                    <li {...props} key={option.name}>
                      {option.name}
                    </li>
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
                  disabled={empIdPrefix}
                />
              </Grid>

              <Grid item xs={12} md={8}></Grid>
            </Grid>
          </Stack>
          <CardActions
            style={{
              // marginTop: '30px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              // maxWidth: '600px', // Adjust the max height as needed
              // overflow: 'hidden', // Hide overflow content
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <label htmlFor="file-input">
                <Button
                  style={{ height: 'fit-content', backgroundColor: '#3B82F6' }}
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
              </label>
              {(LogoError)? (
    <span style={{ color: 'red' }}>
      Please upload the logo ..
    </span>
  ) : ''}
              {/* {selectedFile &&
              <img
                      src={imageUrl}
                      // alt={selectedFile.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
} */}
              {1 && (
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
                    {/* imageData[0]?.data ? imageData[0]?.data :  */}
                    <img
                      src={imageData[0]?.data}
                      // alt={selectedFile?.name || ""}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                ddisplay: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                
              }}
            >
              {button ? (
                <>
                 <Button
                 component={RouterLink}
                 to="/"
                 color="inherit"
                 size="large"
                 variant="outlined"
               >
                 Cancel
               </Button>
                <Button
                  color="inherit"
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={onSubmit}
                  style={{ backgroundColor: '#3B82F6', marginLeft: '10px' }}
                >
                  Create Account
                </Button>
                </>
              ) : (
                <>
                <Button
                component={RouterLink}
                to="/"
                color="inherit"
                size="large"
                variant="outlined"
              >
                Cancel
              </Button>
                <Button
                  color="inherit"
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={onSubmit1}
                  style={{ backgroundColor: '#3B82F6', marginLeft: '10px' }}
                >
                  Update Account
                </Button>
                </>
              )}
              <Stack direction="column" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" style={{ color: 'black' ,marginTop:'10px'}}>
                  Already have an account ?
                  <Link
                    href={paths.auth.jwt.login}
                    component={RouterLink}
                    variant="subtitle1"
                    style={{ textDecoration: 'none', color: '#3B82F6',marginLeft:'5px' }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Stack>
            </div>
          </CardActions>

          {/* </Card> */}
        </Box>
      </Stack>
    </FormProvider>
  );
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
  };
  return (
    <StyledContainer>
      <div style={{ backgroundColor: '' }}>
      {/* {renderHead} */}
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Adjust the duration as needed
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
      </div>

      {/* <SignUpDialog /> */}
    </StyledContainer>
  );
}
JwtRegisterView.propTypes = {
  onHandleNextIncrement: PropTypes.func,
};
