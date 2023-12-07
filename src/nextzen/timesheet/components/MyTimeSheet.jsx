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
const MyTimeSheet = ({currentUser,filterSearch}) => {
    const TABLE_HEAD = [

        // {
    
        //   id: "",
    
        //   label: " SL_NO",
    
        //   type: "text",
    
        //   containesAvatar: false,
    
     
    
        //   secondaryText: "text",
    
        // },
        { id: "projectId", label: "Project Id", width: 180, type: "text" },
    
        { id: "projectName", label: "Project Name", width: 220, type: "text" },
    
        { id: "dateOfActivity", label: "Date of Activity", width: 200, type: "text" },
    
        { id: "activityName", label: "Activity Name", width: 200, type: "text" },
        { id: "managerName", label: "Manager Name", width: 100, type: "text" },
           { id: "startTime", label: "Start Time", width: 200, type: "text" },
              { id: "endTime", label: "End Time", width: 200, type: "text" },
      
        { id: "status", label: "Status", width: 100, type: "badge" },
    
        // { id: '', width: 88 },
    
      ];
 
      const managerID =localStorage.getItem('reportingManagerID');
      const employeeID =localStorage.getItem('employeeID');
      const companyID =localStorage.getItem('companyID');
     
    const defaultPayload={
        "companyId":companyID,
        "employeeId":employeeID,
        "page":0,
        "count":5,
        "search":"",
        "externalFilters":{
                 "projectName":"",
                 "Status":"",
                 "from":"",
                 "to":""
        },
        "sort":{
            "key":0,
            "orderBy":"p.project_name"
        }
    }
      const actions = [
    
        { name: "Edit", icon: "solar:pen-bold", id: 'edit',type: "edit", },
    
     
    
      ];
    
      const [currentDate, setCurrentDate] = useState(new Date());
     
      console.log(currentDate,"currentDate")
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        // console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
    // dialog
    // const values = watch();
    const [projectDetails ,setProjectDetails] = useState([])
    const [activityData ,SetActivityData] = useState([])
    const [currentProjectData ,setCurrentProjectData] = useState({})
const [currentActivitytData ,setCurrentActivitytData] = useState({})
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
        (response) => {
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
console.log(timesheetData,"timesheetData1222")
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

      //  timesheetData?.timesheetData="28"

     console.log(timesheetData,"editDataeditData")
      
      const response = await axios.post(baseUrl+"/addmytimesheet", timesheetData).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );

      
    } catch (error) {

      alert("api hit not done")
      console.error(error);
    }
  }
console.log(timesheetData,"vvvvvvvvvvv")
  // mui modal related
  const [open, setOpenEdit] = useState(false);
  const handleOpen = () => {
    setOpenEdit(true);
  }
  const handleCloseEdit = () => setOpenEdit(false);
  const onclickActions = async(rowData,eventData) => {
    console.log(rowData,eventData, "CompoffAprrove from to basic table")
    if (rowData && eventData) {
     
      console.log(rowData,'rowDatarowData')
      // hit api for options return the resposnse.data.data
      // const arr= await ApiHitClaimTypeOptions()
      
      const updatedRowData = {
        ...rowData,
        
       
      };
    
     
      setTimesheetData(updatedRowData);

      if (eventData?.type === 'edit') {
        handleOpen()
      //   calculateDays()
      // generateDaysArray(numberOfDays);
      // getCurrentDate();
      const endDate = getCurrentDate();
      const startDate = rowData?.startTime;
      calculateDaysAndGenerateArray(startDate,endDate,0)
        
      
      }
      
        
       else{
     

    }
    }
 
    
    else {
          // navigate[event.eventData.route]

      }
    }
    useEffect(()=>{
      // calculateDays()
      // generateDaysArray(numberOfDays);
      getCurrentDate();
      // calculateDaysAndGenerateArray(startDate,endDate,2)
    },[])

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



     
  return (
    <>
   {/* <h1>hello</h1> */}
  
   <Dialog
fullWidth
maxWidth={false}
open={open}
onClose={handleClose}
PaperProps={{
  sx: { maxWidth: 720 },
}}

         >
          <ModalHeader heading="Edit Timeline "/>
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
              >

<Grid sx={{padding:'8px'}}>
              {/* <Typography sx={{marginLeft:'8px'}}>
                ADD  TIMELINE 
              </Typography> */}
              <Typography sx={{marginLeft:'8px'}}>
                Time Sheet
              </Typography>
            </Grid>
            
               <Grid container spacing={1} >
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
              disabled
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
          </Grid>
         
                
          {days.map((day) => (
    <React.Fragment key={day}>
      <Typography>{day}</Typography>
      <Grid container spacing={1}>
        <Grid item sm={4}>
          <TextField
            label={`${day} Hours`}
            fullWidth
            inputProps={{
              pattern: '[0-9]',
              maxLength: 2,
            }}
            value={timesheetData?.[day.toLowerCase()]?.hours}
            onChange={handleDayInputChange(day.toLowerCase(), 'hours')}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            label={`${day} Task`}
            fullWidth
            value={timesheetData?.[day.toLowerCase()]?.task}
            onChange={handleDayInputChange(day.toLowerCase(), 'task')}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            label={`${day} Comments`}
            fullWidth
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
                  {!currentUser ? 'Update Timesheet' : 'Add  Timeline'}
                </LoadingButton>
                <Button  onClick={handleCloseEdit}>Cancel</Button>
              </Stack>
             </DialogActions>
           
      
        </DialogContent>
      </FormProvider>
      </Dialog>
   
 <BasicTable
 defaultPayload={defaultPayload}
 headerData={TABLE_HEAD}
 rowActions={actions}
 endpoint='/Mytimesheets'
 bodyData='data'
 filterName="TimeSearchFilter"
 onClickActions={onclickActions}
 />
    </>
  );
}

export default MyTimeSheet