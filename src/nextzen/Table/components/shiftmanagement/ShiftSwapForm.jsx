import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import { Autocomplete, List, ListItem, TextField } from '@mui/material';
import instance from 'src/api/BaseURL';

export default function ShiftSwapForm({ currentUser , handleClose }) {
  const [datesUsed, setDatesUsed] = useState({
    end_date: dayjs(new Date()),
    start_date: dayjs(new Date()),
    // offer_date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    employee_id: Yup.string(),
    Employe_Name: Yup.string(),
    Project_Name: Yup.string(),
    Activity_Name: Yup.string(),
    Monday: Yup.string(),
    Tuesday: Yup.string(),
    Wednesday: Yup.string(),
    Thursday: Yup.string(),
    Friday: Yup.string(),
    Saturday : Yup.string(),
    Sunday: Yup.string(),
    Total_hours: Yup.string(),
    Comment: Yup.string(),
   
  });

  const defaultValues = useMemo(
    () => ({
   
      employee_id: currentUser?.employee_id || '',
      Employe_Name: currentUser?.Employe_Name || '',
      Project_Name: currentUser?.Project_Name || '',
      Activity_Name: currentUser?.Activity_Name || '',
      Monday: currentUser?.Monday || '',
      Tuesday: currentUser?.Tuesday || '',
      Wednesday: currentUser?.Wednesday || '',
      Thursday: currentUser?.Thursday || '',
      Friday: currentUser?.Friday || '',
      Saturday: currentUser?.Saturday || '',
      Sunday: currentUser?.Sunday || '',
      Total_hours: currentUser?.Total_hours || '',
      Comment: currentUser?.Comment || '',
   
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
  useEffect(() => {
    getEmployeSwap()
  

  }, [])
   const [newShift,setnewShift]= useState(false)
   const [curentShift,setcurentShift]= useState(true)
   const [shiftName,setShiftNames]=useState([])
  const [employeSwapDetails,setEmployeSwapDetails ] = useState([])
  const [ShiftGroupName,setShiftGroupName] =useState([])
  const [ShiftName,setShiftName] =useState([]) 
  const [currentEmployeSwapData,setCurrentEmployeSwapData ] = useState({})
  const [currentEmployeSwapData1,setCurrentEmployeSwapData1 ] = useState({})
  const [FromShiftGroup_Name1,setFromShiftGroup_Name1]= useState('')
  const [ToShiftGroup_Name,setToShiftGroup_Name]= useState('')
  console.log("🚀 ~ file: ShiftSwapForm.jsx:121 ~ ShiftSwapForm ~ ToShiftGroup_Name:", ToShiftGroup_Name)
  const [FromShiftGroup_Name,setFromShiftGroup_Name]= useState('')
  const [ToShiftGroup_Name1,setToShiftGroup_Name1]= useState('')
  useEffect(() => {
    getShiftGroupName()
    // getShiftName()
  }, [])
  const getEmployeSwap = async ( toGroup,fromGroup) => {
  if(fromGroup?.employeeShiftGroupId !== undefined && toGroup?.employeeShiftGroupId !== undefined){

   
   try{
   const data = JSON.stringify({
      "company_id": localStorage.getItem('companyID'),
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
  const getEmployeSwap1 = async ( toGroup,fromGroup) => {
  if(fromGroup?.employeeShiftGroupId !== undefined && toGroup?.employeeShiftGroupId !== undefined){

   
   try{
   const data = JSON.stringify({
      "company_id":localStorage.getItem('companyID'),
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
      companyId:"CDAC1",
      locationId:43,
      supervisorId:"CDAC_01",
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
    
  const data = {
    "employee_1":{
      "employee_shift_swap_id":parseInt (FromShiftGroup_Name1?.employeeShiftGroupId),
      "new_shift_group_id":parseInt(ToShiftGroup_Name.employeeShiftGroupId),
      "employee_id":   currentEmployeSwapData?.employee_shift_swap_id ? currentEmployeSwapData?.employee_shift_swap_id : '',
    },
    "employee_2":{
      "employee_shift_swap_id":parseInt(FromShiftGroup_Name.employeeShiftGroupId),
      "new_shift_group_id":parseInt(ToShiftGroup_Name1.employeeShiftGroupId),
      "employee_id":  currentEmployeSwapData1?.employee_shift_swap_id ?  currentEmployeSwapData1?.employee_shift_swap_id :'',
    },
    "company_id":localStorage.getItem('companyID'),
    "start_date": formatDateToYYYYMMDD (datesUsed.start_date),
    "end_date":formatDateToYYYYMMDD (datesUsed.end_date),
    
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
  const Options = [
    {id :"2" , name:"shift A"},
    {id :"3" , name:"shift B"},
    {id :"4" , name:"shift C"},
  ]

  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>

<Grid xs={12} md={12}>
  <Grid sx={{ padding: '8px' }}>
    <Typography sx={{ marginLeft: '5px' }}>
      Employee Shift Swap Here
    </Typography>
  </Grid>
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
  value={currentEmployeSwapData?.employee_shift_swap_id}
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
  value={currentEmployeSwapData?.employeeShiftGroupId}
  getOptionLabel={(option) => `${option.shiftGroupName} (${option.startTime} - ${option.end_Time})`}
  onChange={(e,newvalue)=>{
   
   
    setCurrentEmployeSwapData(newvalue
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

      <RHFTextField   name="comment" label="Comments " />   
  { curentShift &&    <Grid>
      <Typography>
        Current Shift Details
        </Typography> 
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} disablePadding >
            <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "1px solid #ccc" }}>1</span>
            <span style={{ display:"flex", minWidth: "100px",alignItems:"center", justifyContent:"center",alignContent:"center",  border: "1px solid #ccc" }}>2</span>
          </ListItem>
        );
      })}
    </List>
        </Grid>}
{ newShift &&      <Grid>
      <Typography>
        New Shift Details
        </Typography> 
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} disablePadding>
            <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "1px solid #ccc" }}>1</span>
            <span style={{ display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", border: "1px solid #ccc" }}>2</span>
          </ListItem>
        );
      })}
    </List>
        </Grid>}

    </Box>
    <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Swap Shift'}
                </LoadingButton>
                <Button  sx={{ml:"5px"}} onClick={handleClose}>Cancel</Button>
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
