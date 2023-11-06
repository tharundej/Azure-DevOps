
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
import EmployeeAboutEdit from '../employeeabout/EmployeeAboutEdit';

import { baseUrl } from 'src/nextzen/global/BaseUrl';

import StatouryForm  from '../../statoury/StatouryForm';



// ----------------------------------------------------------------------

export default function Statoury({  delivery, shippingAddress, payment }) {

  const [statouryCreateOpen,setStatouryCreateOpen]=useState(false);
  const [employeeStatouryData,setEmployeeStatouryData]=useState({})
    const [open,setOpen]=useState(false);
    const handleEdit=()=>{
      setStatouryCreateOpen(true);
    }
    const handleEditClose=()=>{
        setOpen(false);
        
    }
    const handleStatouryCreateClose=()=>{
      setStatouryCreateOpen(false);
      
  }

  const getEmployeeStattuory=()=>{
  
        let data1 = JSON.stringify({
        "employeeID": "info7"
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://vshhg43l-3001.inc1.devtunnels.ms/erp/getStatutoryDetailsEmployee',
        headers: { 
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
          'Content-Type': 'application/json'
        },
        data : data1
        };

        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        setEmployeeStatouryData(response.data.data)
        })
        .catch((error) => {
        console.log(error);
        });

  }
  //   const employeeStatouryData={
  //     "companyID": "COMP1",
  //     "employeeID": "info1",
  //     "employeeName": "nikitha v",
  //     "uan": 123456789,
  //     "pfType": "Kerela",
  //     "pfNumber": 98765,
  //     "esicNumber": 1234567890,
  //     "ptNumber": 54321,
  //     "lwfNumber": "LWF123",
  //     "panNumber": "ABCDE1234F",
  //     "aadharNumber": "123456789012",
  //     "passportNumber": "AB123456",
  //     "accountNumber": 9876543210,
  //     "accountHolderName": "John Doe",
  //     "bankName": "Example Bank",
  //     "ifscCode": "EXMP1234567",
  //     "bankBranch": "Main Branch"
  // }

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

   
    getEmployeeStattuory()
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleChange=(e,field)=>{
 
}

 const handleAddStatuory=()=>{
  setStatouryCreateOpen(true)
 }
 
  const renderCustomer = (
    <>
   
    <Grid padding="5px" container flexDirection="row" alignItems="center" justifyContent="space-between"> 
      <Grid item>
        <Grid container flexDirection="row" spacing={1} alignItems="center"  >
          <Grid  item>
          <Typography sx={{paddingLeft:'10px'}} variant='h5'>Organisation Info</Typography>
          </Grid>
      
      </Grid>
      </Grid>

      <Grid item>
        {!edit && <Iconify 
        sx={{cursor: "pointer",color:'orange'}}
          onClick={()=>{
            
            setEdit(true);
          }}
        icon="solar:pen-bold" />}

        {edit &&
        <Grid container flexDirection="row" spacing={1}>
          <Grid item>
          <Iconify 
           sx={{cursor: "pointer",color:'orange'}}
          onClick={()=>{

           

            // console.log(bunkDataEdit,'bunkDataEdit');

            
           
            setEdit(false);
          }}
        icon="material-symbols:save" />

          </Grid>
          <Grid item>
          <Iconify 
           sx={{cursor: "pointer",color:'orange'}}
          onClick={()=>{
            bunkDataEdit.is_active=bunkData.is_active;
            setEdit(false);
          }}
        icon="basil:cancel-solid" />
          </Grid>

        </Grid>
        }
       
        
        </Grid>

</Grid>
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar
          alt={bunkData?.bunk_name}
          src={bunkData.avatarUrl}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
         
         
          <Typography variant="subtitle2">
            
            {!edit && bunkData?.bunk_name}</Typography>
            {edit &&
            <TextField
           
           variant="outlined"
           color="primary"
           style={{ marginBottom: '4px' }}
           onChange={(e)=>{handleChange(e,'bunk_name')}}
           value={bunkDataEdit?.bunk_name}
           
           InputProps={{
             style: {
               color: 'orange',
               fontWeight: 'bold'
             }
           }}
         />}



          <Box sx={{ color: 'text.secondary' }}>
            
            {!edit && bunkData?.owner_name}
            {edit &&
            <TextField
           
           variant="outlined"
           color="primary"
           style={{ marginBottom: '4px' }}
           onChange={(e)=>{handleChange(e,'owner_name')}}
           value={bunkDataEdit?.owner_name}
           
           InputProps={{
             style: {
               color: 'orange',
               fontWeight: 'bold'
             }
           }}
         />}
          
          </Box>

          <Box>
           
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {!edit && bunkData?.gstin}
              {edit &&
            <TextField
           
           variant="outlined"
           color="primary"
           style={{ marginBottom: '4px' }}
           onChange={(e)=>{handleChange(e,'gstin')}}
           value={bunkDataEdit?.gstin}
           
           InputProps={{
             style: {
               color: 'orange',
               fontWeight: 'bold'
             }
           }}
         />}
            </Box>
          </Box>

          {/* <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ mt: 1 }}
          >
            Add to Blacklist
          </Button> */}
        </Stack>
      </Stack>
    </>
  );


 

  


  
  
  
 
  

  

  
  
  const renderAbout = (
    <>
    
    <Grid sx={{padding:'10px'}} container alignItems="center"  justifyContent="space-between">
        <Grid item>
        <Typography variant='h5' component="body">Statoury Information</Typography>

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
          Aadhar Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.aadharNumber}
          </Box>
               
         
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Pan Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.panNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Passport Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.passportNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Accountholder Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', maxWidth: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.accountholderName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Bank Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.bankName}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          Bank Branch
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.bankBranch}
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
          Bank Account Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.accountNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          IFSC Code
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.ifscCode}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          PF Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.pfNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          ESIC Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.esicNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          PT Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.ptNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          lwf Number
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.lwfNumber}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
          UAN
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.uan}
          </Box>
        </Stack>
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
                    {employeeStatouryData?.pAddressLine1}
                    </Box>
                        
                    
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Address Line2
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {employeeStatouryData?.pAddressLine2}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent City
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {employeeStatouryData?.pCity}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent State
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {employeeStatouryData?.pState}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Permanent Pincode
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {employeeStatouryData?.Permanent}
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
                    {employeeStatouryData?.rAddressLine1}
                    </Box>
                        
                    
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential Address Line2
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {employeeStatouryData?.rAddressLine2}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential City
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {employeeStatouryData?.rCity}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential State
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {employeeStatouryData?.rState}
                    </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
                    Residential Pincode
                    </Box>
                    <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0,fontWeight:'Bold' }}>
                    {employeeStatouryData?.rPincode}
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
    <>
    {/* < StatouryForm  open={statouryCreateOpen} onHandleClose={handleStatouryCreateClose} currentUser={{}}/> */}
    <StatouryForm open={statouryCreateOpen} onHandleClose={handleStatouryCreateClose} currentUser={employeeStatouryData} employeeIDToCreate="info7" />

    {employeeStatouryData.accountHolderName==="" && 
    
        <Grid container alignItems="center" justifyContent="flex-end" >
          <Grid alignSelf='flex-end' item>
          <Button 
           onClick={handleAddStatuory}
          >+Add Statoury</Button>
          </Grid>
        </Grid>
        }
        
    <Card sx={{ marginTop: '30px' }}>
      {/* {renderCustomer} */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderAbout}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* {renderShipping}

      <Divider sx={{ borderStyle: 'dashed' }} /> */}

      {/* {renderPayment} */}
    </Card>
    </>
  );
}

Statoury.propTypes = {
  
  delivery: PropTypes.object,
  payment: PropTypes.object,
  shippingAddress: PropTypes.object,
};
