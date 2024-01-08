import React,{useState,useContext} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid,Stack,Autocomplete } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import axios from 'axios';
import {baseUrl} from '../../../components/baseUrl'
import SnackbarComponent from '../../../components/Snackbar';
const genderOptions=[
  {label:'Male'},
  {label:'Female'},
  {label:'Other'}
]

const GenerateOfferLetter = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    contactNumber: '',
    email: '',
    joiningDate:dayjs(new Date()),
    gender:undefined

  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function camelToPascalWithSpaces(camelCase) {
    // Make sure the input is a non-empty string
    
  
    // Capitalize the first letter and insert spaces before each subsequent uppercase letter
    return camelCase.charAt(0).toUpperCase() +
      camelCase.slice(1).replace(/[A-Z]/g, match => ` ${match}`);
  }
  const requiredFields=["firstName","lastName","contactNumber","email"]
  const ApiHit=(obj)=>{
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: `${baseUrl}/updateOnboardingForm`,
      url: `${baseUrl}/AddApplicant`,
      headers: { 
        'Authorization':  JSON.parse(localStorage.getItem('userDetails'))?.accessToken,
        'Content-Type': 'application/json', 
      },
      data : obj
    };
     
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
     
      
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    console.log(formData)
    // Check for empty fields
    for (const [key, value] of Object.entries(formData)) {
      if (key!=='joiningDate' && key !=='gender' && value.trim() === '' ) {
        newErrors[key] = `${camelToPascalWithSpaces(key)} is required`;
      }
    }

    setErrors(newErrors);

    // If there are no errors, proceed with form submission
    console.log(formData,'formData')
    const obj={...formData};
    obj.gender=obj.gender.label || "";
    obj.companyId=JSON.parse(localStorage.getItem("onboardDetails")).companyID
    obj.applicantId=JSON.parse(localStorage.getItem("onboardDetails")).applicantID
    obj.MiddleName=obj.middleName
    obj.contactNumber=parseInt(obj.contactNumber);
    ApiHit(obj);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
    <Grid spacing={1} container margin="10px">
      <Grid md={4} lg={4}item>
        <TextField
        fullWidth
        
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
          sx={{ width: '100%', '& input': { width: '100%' } }}
        /></Grid>
        <Grid  md={4} lg={4} item>
        <TextField
        fullWidth
        
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
          sx={{ width: '100%', '& input': { width: '100%' } }}
        /></Grid>
        <Grid  md={4} lg={4} item>
         <TextField
        fullWidth
        
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          error={!!errors.middleName}
          helperText={errors.middleName}
          required
          sx={{ width: '100%', '& input': { width: '100%' } }}
        /></Grid>

    <Grid  md={4} lg={4} item>
         <TextField
        fullWidth
        
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber}
          required
          sx={{ width: '100%', '& input': { width: '100%' } }}
        /></Grid>
          <Grid  md={4} lg={4} item>
         <TextField
        fullWidth
        
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          sx={{ width: '100%', '& input': { width: '100%' } }}
        /></Grid>
        <Grid md={4} lg={4} item>

        <TextField
        fullWidth
          type="date"
          label="Joining Date"
          name="joiningDate"
          value={formData?.joiningDate}
          onChange={handleChange}
          error={!!errors.joiningDate}
          helperText={errors.joiningDate}
          required
          sx={{ width: '100%', '& input': { width: '100%' } }}
        />
    </Grid>
    <Grid md={4} lg={4} item>

    <Autocomplete
                  disablePortal
                  id="gender"
                  options={genderOptions || []}
                  value={formData?.gender}
                  getOptionLabel={(option) => option?.label}
                  onChange={async(e, newvalue) => {
                  
                    var newArr = { ...formData };
                    newArr.gender=newvalue;

                    setFormData(newArr)
                  }
                  
                }
                renderInput={(params) => <TextField {...params} label="Gender"
                style={{  width: '100%' }} />}
                />
    </Grid>
    </Grid>
     
    <Grid container justifyContent="flex-end" alignItems="flex-end">
    <Button type="submit" variant="contained" color="primary">
      Submit
    </Button>
    </Grid>
  </form>
  );
}

export default GenerateOfferLetter