import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import TextField from '@mui/material/TextField';

import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
// utils
// routes
import { useRouter } from 'src/routes/hooks';
// assets
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFSelect,
} from 'src/components/hook-form';


import { Autocomplete } from '@mui/lab';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import { Button } from '@mui/material';
import instance from 'src/api/BaseURL';

export default function ShiftSwapForm({ currentUser }) {
  const [datesUsed, setDatesUsed] = useState({
    // FromShiftGroup_Name1: dayjs(new Date()),
    // ToShiftGroup_Name: dayjs(new Date()),
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Select_Employe: Yup.string(),
    FromShiftGroup_Name: Yup.string(),
    ToShiftGroup_Name: Yup.string(),
    FromShiftGroup_Name1: Yup.string().required('First Name is Required'),
    Select_Employe1: Yup.string(),
    ToShiftGroup_Name1: Yup.string(),
    start_date: Yup.string(),
    end_date: Yup.string(),


  });

  const [employeSwapDetails,setEmployeSwapDetails ] = useState([])
  const [currentEmployeSwapData,setCurrentEmployeSwapData ] = useState({})
  const [currentEmployeSwapData1,setCurrentEmployeSwapData1 ] = useState({})
  const [FromShiftGroup_Name1,setFromShiftGroup_Name1]= useState('')
  const [ToShiftGroup_Name,setToShiftGroup_Name]= useState('')
  const [FromShiftGroup_Name,setFromShiftGroup_Name]= useState('')
  const [ToShiftGroup_Name1,setToShiftGroup_Name1]= useState('')
  const defaultValues = useMemo(
    () => ({

      Select_Employe: currentUser?.Select_Employe || '',
      FromShiftGroup_Name: currentUser?.FromShiftGroup_Name || '',
      ToShiftGroup_Name: currentUser?.ToShiftGroup_Name || '',
      FromShiftGroup_Name1: currentUser?.FromShiftGroup_Name1 || '',
      Select_Employe1: currentUser?.Select_Employe1 || '',
      ToShiftGroup_Name1: currentUser?.ToShiftGroup_Name1 || '',
      start_date: currentUser?.start_date || '',
      end_date: currentUser?.end_date || '',



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
const Options = [
  {id :"2" , name:"shift A"},
  {id :"3" , name:"shift B"},
  {id :"4" , name:"shift C"},
]


  // Get Employe List 
  const getEmployeSwap = async () => {

    // const data = JSON.stringify({
    //   "company_id": "COMP2",
    //   "from_shift_group": 2,
    //   "to_shift_group": 4,
    //   "search": ""
    // });
    // // const endpoint = 'GetSwpEmployee';
    // const config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: `${instance}${'/GetSwapEmployee'}`,
    //   // url:' http://192.168.1.79:8080/appTest/GetSwapEmployee',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data, // Assuming you have a variable named 'data' defined earlier
    // };

    // axios.request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //     setEmployeSwapDetails(response.data.Data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    try{
   const data = JSON.stringify({
      "company_id": "COMP2",
      "from_shift_group": 2,
      "to_shift_group": 3,
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

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: ShiftSwapForm.jsx:166 ~ onSubmit ~ data:")
    // try {
    //   const data = {
    //     employee_1: {
    //       employee_shift_swap_id: FromShiftGroup_Name1,
    //       new_shift_group_id: ToShiftGroup_Name,
    //       employee_id: currentEmployeSwapData.employee_shift_swap_id,
    //     },
    //     employee_2: {
    //       employee_shift_swap_id: FromShiftGroup_Name,
    //       new_shift_group_id: ToShiftGroup_Name1,
    //       employee_id: currentEmployeSwapData1.employee_shift_swap_id,
    //     },
    //     company_id: "COMP2",
    //     start_date: datesUsed.start_date,
    //     end_date: datesUsed.end_date,
    //   };
  
    //   const response = await instance.post('SwapShift', data1);
  
    //   console.log('success', response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  });
  

  



  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
  ];
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>

<Grid xs={12} md={12}>
  <Grid sx={{ padding: '8px' }}>
    <Typography sx={{ marginLeft: '5px' }}>
      Employee Shift Swap Here ...
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

      {/* <RHFSelect name="FromShiftGroup_Name1" label="From Shift Group Name ">

        <option value="2" >2</option>

        <option value="3" >3</option>

        <option value="4" >4</option>

      </RHFSelect> */}
      <Autocomplete
  // multiple
  disablePortal
  id="combo-box-demo"
  options={Options}
  // value={currentReportingData}
  getOptionLabel={(option) => option.name}
  onChange={(e,newvalue)=>{
   
   
    setFromShiftGroup_Name1(newvalue.id
      
    );
    
   
    // const obj={
    //   company_id:'COMP1',
    //   reporting_manager_id:newvalue?.employee_id
    // }

    // ApiHitDepartment(obj)
    // const timeStampCity = JSON.stringify(new Date().getTime());
    // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
    // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
 
  }}
  // onChange={}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="From Shift Group Name " />}
/>


                      <Autocomplete
  // multiple
  disablePortal
  id="combo-box-demo"
  options={Options || []} 
  // value={currentReportingData}
  getOptionLabel={(option) => option.name}
  onChange={(e,newvalue)=>{
   
   
    setToShiftGroup_Name(newvalue.id
      
    );
    
   
    // const obj={
    //   company_id:'COMP1',
    //   reporting_manager_id:newvalue?.employee_id
    // }

    // ApiHitDepartment(obj)
    // const timeStampCity = JSON.stringify(new Date().getTime());
    // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
    // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
 
  }}
  // onChange={}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="To Shift GroupName" />}
/>

      <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={employeSwapDetails || []}
  value={currentEmployeSwapData?.employee_shift_swap_id}
  getOptionLabel={(option) => option.employee_name}
  onChange={(e,newvalue)=>{
   
   
    setCurrentEmployeSwapData(newvalue
    )
    // const obj={
    //   // companyID:'COMP1',
    //   project_id:newvalue?.project_id
    // }

    // ApiHitDepartment(obj)
    // const timeStampCity = JSON.stringify(new Date().getTime());
    // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
    // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
 
  }}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="Select Employe" />}
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
      
         <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            sx={{ width: '100%', paddingLeft: '3px' }}
            label="End Date"
            value={datesUsed?.end_date}
            defaultValue={dayjs(new Date())}
            onChange={(newValue) => {
              setDatesUsed((prev) => ({
                ...prev,
                end_date: newValue,
              }));
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <br />
      <Stack>
        <Typography>
          Select second Employe To Swap...
        </Typography>
      </Stack>
      <br />
      {/* <RHFSelect name="FromShiftGroup_Name" label="To Shift GroupName">

        <option value="full_day" >Full Day</option>

        <option value="first_half" >First Half</option>

        <option value="second_half" >Second Half</option>

      </RHFSelect> */}

  <Autocomplete
  // multiple
  disablePortal
  id="combo-box-demo"
  options={Options}
  // value={currentReportingData}
  getOptionLabel={(option) => option.name}
  onChange={(e,newvalue)=>{
   
   
    setFromShiftGroup_Name(newvalue.id
      
    );
    
   
    // const obj={
    //   company_id:'COMP1',
    //   reporting_manager_id:newvalue?.employee_id
    // }

    // ApiHitDepartment(obj)
    // const timeStampCity = JSON.stringify(new Date().getTime());
    // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
    // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
 
  }}
  // onChange={}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="From Shift GroupName" />}
/>
  <Autocomplete
  // multiple
  disablePortal
  id="combo-box-demo"
  options={Options}
  // value={currentReportingData}
  getOptionLabel={(option) => option.name}
  onChange={(e,newvalue)=>{
   
   
    setToShiftGroup_Name1(newvalue.id
      
    );
    
   
    // const obj={
    //   company_id:'COMP1',
    //   reporting_manager_id:newvalue?.employee_id
    // }

    // ApiHitDepartment(obj)
    // const timeStampCity = JSON.stringify(new Date().getTime());
    // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
    // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
 
  }}
  // onChange={}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="To Shift GroupName" />}
/>
         <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={employeSwapDetails || []}
  value={currentEmployeSwapData1?.employee_shift_swap_id}
  getOptionLabel={(option) => option.employee_name}
  onChange={(e,newvalue)=>{
   
   
    setCurrentEmployeSwapData1(newvalue
    )
    // const obj={
    //   // companyID:'COMP1',
    //   project_id:newvalue?.project_id
    // }

    // ApiHitDepartment(obj)
    // const timeStampCity = JSON.stringify(new Date().getTime());
    // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
    // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
 
  }}
  sx={{
    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
  }}
  renderInput={(params) => <TextField {...params} label="Select Employe" />}
/>
      {/* <RHFSelect name="Select_Employe1" label="Select Employe">

        <option value="full_day" >Full Day</option>

        <option value="first_half" >First Half</option>

        <option value="second_half" >Second Half</option>

      </RHFSelect> */}

      {/* <RHFSelect name="ToShiftGroup_Name1" label="To Shift GroupName">

        <option value="full_day" >Full Day</option>

        <option value="first_half" >First Half</option>

        <option value="second_half" >Second Half</option>

      </RHFSelect> */}







    </Box>

    <Stack alignItems="flex-end" sx={{ mt: 3, display: "flex", flexDirection: 'row', justifyContent: "flex-end" }}>
      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        {!currentUser ? 'Create User' : 'Swap Shift'}
      </LoadingButton>
      <Button sx={{ backgroundColor: "#d12317", ml: "5px" }}>Cancel</Button>
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
};
