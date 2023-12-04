import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState ,forwardRef,useImperativeHandle, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';
import SnackBar from 'src/nextzen/global/SnackBar';

import formatDateToYYYYMMDD from '../../../global/GetDateFormat';

import { baseUrl } from 'src/nextzen/global/BaseUrl';
 import { Country, State, City }  from 'country-state-city';

import  {ApiHitCities,ApiHitStates,ApiHitCountries,ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade,ApiHitDepartmentWithoutLocation,ApiHitleavePeriodType,ApiHitleaveNameType} from 'src/nextzen/global/roledropdowns/RoleDropDown';



const   GeneralInformation=forwardRef((props,ref)=> {

  const [pcountryIsoCode,setPCoutryIsoCode]=useState("")
  const [rcountryIsoCode,setRCoutryIsoCode]=useState("")

  const [isSameAsPermanent,setIsSameAsPermanent]=useState(false)

 
  const [openSnackBar,setopenSnackBar]=useState(false);
  const [severitySnackbar,setseveritySnackbar]=useState("");
  const [messageSnackbar,setmessageSnackbar]=useState('');
  const [isDateOfBirthFilled,setIsDateOfBirthFilled]=useState(false);


  const currentUser=props.currentUser;
  const [options,setOptions]=useState({
    countryOptions:[],
    stateOptions:[]
  })

  useImperativeHandle(ref,()=>({
    childFunctionGeneral(){
      onSubmit();




      
    }
  }))
  useEffect(()=>{
    console.log("HIII")
    const obj=Country.getAllCountries();
    const newArray={...options};
    newArray.countryOptions=obj;
    newArray.rcountryOptions=obj;
    console.log(obj,'ooooooo')
    setOptions(newArray)
  },[])

  const handleCloseSnackBar=()=>{
    setopenSnackBar(false)
  }

 

  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: "",
    joining_date: "",
    offer_date: "",
  });
  const router = useRouter();

  const [errorMessage,setErrorMessage]=useState("")

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({

    // companyID: Yup.string(),
    // companyName: Yup.string(),
  
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last name is required"),
   
    contactNumber: Yup.number()
    .required("Contact Number is required")
    .integer("Contact Number must be an integer")
    .test(
        "len",
        "Contact Number must be exactly 10 digits",
        (val) => val && val.toString().length === 10
    ),
    emergencyContactNumber: Yup.number(),

    fatherName: Yup.string(),
    motherName: Yup.string(),
    maritalStatus: Yup.object(),
    nationality: Yup.object(),
    religion: Yup.object(),
    bloodGroup: Yup.object(),
   
   
    pAddressLine1: Yup.string(),
    pAddressLine2: Yup.string(),
    pCity: Yup.object(),
    pState: Yup.object(),
    country:Yup.object(),
    pPincode: Yup.number(),
    rAddressLine1: Yup.string(),
    rAddressLine2: Yup.string(),
    rCity: Yup.object(),
    rState: Yup.object(),
    rPincode: Yup.number(),
    rCountry:Yup.object(),
   
    toggle: Yup.bool(),

  
     gender: Yup.object(),
    personalEmail: Yup.string().required("Email is required"),
    companyEmail: Yup.string(),
    
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
   
    companyID: currentUser?.companyID ||'',
    companyName: currentUser?.companyName ||'',
     
    firstName: currentUser?.firstName ||'',
   
    middleName: currentUser?.middleName ||'',
    lastName: currentUser?.lastName ||'',
   
    contactNumber: currentUser?.contactNumber ||undefined,
    emergencyContactNumber: currentUser?.emergencyContactNumber || undefined,
    
    fatherName: currentUser?.fatherName ||'',
    motherName: currentUser?.motherName ||'',
    maritalStatus: currentUser?.maritalStatus ||undefined,
    nationality: currentUser?.nationality ||undefined,
    religion: currentUser?.religion ||undefined,
    bloodGroup: currentUser?.bloodGroup || undefined,
   
   
    pAddressLine1: currentUser?.pAddressLine1 ||'',
    pAddressLine2: currentUser?.pAddressLine2 ||'',
    pCity: currentUser?.pCity ||undefined,
    pState: currentUser?.pState || undefined,
    pPincode: currentUser?.pPincode || undefined,
    country:currentUser?.country || undefined,
    rAddressLine1: currentUser?.rAddressLine1 ||'',
    rAddressLine2: currentUser?.rAddressLine2 ||'',
    rCity: currentUser?.rCity ||undefined,
    rState: currentUser?.rState ||undefined,
    rPincode: currentUser?.rPincode || undefined,
    rCountry :currentUser?.rCountry || undefined,
    
    toggle: currentUser?.toggle || true,

   
     gender:currentUser?.gender||  undefined,
    companyEmail: currentUser?.companyEmail ||'',
    personalEmail: currentUser?.personalEmail ||'',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const m2 = useForm();

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const ApiHitGeneralInformation=(dataGeneral)=>{
        const data1 = dataGeneral;
        let emp_id;
        const config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url: `${baseUrl}/onBoarding`,
          headers: { 
         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1MjcxMTEsInJhbmRvbSI6Nzk5MjR9.f4v9qRoF8PInZjvNmB0k2VDVunDRdJkcmE99qZHZaDA',
             
            'Content-Type': 'text/plain'
          },
          data : data1
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
         
          console.log(response.data.empID,'nithinnn')
          localStorage.setItem("employeeIdCreated",response.data?.empID)
          
          
          props.handleCallSnackbar(response.data.message,"success")
         
          props.nextStep();
        })
        .catch((error) => {
          console.log(error);
          // setopenSnackBar(true);
          // setseveritySnackbar("warning");
          // setmessageSnackbar("Something Wrong")
          props.handleCallSnackbar(error.response.data.message,"error")
        });

  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data,'general information');

    try {
      data.companyID = JSON.parse(localStorage.getItem('userDetails'))?.companyID
      data.companyName = 'infobell';

      if(datesUsed?.joining_date==="" && datesUsed?.date_of_birth===""){
        const obj={
          joiningDate:'Joining Date is Mandatory',
          dateOfBirth:'Date Of Birth is Manadatory'
        }
        setErrorMessage(obj);
        return ;
      }
      else if(datesUsed?.joining_date===""){
        const obj={
          joiningDate:'Joining Date is Mandatory',
          
        }
        setErrorMessage(obj);
        return ;
      }
      else if(datesUsed?.date_of_birth===""){
        const obj={
          joiningDate:'Date Of Birth is Mandatory',
          
        }
        setErrorMessage(obj);
        return ;
      }

      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.offerDate = (datesUsed?.offer_date);
      data.joiningDate = (datesUsed?.joining_date);
      data.dateOfBirth = (datesUsed?.date_of_birth);
       data.gender=data?.gender?.label|| "",
       data.maritalStatus=data?.maritalStatus?.label || ""
       data.religion=data?.religion?.label || "",
       data.nationality=data?.nationality?.nationality || "",
       data.bloodGroup=data?.bloodGroup?.label || "",
       data.pCountry=data?.country|| "",
      data.pState=data?.state || "",
      data.pCity=data?.city || ""
       

      if(isSameAsPermanent){
        data.rAddressLine1=data.pAddressLine1;
        data.rAddressLine2=data.pAddressLine2
        data.rCountry=data?.country||{name:"",isoCode:""},
        data.rState=data?.state || {name:"",isoCode:""},
        data.rCity=data?.city || {name:"",isoCode:""},
        data.rPincode=data.pPincode;
     
      }
      else{
        data.rCountry=data?.rCountry||{name:"",isoCode:""},
        data.rState=data?.rState || {name:"",isoCode:""},
        data.rCity=data?.rCity || {name:"",isoCode:""}
      }

      

     

      
       ApiHitGeneralInformation(data);
      // const response = await axios.post('http://192.168.152.94:3001/erp/onBoarding', data).then(
      //   (successData) => {
      //     console.log('sucess', successData);
      //     console.log(props)
      //     if(props){

      //       props.nextStep();
      //     }
      //   },
      //   (error) => {
      //     console.log('lllll', error);
      //   }
      // );

      

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );


  const onChnageAutoComplete=(obj)=>{
    console.log(obj,'objjjjj')
    const objCountry={
      country:obj?.name
    }
    const newArray={...options};

    async function stateOptions(){
      try {
        // console.log(State.getStatesOfCountry(obj?.isoCode),'State.getStatesOfCountry(countryCode)')
        // const stateOptions1=await ApiHitStates(objCountry)
        newArray.stateOptions=State.getStatesOfCountry(obj?.isoCode);
        setPCoutryIsoCode(obj?.isoCode)
        // console.log(stateOptions1,'stateOptionsSatet')
      }
      catch(e){
  
      }
    }
    stateOptions()
    
     setOptions(newArray);
    console.log(newArray,'newArraynewArray')
  }
  const onChnageAutoCompleteState=(obj)=>{
   
    const objState={
      country:obj?.name
    }
    const newArray={...options};

    async function stateOptions(){
      try {
        // const cityOptions1=await ApiHitCities(objState)
        newArray.cityOptions=City.getCitiesOfState(pcountryIsoCode, obj?.isoCode)
         //console.log(City.getCitiesOfState(countruIsoCode, obj?.isoCode),'stateOptionsSatet')
      }
      catch(e){
  
      }
    }
    stateOptions()
    
     setOptions(newArray);
    console.log(newArray,'newArraynewArray')
  }


  const onChnageAutoCompletercountry=(obj)=>{
    console.log(obj,'objjjjj')
    const objCountry={
      country:obj?.name
    }
    const newArray={...options};

    async function stateOptions(){
      try {
        // console.log(State.getStatesOfCountry(obj?.isoCode),'State.getStatesOfCountry(countryCode)')
        // const stateOptions1=await ApiHitStates(objCountry)
        newArray.rstateOptions=State.getStatesOfCountry(obj?.isoCode);
        setCoutryRIsoCode(obj?.isoCode)
        // console.log(stateOptions1,'stateOptionsSatet')
      }
      catch(e){
  
      }
    }
    stateOptions()
    
     setOptions(newArray);
    console.log(newArray,'newArraynewArray')
  }
  const onChnageAutoCompleterState=(obj)=>{
    console.log(obj,'objjjjj')
    const objState={
      country:obj?.name
    }
    const newArray={...options};

    async function stateOptions(){
      try {
        // const cityOptions1=await ApiHitCities(objState)
        newArray.rcityOptions=City.getCitiesOfState(rcountruIsoCode, obj?.isoCode)
        // console.log(cityOptions1,'stateOptionsSatet')
      }
      catch(e){
  
      }
    }
    stateOptions()
    
     setOptions(newArray);
    console.log(newArray,'newArraynewArray')
  }
 

  const genderOptions=[
    {label:'Male'},
    {label:'Female'}
  ]

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' }
  ];

  const religionOptions = [
    { value: 'christianity', label: 'Christianity' },
    { value: 'islam', label: 'Islam' },
    { value: 'hinduism', label: 'Hinduism' },
    { value: 'buddhism', label: 'Buddhism' },
    { value: 'sikhism', label: 'Sikhism' },
    { value: 'judaism', label: 'Judaism' },
    { value: 'bahai_faith', label: 'Bahá\'í Faith' },
    { value: 'jainism', label: 'Jainism' },
    { value: 'shinto', label: 'Shinto' },
    { value: 'taoism', label: 'Taoism' },
    { value: 'zoroastrianism', label: 'Zoroastrianism' },
    { value: 'confucianism', label: 'Confucianism' },
    { value: 'atheist', label: 'Atheist' },
    { value: 'agnostic', label: 'Agnostic' },
    {value:'other',labal:"Other"}
  ];
  

  const nationalitiesOptions = [
    { country: "United States", nationality: "American" },
    { country: "United Kingdom", nationality: "British" },
    { country: "Canada", nationality: "Canadian" },
    { country: "Australia", nationality: "Australian" },
    { country: "Germany", nationality: "German" },
    { country: "France", nationality: "French" },
    { country: "China", nationality: "Chinese" },
    { country: "India", nationality: "Indian" },
    { country: "Brazil", nationality: "Brazilian" },
    { country: "Russia", nationality: "Russian" },
    { country: "South Africa", nationality: "South African" },
    { country: "Japan", nationality: "Japanese" },
    { country: "Mexico", nationality: "Mexican" },
    { country: "Saudi Arabia", nationality: "Saudi Arabian" },
    { country: "South Korea", nationality: "South Korean" },
    { country: "Other", nationality: "other" }
  ];
  
  const bloodGroupsOptions = [
    { label: "A+", value: "A positive" },
    { label: "A-", value: "A negative" },
    { label: "B+", value: "B positive" },
    { label: "B-", value: "B negative" },
    { label: "AB+", value: "AB positive" },
    { label: "AB-", value: "AB negative" },
    { label: "O+", value: "O positive" },
    { label: "O-", value: "O negative" }
  ];

  
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
             

              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="avatarUrl"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              {currentUser && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="toggle"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value ===true}
                          onChange={(event) =>
                            field.onChange(event.target.checked ? true : false)
                          }
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Credentials
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Create Credentials
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

             
            </Card>
          </Grid>

          <Grid  xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >

                
                
                <RHFTextField name="firstName" label="First Name* " />
                <RHFTextField name="middleName" label="Middle Name " />
                <RHFTextField name="lastName" label="Last Name* " />
                <RHFTextField name="companyEmail" label="Company Email" />
                <RHFTextField name="personalEmail" label="Personal Email" />
                <RHFAutocomplete
                name="gender"
                label="Gender"
                options={genderOptions}
                getOptionLabel={(option) => option.label}
                
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}

              />

                <RHFTextField name="contactNumber" label="Contact Number*" type="number" maxLength={10}/>
                <RHFTextField name="emergencyContactNumber" label="Emergency Contact Number" type="number" maxLength={10} />
               
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Date Of Birth*"
                    
                      value={datesUsed?.date_of_birth ? dayjs(datesUsed?.date_of_birth).toDate() : null}
                      slotProps={{
                        textField: {
                          helperText: (
                            <Stack sx={{ color: 'red' }}>
                          {  errorMessage?.dateOfBirth}
                            </Stack>
                          ),
                        },
                      }}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          date_of_birth: newValue ? dayjs(newValue).format('YYYY-MM-DD') : null
                         

                        }));
                        setIsDateOfBirthFilled(!isDateOfBirthFilled);
                      }}
                      
                    />
                  
                 
                <RHFTextField name="fatherName" label="Father Name" />
                <RHFTextField name="motherName" label="Mother Name" />
                <RHFAutocomplete
                name="maritalStatus"
                label="Marital Status"
                options={maritalStatusOptions}
                getOptionLabel={(option) => option.label}
                
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}

              />
                <RHFAutocomplete
                name="nationality"
                label="Nationality"
                options={nationalitiesOptions}
                getOptionLabel={(option) => option.nationality}
                
                renderOption={(props, option) => (
                  <li {...props} key={option.nationality}>
                    {option.nationality}
                  </li>
                )}

              />
                <RHFAutocomplete
                name="religion"
                label="Religion"
                options={religionOptions}
                getOptionLabel={(option) => option.label}
                
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}

              />
            <RHFAutocomplete
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupsOptions}
                getOptionLabel={(option) => option.label}
              
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}

              />
                
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Offer Date"
                      value={datesUsed?.offer_date ? dayjs(datesUsed?.offer_date).toDate() : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          offer_date: newValue ? dayjs(newValue).format('YYYY-MM-DD') : null
                        }));
                      }}
                    />
                 
                
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Joining Date*"
                      value={datesUsed?.joining_date ? dayjs(datesUsed?.joining_date).toDate() : null}
                      defaultValue={dayjs(new Date())}
                      slotProps={{
                        textField: {
                          helperText: (
                            <Stack sx={{ color: 'red' }}>
                          {  errorMessage?.joiningDate}
                            </Stack>
                          ),
                        },
                      }}
                      onChange={(newValue) => {
                        console.log(newValue,'newValuenewValuenewValue')
                        setDatesUsed((prev) => ({
                          ...prev,
                          joining_date: newValue ? dayjs(newValue).format('YYYY-MM-DD') : null
                        }));
                      }}
                    />
                
                <RHFAutocomplete
                name="country"
                label="Permanent Country"
                options={options?.countryOptions || [] }
                getOptionLabel={(option) => option.name}
                onChnageAutoComplete={onChnageAutoComplete}
                renderOption={(props, option) => (
                  <li {...props} key={option.name}>
                    {option.name}
                  </li>
                )}


              />
                <RHFAutocomplete
                name="state"
                label="Permanent State"
                options={options?.stateOptions || []}
                getOptionLabel={(option) => option.name}
                onChnageAutoComplete={onChnageAutoCompleteState}
                renderOption={(props, option) => (
                  <li {...props} key={option.name}>
                    {option.name}
                  </li>
                )}

              />
               <RHFAutocomplete
                name="city"
                label="Permanent City"
                options={options?.cityOptions || []}
                getOptionLabel={(option) => option.name}
                // onChnageAutoComplete={onChnageAutoCompleteState}
                renderOption={(props, option) => (
                  <li {...props} key={option.name}>
                    {option.name}
                  </li>
                )}

              />
                <RHFTextField name="pAddressLine1" label="Permanent Address Line1 " />
                <RHFTextField name="pAddressLine2" label="Permanent Address Line2 " />
                {/* <RHFAutocomplete
                name="state"
                label="Resendtial State"
                options={options?.countryOptions}
                getOptionLabel={(option) => option.name}
                
                renderOption={(props, option) => (
                  <li {...props} key={option.name}>
                    {option.name}
                  </li>
                )}

              /> */}
               
                
                <RHFTextField name="pPincode" label="Pincode" type="number" maxLength={6}  />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Switch checked={isSameAsPermanent} onChange={()=>{setIsSameAsPermanent(!isSameAsPermanent)}} />
                  <Typography variant="h6" style={{ color: 'Black' }}>
                    Same As Permanent Address
                  </Typography>
                </div>
                { !isSameAsPermanent && <>
                <RHFTextField name="rAddressLine1" label="Resendial Address Line1" />
                <RHFTextField name="rAddressLine2" label="Resendial Address Line2" />
                <RHFAutocomplete
                name="rCountry"
                label="Permanent Country"
                options={options?.rcountryOptions || []}
                getOptionLabel={(option) => option.name}
                onChnageAutoCompletercountry={onChnageAutoCompletercountry}
                renderOption={(props, option) => (
                  <li {...props} key={option.name}>
                    {option.name}
                  </li>
                )}


              />
                <RHFAutocomplete
                name="rState"
                label="Permanent State"
                options={options?.rstateOptions || []}
                getOptionLabel={(option) => option.name}
                onChnageAutoCompleterState={onChnageAutoCompleterState}
                renderOption={(props, option) => (
                  <li {...props} key={option.name}>
                    {option.name}
                  </li>
                )}

              />
               <RHFAutocomplete
                name="rCity"
                label="Permanent City"
                options={options?.rcityOptions || []}
                getOptionLabel={(option) => option.name}
                // onChnageAutoComplete={onChnageAutoCompleteState}
                renderOption={(props, option) => (
                  <li {...props} key={option.name}>
                    {option.name}
                  </li>
                )}

              />
                <RHFTextField name="rPincode" label="Resendial Pincode" type="number" maxLength={6} />
                </>
                }
           

                {/* <RHFTextField name="name" label="Full Name" />
                <RHFTextField name="email" label="Email Address" />
                <RHFTextField name="phoneNumber" label="Phone Number" />

                <RHFAutocomplete
                  name="country"
                  label="Country"
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

                <RHFTextField name="state" label="State/Region" />
                <RHFTextField name="city" label="City" />
                <RHFTextField name="address" label="Address" />
                <RHFTextField name="zipCode" label="Zip/Code" />
                <RHFTextField name="company" label="Company" />
                <RHFTextField name="role" label="Role" /> */}
              </Box>

             
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <SnackBar open={openSnackBar} severity={severitySnackbar} message={messageSnackbar} handleCloseSnackBar={handleCloseSnackBar}/>
    </div>
  );
})

GeneralInformation.propTypes = {
  currentUser: PropTypes.object,
  nextStep: PropTypes.any,
};

export default GeneralInformation;