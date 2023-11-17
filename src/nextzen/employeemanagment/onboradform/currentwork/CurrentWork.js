import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState ,forwardRef,useImperativeHandle,useEffect} from 'react';
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
import { Autocomplete,TextField } from '@mui/material';
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

import {
    _roles,
    JOB_SKILL_OPTIONS,
    JOB_BENEFIT_OPTIONS,
    JOB_EXPERIENCE_OPTIONS,
    JOB_EMPLOYMENT_TYPE_OPTIONS,
    JOB_WORKING_SCHEDULE_OPTIONS,
  } from 'src/_mock';

import formatDateToYYYYMMDD from '../../../global/GetDateFormat';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

const CurrentWork=forwardRef((props,ref)=> {
  const router = useRouter();

  const currentUser=props.currentUser;

  const [currentWorkData,setCurrentWorkData]=useState({
    "companyID": "COMP1",
    reportingManagerID:currentUser?.reportingManagerID|| undefined,

  "employeeID":localStorage.getItem("employeeId"),

  "employmentType":currentUser?.employmentType|| "Contract",

  "locationID":currentUser?.locationID || undefined,

  "departmentID": currentUser?.departmentID || undefined,

  "designationID": currentUser?.designationID || undefined,

  "designationGradeID": currentUser?.designationGradeID || undefined,

  "ctc":currentUser?.ctc || undefined,


  "roleID":currentUser?.roleID || undefined
  })

  const [employeeTypeOptons,setEmployeeTypeOptions]=useState([
   "Contract","Permanent"

])

const [locationOptions,setLocationOptions]=useState([])
const [departmentOptions,setDepartmentOptions]=useState([])
const [desginationOptions,setDesginationptions]=useState([])
const [desginationGradeOptions,setDesginationGradeOptions]=useState([])
const [rolesOptions,setrolesOptions]=useState([])
const [assignManagerOptions,setassignManagerOptions]=useState([])


  useImperativeHandle(ref,()=>({
    childFunctionWork(){
     onSubmit();
      
    }
  }))

 

  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  

  const { enqueueSnackbar } = useSnackbar();

  const ApiHitCurrentWork=(obj)=>{
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}/ctcSalaryStructure`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
    
      data : obj
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      console.log(JSON.stringify(response.data));
      router.push(paths.dashboard.employee.root);
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }
  const ApiHitLocations=()=>{
    const data1 = JSON.stringify({

      "companyID": "COMP1"
    
    });
    
     
    
    const config = {
    
      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}/locationOnboardingDepartment`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
    
      data : data1
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      console.log(JSON.stringify(response.data));
      setLocationOptions(response?.data?.data ||[])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }
  
  const ApiHitDepartment=(obj)=>{
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}/onboardingDepartment`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
    
      data : obj
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setDepartmentOptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  const ApiHitDesgniation=(obj)=>{
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}/onboardingDesignation`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
    
      data : obj
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setDesginationptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  const ApiHitDesgniationGrade=(obj)=>{
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}/onboardingDesignationGrade`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
    
      data : obj
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setDesginationGradeOptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  const ApiHitRoles=()=>{
    const data1 = JSON.stringify({

   
    
    });
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}/onboardingRole`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
      data:data1
    
     
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setrolesOptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }

  const ApiHitManager=()=>{
    const data1 = JSON.stringify({

      "companyID": "COMP1"
    
    });
    const config = {

      method: 'post',
    
      maxBodyLength: Infinity,
    
      url: `${baseUrl}/onboardingReportingManager`,
    
      headers: {
    
        'Content-Type': 'application/json'
    
      },
      data:data1
    
     
    
    };
    
     
    
    axios.request(config)
    
    .then((response) => {
    
      // console.log(JSON.stringify(response?.data));
      setassignManagerOptions(response?.data?.data|| [])
    
    })
    
    .catch((error) => {
    
      console.log(error);
    
    });
  }
    useEffect(()=>{
       ApiHitLocations()
       ApiHitRoles()
       ApiHitManager()
       const obj={
        companyID:'COMP1',
       
      }

      ApiHitDepartment(obj)
       
    },[])
  const NewUserSchema = Yup.object().shape({
   department_name:Yup.string(),
   desgination:Yup.string()
  });

  const defaultValues = useMemo(
    
    () => ({
        department_name:currentUser?.department_name || "",
        desgination:currentUser?.designiation || ""
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

  const onSubmit = handleSubmit(async (data) => {

                const obj=
                {

                  ctc:parseInt(currentWorkData?.ctc,10),
                  companyID:currentWorkData?.companyID,
                  employeeID:localStorage.getItem('employeeIdCreated'),
                  employmentType:currentWorkData?.employmentType,
                  departmentID:currentWorkData?.departmentID?.departmentID,
                  designationGradeID:currentWorkData?.designationGradeID?.designationGradeID,
                  designationID:currentWorkData?.designationID?.designationID,
                  locationID:currentWorkData?.locationID?.locationID,
                  reportingManagerID:currentWorkData?.reportingManagerID?.managerID,
                  roleID:currentWorkData?.roleID?.roleID

                }
                ApiHitCurrentWork(obj);
          console.log(currentWorkData,obj,'currentWorkData')

  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
         

          <Grid xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
           
           <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employeeTypeOptons}
            value={currentWorkData?.employmentType}
            getOptionLabel={(option) => option}
            onChange={(e,newvalue)=>{
              
             
              setCurrentWorkData(prev=>({
                ...prev,
                employmentType:newvalue
              }))
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Employement Type" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locationOptions}
            value={currentWorkData?.locationID}
            getOptionLabel={(option) => option.locationName}
            onChange={(e,newvalue)=>{
              
             
              setCurrentWorkData(prev=>({
                ...prev,
                locationID:newvalue
              }))
             
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={departmentOptions}
            value={currentWorkData?.departmentID}
            getOptionLabel={(option) => option?.departmentName}
            onChange={(e,newvalue)=>{
              
             
              setCurrentWorkData(prev=>({
                ...prev,
                departmentID:newvalue
              }))
              const obj={
                companyID:'COMP1',
                departmentID:newvalue?.departmentID
              }

               ApiHitDesgniation(obj)

             
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Department" />}
          />
              <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={desginationOptions}
            value={currentWorkData?.designationID}
            getOptionLabel={(option) => option?.designationName}
            onChange={(e,newvalue)=>{
              
             
              setCurrentWorkData(prev=>({
                ...prev,
                designationID:newvalue
              }))

              const obj={
                companyID:'COMP1',
                designationID:newvalue?.designationID
                
              }

               ApiHitDesgniationGrade(obj)

             
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Desgniation" />}
          />


            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={desginationGradeOptions}
              value={currentWorkData?.designationGradeID}
              getOptionLabel={(option) => option?.designationGradeName}
              onChange={(e,newvalue)=>{
                
              
                setCurrentWorkData(prev=>({
                  ...prev,
                  designationGradeID:newvalue
                }))

              
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Desgination Grade" />}
          />

              <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rolesOptions}
              value={currentWorkData?.roleID}
              getOptionLabel={(option) => option?.roleName}
              onChange={(e,newvalue)=>{
                
              
                setCurrentWorkData(prev=>({
                  ...prev,
                  roleID:newvalue
                }))

              
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Select Role" />}
          />

              <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={assignManagerOptions}
              value={currentWorkData?.reportingManagerID}
              getOptionLabel={(option) => option?.managerName}
              onChange={(e,newvalue)=>{
                
              
                setCurrentWorkData(prev=>({
                  ...prev,
                  reportingManagerID:newvalue
                }))

              
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Assign Manager" />}
          />



          <TextField label="CTC"  
          id="ctc"
          value={currentWorkData?.ctc}
          type='number'
          onChange={(e)=>{
              
            setCurrentWorkData(prev=>({
              ...prev,
              ctc:e?.target?.value
            }))
          }}
          />
               
               
              </Box>
            
              <Button
              alignItems="flex-end" sx={{ mt: 3 }}
              onClick={()=>{
                console.log(currentWorkData?.reportingManagerID,'currentWorkData')

                const obj=
                {

                  ctc:parseInt(currentWorkData?.ctc,10),
                  companyID:currentWorkData?.companyID,
                  employeeID:currentWorkData?.employeeID,
                  employmentType:currentWorkData?.employmentType,
                  departmentID:currentWorkData?.departmentID?.departmentID,
                  designationGradeID:currentWorkData?.designationGradeID?.designationGradeID,
                  designationID:currentWorkData?.designationID?.designationID,
                  locationID:currentWorkData?.locationID?.locationID,
                  reportingManagerID:currentWorkData?.reportingManagerID?.managerID,
                  roleID:currentWorkData?.roleID?.roleID

                }
                 ApiHitCurrentWork(obj)
              }}>
                Submit
              </Button>
           

             
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
})

CurrentWork.propTypes = {
  currentUser: PropTypes.object,
};

export default CurrentWork;