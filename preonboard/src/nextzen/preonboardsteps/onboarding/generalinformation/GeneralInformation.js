import React,{ useCallback, useMemo, useState ,forwardRef,useImperativeHandle, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid,Stack,Autocomplete, Typography,Switch} from '@mui/material';
import dayjs from 'dayjs';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { Country, State, City }  from 'country-state-city';

const employmentTypeOptions=[
    {label:"Permanent",id:'1'},
    {label:"Contract",id:'2'},
    {label:"Daily Wise",id:'3'},
    {label:"Hours Wise",id:'3'},
  
  ]

const genderOptions=[
    {label:'Male'},
    {label:'Female'},
    {label:'Other'}
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

const   GeneralInformation=forwardRef((props,ref)=> {

    const [userdropDownOptions,setUserDropDownOptions]=useState({});
    const [isSameAsResendtial,setIsSameAsResendtial]=useState(false);

    useImperativeHandle(ref,()=>({
        childFunctionGeneral(){
            handleSubmit();
    
    
    
    
          
        }
      }))

    useEffect(()=>{
        const arr={}
        arr.rCountryOptions=Country.getAllCountries() || [];
        arr.pCountryOptions=Country.getAllCountries() || [];

        setUserDropDownOptions(arr);

    },[])
   const currentUser={}
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        contactNumber: '',
        emergencyContactNumber:'',
        email: '',
        gender:'',
        dataOfBirth:dayjs(new Date()),
        
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
        
        toggle: currentUser?.toggle || false,

    
       
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
    //   useEffect(() => {
    //     // Get data from local storage
    //     const storedFormData = localStorage.getItem('formData');

    //     console.log(storedFormData,'storedData')
    
    //     // If there's data in local storage, parse and set the state
    //     if (storedFormData) {
    //       const parsedFormData = JSON.parse(storedFormData);
    //       ConnectingAirportsOutlined.log(parsedFormData,'kkkk')
    //       setFormData(parsedFormData);
    //     }
    //   }, []);
      const handleSubmit = () => {
        props.handleLoader()
        // event.preventDefault();
        console.log("harshaa")
        localStorage.setItem("formData",JSON.stringify(formData));
        const newErrors = {};
        console.log(formData);
      
        // Check for empty fields
        // for (const [key, value] of Object.entries(formData)) {
        //   // Ensure that value is a string before calling trim
        //   if (typeof value === 'string' && value.trim() === '') {
        //     newErrors[key] = `${camelToPascalWithSpaces(key)} is required`;
        //   }
        // }
        // if (Object.keys(newErrors).length > 0) {
        //     setErrors(newErrors);
        //     return;

        // }
        const data={...formData};
        data.gender=data?.gender?.label|| "";
       data.maritalStatus=data?.maritalStatus?.label || ""
       data.religion=data?.religion?.label || "";
       data.nationality=data?.nationality?.nationality || "";
       data.bloodGroup=data?.bloodGroup?.label || "";
       data.pCountry=data?.country|| {name:"",isoCode:""};
      data.pState=data?.state || {name:"",isoCode:""};
      data.pCity=data?.city || {name:"",isoCode:""}
      if(isSameAsResendtial){
        data.rAddressLine1=data.pAddressLine1;
        data.rAddressLine2=data.pAddressLine2
        data.rCountry=data?.country||{name:"",isoCode:""};
        data.rState=data?.state || {name:"",isoCode:""};
        data.rCity=data?.city || {name:"",isoCode:""};
        data.rPincode=data.pPincode;
     
      }
      else{
        data.rCountry=data?.rCountry||{name:"",isoCode:""};
        data.rState=data?.rState || {name:"",isoCode:""};
        data.rCity=data?.rCity || {name:"",isoCode:""}
      }
        console.log(data,'formData general')

        
        
       

        
      }
  return (
    <form onSubmit={handleSubmit} noValidate>
    <Grid spacing={2} container margin="10px">
      <Grid md={3} lg={3}item>
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
        <Grid  md={3} lg={3} item>
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
        <Grid  md={3} lg={3} item>
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

    <Grid  md={3} lg={3} item>
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
          <Grid  md={3} lg={3} item>
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
        <Grid md={3} lg={3} item>

        <TextField
        fullWidth
          type="date"
          label="Date Of Birth"
          name="dataOfBirth"
          value={formData?.dataOfBirth}
          onChange={handleChange}
          error={!!errors.dataOfBirth}
          helperText={errors.dataOfBirth}
          required
          sx={{ width: '100%', '& input': { width: '100%' } }}
        />
    </Grid>

    <Grid  md={3} lg={3} item>
         <TextField
        fullWidth
        
          label="Mother Name"
          name="motherName"
          value={formData?.motherName}
          onChange={handleChange}
          
          
          sx={{ width: '100%', '& input': { width: '100%' } }}
        /></Grid>
    <Grid  md={3} lg={3} item>
         <TextField
        fullWidth
        
          label="Father Name"
          name="fatherName"
          value={formData?.fatherName}
          onChange={handleChange}
          
          
          sx={{ width: '100%', '& input': { width: '100%' } }}
        /></Grid>
        
    <Grid item  md={3} lg={3} >
              
    <Autocomplete
        id="bloodGroup"
        options={bloodGroupsOptions || []}
        value={formData?.bloodGroup}
        getOptionLabel={(option) => option.label}
        onChange={(e,newvalue)=>{
            const newArr={...formData};
            newArr.bloodGroup=newvalue;
            setFormData(newArr)
        }}
        renderInput={(params) => (
          <TextField {...params} label="Blood Group" style={{ width: '100%' }} />
        )}
      />
 </Grid>
 <Grid item  md={3} lg={3} >
              
              <Autocomplete
                  id="martialstatus"
                  options={maritalStatusOptions || []}
                  value={formData?.maritalStatus}
                  getOptionLabel={(option) => option.label}
                  onChange={(e,newvalue)=>{
                      const newArr={...formData};
                      newArr.maritalStatus=newvalue;
                      setFormData(newArr)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Martial Status" style={{ width: '100%' }} />
                  )}
                />
 </Grid>

 <Grid item  md={3} lg={3} >
              
              <Autocomplete
                  id="nationality"
                  options={nationalitiesOptions || []}
                  value={formData?.nationality}
                  getOptionLabel={(option) => option.nationality}
                  onChange={(e,newvalue)=>{
                      const newArr={...formData};
                      newArr.nationality=newvalue;
                      setFormData(newArr)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Nationality" style={{ width: '100%' }} />
                  )}
                />
 </Grid>

 <Grid item  md={3} lg={3} >
              
              <Autocomplete
                  id="religion"
                  options={religionOptions || []}
                  value={formData?.religion}
                  getOptionLabel={(option) => option.label}
                  onChange={(e,newvalue)=>{
                      const newArr={...formData};
                      newArr.religion=newvalue;
                      setFormData(newArr)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Religion" style={{ width: '100%' }} />
                  )}
                />
 </Grid>
                    <Grid md={12} lg={12} item>
                    <Typography>Address</Typography>
                    </Grid>

                    <Grid md={6} xs={12} lg={6} item>
                  <TextField
                    fullWidth
                
                    name="pAddressLine1"
                    label="Permanent Address Line 1"
                    variant="outlined"
                    id="pAddressLine1"
                    value={formData?.rAddressLine1}
                    onChange={(e) => {
                      
                      setFormData(prev=>({
                        ...prev,
                        rAddressLine1:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="pAddressLine2"
                    label="Permanent Address Line 2"
                    variant="outlined"
                    id="pAddressLine2"
                    value={formData?.rAddressLine2}
                    onChange={(e) => {
                      
                      setFormData(prev=>({
                        ...prev,
                        rAddressLine2:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                    <Grid item xs={6} md={3} lg={3}>
              
              <Autocomplete
                disablePortal
                id="permanentcountry"
                options={userdropDownOptions?.pCountryOptions || []}
                value={formData?.pCountryValue}
                getOptionLabel={(option) => option?.name}
                onChange={async(e, newvalue) => {

                  var newOptiosArray={...userdropDownOptions};
                  
                  newOptiosArray.pStateOptions=State.getStatesOfCountry(newvalue?.isoCode)|| [];
                  newOptiosArray.pCityOptions=[]

                  setUserDropDownOptions(newOptiosArray)

                  var newArr = { ...formData };
                  newArr.pCountryValue=newvalue;
                  newArr.pStateValue=undefined;
                  newArr.pCityValue=undefined;
                 
                  
                  //console.log(newArrm)
                 
                  setFormData(newArr)
                }
                
              }

               
                
                renderInput={(params) => <TextField {...params} label="Permanent Country"
                style={{  width: '100%' }} />}
              />
                  </Grid>


                  <Grid item md={3} lg={3} >
              
              <Autocomplete
                disablePortal
                id="permanentstate"
                options={userdropDownOptions?.pStateOptions || []}
                value={formData?.pStateValue}
                getOptionLabel={(option) => option?.name}
                onChange={async(e, newvalue) => {

                  var newOptiosArray={...userdropDownOptions};
                  

                  newOptiosArray.pCityOptions=City.getCitiesOfState(formData?.pCountryValue?.isoCode, newvalue?.isoCode)

                  setUserDropDownOptions(newOptiosArray)

                  var newArr = { ...formData };
                
                  newArr.pStateValue=newvalue;
                  newArr.pCityValue=undefined;
                 
                  
                  console.log(newArr)
                 
                  setFormData(newArr)
                }
                
              }

               
                
                renderInput={(params) => <TextField {...params} label="Permanent State"
                style={{  width: '100%' }} />}
              />
                  </Grid>

                  <Grid item md={3} lg={3} paddingLeft='16px'>
              
              <Autocomplete
                disablePortal
                id="permanentcity"
                options={userdropDownOptions?.pCityOptions || []}
                value={formData?.pCityValue}
                getOptionLabel={(option) => option?.name}
                onChange={async(e, newvalue) => {

                  // var newOptiosArray={...userdropDownOptions};
                  
                  // newOptiosArray.rStateOptions=State.getStatesOfCountry(newvalue?.isoCode)|| [];
                  // newOptiosArray.rCityOptions=[]

                  // setUserDropDownOptions(newOptiosArray)

                  var newArr = { ...formData };
                
                  newArr.pCityValue=newvalue;
                  
                 
                  
                
                 
                  setFormData(newArr)
                }
                
              }

               
                
                renderInput={(params) => <TextField {...params} label="Permanent City"
                style={{  width: '100%' }} />}
              />
                  </Grid>

                  <Grid  md={3} lg={3} item>
         <TextField
        fullWidth
        
          label="Permanent Pincode"
          name="pPincode"
          value={formData?.rPincode}
          onChange={handleChange}
          
          
          sx={{ width: '100%', '& input': { width: '100%' } }}
        /></Grid>
              <Grid style={{ display: 'flex', alignItems: 'center' }} md={12} lg={12} xs={12} >
                  <Switch
                    checked={isSameAsResendtial}
                    onChange={()=>{
                      setIsSameAsResendtial((prevValue) => !prevValue);
                    }}
                    inputProps={{ 'aria-label': 'Toggle' }}
                  />
                  <Typography component="p">Same As Permanent</Typography>
              </Grid>
{!isSameAsResendtial &&<>
                  <Grid md={6} xs={12} lg={6} item>
                  <TextField
                    fullWidth
                
                    name="rAddressLine1"
                    label="Resendtial Address Line 1"
                    variant="outlined"
                    id="rAddressLine1"
                    value={formData?.rAddressLine1}
                    onChange={(e) => {
                      
                      setFormData(prev=>({
                        ...prev,
                        rAddressLine1:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="rAddressLine2"
                    label="Resendtial Address Line 2"
                    variant="outlined"
                    id="rAddressLine2"
                    value={formData?.rAddressLine2}
                    onChange={(e) => {
                      
                      setFormData(prev=>({
                        ...prev,
                        rAddressLine2:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                 
                  <Grid item xs={12} md={3} lg={3} paddingLeft='16px'>
              
              <Autocomplete
                disablePortal
                id="resentialcountry"
                options={userdropDownOptions?.rCountryOptions || []}
                value={formData?.rCountryValue}
                getOptionLabel={(option) => option?.name}
                onChange={async(e, newvalue) => {
                 
                  var newOptiosArray={...userdropDownOptions};
                  
                  newOptiosArray.rStateOptions=State.getStatesOfCountry(newvalue?.isoCode)|| [];
                  newOptiosArray.rCityOptions=[]

                  setUserDropDownOptions(newOptiosArray)

                  var newArr = { ...formData };
                  newArr.rCountryValue=newvalue;
                  newArr.rStateValue=undefined;
                  newArr.rCityValue=undefined;
                 
                  
                  console.log(newArr)
                 
                  setFormData(newArr)
                }
                
              }

               
                
                renderInput={(params) => <TextField {...params} label="Residential Country"
                style={{  width: '100%' }} />}
              />
                  </Grid>


                  <Grid item xs={12} md={3} lg={3} paddingLeft='16px'>
              
              <Autocomplete
                disablePortal
                id="resenditialstate"
                options={userdropDownOptions?.rStateOptions || []}
                value={formData?.rStateValue}
                getOptionLabel={(option) => option?.name}
                onChange={async(e, newvalue) => {

                  var newOptiosArray={...userdropDownOptions};
                  

                  newOptiosArray.rCityOptions=City.getCitiesOfState(formData?.rCountryValue?.isoCode, newvalue?.isoCode)

                  setUserDropDownOptions(newOptiosArray)

                  var newArr = { ...formData };
                
                  newArr.rStateValue=newvalue;
                  newArr.rCityValue=undefined;
                 
                  
                  console.log(newArr)
                 
                  setFormData(newArr)
                }
                
              }

               
                
                renderInput={(params) => <TextField {...params} label="Residential State"
                style={{  width: '100%' }} />}
              />
                  </Grid>

                  <Grid item xs={12} md={3}  lg={3} paddingLeft='16px'>
              
              <Autocomplete
                disablePortal
                id="resendiatialtcity"
                options={userdropDownOptions?.rCityOptions || []}
                value={formData?.rCityValue}
                getOptionLabel={(option) => option?.name}
                onChange={async(e, newvalue) => {

                  // var newOptiosArray={...userdropDownOptions};
                  
                  // newOptiosArray.rStateOptions=State.getStatesOfCountry(newvalue?.isoCode)|| [];
                  // newOptiosArray.rCityOptions=[]

                  // setUserDropDownOptions(newOptiosArray)

                  var newArr = { ...formData };
                
                  newArr.rCityValue=newvalue;
                  
                 
                  
                
                 
                  setFormData(newArr)
                }
                
              }

               
                
                renderInput={(params) => <TextField {...params} label="Residential City"
                style={{  width: '100%' }} />}
              />
                  </Grid>
                 
                  <Grid md={3} xs={12} lg={3} item>
                  <TextField
                    fullWidth
                
                    name="rPincode"
                    label="Resendiatial Pincode"
                    variant="outlined"
                    id="pState"
                    value={formData?.rPincode}
                    onChange={(e) => {
                      
                      setFormData(prev=>({
                        ...prev,
                        rPincode:parseInt(e.target.value, 10) || ''
                      }))
                    }}
                  />
                  </Grid>

                   </>}

    </Grid>
     
    {/* <Grid container justifyContent="flex-end" alignItems="flex-end">
    <Button type="submit" variant="contained" color="primary">
      Submit
    </Button>
    </Grid> */}
  </form>
  )
});

export default GeneralInformation