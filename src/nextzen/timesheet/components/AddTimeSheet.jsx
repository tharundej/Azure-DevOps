import React from 'react';
import { useCallback, useEffect, useMemo, useState,} from 'react';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import { BasicTable } from '../../Table/BasicTable';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

import Stack from '@mui/material/Stack';
import { Autocomplete, TextField,DialogContent,DialogActions } from '@mui/material';
import  Grid from '@mui/material/Grid';
import ModalHeader from '../../global/modalheader/ModalHeader';
const AddTimeSheet = ({currentUser,EditData,handleClose,countFunction}) => {
   const [count, setCount]=useState(0);
      const managerID =localStorage.getItem('reportingManagerID');
      const employeeID =localStorage.getItem('employeeID');
      const companyID =localStorage.getItem('companyID');
     
   console.log(EditData,"qwertyu")
      const [currentDate, setCurrentDate] = useState(new Date());
      useEffect(()=>{
        if(EditData?.employeeId){
setTimesheetData(EditData)}
      },[])
     
      console.log(currentDate,"currentDate")
      const [showForm, setShowForm] = useState  (false);
    //   const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        // console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
    // dialog
    // const values = watch();

    

    const [projectDetails ,setProjectDetails] = useState([])
    const [activityData ,SetActivityData] = useState([])
    const [timeSheetWeek , setTimeSheetWeek]=useState()
    const [currentProjectData ,setCurrentProjectData] = useState({})
const [currentActivitytData ,setCurrentActivitytData] = useState({})
const [projectIdUpdate, setProjectIdUpdate]=useState("")
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

  const {
    reset, 
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
 
  

  

   // edit dialog form data
   const [timesheetData, setTimesheetData] = useState({
    // timesheetId: '',
    // flag :3,
    companyId: companyID,
    employeeId: employeeID,
    employeeName: '',
    projectId: '',
    projectName:'',
    activityName: '',
    startTime: '',
    endTime: '',
    monday: {
      hours: '',
      task: '',
      comments: '',
    },
    tuesday: {
      hours: '',
      task: '',
      comments: "",
    },
    wednesday: {
      hours: '',
      task: '',
      comments: '',
    },
    thursday: {
      hours: '',
      task: '',
      comments: '',
    },
    friday: {
      hours: '',
      task: '',
      comments: '',
    },
    saturday: {
      hours: '',
      task: '',
      comments: '',
    },
  });
console.log({...timesheetData},"timesheetData1222")
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTimesheetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayInputChange = (day, field) => (event) => {
    const { value } = event.target;
    setTimesheetData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [field]: value,
      },
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, such as sending it to a server
    console.log('Form submitted:', timesheetData);
  };

  const onSubmitEdit2 = async(timesheetData, event) => {
    const newId = timesheetData?.timeSheetId ;
    console.log(newId,"newId")

    const updateTimesheetId = (newId) => {
      // Convert newId to a string before updating the state
      setTimesheetData((prevData) => ({
        ...prevData,
        timesheetId: String(newId),
      }));
    };
    console.log(timesheetData,"editDataeditData222")
    try {
      event.preventDefault();
     console.log(timesheetData,"editDataeditData1222")
      const response = await axios.post(baseUrl+"/addmytimesheet", timesheetData).then(
        (successData) => {
          console.log('sucess', successData);
          handleClose()
          if(countFunction()){
            countFunction()
            // getTableData()
          }
        
        },
        (error) => {
          console.log('lllll', error);
          handleClose()
          if(countFunction()){
            countFunction()
            // getTableData()
          }
        }
      );

      
    } catch (error) {

    //   alert("api hit not done")
      console.error(error);
      if(countFunction()){
        countFunction()
        // getTableData()
      }
    }
  }
console.log(timesheetData,"vvvvvvvvvvv")
  // mui modal related
  const [open, setOpenEdit] = useState(false);
  const handleOpen = () => {
    setOpenEdit(true);
  }
  
 
    useEffect(()=>{
      // calculateDays()
      // generateDaysArray(numberOfDays);
      getProjectName();
      getActivityName();
      getTimeSheetWeek();
      getCurrentDate();
      // calculateDaysAndGenerateArray(startDate,endDate,2)
    },[])

    const getProjectName = async()=>{
        try {
        
          const data = {
            
              employeeId:employeeID,
              companyId:companyID,
             
            // Other data properties as needed
          };
          const response = await axios.post(baseUrl+'/listmanagersproject', data).then(
            (response) => {
              console.log('sucesswwww', response);
              setProjectDetails(response?.data?.data)
              // enqueueSnackbar(response?.data?.message, { variant: 'success' })
            
            },
            (error) => {
              console.log('lllll', error);
              // enqueueSnackbar(error?.response?.data?.message, { variant: 'warning' })
           
            }
          );
    
     
          
        } catch (error) {
          // Handle any errors (e.g., network error, request failure, etc.)
          console.error('Error:', error);
          // enqueueSnackbar(error?.response?.data?.message, { variant: 'warning' })
          throw error; // Re-throw the error or handle it according to your needs
        }
      }
      
      const getActivityName = async ()=>{
        try {
        
          const data = {
            project_id: 4,
            // Other data properties as needed
          };
          const response = await axios.post(baseUrl+'/listactivityname', data).then(
            (response) => {
              console.log('sucess', response);
              SetActivityData(response?.data?.data)
            
            },
            (error) => {
              console.log('lllll', error);
           
            }
          );
    
      
      
          
          console.log('Response:', );
      
         
        } catch (error) {
          console.error('Error:', error);
          throw error; 
        }
      }
      const getTimeSheetWeek = async()=>{
        try {
        
          // const data = {
          //   manager_id: 'info7',
          //   // Other data properties as needed
          // };
          const response = await axios.post(baseUrl+"/workweeklist").then(
            (response) => {
              // console.log('sucesswwwwoo', response);
              setTimeSheetWeek(response?.data)
    
            
            },
            (error) => {
              console.log('lllll', error);
           
            }
          );
    
     
          
        } catch (error) {
          // Handle any errors (e.g., network error, request failure, etc.)
          console.error('Error:', error);
          throw error; // Re-throw the error or handle it according to your needs
        }
      }

// get current Date
function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}



