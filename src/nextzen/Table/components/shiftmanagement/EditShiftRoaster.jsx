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
  RHFSelect,
} from 'src/components/hook-form';
import axios from 'axios';

import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import { Autocomplete, Chip, TextField } from '@mui/material';
import instance from 'src/api/BaseURL';
import UserContext from 'src/nextzen/context/user/UserConext';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function EditShiftRoaster({ currentUser, editData, handleClose ,count}) {
  const [ListEMploye,setListEMploye] =useState([])
 

  console.log(
    ' edit data for shift:',
    editData
  );
  console.log(
    '🚀 ~ file: EditShiftRoaster.jsx:47 ~ EditShiftRoaster ~ editData:',
    editData
  );
  const [datesUsed, setDatesUsed] = useState({
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  const router = useRouter();
  const {user} = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    shiftGroupName: Yup.string(),
 
  });

  const defaultValues = useMemo(
    () => ({
      shiftGroupName: currentUser?.shiftGroupName || '',

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
    getDepartment();
    getEmploye();
    getShiftgroupName();
    getShiftName();
  
   
  }, []);
  const [isemployeLevel, setIsemployeLevel] = useState(false);
// const [count , setCount]=useState(0)
  const [employeSwapDetails, setEmployeSwapDetails] = useState([]);
  const [currentEmployeSwapData, setCurrentEmployeSwapData] = useState({});
  const [currentEmployeSwapData1, setCurrentEmployeSwapData1] = useState({});
  const [FromShiftGroup_Name1, setFromShiftGroup_Name1] = useState('');
  const [ToShiftGroup_Name, setToShiftGroup_Name] = useState('');
  const [FromShiftGroup_Name, setFromShiftGroup_Name] = useState('');
  const [ToShiftGroup_Name1, setToShiftGroup_Name1] = useState('');

  const [departmentData, setDepartmentData] = useState([]);
  const [CurrentDepartmentData, setCurrentDepartmentData] = useState({});
  const [CurrentShiftGroupNameData, setCurrentShiftGroupNameData] = useState({});
  const [CurrentShiftNameData, setCurrentShiftNameData] = useState({});
  const [designationData, setDesignationData] = useState([]);
  const [CurrentDesignationData, setCurrentDesignationData] = useState({});
  const [gradeData, setgradeData] = useState([]);
  const [employeData, setEmployeData] = useState([]);
  const [ShiftGroupName, setShiftGroupName] = useState([]);
  const [ShiftName, setShiftName] = useState([]);
  console.log(
    '🚀 ~ file: AddeployeShift.jsx:134 ~ EditShiftRoaster ~ ShiftGroupName:',
    ShiftGroupName
  );
  console.log('🚀 ~ file: AddeployeShift.jsx:129 ~ EditShiftRoaster ~ employeData:', employeData);
  const [CurrentGradeData, setCurrentGradeData] = useState({});
  console.log(
    '🚀 ~ file: AddeployeShift.jsx:140 ~ EditShiftRoaster ~ CurrentGradeData:',
    CurrentGradeData.designationGradeID
  );

  console.log("checking ",ShiftName.find(option => option.shiftConfigurationId == editData?.shiftConfigId) )
  const [ShiftDefault,setShiftDefault]= useState([])
  console.log("🚀 ~ file: EditShiftRoaster.jsx:156 ~ EditShiftRoaster ~ ShiftDefault:", ShiftDefault)
  const [shiftArr,setshiftArr]= useState(null)
  const [foundShift,setfoundShift]=useState([])
  const [foundDepartment,setfountDepartment]=useState([])
  const [fountDesignation,setfountDesignation]=useState([])
  const [fountGrade,setfountGrade]=useState([])
  const [fountEmployee,setfountEmployee]=useState([])
  const[ShiftnameError,setShiftNameError] = useState(false)

  const defaultValueShift = async (value) =>{
    console.log("iama here ")
    await   setfoundShift ( value?.find(option => option?.shiftConfigurationId == editData?.shiftConfigId));
    console.log("🚀 ~ file: EditShiftRoaster.jsx:160 ~ EditShiftRoaster ~ foundShift:", foundShift)

    if (foundShift) {
      setshiftArr(  parseInt(foundShift.shiftConfigurationId));
      // Now you can use shiftConfigurationId as needed
      console.log('1233445:', ShiftName[shiftArr]);
    }

  }

  const defaultDepartment = async (value) =>{
    await setfountDepartment (value?.find(option => option?.departmentID == editData?.departmentId))
  }
  const defaultDesignation = async (value) =>{
    await setfountDesignation (value?.find(option => option?.designationID == editData?.designationID))
  }
  const defaultGrade = async (value) =>{
    await setfountGrade (value?.find(option => option?.designationGradeID == editData?.designationGrade))
  }
  const [EmployeMatching,setEmployeMatching] = useState([])
  const defaultEmployee = async (value) =>{
    setListEMploye(editData?.EmpList)
    // await setfountEmployee (value?.find(option => option?.employeeID == ListEMploye[0]?.empId))
    if(editData?.EmpList.length >0){

       setEmployeMatching (value?.filter(item1 => editData?.EmpList?.some(item2=>item1.employeeID === item2.empId) ))
      console.log("🚀 ~ file: EditShiftRoaster.jsx:171 ~ defaultEmployee ~ EmployeMatching:", EmployeMatching)
     }
    }
  const getDepartment = async () => {
    try {
      const data = {
        companyID: (user?.companyID)?user?.companyID : '',
        locationID: (user?.locationID)?user?.locationID : '',
      };
      const response = await instance.post('/getDepartment', data);
      setDepartmentData(response.data.data);
      if(response?.data?.data){ defaultDepartment(response?.data?.data)}
      if(response?.data?.data){ getDesignation(response?.data?.data)}

      console.log(
        '🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:',
        response.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  const getDesignation = async (newvalue) => {
    try {
      

        const data =  { 
          companyID:  (user?.companyID)?user?.companyID : '',
          departmentID:  (newvalue[0]?.departmentID )? newvalue[0]?.departmentID : fountDesignation  ,
        };
     
      const response = await instance.post('/onboardingDesignation', data);
      setDesignationData(response.data.data);
      if(response?.data?.data){defaultDesignation(response.data.data)}
      if(response?.data?.data){ getGrade(response?.data?.data)}
      console.log(
        '🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:',
        response.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  const getDesignation1 = async (newvalue) => {
    try {
      

        const data =  { 
          companyID:  (user?.companyID)?user?.companyID : '',
          departmentID:  (  newvalue != null  )? newvalue?.departmentID : 0  ,
        };
     
      const response = await instance.post('/onboardingDesignation', data);
      setDesignationData(response.data.data);
      if(response?.data?.data){defaultDesignation(response.data.data)}
      if(response?.data?.data){ getGrade(response?.data?.data)}
      console.log(
        '🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:',
        response.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  const getGrade = async (newvalue) => {
    console.log("🚀 ~ file: EditShiftRoaster.jsx:231 ~ getGrade ~ newvalue:", newvalue) 
   const GradeValue = newvalue?.find(option => option?.designationID == editData?.designationID)
    try {
      const data = {
        designationID:  GradeValue?.designationID,
      };
      const response = await instance.post('/onboardingDesignationGrade', data);
      setgradeData(response.data.data);
      if(response.data.data) {defaultGrade(response.data.data)}
      console.log(
        '🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:',
        response.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  const getGrade1 = async (newvalue) => {
    console.log("🚀 ~ file: EditShiftRoaster.jsx:231 ~ getGrade ~ newvalue:", newvalue) 
  //  const GradeValue = newvalue?.find(option => option?.designationID == editData?.designationID)
    try {
      const data = {
        designationID: (newvalue?.designationID)?newvalue?.designationID:0 ,
      };
      const response = await instance.post('/onboardingDesignationGrade', data);
      setgradeData(response.data.data);
      if(response.data.data) {defaultGrade(response.data.data)}
      
      // if(response.data.data) {defaultGrade(response.data.data)}
      console.log(
        '🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:',
        response.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  const getEmploye = async (newvalue) => {
    try {
      const data = {
        companyiD:(user?.companyID)?user?.companyID : '',
      };
      const response = await instance.post('/getEmployeeIDDetails', data);
      setEmployeData(response.data.data);
      if(response?.data?.data) { defaultEmployee(response?.data?.data)}
      console.log(
        '🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport ~ response.data:',
        response.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  const getShiftgroupName = async (newvalue) => {
    try {
      const data = {
        companyId: (user?.companyID)?user?.companyID : '',
      };
      const response = await instance.post('/getShiftGroupName', data);
      setShiftGroupName(response.data.data);
      console.log(
        '🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:',
        response.data.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  const getShiftName = async (newvalue) => {
    try {
      const data = {
        companyId: (user?.companyID)?user?.companyID : '',
        locationId: (user?.locationID)?user?.locationID : '',
      };
      const response = await instance.post('/getShiftConfig', data);
      setShiftName(response.data.data);
       if(response?.data?.data){ defaultValueShift(response?.data?.data)}
       
      console.log(
        '🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:',
        response.data.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  // const [EmployeMatching, setEmployeMatching] = useState([]);
  const handleSelectEmployeChange = (event, values) => {
    setEmployeMatching(values);
    console.log('🚀 ~ file: AddTimeProject.jsx:79 ~ handleSelectEmployeChange ~ values:', values);
    //  setemployeeList ( EmployeMatching[0]?.employeeId);

    // setCommaSepaatedEmployeString(EmployeList.join(','))
  };

  const join = () => {
    const arr = [];
    for (let i = 0; i < EmployeMatching.length; i++) {
      arr.push(EmployeMatching[i].employeeID);
    }
    return arr;
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv',data);

    try {
      const data = {
        shiftGroupNameId: parseInt(editData?.shiftGroupId),
        shiftConfigurationId: parseInt(foundShift?.shiftConfigurationId),

        // supervisorId: (user?.employeeID)?user?.employeeID : '',
        departmentId: (foundDepartment?.departmentID)?parseInt(foundDepartment?.departmentID) : 0,
        designationId:(fountDesignation?.designationID)? parseInt(fountDesignation?.designationID): 0,
        DesignationGradeId: (fountGrade?.designationGradeID)?parseInt(fountGrade?.designationGradeID): 0,
        // locationId:(user?.locationID)?user?.locationID : null,
        companyId:(user?.companyID)?user?.companyID : '',

        employeeId: join() ,

      };
      console.log(data, 'data111ugsghghh');
    if(foundShift?.shiftConfigurationId === undefined){
      setShiftNameError(true)
    }
    else {
    
      const response = await instance.post('/editShiftDetails', data).then(
        (successData) => {
          count = count + 1
          handleClose();
          enqueueSnackbar(response.data.message, { variant: 'success' });

          console.log('sucess', successData);
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'Error' });

          console.log('lllll', error);
        }
      );
    } }catch (error) {
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
    <div style={{ paddingTop: '0px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading="Edit Employee Shift Here"/>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            {/* <Grid sx={{ padding: '8px' }}>
              <Typography sx={{ marginLeft: '5px' }}>Edit Employee Shift Here</Typography>
            </Grid> */}
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

                {/* <Autocomplete
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
/> */}
                <RHFTextField
                  required
                  value={editData?.shiftGroupName}
                  name="shiftGroupName"
                  label="Shift Group Name "
                  readonly
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
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={(foundShift?.length !== 0)? foundShift : null}
                  getOptionLabel={(option) => option.shiftName}
                  onChange={(e, newvalue) => {
                  setfoundShift(newvalue)
                    // getDesignation(newvalue)
                  }}
                  sx={{
                    width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField 
                    error={ShiftnameError}
                    helperText={(ShiftnameError)? "please select  Shift Name" : ""}
                     {...params} label="Select Shift  Name" />}
                />

                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Switch
                    checked={isemployeLevel}
                    onChange={() => {
                      setIsemployeLevel(!isemployeLevel);
                    }}
                  />
                  {!isemployeLevel ? (
                    <span>Select On Employee</span>
                  ) : (
                    <span>Select On Department</span>
                  )}
                </div> */}
                {/* <RHFSelect name="departmentId" label="Select Department">

<option value="full_day" >Full Day</option>

<option value="first_half" >First Half</option>

<option value="second_half" >Second Half</option>

</RHFSelect> */}
                {editData?.toggle == '0' && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={departmentData || []}
                    value={foundDepartment || [] }
                    getOptionLabel={(option) => option.departmentName}
                    onChange={(e, newvalue) => {
                      setfountDepartment(newvalue);
                     getDesignation1(newvalue);
                    }}
                    editable={false}   // Set editable prop to false
                    freeSolo={false}   // Set freeSolo prop to false
                    disabled  
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Department" />}
                  />
                )}
                {/* <RHFSelect name="designationId" label="Select Designation">

<option value="full_day" >HR</option>

<option value="first_half" >Manager</option>

<option value="second_half" >Developer</option>

</RHFSelect> */}
                {editData?.toggle == '0' && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo3"
                    options={designationData || []}
                    value={fountDesignation || []}
                    getOptionLabel={(option) => option.designationName}
                    onChange={(e, newvalue) => {
                      setfountDesignation(newvalue);
                     getGrade1(newvalue);
                    }}
                    editable={false}   // Set editable prop to false
                    freeSolo={false}   // Set freeSolo prop to false
                    disabled  
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Designation" />}
                  />
                )}
                {editData?.toggle == '0' && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={gradeData || []}
                    value={fountGrade || []}
                    getOptionLabel={(option) => option.designationGradeName}
                    onChange={(e, newvalue) => {
                      setfountGrade(newvalue);
                    }}
                    editable={false}   // Set editable prop to false
                    freeSolo={false}   // Set freeSolo prop to false
                    disabled  
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Grade" />}
                  />
                )}
                                {editData?.toggle == '0' && (
                  <Autocomplete
                    multiple
                    disablePortal
                    id="hfy"
                    options={employeData || []}
                    value={EmployeMatching || []}
                    getOptionLabel={(option) => option.EmployeeName}
                    onChange={handleSelectEmployeChange}
                    // editable={false}   // Set editable prop to false
                    // freeSolo={false}   // Set freeSolo prop to false
                    // disabled  
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField {...params} label=" Select employee" />}
                  />
                )}
                {editData?.toggle == '1' && (
                  <Autocomplete
                    multiple
                    disablePortal
                    id="hfh"
                    options={employeData || []}
                    value={EmployeMatching || []}
                    getOptionLabel={(option) => option.EmployeeName}
                    onChange={handleSelectEmployeChange}
                    // editable={false}   // Set editable prop to false
                    // freeSolo={false}   // Set freeSolo prop to false
                    // disabled  
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
                    }}
                    renderInput={(params) => <TextField {...params} label=" Select employee" />}
                  />
                )}
              </Box>

              <Stack
                alignItems="flex-end"
                sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                <Button sx={{ mr: '5px' }} variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                >
                  {!currentUser ? 'Create User' : 'Save Employe To Shift'}
                </LoadingButton>

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