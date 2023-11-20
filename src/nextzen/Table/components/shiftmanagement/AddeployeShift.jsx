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

export default function AddEmployeShift({ currentUser , handleClose }) {
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
    getEmploye()
    getShiftgroupName()
    getShiftName()
  }, [])
  const [isemployeLevel,setIsemployeLevel]=useState(false)
  
  const [employeSwapDetails,setEmployeSwapDetails ] = useState([])
  const [currentEmployeSwapData,setCurrentEmployeSwapData ] = useState({})
  const [currentEmployeSwapData1,setCurrentEmployeSwapData1 ] = useState({})
  const [FromShiftGroup_Name1,setFromShiftGroup_Name1]= useState('')
  const [ToShiftGroup_Name,setToShiftGroup_Name]= useState('')
  const [FromShiftGroup_Name,setFromShiftGroup_Name]= useState('')
  const [ToShiftGroup_Name1,setToShiftGroup_Name1]= useState('')

  const [departmentData,setDepartmentData] =useState([])
  const [CurrentDepartmentData,setCurrentDepartmentData] =useState({})
  const [CurrentShiftGroupNameData,setCurrentShiftGroupNameData] =useState({})
  const [CurrentShiftNameData,setCurrentShiftNameData] =useState({})
  const [designationData,setDesignationData] =useState([])
  const [CurrentDesignationData,setCurrentDesignationData] =useState({})
  const [gradeData,setgradeData] =useState([])
  const [employeData,setEmployeData] =useState([])
  const [ShiftGroupName,setShiftGroupName] =useState([])
  const [ShiftName,setShiftName] =useState([])
  console.log("🚀 ~ file: AddeployeShift.jsx:134 ~ AddEmployeShift ~ ShiftGroupName:", ShiftGroupName)
  console.log("🚀 ~ file: AddeployeShift.jsx:129 ~ AddEmployeShift ~ employeData:", employeData)
  const [CurrentGradeData,setCurrentGradeData] =useState({})
  console.log("🚀 ~ file: AddeployeShift.jsx:140 ~ AddEmployeShift ~ CurrentGradeData:", CurrentGradeData.designationGradeID)
 const [SwitchValue , SetSwitchValue ] = useState('')
  console.log("🚀 ~ file: AddeployeShift.jsx:142 ~ AddEmployeShift ~ SwitchValue:", SwitchValue)
  // const handleToggleChange = ()=>{
  //   setIsemployeLevel(!isemployeLevel) 
  //   if (!isemployeLevel){
  //     SetSwitchValue('0')
  //   }  
  //   if(isemployeLevel){
  //     SetSwitchValue('1')
  //   }
  // }
  const getDepartment = async ()=>{
    try{
    const  data= {
      companyID:localStorage.getItem('companyID'),
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
      companyID:localStorage.getItem('companyID'),
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
  const getEmploye = async (newvalue)=>{
    try{
    const  data= {
      
      companyiD:localStorage.getItem('companyID'),
       
      };
      const response = await instance.post('/getEmployeeIDDetails',data);
      setEmployeData(response.data.data)
      console.log("🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
    }catch(error){
  console.error("Error", error);
  throw error;
    }
  }
  const getShiftgroupName= async (newvalue)=>{
    try{
    const  data= {
      
      companyId:localStorage.getItem('companyID'),
       
      };
      const response = await instance.post('/getShiftGroupName',data);
      setShiftGroupName(response.data.data)
      console.log("🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:", response.data.data)
    }catch(error){
  console.error("Error", error);
  throw error;
    }
  }

  const getShiftName= async (newvalue)=>{
    try{
    const  data= {
      
      companyId:localStorage.getItem('companyID'),
      locationId:30
       
      };
      const response = await instance.post('/getShiftConfig',data);
      setShiftName(response.data.data)
      console.log("🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:", response.data.data)
    }catch(error){
  console.error("Error", error);
  throw error;
    }
  }

  const [currentEmployeData, setCurrentEmployeData] = useState([]);
  const handleSelectEmployeChange = (event, values) => {
    setCurrentEmployeData(values);
     console.log("🚀 ~ file: AddTimeProject.jsx:79 ~ handleSelectEmployeChange ~ values:", values)
    //  setemployeeList ( currentEmployeData[0]?.employeeId);
      
    // setCommaSepaatedEmployeString(EmployeList.join(','))
  };

  

  const join =()=>{
    const arr= []
    for (let i=0;i<currentEmployeData.length;i++){
      arr.push(currentEmployeData[i].employeeID)
    }
return arr
  }

  

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');

    try {
    
      const data = {
        shiftConfigurationId: CurrentShiftNameData?.shiftConfigurationId !== undefined ? parseInt( CurrentShiftNameData?.shiftConfigurationId) : null,
        // ShiftTerm:"weekly",
        shiftGroupName: CurrentShiftGroupNameData?.ShiftGroupName !== undefined ? CurrentShiftGroupNameData?.ShiftGroupName : '',
        supervisorId:'ibm4',
        toggle:SwitchValue !== '' ? parseInt(SwitchValue) : 0,
        departmentId:CurrentDepartmentData?.departmentID !== undefined ? JSON.stringify (CurrentDepartmentData?.departmentID) : '',
        designationId:CurrentDesignationData?.designationID !== undefined ? JSON.stringify( CurrentDesignationData?.designationID) : '',
        DesignationGradeId: CurrentGradeData?.designationGradeID !== undefined ? JSON.stringify(CurrentGradeData.designationGradeID) : '',
        companyId:localStorage.getItem('companyID'),
        employeeId:join(),
        locationId:"30"
      }
          console.log(data, 'data111ugsghghh');
    
          const response = await instance.post('/addShiftDetails', data).then(
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
  // const top100Films = [
  //   { title: 'The Shawshank Redemption', year: 1994 },
  //   { title: 'The Godfather', year: 1972 },
  //   { title: 'The Godfather: Part II', year: 1974 },
  //   { title: 'The Dark Knight', year: 2008 },
  //   { title: '12 Angry Men', year: 1957 },
  // ];
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>

<Grid xs={12} md={12}>
  <Grid sx={{padding:'8px'}}>
    <Typography sx={{marginLeft:'5px'}}>
   Add Employee Shift Here ...
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
     

{/* <RHFSelect name="shiftGroupName" label="Shift Group Name ">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect> */}

<Autocomplete
disablePortal
id="combo-box-dem"
options={ShiftGroupName || []}
value={CurrentShiftGroupNameData?.employeeShiftGroupId}
getOptionLabel={(option) => option.ShiftGroupName}
onChange={(e,newvalue)=>{


setCurrentShiftGroupNameData(newvalue
)
// getDesignation(newvalue)


}}
sx={{
width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
}}
renderInput={(params) => <TextField {...params} label="Select Shift Group Name" />}
/>
{/* <RHFSelect name="Select_Shift" label="Select Shift">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect> */}
<Autocomplete
disablePortal
id="combo-box-dem33"
options={ShiftName || []}
value={CurrentShiftNameData?.shiftConfigurationId}
getOptionLabel={(option) => option.shiftName}
onChange={(e,newvalue)=>{


setCurrentShiftNameData(newvalue
)
// getDesignation(newvalue)


}}
sx={{
width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
}}
renderInput={(params) => <TextField {...params} label="Select Shift  Name" />}
/>

<div style={{ display: 'flex', alignItems: 'center' }}>
                  <Switch checked={isemployeLevel} 
                  // onChange={handleToggleChange} 
                  onChange={() => {
                    setIsemployeLevel(!isemployeLevel);
                    const newSwitchValue = isemployeLevel ? 0 : 1;
                      SetSwitchValue(newSwitchValue);
                  }}
                  />
                  {!isemployeLevel ? <span>Select On Employee</span> : <span>Select On Department</span>}
                </div>
{/* <RHFSelect name="departmentId" label="Select Department">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect> */}
{!isemployeLevel && <Autocomplete
disablePortal
id="combo-box-demo"
options={departmentData || []}
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
/>}
{/* <RHFSelect name="designationId" label="Select Designation">

<option value="full_day" >HR</option>

<option value="first_half" >Manager</option>

<option value="second_half" >Developer</option>

</RHFSelect> */}
{!isemployeLevel && 
<Autocomplete
disablePortal
id="combo-box-demo3"
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
}
{!isemployeLevel && 
<Autocomplete
disablePortal
id="combo-box-demo"
options={gradeData || []}
value={CurrentGradeData?.designationGradeID}
getOptionLabel={(option) => option.designationGradeName}
onChange={(e,newvalue)=>{


setCurrentGradeData(newvalue
)



}}
sx={{
width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
}}
renderInput={(params) => <TextField {...params} label="Select Grade" />}
/>
}
{isemployeLevel && 
<Autocomplete
            multiple
            disablePortal
            id="hfh"
            options={employeData || []}
            value={currentEmployeData}
            getOptionLabel={(option) => option.EmployeeName}
            
            onChange={handleSelectEmployeChange}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label=" Select employee" />}
          />
}

    </Box>

   
        <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Add Employee To Shift'}
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

AddEmployeShift.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