// day wise rendering the textfields
const [days, setDays] = useState([]);
// const [numberOfDays, setNumberOfDays] = useState();
function calculateDays(startDate, endDate) {
  // Convert the input strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const timeDifference = end - start;

  // Calculate the number of days
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

// Example usage:
// const startDate = timesheetData?.startTime;

// const endDate = getCurrentDate();
// console.log(startDate,endDate,"timeiii")
// const numberOfDays = calculateDays(startDate, endDate); 
// console.log(numberOfDays,"numberOfDays");

function generateDaysArray(value) {
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (value >= 1 && value <= 7) {
    setDays(allDays.slice(0, value));
    return allDays.slice(0, value);
  } else {
    // Handle invalid values if needed
    console.error('Invalid value. Please provide a value between 1 and 7.');
    return [];
  }
}
console.log(days,"allDays")


// second method
function calculateDaysAndGenerateArray(startDate, endDate, value) {
  // Convert the input strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);
console.log(startDate,"start",endDate,"end",value,"3333")
  // Calculate the difference in milliseconds
  const timeDifference = end - start;

  // Calculate the number of days
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  console.log(daysDifference,"daysDifference")
  
  // Call generateDaysArray only if the value is valid
  if (daysDifference >= 1 && daysDifference <= 7) {
    const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    setDays(allDays.slice(0, daysDifference));
    return { days: allDays.slice(0, daysDifference), daysDifference };
  } else {
    // Handle invalid values if needed
    console.error('Invalid daysDifference. Please provide a value between 1 and 7.');
    return { days: [], daysDifference };
  }
}


const handleCloseEdit = () => setOpenEdit(false);
     
  return (
    <>
   {/* <h1>hello</h1> */}
  
  
          <ModalHeader heading={EditData?.employeeId ? 'Edit TimeSheet' : 'Add TimeSheet '}/>
      <FormProvider methods={methods} onSubmit={(event) => onSubmitEdit2(timesheetData, event)}>
      <DialogContent>
      <Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  // xs: 'repeat(1, 1fr)',
                  // sm: 'repeat(7, 1fr)',
                }}
              >{EditData?.employeeId ?(<>
     
<Grid container spacing={1} marginTop={1} >
                <Grid item xs={12} sm={6} fullWidth>
                {/* < Autocomplete
                
            // disablePortal
            id="cobo-box-demo"
            options={projectDetails || []}
            value={currentProjectData.projectId}
            getOptionLabel={(option) => option.projectcdName}
            onChange={(e,newvalue)=>{   
              setCurrentProjectData(newvalue)
            }}
            renderInput={(params) => <TextField {...params} label="Project Name" />}
          /> */}

<TextField 
              
              label="Project" 
            //   disabled
              fullWidth
              // inputProps={{
              //   pattern: '[0-9]', 
              //   maxLength: 2, 
              // }}
              value={timesheetData?.projectName}
             
           
              />
          </Grid>
          <Grid item  xs={12} sm={6} fullWidth>
                {/* <Autocomplete
            disablePortal
            id="combo-box-dmo"
            options={activityData || []}
            value={currentActivitytData.activityId}
            getOptionLabel={(option) => option.activityName}
            onChange={(e,newvalue)=>{
              setCurrentActivitytData(newvalue)  
            }}         
            renderInput={(params) => <TextField {...params} label="Activity Name" />}
          /> */}
            <TextField 
              
              label="Activity Name" 
              fullWidth
             disabled
             value={timesheetData?.activityName}
             
              />
          </Grid>
          </Grid></>):(<>
            <Grid container spacing={1} marginTop={1}>
                         <Grid item xs={12} sm={6} fullWidth>
                < Autocomplete
               
           
            id="cobo-box-demo"
            options={projectDetails || []}
            value={currentProjectData?.projectId }
            getOptionLabel={(option) => option?.projectcdName }
            onChange={(e,newvalue)=>{
             
             
              // setCurrentProjectData(newvalue)
              setProjectIdUpdate(newvalue?.projectId)
              setTimesheetData(prevState => ({
                ...prevState,
                projectId: JSON.stringify(newvalue?.projectId)
                ,
              }));
             
              console.log(newvalue?.projectId,"newvaluenewvalue")
           
            }}
         
            renderInput={(params) => <TextField {...params} label="Project Name" />}
          /></Grid>
          <Grid item  xs={12} sm={6} fullWidth>
                {/* <Autocomplete
            disablePortal
            id="combo-box-dmo"
            options={activityData || []}
            value={currentActivitytData.activityId}
            getOptionLabel={(option) => option.activityName}
            onChange={(e,newvalue)=>{
             
             
              setCurrentActivitytData(newvalue
              )
             
           
           
            }}
         
            renderInput={(params) => <TextField {...params} label="Activity Name" />}
          /> */}
          <TextField
             
              label="Activity Name"
              fullWidth
              // inputProps={{
              //   pattern: '[0-9]',
              //   maxLength: 2,
              // }}
              value={timesheetData?.activityName}
              onChange={(event)=>{
                console.log("eventevent",event?.target?.value)
                setTimesheetData(prevState => ({
                  ...prevState,
                  activityName: event?.target?.value
                  ,
                }));
              }}
              />
          </Grid>
 
         
         <Grid item xs={12} sm={6} fullWidth>
  <Autocomplete
    id="cobo-box-demo"
    options={timeSheetWeek || []}
    getOptionLabel={(option) => option?.workweek}
    value={timeSheetWeek?.workWeek} // Set the default selected value as per your requirement
    onChange={(e, newValue) => {
      if (newValue) {
        // console.log(newValue?.workWeek);
        setTimesheetData(prevState => ({
          ...prevState,
          startTime: newValue?.startWeekDate,
          endTime: newValue?.endWeekDate
          ,
        }));
        // Handle the selected value
      }
    }}
    renderInput={(params) => <TextField {...params} label="Select TimeSheet Week" />}
  />
</Grid>
</Grid>

    
         
</>)}
     
 


            
                
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
    <React.Fragment key={day}>
      <Typography>{day}</Typography>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          <TextField
            label="Hours"
            fullWidth
            inputProps={{
              pattern: '[0-9]',
              maxLength: 2,
            }}
            value={timesheetData?.[day.toLowerCase()]?.hours}
            onChange={handleDayInputChange(day.toLowerCase(), 'hours')}
          />
        </Grid>
        {/* <Grid item sm={4}>
          <TextField
            label={`${day} Task`}
            fullWidth
            value={timesheetData?.[day.toLowerCase()]?.task}
            onChange={handleDayInputChange(day.toLowerCase(), 'task')}
          />
        </Grid> */}
        <Grid item sm={6}>
          <TextField
            label= "Remarks"
            fullWidth
            placeholder="Enter like These..
            1. Task one
            2.task two"
            multiline
            value={timesheetData?.[day.toLowerCase()]?.comments}
            onChange={handleDayInputChange(day.toLowerCase(), 'comments')}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  ))}     

 
             
              </Box>
    
            
             <DialogActions>
              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
                  {/* {!currentUser ? 'Update Timesheet' : 'Add  TimeSheet'} */}
                  {EditData?.employeeId ? 'Edit TimeSheet' : 'Add TimeSheet '}
                </LoadingButton>
                <Button  onClick={handleClose}>Cancel</Button>
              </Stack>
             </DialogActions>
           
      
        </DialogContent>
      </FormProvider>
      
   

    </>
  );
}

export default AddTimeSheet