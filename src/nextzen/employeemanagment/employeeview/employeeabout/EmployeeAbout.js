
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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useTheme, alpha } from '@mui/material/styles';


// components
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';
import { Grid,Switch,TextField,Autocomplete} from '@mui/material';
import { useEffect,useState } from 'react';
import axios from 'axios';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import EmployeeAboutEdit from './EmployeeAboutEdit';
import {baseImageUrl, baseUrl } from 'src/nextzen/global/BaseUrl';

import { Country, State, City }  from 'country-state-city';

import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade, ApiHitDepartmentWithoutLocation} from 'src/nextzen/global/roledropdowns/RoleDropDown';
import ProfileCover from 'src/sections/user/profile-cover';


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

  const theme = useTheme();


  const [userData,setUserData]=useState({})
  const ApiHitAboutEmployeePic=()=>{
         
    let data = JSON.stringify({
      "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      "employeeID": employeeIDForApis
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/getMiniOnboardingDetails`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.data,'setUserData'));
      setUserData(response.data.data)
      setNewAvatarUrl(baseImageUrl+response.data.data?.imageData)
     console.log(baseImageUrl+response.data.data?.imageData,'avatarUrl')

    })
    .catch((error) => {
      console.log(error);
    });
}

useEffect(()=>{
  ApiHitAboutEmployeePic()
},[])

 
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
            employmentType:{label:currentEmployee?.employmentType} || undefined,
            locationValue:locationValue,
            departmentValue:departmentValue,
            desginationValue:desginationValue,
            desginationGradeValue:desginationGradeValue,
            rolesValue:rolesValue,
            managerValue:managerValue,
            bloodGroupValue: { label: currentEmployee?.bloodGroup,value:'a' },
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
console.log(localStorage.getItem("employeeID"),employeeIDForApis,'anilll')
console.log('hii')
 const handleCallSnackbarP=(msg,sev)=>{
  handleCallSnackbar(msg,sev);
 }

 const [isMobileView, setIsMobileView] = useState(false);

 useEffect(() => {
   const handleResize = () => {
     setIsMobileView(window.innerWidth <= 900);
   };

   // Initial check on mount
   handleResize();

   // Listen for window resize events
   window.addEventListener('resize', handleResize);

   // Remove the event listener when the component is unmounted
   return () => {
     window.removeEventListener('resize', handleResize);
   };
 }, []);

 const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewAvatarUrl(reader.result);
      var obj=userData;
      obj.imageData=reader.result;
      setUserData(obj);
    };
    reader.readAsDataURL(file);
  }
};
const handleCameraIconClick = () => {
  // Trigger a click on the file input when the camera icon is clicked
  document.getElementById('fileInput').click();
};

const [newAvatarUrl, setNewAvatarUrl] = useState("");

 const renderProfile=(
  <>
  <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          // left: { md: 24 },
          // bottom: { md: 24 },
          // zIndex: { md: 10 },
          // pt: { xs: 6, md: 0 },
          // position: { md: 'absolute' },
        }}
      >
    <label
      htmlFor="fileInput"
      style={{ position: 'relative', cursor: 'pointer', display: 'inline-block' }}
    >
      
      <Avatar
       src={newAvatarUrl}
        // alt={name}
        sx={{
          mx: 'auto',
          width: { xs: 64, md: 128 },
          height: { xs: 64, md: 128 },
          border: `solid 2px ${theme.palette.common.white}`,
        }}
      />
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
      />
       {!isMobileView && ( // Only show the icon if the screen width is greater than 600px
            <IconButton
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: theme.palette.common.white,
              }}
              onClick={handleCameraIconClick}
            >
              <PhotoCameraIcon />
            </IconButton>
          )}
    </label>
   {/* <FormProvider methods={methods} onSubmit={onSubmit}>
   <Box >
              <RHFUploadAvatar
              
                name="avatarUrl1"
                maxSize={3145728}
                onDrop={handleDrop}
                
              />
            </Box>
          
            </FormProvider> */}

        {/* <ListItemText
          sx={{
            // mt: 3,
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={name}
          secondary={role}
          primaryTypographyProps={{
            typography: 'h4',
            color:'white'
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color:'white',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
          }}
        /> */}
      </Stack>
  </>
)

// const renderProfile=(
//   <>

// <ProfileCover
//         role={userData?.roleName}
//         name={userData?.firstName}
       
//         avatarUrl ={userData?.imageData}
//         coverUrl={"bg"}
//       />
//   </>
// )


  const renderAbout = (
    <>
    <EmployeeAboutEdit handleCallSnackbar={handleCallSnackbarP} ApiHit={ApiHit} dropDownOptions={dropDownOptions} dropDownvalue={dropDownvalue} open={open} handleEditClose={handleEditClose} currentUserData={currentEmployee} userlocation={userlocation} employeeIDForApis={employeeIDForApis} />
    <Grid sx={{padding:'10px'}} container alignItems="center"  justifyContent="space-between">
        <Grid item>
        <Typography variant='h5' component="body">General Information</Typography>

        </Grid>
        
        {localStorage.getItem("employeeID")!==employeeIDForApis &&
        <Grid item>
        <Iconify 
        sx={{cursor: "pointer",color:'black'}}
          onClick={()=>{
            
            handleEdit()
          }}
        icon="solar:pen-bold" />

        </Grid>
}
    </Grid>
     
      <Grid container spacing={{ xs: 10, sm: 10, lg: 10 ,md:5}}>

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
          Employement Type
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

        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
         CTC
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.ctc}
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

        <Grid item>{renderProfile}</Grid>
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
{/* 
      {renderProfile} */}
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