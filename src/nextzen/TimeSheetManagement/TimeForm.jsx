import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
import instance from 'src/api/BaseURL';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import { Autocomplete, TextField } from '@mui/material';
import Label from 'src/components/label';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';

import formatDateToYYYYMMDD from '../global/GetDateFormat';

export default function TimeForm({ currentUser, handleClose }) {
  const [datesUsed, setDatesUsed] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
    due_date: dayjs(new Date()),
    // activity_name:[]
  });
  const [selectedActivity, setSelectedActivity] = useState([]);

  const handleSelectChange = (event, values) => {
    setSelectedActivity(values);
  };
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    employee_id: Yup.string(),
    monday: Yup.string(),
    tuesday: Yup.string(),
    wednseday: Yup.string(),
    thursday: Yup.string(),
    friday: Yup.string(),
    saturday: Yup.string(),
    sunday: Yup.string(),
    comments: Yup.string(),
    // start_date: Yup.string(),
    // end_date: Yup.string(),
    // due_date: Yup.string().required('First Name is Required'),
    // commentStatus: Yup.string(),
   
   
  });

  useEffect(() => {
   getProjectName();
   getActivityName()
  }, []);
  

  const defaultValues = useMemo(
    () => ({
   
        employee_id: currentUser?.employee_id || '',
        monday: currentUser?.monday || '',
        tuesday: currentUser?.tuesday || '',
        wednseday: currentUser?.wednseday || '',
        thursday: currentUser?.thursday || '',
        friday: currentUser?.friday || '',
        saturday: currentUser?.saturday || '',
        sunday: currentUser?.sunday || '',
        comments: currentUser?.comments || '',
  
   
    }),
    [currentUser]
  );

  const   methods = useForm({
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
const [projectDetails ,setProjectDetails] = useState([])
const [activityData ,SetActivityData] = useState([])
console.log("🚀 ~ file: TimeForm.jsx:122 ~ TimeForm ~ activityData:", activityData)
// const [projectId ,SetProjectId]= useState(currentProjectData.projectId)
console.log("🚀 ~ file: TimeForm.jsx:121 ~ TimeForm ~ activityData:", activityData)
const [currentProjectData ,setCurrentProjectData] = useState({})
const [currentActivitytData ,setCurrentActivitytData] = useState({})
console.log("🚀 ~ file: TimeForm.jsx:119 ~ TimeForm ~ projectDetails:", projectDetails)

const PrName = projectDetails.map((item) => item.projectcdName);
console.log("🚀 ~ file: TimeForm.jsx:123 ~ TimeForm ~ PrName:", PrName)

const getProjectName = async ()=>{
  try {
  
    const data = {
      manager_id: 'info7',
      // Other data properties as needed
    };


    const response = await instance.post('/listmanagersproject', data);

    // Handle the response (e.g., check for success, update state, etc.)
    console.log('Response:', response.data.projectDetails);

    // Return or handle the response data as needed
    setProjectDetails(response.data.data)
    return response.data;
  } catch (error) {
    // Handle any errors (e.g., network error, request failure, etc.)
    console.error('Error:', error);
    throw error; // Re-throw the error or handle it according to your needs
  }
}

const getActivityName = async ()=>{
  try {
  
    const data = {
      project_id: 4,
      // Other data properties as needed
    };


    const response = await instance.post('listactivityname', data);

    // Handle the response (e.g., check for success, update state, etc.)
    console.log('Response:', );

    // Return or handle the response data as needed
    SetActivityData(response.data.data)
    return response.data;
  } catch (error) {
    // Handle any errors (e.g., network error, request failure, etc.)
    console.error('Error:', error);
    throw error; // Re-throw the error or handle it according to your needs
  }
}


  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: SalaryAdvanceForm.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      data.company_id = 'COMP2';
      data.activity_id =String( currentActivitytData.activityId);;
      data.project_id =String( currentProjectData.projectId);
      data.date_of_activity = formatDateToYYYYMMDD(dayjs(new Date()));
      data.start_time = '2023-10-17 11:50:02.023';
      data.end_time = '2023-10-17 11:50:02.023';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.due_date = formatDateToYYYYMMDD(datesUsed?.due_date);
      // data.end_date = formatDateToYYYYMMDD(datesUsed?.end_date);
      // data.start_date = formatDateToYYYYMMDD(datesUsed?.start_date);
      // data.selectedActivity = selectedActivity;
      // data.companyID = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
      // data.employeeID = "info4";

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addmytimesheet', data).then(
        (successData) => {
          console.log('sucess', successData);
          handleClose()
        },
        (error) => {
          console.log('lllll', error);
        }
      );

    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div style={{ paddingTop: '20px' }}>
      <Dialog>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
 <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'8px'}}>
                ADD YOUR TIMELINE TO PROJECT IS HERE .....
              </Typography>
              <Typography sx={{marginLeft:'8px'}}>
                Time Sheet
              </Typography>
            </Grid>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  // xs: 'repeat(1, 1fr)',
                  // sm: 'repeat(7, 1fr)',
                }}
              >
                <RHFTextField name="employee_id" label="Employe id  " />
                <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={projectDetails}
            value={currentProjectData}
            getOptionLabel={(option) => option.projectcdName}
            onChange={(e,newvalue)=>{
             
             
              setCurrentProjectData(newvalue
              )
              // const obj={
              //   // companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
              //   projectId:newvalue?.projectId
              // }
 
              // ApiHitDepartment(obj)
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
           
            }}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Project Name" />}
          />
                <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={activityData}
            value={currentActivitytData}
            getOptionLabel={(option) => option.activityName}
            onChange={(e,newvalue)=>{
             
             
              setCurrentActivitytData(newvalue
              )
              // const obj={
              //   // companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
              //   projectId:newvalue?.projectId
              // }
 
              // ApiHitDepartment(obj)
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
           
            }}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Activity Name" />}
          />
                {/* <RHFTextField name="Employe_Name" label=" Employe Name " /> */}
                {/* <RHFTextField name="projectName" label="Project Name  " /> */}
                {/* <RHFTextField name="Activity_Name" label="Activity Name " /> */}
                <RHFTextField name="monday" label="monday" />
                <RHFTextField name="tuesday" label="tuesday" />
                <RHFTextField name="wednseday" label="wednseday" />
                <RHFTextField name="thursday" label="thursday" />
                <RHFTextField name="friday" label="friday" />
                <RHFTextField name="saturday" label="saturday " />
                <RHFTextField name="sunday" label="sunday " />
                {/* <RHFTextField name="Total_hours" label="Total hours" /> */}
                <RHFTextField name="comments" label="comments" />
             
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Add  Timeline'}
                </LoadingButton>
                <Button sx={{backgroundColor:"#d12317",ml:"5px"}} onClick={handleClose}>Cancel</Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      </Dialog>
    </div>
  );
}

TimeForm.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
