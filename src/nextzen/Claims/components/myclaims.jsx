import React,{useState,useMemo} from 'react';

import { Helmet } from "react-helmet-async";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// sections
import { BasicTable } from "src/nextzen/Table/BasicTable";
import Button from '@mui/material/Button';
// ----------------------------------------------------------------------

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { _userList } from "src/_mock";
import { paths } from 'src/routes/paths';
import Grid from '@mui/material/Grid';
import { useRouter } from 'src/routes/hooks';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import Search from "src/nextzen/search/search";
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
// _mock
import { USER_STATUS_OPTIONS } from 'src/_mock';
// assets
import { countries } from 'src/assets/data';

import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import formatDateToYYYYMMDD from '../../global/GetDateFormat';





export default function UserListPage({currentUser}) {

  
  const TABLE_HEAD = [
    {
      id: "name",
      label: " Name",
      type: "text",
      containesAvatar: false,

      secondaryText: "email",
    },
    { id: "phoneNumber", label: "contact", width: 180, type: "text" },
    { id: "company", label: "Company", width: 220, type: "text" },
    { id: "role", label: "Role", width: 180, type: "text" },
    { id: "status", label: "Status", width: 100, type: "badge" },
    // { id: '', width: 88 },
  ];

  const actions = [
    { name: "approve", icon: "hh", path: "jjj" },
    { name: "view", icon: "hh", path: "jjj" },
    { name: "eerr", icon: "hh", path: "jjj" },
  ];
  const bodyContent = [
    {
      name: "Surendra",
      email: "suri@infobellIt.com",
      phoneNumber: "9879876789",
      company: "Infobell",
      role: "UI Developer",
      status: "active",
    },
  ];
  // mui modal related
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    height:"50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  // form related data

  const handleChangeDate = (newValue, index, name) => {
    // const newObj = defaultValues;
    // newObj[index][name] = new Date(newValue);
    // setDefaultValues(newObj);
  };
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
    contact_number: Yup.string(),
    emergency_contact_number: Yup.string(),
    date_of_birth: Yup.string(),
    father_name: Yup.string(),
    mother_name: Yup.string(),
    marital_status: Yup.string(),
    nationality: Yup.string(),
    religion: Yup.string(),
    blood_group: Yup.string(),
    offer_date: Yup.string(),
    joining_date: Yup.string(),
    p_address_line1: Yup.string(),
    p_address_line2: Yup.string(),
    p_city: Yup.string(),
    p_state: Yup.string(),
    p_pincode: Yup.string(),
    r_address_line1: Yup.string(),
    r_address_line2: Yup.string(),
    r_city: Yup.string(),
    r_state: Yup.string(),
    r_pincode: Yup.string(),

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
      contact_number: currentUser?.contact_number || '',
      emergency_contact_number: currentUser?.emergency_contact_number || '',
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
      p_pincode: currentUser?.p_pincode || '',
      r_address_line1: currentUser?.r_address_line1 || '',
      r_address_line2: currentUser?.r_address_line2 || '',
      r_city: currentUser?.r_city || '',
      r_state: currentUser?.r_state || '',
      r_pincode: currentUser?.r_pincode || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');

    try {
      data.company_id = '0001';
      data.company_name = 'infbell';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.offer_date = formatDateToYYYYMMDD(datesUsed?.offer_date);
      data.joining_date = formatDateToYYYYMMDD(datesUsed?.joining_date);
      data.date_of_birth = formatDateToYYYYMMDD(datesUsed?.date_of_birth);

      console.log(data, 'data111ugsghghh');

      const response = await axios.post('http://localhost:8081/onboarding', data).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  // for upload docmunt
  
  return (
    <>
      <Helmet>
        <title> Dashboard: myclaims</title>
      </Helmet>
      {/* <h1>hello</h1> */}
      {/* <Search/> */}
      {/* <Button>add

    </Button> */}
    <Button onClick={handleOpen}>Open modal</Button>
      
       <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      // onClose={handleClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
      {/* methods={methods} onSubmit={onSubmit} */}
        <DialogTitle>Applly All Claims</DialogTitle>

        <DialogContent>
          {/* <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert> */}
         

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            marginTop={2}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            {/* <RHFSelect name="status" label="Status">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect> */}

            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}
            <RHFAutocomplete
                  name="country"
                  label="Type Of Claim"
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
                <RHFAutocomplete
                  name="country"
                  label=" Currency for Reimbursement"
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
                
                
            <RHFTextField name="name" label="Claim Amount" />
            <Grid sx={{alignSelf:"flex-start"}}  >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="To"
                        // value={item?.to}
                        onChange={(newValue) => {
                          handleChangeDate(newValue,'to');
                        }}
                      />
                    {/* </DemoContainer> */}
                  </LocalizationProvider>
                </Grid>
            <RHFTextField name="email" label="comments" />
            {/* <RHFTextField name="phoneNumber" label=" Attachment" /> */}
        <Grid sx={{alignSelf:"flex-end"}}>
         
            <Controller
        name="file"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <input
            {...field}
            type="file"
            accept=".doc, .pdf"
          />
        )}
      />
      </Grid>
      <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{ htmlFor: 'contained-button-file' }}
      label="Upload Document"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <input
              accept=".doc,.pdf"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              {/* <CloudUploadIcon /> */}
              <CloudUploadIcon/>
            </label>
          </InputAdornment>
        ),
      }}
    />     
      
      
 
           
          </Box>
          
           
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>

      <BasicTable
        headdata={TABLE_HEAD}
        bodydata={bodyContent}
        rowActions={actions}
      />
    </>
  );
}
UserListPage.propTypes = {
  currentUser: PropTypes.object,
};

