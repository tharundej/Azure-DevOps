
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

export default function Statoury({  delivery, shippingAddress, payment,employeeIDForApis }) {
  const employeeIDToCreate=employeeIDForApis
  const [endpoint,setEndpoint]=useState("")
  const [statouryCreateOpen,setStatouryCreateOpen]=useState(false);
  const [employeeStatouryData,setEmployeeStatouryData]=useState({})
  const [dataToCreateOrEdit,setDataForCreateOrEdit]=useState({})
    const [open,setOpen]=useState(false);
    const handleEdit=()=>{
      setEndpoint("/updateStatutoryDetails");
      setDataForCreateOrEdit(employeeStatouryData)
      console.log('0p',dataToCreateOrEdit)
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
        "employeeID": employeeIDForApis
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/getStatutoryDetailsEmployee`,
        headers: { 
         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1MjcxMTEsInJhbmRvbSI6Nzk5MjR9.f4v9qRoF8PInZjvNmB0k2VDVunDRdJkcmE99qZHZaDA',
           
          'Content-Type': 'application/json'
        },
        data : data1
        };

        axios.request(config)
        .then((response) => {
        // console.log(JSON.stringify(response.data));
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
   
    
  },[])

  const handleChange=(e,field)=>{
 
}

 const handleAddStatuory=()=>{
  setDataForCreateOrEdit(dataa)
  setEndpoint("/addStatutoryDetails");
  
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
            setEndpoint("updateStatutoryDetails");
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
        <Grid sx={{cursor: "pointer"}} onClick={()=>{
            console.log('handle clickeddd')
            handleEdit()
          }} item>
        {/* <Iconify 
        
          
        icon="solar:pen-bold" /> */}
        <Button>Edit</Button>

        </Grid>
    </Grid>
     
      <Grid container spacing={{ xs: 5, sm: 5, lg: 20 ,md:5}}>

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
          Account Holder Name
          </Box>
          <Box component="span" sx={{ color: 'text.secondary', maxWidth: 120, flexShrink: 0,fontWeight:'Bold' }}>
          {employeeStatouryData?.accountHolderName}
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
          {employeeStatouryData?.bankAccountNumber}
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
          LWF Number
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

 

 

  const dataa= {
    "companyID": "",
    "employeeID": "",
    "employeeName": "",
    "uan": undefined,
    "pfType": "",
    "pfNumber": undefined,
    "esicNumber": undefined,
    "ptNumber": undefined,
    "lwfNumber": "",
    "panNumber": "",
    "aadharNumber": "",
    "passportNumber": "",
    "accountNumber": undefined,
    "accountHolderName": "",
    "bankName": "",
    "ifscCode": "",
    "bankBranch": ""
}


  return (
    <>
    {/* < StatouryForm  open={statouryCreateOpen} onHandleClose={handleStatouryCreateClose} currentUser={{}}/> */}
    <StatouryForm callApi={getEmployeeStattuory}open={statouryCreateOpen} employeeIDToCreate={employeeIDToCreate} onHandleClose={handleStatouryCreateClose} currentUserData={employeeStatouryData} endpoint={endpoint} employeeIDForApis={employeeIDForApis}/>

    {employeeStatouryData?.accountHolderName===""   && 
    
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
  employeeIDForApis:PropTypes.string
};
