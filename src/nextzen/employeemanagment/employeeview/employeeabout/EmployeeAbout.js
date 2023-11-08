
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





// ----------------------------------------------------------------------

export default function EmployeeAbout({  delivery, shippingAddress, payment }) {
  var currentEmployeeData={};
    const [open,setOpen]=useState(false);
    const handleEdit=()=>{
        setOpen(true);
    }
    const handleEditClose=()=>{
        setOpen(false);
    }
    const [currentEmployee,setCurrentEmployee]=useState({
      
    })

    const ApiHit=()=>{
      let data = JSON.stringify({
        "employeeID": "INFO29"
      });
       
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://vshhg43l-3001.inc1.devtunnels.ms/erp/getOnboardingFormDetails',
        headers: { 
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
          'Content-Type': 'application/json', 
          'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8M67rYfw57hCj5sJjtQyecHRP-MlNI5uDkjwk83Wo2eKfP0o67oOafW3-I1VC5LjZgdyZoWLT7e5xaBW370utqAQIfitAZWusIwwc4JcLu2Sf3qfxjwiDmUaIGlzdVijeyWgN6Y0eyrYG0pTE78qHfvCKXDQI4AptAhIEOoucE-xmRiDys7GA8c70-Gb-doYn6Ya-ukvVD8Q49KJxDOD-WqGkhCr_skieWJYHJnCxnVtMsvfDKAOeklzjBMIibAfb5c8vIBM9OlZdc5MX1RLhPFiHYBRBL7lp-LtH_6muOnK45zFlZ8ZQb_RS1jKawf6rWox4w_xi8frutwJldMuBsxorByg3PMEUxZ_9Z2M12A5gF8xi1Buf4TSLTHp2gQAD52XDYHKVvU7ysuMgssrpQBJigvC8lV05MTycAdcjF0Us5GvdxkPs2gQnx1JJJrgx4iETPP-3iB1NGckqt_X8_77J15kHioxyeuu-ozfcJT5yMCE7yNZBfDw4nLXYrt51pux9ah7b2E_emhepIwbKiiK_1-dKa90kHG6t1cpOSEgvfm_McLEUp1dMwfU5i6-xvF8Pt2K6PSm37-bHfhVaacVRl5dWVCLtgT6Q1y0nOZxrEczcElltp8TSaGLOEvmj6DJagjO4lhNnDnda2KA8kBU_QvO9Kk65Hj34FDBsrwcuVAfF6QxR2MDDMojHc47usSJu_RonBw5_K_pcF84aeeqRkko_eJd3WJQ3bDcwumyxcHw43j9O5h1JVvCZShftF54UYw-5OD9dVwOjueLeTgUsrZRMY02Ayn7nXQ8JEOLX2anDO8DeJXKYoQ5EMfJz3Dhz12uwNW39l8AZMFyUuphCcBP8QIU6FsIM0dJkFVUUa99bfPc5L7_jO4x-6irfyFr-AjkKTih4dbR0nGVcU0'
        },
        data : data
      };
       
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setCurrentEmployee(response.data.data)
        currentEmployeeData=response.data.data
      })
      .catch((error) => {
        console.log(error);
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
 
 

  const renderAbout = (
    <>
    <EmployeeAboutEdit open={open} handleEditClose={handleEditClose} currentUserData={currentEmployee} />
    <Grid sx={{padding:'10px'}} container alignItems="center"  justifyContent="space-between">
        <Grid item>
        <Typography variant='h5' component="body">General Information</Typography>

        </Grid>
        <Grid item>
        <Iconify 
        sx={{cursor: "pointer",color:'orange'}}
          onClick={()=>{
            
            handleEdit()
          }}
        icon="solar:pen-bold" />

        </Grid>
    </Grid>
     
      <Grid container spacing={20}>

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
          last Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.lastName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Personal emailID
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', maxWidth: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.emailID}
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
          religion
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
          {currentEmployee?.departmentName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Designation
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.Designation}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Grade Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.gradeName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Working Location
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.workingLocation}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Reporting Manager Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {currentEmployee?.reportingManagerName}
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
       <Grid container spacing={20}>

                    <Grid item>
                    <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Address Line1
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pAddressLine1}
                    </Box>
                        
                    
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Address Line2
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pAddressLine2}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent City
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pCity}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent State
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.pState}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Pincode
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.Permanent}
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
                    Residential City
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.rCity}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential State
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {currentEmployee?.rState}
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

  const renderPayment = (
    <>
      <CardHeader
        title="Payment"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack direction="row" alignItems="center" sx={{ p: 3, typography: 'body2' }}>
        <Box component="span" sx={{ color: 'text.secondary', flexGrow: 1 }}>
          Phone number
        </Box>

        {payment?.cardNumber}
        <Iconify icon="logos:mastercard" width={24} sx={{ ml: 0.5 }} />
      </Stack>
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

      {/* {renderPayment} */}
    </Card>
  );
}

EmployeeAbout.propTypes = {
  
  delivery: PropTypes.object,
  payment: PropTypes.object,
  shippingAddress: PropTypes.object,
};
