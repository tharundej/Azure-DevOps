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
  RHFSelect,
} from 'src/components/hook-form';
import axios from 'axios';

import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import { Autocomplete, Chip, TextField } from '@mui/material';
import instance from 'src/api/BaseURL';

export default function EditShiftRoaster({ currentUser , handleClose ,editData }) {
  console.log("🚀 ~ file: EditShiftRoaster.jsx:47 ~ EditShiftRoaster ~ editData:", editData)
  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
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
    getDepartment()
  }, [])

  const [employeSwapDetails,setEmployeSwapDetails ] = useState([])
  const [currentEmployeSwapData,setCurrentEmployeSwapData ] = useState({})
  const [currentEmployeSwapData1,setCurrentEmployeSwapData1 ] = useState({})
  const [FromShiftGroup_Name1,setFromShiftGroup_Name1]= useState('')
  const [ToShiftGroup_Name,setToShiftGroup_Name]= useState('')
  const [FromShiftGroup_Name,setFromShiftGroup_Name]= useState('')
  const [ToShiftGroup_Name1,setToShiftGroup_Name1]= useState('')

  const [departmentData,setDepartmentData] =useState([])
  const [CurrentDepartmentData,setCurrentDepartmentData] =useState({})
  const [designationData,setDesignationData] =useState([])
  const [CurrentDesignationData,setCurrentDesignationData] =useState({})
  const [gradeData,setgradeData] =useState([])
  const [CurrentGradeData,setCurrentGradeData] =useState({})


  const getDepartment = async ()=>{
    try{
    const  data= {
      companyID:'COMP1',
        locationID: 30,
       
      };
      const response = await instance.post('/onboardingDepartment',data);
      setDepartmentData(response.data.data)
      console.log("🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
    }catch(error){
  console.error("Error", error);
  throw error;
    }
  }


  const getDesignation = async (newvalue)=>{
    try{
    const  data= {
      companyID:'COMP1',
      departmentID: newvalue.departmentID,
       
      };
      const response = await instance.post('/onboardingDesignation',data);
      setDesignationData(response.data.data)
      console.log("🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
    }catch(error){
  console.error("Error", error);
  throw error;
    }
  }

  const getGrade = async (newvalue)=>{
    try{
    const  data= {
      
      designationID: newvalue.designationID,
       
      };
      const response = await instance.post('/onboardingDesignationGrade',data);
      setgradeData(response.data.data)
      console.log("🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
    }catch(error){
  console.error("Error", error);
  throw error;
    }
  }


  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');

    try {
    
      const data = {
        shiftConfigurationId:3,
        ShiftTerm:"weekly",
        shiftGroupName:'shift D',
        supervisorId:'ibm4',
        departmentId: JSON.stringify (CurrentDepartmentData.departmentID),
        designationId:JSON.stringify( CurrentDesignationData.designationID),
        DesignationGradeId:"", //JSON.stringify(CurrentGradeData.designationGradeID),
        companyId:'COMP2',
        employeeId:["ibm8"]
      }
          console.log(data, 'data111ugsghghh');
    
          const response = await instance.post('/addShiftDetails', data).then(
            (successData) => {
              enqueueSnackbar(response.data.message,{variant:'success'})
    
              console.log('sucess', successData);
              handleClose()
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
//   const defaultDesignationValue = editData.
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
  <Grid sx={{padding:'8px'}}>
    <Typography sx={{marginLeft:'5px'}}>
   Edit Employee Shift Here ...
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
     

<RHFSelect name="shiftGroupName" label="Shift Group Name " >

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect>


<RHFSelect name="Select_Shift" label="Select Shift">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect>


{/* <RHFSelect name="departmentId" label="Select Department">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect> */}
<Autocomplete
disablePortal
id="combo-box-demo"
options={departmentData || []}
// defaultValue={defaultDesignationValue|| []}
value={CurrentDepartmentData?.departmentID}
getOptionLabel={(option) => option.departmentName}
onChange={(e,newvalue)=>{


setCurrentDepartmentData(newvalue
)
getDesignation(newvalue)


}}
sx={{
width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
}}
renderInput={(params) => <TextField {...params} label="Select Department" />}
/>
{/* <RHFSelect name="designationId" label="Select Designation">

<option value="full_day" >HR</option>

<option value="first_half" >Manager</option>

<option value="second_half" >Developer</option>

</RHFSelect> */}
<Autocomplete
disablePortal
id="combo-box-demo"
options={designationData || []}
value={CurrentDesignationData?.designationID}
getOptionLabel={(option) => option.designationName}
onChange={(e,newvalue)=>{


setCurrentDesignationData(newvalue
)
getGrade(newvalue)


}}
sx={{
width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
}}
renderInput={(params) => <TextField {...params} label="Select Designation" />}
/>
{/* <RHFSelect name="DesignationGradeId" label="Select Grade">

<option value="full_day" >HR</option>

<option value="first_half" >Manager</option>

<option value="second_half" >Developer</option>

</RHFSelect> */}
<Autocomplete
disablePortal
id="combo-box-demo"
options={gradeData || []}
value={CurrentGradeData?.designationGradeID}
getOptionLabel={(option) => option.designationGradeName}
onChange={(e,newvalue)=>{


setCurrentGradeData(newvalue
)
// getGrade(newvalue)


}}
sx={{
width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
}}
renderInput={(params) => <TextField {...params} label="Select Designation" />}
/>

<Autocomplete

multiple

id="Primary Skills"

options={top100Films.map((option) => option.title)}

freeSolo


renderTags={(value1, getTagProps) =>

value1.map((option, index1) => (

<Chip variant="outlined" label={option} {...getTagProps({ index1 })} />

))

}

renderInput={(params) => (

<TextField

{...params}

variant="filled"

label="Select Employe"

placeholder="Favorites"

/>

)}

/>
    </Box>

    <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        {!currentUser ? 'Create User' : 'Add  Employe To Shift'}
      </LoadingButton>
      <Button sx={{backgroundColor:"#d12317",ml:"5px"}} onClick={console.log("first")}>Cancel</Button>
    </Stack>
    
   
  </Card>
</Grid>
</Grid>
      </FormProvider>
    </div>
  );
}

EditShiftRoaster.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
