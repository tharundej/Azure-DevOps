import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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

import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import { Autocomplete, List, ListItem, TextField } from '@mui/material';
import instance from 'src/api/BaseURL';
import UserContext from 'src/nextzen/context/user/UserConext';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function ShiftSwapForm({ currentUser , handleClose }) {
  const [datesUsed, setDatesUsed] = useState({
    // end_date: dayjs(new Date()),
    start_date: dayjs(new Date()),
    // offer_date: dayjs(new Date()),
  });
  const router = useRouter();
  const {user}= useContext(UserContext)

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
   
    comment: Yup.string(),
   
  });

  const defaultValues = useMemo(
    () => ({
   
      
      comment: currentUser?.comment || '',
   
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

   const [newShift,setnewShift]= useState(false)
   const [curentShift,setcurentShift]= useState(false)
   const [shiftName,setShiftNames]=useState([])
  const [employeSwapDetails,setEmployeSwapDetails ] = useState([])
  const [ShiftGroupName,setShiftGroupName] =useState([])
  const [ShiftName,setShiftName] =useState([]) 
  const [currentEmployeSwapData,setCurrentEmployeSwapData ] = useState({})
  const [currentShiftGroupData,setcurrentShiftGroupData ] = useState({})
  const [FromShiftGroup_Name1,setFromShiftGroup_Name1]= useState('')
  const [ToShiftGroup_Name,setToShiftGroup_Name]= useState('')
  console.log("🚀 ~ file: ShiftSwapForm.jsx:121 ~ ShiftSwapForm ~ ToShiftGroup_Name:", ToShiftGroup_Name)
  const [FromShiftGroup_Name,setFromShiftGroup_Name]= useState('')
  const [ToShiftGroup_Name1,setToShiftGroup_Name1]= useState('')
  useEffect(() => {
    getShiftGroupName()
    getEmployeSwap()
    // getShiftName()
  }, [])
  const getEmployeSwap = async ( toGroup,fromGroup) => {
  // if(fromGroup?.employeeShiftGroupId !== undefined && toGroup?.employeeShiftGroupId !== undefined){

   
   try{
   const data = JSON.stringify({
      "company_id": (user?.companyID)?user?.companyID:'',
        "supervisor_id" :(user?.employeeID)?user?.employeeID:'',
      "search": ""
    });
        const response = await instance.post('/GetSwapEmployee',data);
        setEmployeSwapDetails(response.data.Data)
        
        console.log("🚀 ~ file: AddTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
      }catch(error){
    console.error("Error", error);
    throw error;
      }
    // }
  }
  const getEmployeSwap1 = async ( toGroup,fromGroup) => {
  if(fromGroup?.employeeShiftGroupId !== undefined && toGroup?.employeeShiftGroupId !== undefined){

   
   try{
   const data = JSON.stringify({
      "company_id":(user?.companyID)?user?.companyID:'',
      "from_shift_group":parseInt (fromGroup?.employeeShiftGroupId),
      "to_shift_group":parseInt (toGroup?.employeeShiftGroupId),
      "search": ""
    });
        const response = await instance.post('/GetSwapEmployee',data);
        setEmployeSwapDetails(response.data.Data)
        
        console.log("🚀 ~ file: AddTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
      }catch(error){
    console.error("Error", error);
    throw error;
      }
    }
  }
  // const getShiftgroupName= async (newvalue)=>{
  //   try{
  //   const  data= {
      
  //     companyId:localStorage.getItem('companyID'),
       
  //     };
  //     const response = await instance.post('/getShiftGroupName',data);
  //     setShiftGroupName(response.data.data)
  //     console.log("🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:", response.data.data)
  //   }catch(error){
  // console.error("Error", error);
  // throw error;
  //   }
  // }
  const getShiftGroupName= async ()=>{
    try{
    const  data= {
      companyId:(user?.companyID)?user?.companyID:'',
      locationId:(user?.locationID)?user?.locationID:'',
      supervisorId:(user?.employeeID)?user?.employeeID:'',
      };
      const response = await instance.post('/getShiftGroupName',data);
      setShiftGroupName(response.data.data)
      console.log("🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:", response.data.data)
    }catch(error){
  console.error("Error", error);
  throw error;
    }
  }



  // const getShiftName= async (newvalue)=>{
  //   try{
  //   const  data= {
      
  //     companyId:"COMP2",
  //     locationId:32
       
  //     };
  //     const response = await instance.post('/getShiftConfig',data);
  //     setShiftName(response.data.data)
  //     console.log("🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:", response.data.data)
  //   }catch(error){
  // console.error("Error", error);
  // throw error;
  //   }
  // }

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');

    try {
    
  // const data = {
  //   "employee_1":{
  //     "employee_shift_swap_id":parseInt (FromShiftGroup_Name1?.employeeShiftGroupId),
  //     "new_shift_group_id":parseInt(ToShiftGroup_Name.employeeShiftGroupId),
  //     "employee_id":   currentEmployeSwapData?.employee_shift_swap_id ? currentEmployeSwapData?.employee_shift_swap_id : '',
  //   },
  //   "employee_2":{
  //     "employee_shift_swap_id":parseInt(FromShiftGroup_Name.employeeShiftGroupId),
  //     "new_shift_group_id":parseInt(ToShiftGroup_Name1.employeeShiftGroupId),
  //     "employee_id":  currentEmployeSwapData1?.employee_shift_swap_id ?  currentEmployeSwapData1?.employee_shift_swap_id :'',
  //   },
  //   "company_id":(user?.companyID)?user?.companyID:'',
  //   "start_date": formatDateToYYYYMMDD (datesUsed.start_date),
  //   "end_date":formatDateToYYYYMMDD (datesUsed.end_date),
    
  // }
  const data ={
    employee_id:currentEmployeSwapData?.employee_id,
    approver_id: (user?.employeeID)? user?.employeeID : '',
    company_id: (user?.companyID)? user?.companyID : '',
    current_shift_group_id:parseInt(currentEmployeSwapData?.shift_group_id),
    new_shift_group_id:parseInt(currentShiftGroupData?.employeeShiftGroupId),
    start_date:formatDateToYYYYMMDD (datesUsed.start_date),
    comment:Comment,
  }
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('/SwapShift', data).then(
        (successData) => {
          handleClose()
          enqueueSnackbar(response.data.message,{variant:'success'})

          console.log('sucess', successData);
        },
        (error) => {
          enqueueSnackbar(error.message,{variant:'Error'})

          console.log('lllll', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
  // const Options = [
  //   {id :"2" , name:"shift A"},
  //   {id :"3" , name:"shift B"},
  //   {id :"4" , name:"shift C"},
  // ]
  const [Comment,setComment]=useState('')
  const handleComment = (event)=>{
    setComment(event.target.value)
    }

  return (
    <div style={{ paddingTop: '0px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading="Employee Shift Swap "/>
      <Grid container spacing={3}>

<Grid xs={12} md={12}>

  <Card sx={{ p: 3 }}>
    <Box
      rowGap={1}
      columnGap={1}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
      }}
    >

   







      <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={employeSwapDetails || []}
  value={currentEmployeSwapData?.employee_id}
  getOptionLabel={(option) => option.employee_name}
  onChange={(e,newvalue)=>{
   
   
    setCurrentEmployeSwapData(newvalue
    )
    setcurentShift(true)
 
  }}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="Select Employe" />}
/>
      <Autocomplete
  disablePortal
  id="combo-boxSelectshift"
  options={ShiftGroupName || []}
  value={currentShiftGroupData?.employeeShiftGroupId}
  getOptionLabel={(option) => `${option.shiftGroupName} (${option.startTime} - ${option.end_Time})`}
  onChange={(e,newvalue)=>{
   
   
    setcurrentShiftGroupData(newvalue
    )
    setnewShift(true)
 
  }}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="To Shift Name" />}
/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            sx={{ width: '100%', paddingLeft: '3px' }}
            label="Start Date"
            value={datesUsed?.start_date}
            defaultValue={dayjs(new Date())}
            onChange={(newValue) => {
              setDatesUsed((prev) => ({
                ...prev,
                start_date: newValue,
              }));
            }}
          />
        </DemoContainer>
      </LocalizationProvider>   

      <RHFTextField  name="comment" label="Comments " value={Comment}  onChange={handleComment}/>   
  { curentShift &&    <Grid>
      <Typography >
        Current Shift Details
        </Typography> 
        <List sx={{ width: '100%',border: "1px solid #ccc",  maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem
        disablePadding
        sx={{
          border: '0px solid #ccc', // Add your border style
          // borderRadius: '8px',    // Add your border radius
          // padding: '8px',          // Add your padding
          marginBottom: '8px',     // Add your margin
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Display specific name and value */}
        <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }}>
          {`Shift GroupName`}
        </span>

        {/* Display Shift Name */}
        <span  style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }} >
          {currentEmployeSwapData?.shift_group}
        </span>
        
        {/* Add more concatenated strings for other name-value pairs as needed */}
      </ListItem>
      <ListItem
          sx={{
            border: '0px solid #ccc', // Add your border style
            // borderRadius: '8px',    // Add your border radius
            // padding: '8px',          // Add your padding
            marginBottom: '8px',     // Add your margin
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        disablePadding

      >
              <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }}>
          {`Shift Name`}
        </span>

        {/* Display Shift Name */}
        <span  style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }} >
          {currentEmployeSwapData?.shift_name}
        </span>
    
      </ListItem>
      <ListItem
          sx={{
            border: '0px solid #ccc', // Add your border style
            // borderRadius: '8px',    // Add your border radius
            // padding: '8px',          // Add your padding
            marginBottom: '8px',     // Add your margin
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        disablePadding

      >
              <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }}>
          {`Start Time`}
        </span>

        {/* Display Shift Name */}
        <span  style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }} >
          {currentEmployeSwapData?.start_time}
        </span>
    
      </ListItem>
      <ListItem
          sx={{
            border: '0px solid #ccc', // Add your border style
            // borderRadius: '8px',    // Add your border radius
            // padding: '8px',          // Add your padding
            marginBottom: '8px',     // Add your margin
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        disablePadding

      >
              <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }}>
          {`End Time`}
        </span>

        {/* Display Shift Name */}
        <span  style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }} >
          {currentEmployeSwapData?.end_time}
        </span>
    
      </ListItem>
    </List>
        </Grid>}
{ newShift &&      <Grid>
      <Typography>
        New Shift Details
        </Typography> 
        <List sx={{ width: '100%',border: "1px solid #ccc",  maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem
        disablePadding
        sx={{
          border: '0px solid #ccc', // Add your border style
          // borderRadius: '8px',    // Add your border radius
          // padding: '8px',          // Add your padding
          marginBottom: '8px',     // Add your margin
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Display specific name and value */}
        <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }}>
          {`Shift GroupName`}
        </span>

        {/* Display Shift Name */}
        <span  style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }} >
          {currentShiftGroupData?.shiftGroupName}
        </span>
        
        {/* Add more concatenated strings for other name-value pairs as needed */}
      </ListItem>
      <ListItem
          sx={{
            border: '0px solid #ccc', // Add your border style
            // borderRadius: '8px',    // Add your border radius
            // padding: '8px',          // Add your padding
            marginBottom: '8px',     // Add your margin
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        disablePadding

      >
              <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }}>
          {`Shift Name`}
        </span>

        {/* Display Shift Name */}
        <span  style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }} >
          {currentShiftGroupData?.shiftName}
        </span>
    
      </ListItem>
      <ListItem
          sx={{
            border: '0px solid #ccc', // Add your border style
            // borderRadius: '8px',    // Add your border radius
            // padding: '8px',          // Add your padding
            marginBottom: '8px',     // Add your margin
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        disablePadding

      >
              <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }}>
          {`Start Time`}
        </span>

        {/* Display Shift Name */}
        <span  style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }} >
          {currentShiftGroupData?.startTime}
        </span>
    
      </ListItem>
      <ListItem
          sx={{
            border: '0px solid #ccc', // Add your border style
            // borderRadius: '8px',    // Add your border radius
            // padding: '8px',          // Add your padding
            marginBottom: '8px',     // Add your margin
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        disablePadding

      >
              <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }}>
          {`End Time`}
        </span>

        {/* Display Shift Name */}
        <span  style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "0px solid #ccc" }} >
          {currentShiftGroupData?.end_Time}
        </span>
    
      </ListItem>
    </List>  
        </Grid>}

    </Box>
    <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>

                <Button  variant="outlined"  sx={{mr:"5px"}} onClick={handleClose}>Cancel</Button>
                <LoadingButton type="submit" variant="contained"   sx={{backgroundColor:'#3B82F6'}} color="primary" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Swap Shift'}
                </LoadingButton>
              </Stack>
  </Card>

</Grid>
</Grid>
      </FormProvider>
    </div>
  );
}

ShiftSwapForm.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
