
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

// components
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';
import { Grid,Switch,TextField,Autocomplete} from '@mui/material';
import { useEffect,useState } from 'react';
import axios from 'axios';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import EmployeeAboutEdit from './EmployeeAboutEdit';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

import { Country, State, City }  from 'country-state-city';

import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade, ApiHitDepartmentWithoutLocation} from 'src/nextzen/global/roledropdowns/RoleDropDown';


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


// ----------------------------------------------------------------------

export default function 

EmployeeAbout({ handleCallSnackbar, delivery, shippingAddress, payment,employeeIDForApis }) {

 
  const userlocation={
    "locationID": 30,
    "locationName": "location1"
}
  const [locations,setLocations]=useState([])
  var currentEmployeeData={};
    const [open,setOpen]=useState(false);
    const handleEdit=()=>{
        setOpen(true);
    }
    const handleEditClose=()=>{
        setOpen(false);
    }
    const [currentEmployee,setCurrentEmployee]=useState("")

    const [dropDownOptions,setDropDownOptions]=useState({})
    const [dropDownvalue,setDropDownValue]=useState({})

    const funcDropDownValue=(arr,field,id)=>{
      var retValueArray={}
      console.log(arr,field,id,"designationID")
      for(var i=0;arr?.length;i++){
        if(arr[i][field]===id){
          return arr[i];
        }
      }
      return {};
    }


    useEffect(() => {
      if(currentEmployee){
      const fetchLocations = async () => {
        const deptObj={
          companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          locationID:currentEmployee?.locationID
        }
        const desgObj={
          companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          departmentID:currentEmployee?.departmentID
        }
        const desgGradeObj={
          companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          designationID:currentEmployee?.designationID
        }
        try {
          const locations = await ApiHitLocations();
          const department=await ApiHitDepartmentWithoutLocation();
          const desgination=await ApiHitDesgniation(desgObj)
          const desginationGrade=await ApiHitDesgniationGrade(desgGradeObj)
          const roles= await ApiHitRoles()
          const manager=await ApiHitManager()

          const arr={
            locationsOptions:locations,
            departmentOptions:department,
            desginationOptions:desgination,
            desginationGradeOptions:desginationGrade,
            rolesOptions:roles,
            managerOptions:manager,
            bloodGroupsOptions:bloodGroupsOptions,
            religionOptions:religionOptions,
            nationalityOptions:nationalitiesOptions,
            genderOptions:genderOptions || [],
            maritalStatusOptions:maritalStatusOptions || [],
            pCountryOptions:Country.getAllCountries() || [],
            pStateOptions:State.getStatesOfCountry(currentEmployee?.pCountry?.isoCode)|| [],
            pCityOptions:City.getCitiesOfState(currentEmployee?.pCountry?.isoCode, currentEmployee?.pState?.isoCode)|| [],

            rCountryOptions:Country.getAllCountries() || [],
            rStateOptions:State.getStatesOfCountry(currentEmployee?.rCountry?.isoCode)|| [],
            rCityOptions:City.getCitiesOfState(currentEmployee?.rCountry?.isoCode, currentEmployee?.rState?.isoCode)|| [],
           
            
            


          }
          setDropDownOptions(arr);

          const locationValue=funcDropDownValue(locations,'locationID',currentEmployee?.locationID)
          const departmentValue=funcDropDownValue(department,'departmentID',currentEmployee?.departmentID)
          const desginationValue=funcDropDownValue(desgination,'designationID',currentEmployee?.designationID)
          const desginationGradeValue=funcDropDownValue(desginationGrade,'designationGradeID',currentEmployee?.designationGradeID)
          const rolesValue=funcDropDownValue(roles,'roleID',currentEmployee?.roleID)
          const managerValue=funcDropDownValue(manager,'managerID',currentEmployee?.reportingManagerID)


          const arrValue={
            locationValue:locationValue,
            departmentValue:departmentValue,
            desginationValue:desginationValue,
            desginationGradeValue:desginationGradeValue,
            rolesValue:rolesValue,
            managerValue:managerValue,
            bloodGroupValue: { label: currentEmployee?.bloodGroup },
            religionValue:{label:currentEmployee?.religion},
            genderValue:{label:currentEmployee?.gender},
            nationalityValue:{nationality:currentEmployee?.nationality},
            maritalStatusValue:{label:currentEmployee?.maritalStatus},
            pCountryValue:currentEmployee?.pCountry || undefined,
            rCountryValue:currentEmployee?.rCountry || undefined,
            pStateValue:currentEmployee?.pState || undefined,
            rStateValue:currentEmployee?.rState || undefined,
            pCityValue:currentEmployee?.pCity || undefined,
            rCityValue:currentEmployee?.rCity || undefined,


          }


          setDropDownValue(arrValue);
          console.log(arr, 'locationsdepartmentarr');
         
          setLocations(locations);
          
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      };
    
      fetchLocations();
    }
    }, [currentEmployee]);

    const ApiHit=()=>{
      let data = JSON.stringify({
        "employeeID": employeeIDForApis,
        // companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      });
       
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/getOnboardingFormDetails`,
        headers: { 
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
          'Content-Type': 'application/json', 
        },
        data : data
      };
       
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data),'nithinn');
        setCurrentEmployee(response.data.data)
        currentEmployeeData=response.data.data
        handleCallSnackbar(response.data.message,'success')
      })
      .catch((error) => {
        console.log(error,'error');
      });
    }
      const { logout } = useAuthContext();
      const popover = usePopover();
      const[bunkData,setBunkData]=useState({})
      const [edit,setEdit]=useState(false)
      const[bunkDataEdit,setBunkDataEdit]=useState({})
      const [state,setState]=useState({});
      const [stateOptions,setStateOptions]=useState([]);
      const [cityOptions,setCityOptions]=useState([])
      const [city,setCity]=useState({})
      const router=useRouter()

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/login');
    } catch (error) {
      console.error(error);
    }
  };

 
 
 
 

  useEffect(()=>{

   
  
   ApiHit()
    
  },[])

  const handleChange=(e,field)=>{
    

    
  
}
 const handleCallSnackbarP=(msg,sev)=>{
  handleCallSnackbar(msg,sev);
 }
 

  const renderAbout = (
    <>
    <EmployeeAboutEdit handleCallSnackbar={handleCallSnackbarP} ApiHit={ApiHit} dropDownOptions={dropDownOptions} dropDownvalue={dropDownvalue} open={open} handleEditClose={handleEditClose} currentUserData={currentEmployee} userlocation={userlocation} employeeIDForApis={employeeIDForApis} />
    <Grid sx={{padding:'10px'}} container alignItems="center"  justifyContent="space-between">
        <Grid item>
        <Typography variant='h5' component="body">General Information</Typography>

        </Grid>
        <Grid item>
        <Iconify 
        sx={{cursor: "pointer",color:'black'}}
          onClick={()=>{
            
            handleEdit()
          }}
        icon="solar:pen-bold" />

        </Grid>
    </Grid>
     
      <Grid container spacing={{ xs: 10, sm: 10, lg: 20 ,md:5}}>

        <Grid item>
        <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            First Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.firstName}
          </Box>
               
         
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Middle Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.middleName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Last Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.lastName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Personal Email
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', maxWidth: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.personalEmail}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Company Email
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', maxWidth: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.companyEmail}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Contact Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.contactNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Emergency ContactNumber
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.emergencyContactNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Date Of Birth
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.dateOfBirth}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Father Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.fatherName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Mother Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.motherName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Marital Status
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.maritalStatus}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Nationality
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.nationality}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Religion
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.religion}
          </Box>
        </Stack>
        {/* <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Tracking No.
          </Box>
          <Link underline="always" color="inherit">
            {delivery?.trackingNumber}
          </Link>
        </Stack> */}
      </Stack>

        </Grid>
        <Grid item>
        <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
       
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Blood Group
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.bloodGroup}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Offer Date
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.offerDate}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Joining Date
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.joiningDate}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Employment Type
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.employmentType}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Department Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {dropDownvalue?.departmentValue?.departmentName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Designation
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {dropDownvalue?.desginationValue?.designationName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Desgination Grade Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {dropDownvalue?.desginationGradeValue?.designationGradeName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Working Location
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
           {dropDownvalue?.locationValue?.locationName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Reporting Manager Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {dropDownvalue?.managerValue?.managerName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Role
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {dropDownvalue?.rolesValue?.roleName}
          </Box>
        </Stack>
       
        {/* <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Tracking No.
          </Box>
          <Link underline="always" color="inherit">
            {delivery?.trackingNumber}
          </Link>
        </Stack> */}
      </Stack>


        </Grid>
      </Grid>
    
    </>
  );

  const renderShipping = (
    <>
      <CardHeader
        title="Address Details"
        // action={
        //   <IconButton>
        //     <Iconify icon="solar:pen-bold" />
        //   </IconButton>
        // }
      />
       <Grid container spacing={{ xs: 5, sm: 5, lg: 20 ,md:5}}>

                    <Grid item>
                    <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Address line1
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pAddressLine1}
                    </Box>
                        
                    
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Address line2
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pAddressLine2}
                    </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Country
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pCountry?.name}
                    </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent State
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pState?.name}
                    </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent City
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pCity?.name}
                    </Box>
                    </Stack>
                   
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Pincode
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pPincode}
                    </Box>
                    </Stack>
                   
                    
                   
                    </Stack>
                    </Grid>
                    <Grid item>
                    <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential Address Line1
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.rAddressLine1}
                    </Box>
                        
                    
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential Address Line2
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.rAddressLine2}
                    </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential Country
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.rCountry?.name}
                    </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential State
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.rState?.name}
                    </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential City
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.rCity?.name}
                    </Box>
                    </Stack>
                    
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential Pincode
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.rPincode}
                    </Box>
                    </Stack>
                   
                    
                   
                    </Stack>
                    </Grid>
        </Grid>
    </>
  );




  const renderRole = (
    <>
    {console.log(dropDownvalue,'dropDownvaluedropDownvalue')}
      <CardHeader
        title="Role"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
       <Grid container spacing={20}>

          <Grid item>
          <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
          <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
         Location
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {dropDownvalue?.locationValue?.locationName}
          </Box>
              

          </Stack>
          



          </Stack>
          </Grid>
          </Grid>
    </>
  );

  return (
    <Card sx={{ marginTop: '30px' }}>
      {/* {renderCustomer} */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderAbout}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderShipping}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* {renderRole} */}
    </Card>
  );
}

EmployeeAbout.propTypes = {
  
  delivery: PropTypes.object,
  payment: PropTypes.object,
  shippingAddress: PropTypes.object,
  employeeIDForApis:PropTypes.string,
  handleCallSnackbar:PropTypes.func
};