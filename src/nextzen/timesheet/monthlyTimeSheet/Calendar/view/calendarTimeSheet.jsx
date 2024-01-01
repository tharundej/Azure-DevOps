import React from 'react';
import Calendar from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
//
import { useState, useEffect, useCallback, useContext } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'src/components/snackbar';
// @mui
import { useTheme } from '@mui/material/styles';
import {Card,OutlinedInput,FormControl,Box,Switch,Select,MenuItem,DialogActions ,InputLabel,Stack,Button,Dialog,Container,TextField,Autocomplete,CardContent,Typography,DialogTitle,Grid,Tab,Tabs,IconButton,DialogContent} from '@mui/material';
// utils
import { fTimestamp } from 'src/utils/format-time';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';
// api
import { useGetEvents, updateEvent } from 'src/api/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { styled } from '@mui/system'; // Import styled from @mui/system
import { useCalendar, useEvent } from '../hooks';
import { StyledCalendar } from '../styles';
import CalendarForm from '../calendar-form';
import CalendarToolbar from '../calendar-toolbar';
import FormProvider, { RHFTextField,RHFRadioGroup,RHFSelect, } from 'src/components/hook-form';
import CalendarFilters from '../calendar-filters';
import CalendarFiltersResult from '../calendar-filters-result';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import UserContext from 'src/nextzen/context/user/UserConext';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { getHolidaysListAPI } from 'src/api/HRMS/LeaveManagement';
import axios from 'axios';
import Divider from '@mui/material/Divider';
const defaultFilters = {
  colors: [],
  from_date: null,
  to_date: null,
};
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ApproveTimeSheetTable from '../approveTimeSheetTable';
export default function CalendarView() {
 //----------------Calendar -------------------
  
  const theme = useTheme();
  const {user} = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const smUp = useResponsive('up', 'sm');
  const openFilters = useBoolean();
  const [filters, setFilters] = useState(defaultFilters);
  const { events, eventsLoading } = useGetEvents();
  const [listOfHolidays,setListOfHolidays]= useState();
 
// useEffect(()=>{
//   holidayslist();
// },[])
  const dateError =
    filters.from_date && filters.to_date
      ? filters.from_date.getTime() > filters.to_date.getTime()
      : false;
  const {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    onSelectRange,
    onClickEvent,
    onResizeEvent,
    onInitialView,
    //
    openForm,
    onOpenForm,
    onCloseForm,
    //
    selectEventId,
    selectedRange,
    //
    onClickEventInFilters,
  } = useCalendar();
  
  const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);
  useEffect(() => {
    onInitialView();
  }, [onInitialView]);
  const handleFilters = useCallback((projectName, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [projectName]: value,
    }));
  }, []);
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);
  const canReset = !!filters.colors.length || (!!filters.from_date && !!filters.to_date);
  const dataFiltered = applyFilter({
    inputData: events,
    filters,
    dateError,
  });
  const updatedEvents = dataFiltered?.map((event) => ({
    title: event.leaveTypeName,
    start: event.fromDate,
    end: event.toDate,
    id:event.leaveId,
    type:"leave",
    color:event.color
  }));


const [count, setCount]=useState(0)
  const EventSchema = Yup.object().shape({
    leaveTypeId:Yup.lazy((value) => {
    return value === 0
      ? Yup.number().notOneOf([0], 'Please Select Leave Type').required('Please Select Leave Type')
      : Yup.number().required('Please Select Leave Type');
  }),
    companyId:Yup.string(),
    employeeId:Yup.string(),
    
  });
  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: currentEvent,
  });
  
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();

  
  // surendra
  const [eventGetData,setEventGetData]= useState();
 
  
//   const HolidayEvents = listOfHolidays?
//   listOfHolidays?.map((event)=>({
//     title : event.holidayName,
//     start: event.holidayDate,
//     end: event.holidayDate,
//     type:"holiday"
//    }))
// :[]
console.log(listOfHolidays,"listOfHolidays")
  
console.log(date,"datedate1234",view,eventsLoading)
   const eventDataMe= [
   {  "title": "9 Hours", "start": "2023-12-07", "end": "2023-12-07", "type": "holiday" },
   {  "title": "12 Hours", "start": "2023-12-09", "end": "2023-12-09", "type": "holiday" },
   { "title": "20 Hours",  "start": "2023-12-26", "end": "2023-12-26", "type": "holiday", 
   "editData": [
      { "ACCOUNTS": {  "hours": "sd",   "des": "dfer"  } },
      {  "HRMS": { "hours": "12", "des": "23" } }
    ]
  },
  { "title": "8 Hours",  "start": "2023-12-20", "end": "2023-12-20", "type": "holiday", "editData": [
    { "ACCOUNTS": {  "hours": "100",   "des": "kkkkk"  } },
    {  "HRMS": { "hours": "120", "des": "onnnnnn" } }
  ]
},
{ "title": "10 Hours",  "start": "2023-12-22", "end": "2023-12-22", "type": "holiday", "editData": [
  { "ACCOUNTS": {  "hours": "10",   "des": "NOT Done"  } },
  {  "HRMS": { "hours": "123", "des": "onGoing" } }
]
}
  
   ]
   
   const managerID = localStorage.getItem('reportingManagerID');
   const employeeID = localStorage.getItem('employeeID');
   const companyID = localStorage.getItem('companyID');

   const [getApiCall, setGetApiCall] =  useState({
    employeeId:employeeID ,
    companyId: companyID,
    DateOfActivity:{
        from:"",
         to: ""
    }
})

   // data setting 1st and last days
function getMonthStartAndEndDates(inputDate) {
  const currentDate = new Date(inputDate);
  
  // Set the date to the first day of the month
  currentDate.setDate(1);

  const startDate = currentDate.toISOString().split('T')[0]; // Start date

  // Set the date to the last day of the month
  currentDate.setMonth(currentDate.getMonth() + 1);
  currentDate.setDate(0);

  const endDate = currentDate.toISOString().split('T')[0]; // End date
  setGetApiCall(prevGetApiCall => ({
    ...prevGetApiCall,
    DateOfActivity: {
      from: startDate,
      to: endDate
    }
  }));
  setApproveData(prevApproveData => ({
    ...prevApproveData,
    date: {
      from: startDate,
      to: endDate
    }
  }));

  return { startDate, endDate };
}

// Example usage:
const inputDate = date; // Your input date
// const { startDate, endDate } = getMonthStartAndEndDates(inputDate);

// console.log(endDate,'Start Date:', startDate);
// console.log('End Date:', endDate);
useEffect(()=>{
  getMonthStartAndEndDates(inputDate)
},[inputDate])


console.log(date,"getApiCall")

const calendarGetData = async (getApiCall) => {
  console.log("hello in function",getApiCall)
  const response = await axios.post(baseUrl +'/newtimesheet',getApiCall).then(
    (response) => {
      console.log(response?.data?.data,'sucess data in api Calendar', response?.data?.data?.[0]?.projectData);
      // setEventGetData(response?.data?.data)
      // const lowercasedString = JSON.stringify(response?.data?.data).toLowerCase();

// if (response?.data?.data !== "null" ){

// }
      const newData = (response?.data?.data ?? []).map((item) => {
        return {
          managername: item.managername,
          dateofactivity: item.dateofactivity,
          workedHours:item.workedHours,
          projectData: item.projectData.map((project) => ({
            [project.projectName]: {
              date: project.date,
              projectId: project.projectId,
              projectName: project.projectName,
              hours: project.hours,
              description: project.description,
              employeename: project.employeename,
              status: project.status,
            },
          })),
        };
      });
      
      console.log(newData,"newwdataa",);
      setEventGetData(newData)
      
      // setData()
         // Extract unique projectIds from the API response
    const projectIds = Array.from(
      new Set(
        response?.data?.data?.[0]?.projectData?.map((item) => item.projectId) || []
      )
    );

    // Create an array of objects with projectId and projectName
    const formattedProjectIds = projectIds.map((projectId) => {
      const project = response?.data?.data?.[0]?.projectData?.find(
        (item) => item.projectId === projectId
      );
      return {
        projectId,
        projectName: project?.projectName || ''
      };
    });

    // Update the data state
    setData((prevData) => ({
      ...prevData,
      projectID: formattedProjectIds,
      // You might need to update other properties of the data state as well
    }));
    setApproveData((prevData) => ({
      ...prevData,
      projectId: formattedProjectIds,
      // You might need to update other properties of the data state as well
    }));
    

    },
    (error) => {
      console.log('lllll', error);
    }
  );
}
const HolidayEvents = eventGetData ? 
eventGetData?.map((event)=>({
  title : event.workedHours,
  start: event.dateofactivity,
  end: event.dateofactivity,
  type:"holiday"
 
  
 })) : []
 console.log(eventGetData,"qqqqqqq")
//  project id setting foe get data 
//  const [projectIds, setProjectIds] = useState([]);

//  useEffect(() => {
//    // Extract unique projectIds from projectData
//    const uniqueProjectIds = Array.from(new Set(projectData.map(item => item.projectId)));

//    // Create an array of objects with projectId and projectName
//    const formattedProjectIds = uniqueProjectIds.map(projectId => {
//      const project = projectData.find(item => item.projectId === projectId);
//      return {
//        projectId,
//        projectName: project.projectName
//      };
//    });

//    // Update state with formattedProjectIds
//    setProjectIds(formattedProjectIds);
//  }, [projectData]);


const overallEvents = [...updatedEvents,...HolidayEvents]
const calendarUpdateTimeSheet = async (addTimeSheet) => {
  console.log("hello in function",getApiCall)
  const response = await axios.post(baseUrl +'/updateTimeSheet1',addTimeSheet).then(
    (response) => {
      console.log('sucess data in api add and Update', response?.data?.data);
      // setEventGetData(response?.data?.data)
    },
    (error) => {
      console.log('lllll', error);
    }
  );
}
console.log(eventGetData,"eventGetData")

useEffect(()=>{
  calendarGetData(getApiCall)
  console.log("hello useeffect")
  // calendarUpdateTimeSheet(addTimeSheet)
},[getApiCall.employeeId, getApiCall.DateOfActivity.to])
    
  const renderResults = (
    <CalendarFiltersResult
      filters={filters}
      onFilters={handleFilters}
      //
      canReset={canReset}
      onResetFilters={handleResetFilters}
      //
      results={dataFiltered.length}
      sx={{ mb: { xs: 3, md: 5 } }}
    />
  );
  const timezone = "Asia/Kolkata";
// const eventsExistOnDate = (date, overallEvents) => {
//   // Filter events to find if any event matches the provided date
//   const eventsOnDate = overallEvents?.filter(event => {
//     const eventStartDate = event.start.split('T')[0]; // Extract the start date from the event
//     return eventStartDate === date;
//   }) || []; // Set a default empty array if overallEvents is undefined
//   return eventsOnDate.length > 0; // Return true if events exist, false otherwise
// };
const selectAllowCallback = (selectInfo) => {
  const today = new Date().toISOString().split('T')[0]; // Get current date
  const selectedDate = selectInfo.startStr.split('T')[0]; // Get selected date
  // Check if the selected date is before today and events exist on that date
  if (selectedDate < today && !eventsExistOnDate(selectedDate)) {
    return false; // Disallow selection for past dates without events
  }
  return true; // Allow date selection for other cases
};

//  surendra work 
// radio button 
const [showAutocomplete, setShowAutocomplete] = React.useState(false);

const handleSwitchChange = () => {
  setShowAutocomplete(!showAutocomplete);
};

// const projects = [
//   { projectId: 161, projectName: 'ERP',  },
//   { projectId: 167, projectName: 'ERP TESTING',  },
//   { projectId: 168, projectName: 'PUNCHIN', },
//   // { projectId: 169, projectName: 'ERPBUZZ',  },
//   { projectId: 169, projectName: 'HRMS',  },
//   { projectId: 171, projectName: 'Buzz Staff',  },
// ]
const [projects,setProjects]=useState()
const [data, setData]=useState({
  projectID:[],
  // employeeName:"",

})

useEffect(()=>{
  getProjectName()
  getEmployeeList(data)
},[data.projectID])
const getProjectName = async()=>{
  try {
  
    const data = {
      
        employeeID:employeeID,
        companyID:companyID,
       
      // Other data properties as needed 
    };
    const response = await axios.post(baseUrl+'/getProjectsForEmployee', data).then(
      (response) => {
        console.log(response?.data?.list,'sucesswwww999', response);
        setProjects(response?.data?.list)
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
const getEmployeeList = async(projectData)=>{
  try {
  console.log(projectData?.projectID,"projectdataaaaa")
    const dataPaload = {
      
      projectManager:employeeID,
        companyId:companyID,
        projectIDs:projectData?.projectID,
       
      // Other data properties as needed listEmployeesForProjectManager
    };
    const response = await axios.post(baseUrl+'/listEmployeesForProjectManager', dataPaload).then(
      (response) => {
        console.log('sucesswww9999w', response);
        // setProjectDetails(response?.data?.data)
        setEmployeeList(response?.data?.list)
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

const [employeeList, setEmployeeList]= useState([
  

])

const handleProjectChange = (event, newValue) => {
  setData((prevData) => ({
    ...prevData,
    projectID: newValue,
  }));
  setApproveData((prevData) => ({
    ...prevData,
    projectId: newValue,
  }));
};

const handleEmployeeChange = (event, newValue) => {
  console.log(newValue,"GANG25GANG25")
  setData((prevData) => ({
    ...prevData,
    employeeId: newValue.employeeId,

  }));
  setGetApiCall((prevGetApiCall) => ({
    ...prevGetApiCall,
    employeeId: newValue.employeeId,
  }));
  setApproveData((prevGetApiCall) => ({
    ...prevGetApiCall,
    employeeId: newValue.employeeId,
  }));
  
  
};
console.log(data,"dataatdada",selectedRange)


const onDayData = () => {
  if (selectedRange?.start) {
    // Assuming eventDataMe is defined in the same scope
    console.log(eventGetData,"HolidayEventsHolidayEventsHolidayEvents",selectedRange?.start, )
    // const editDataArray = eventDataMe
    const editDataArray = eventGetData
      .filter((event) => event.projectData && event.dateofactivity === selectedRange?.start) // Filter based on start date
    //   .filter((event) => {console.log(event,"eeeeeeeeee",event.dateofactivity,selectedRange?.start);
    // return(event.projectData && event.dateofactivity === selectedRange?.start)}) // Filter based on start date
      .map((event) => event.projectData)
      .flat(); // Flatten the array of editData arrays

    console.log(editDataArray, "editDataArray",selectedRange?.start);
    // Do something with the extracted editDataArray
    return editDataArray;
  }
};


// for manager Approves
const [approveData, setApproveData]= useState(
  {
    companyId: companyID,
    employeeId: "",
    projectId: [],
    date: {
        from: "",
        to: ""
    }
  }
)
console.log(approveData,"approveData",data)
const onSubmitEdit2 = async (approveData, event) => {
 
  try {
    event.preventDefault();     
    // console.log(editData, "editDataeditData")
    const response = await axios.post(baseUrl + "/monthlyStatusApprove", approveData).then(
      (res) => {
        console.log('sucessmonthlyStatusApprove', res);
        handleClose()
        enqueueSnackbar(res?.data?.message, { variant: 'success' })
        // setCount(count + 1)
      },
      (error) => {
        console.log('lllll', error);
        handleClose()
        enqueueSnackbar(error?.res?.data?.message, { variant: 'warning' })
      }
    );
  } catch (error) {
    console.error(error);
    handleClose()
   
    enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
  }
}

// model   code
const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);


  const onCloseFormRefresh = ()=>{
    onCloseForm()
    // set(count+1)
    // calendarGetData(getApiCall)
  }
// confirmation dialod
// setConfirmDeleteOpen(true);
const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
const handleCancelDelete = () => {
  setConfirmDeleteOpen(false);
};

const handleDeleteConformed=()=>{
  //HIT API 
  console.log("confiramtion dialod for approve")
}
// table permissions
const [tablePermission, setTablePermission] = useState(true);

const handleTypographyClick = (value) => {
  setTablePermission(value);
};
  return (
 <>
     <Container sx={{height:"100%",width:"100%", marginBottom:2}} maxWidth={settings.themeStretch ? false : 'lg'}>
     <Grid container flexDirection={"row"} >
     <Grid item xs={6}>
     <Autocomplete
        id="project-autocomplete"
        fullWidth
        multiple
        options={projects || []}
        value={data.projectID}
        getOptionLabel={(option) => option?.projectName}
        onChange={handleProjectChange}
        renderInput={(params) => <TextField {...params} label="Select Project" />}
      />
</Grid>
<Grid item xs={6} marginBottom={1}>

      <Box>
  <Grid container alignItems="center">
    <Grid item xs={6}>
      <FormControlLabel
        control={<Switch checked={showAutocomplete} onChange={handleSwitchChange} />}
        label="Select Employee"
      />
    </Grid>
    <Grid item xs={6} justifyContent={"flex-end"}>
    <Card sx={{ height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography
        onClick={() => handleTypographyClick(true)}
        sx={{
          cursor: 'pointer',
          color: tablePermission ? 'white' : 'black',
          backgroundColor: tablePermission ? 'black' : 'white',
          padding: '0 5px',
          borderRadius: '5px 0 0 5px',
        }}
      >
        Calendar
      </Typography>
      <Divider orientation="vertical" flexItem sx={{ marginX: 1 }} />
      <Typography
        onClick={() => handleTypographyClick(false)}
        sx={{
          cursor: 'pointer',
          color: !tablePermission ? 'white' : 'black',
          backgroundColor: !tablePermission ? 'black' : 'white',
          padding: '0 5px',
          borderRadius: '0 5px 5px 0',
        }}
      >
        Table
      </Typography>
    </Card>
    </Grid>
  </Grid>

</Box>


      </Grid>
      <Grid  item xs={12} mt={1} mb={1}>
  {showAutocomplete && (
    <Autocomplete
      id="employee-autocomplete"
      fullWidth
      options={employeeList || []}
      value={data.employeeName}
      getOptionLabel={(option) => option?.employeeName}
      onChange={handleEmployeeChange}
      renderInput={(params) => <TextField {...params} label="Select Employee" />}
    />
  )}
  </Grid>
      </Grid>
        {/* <Stack
          alignItems="flex-end"
          justifyContent="flex-end"
        >
      
      
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onOpenForm}
          >
           Leave Request
          </Button>
        </Stack> */}
        {canReset && renderResults}
        <Card>
        { tablePermission  && <StyledCalendar>
            <CalendarToolbar
              date={date}
              view={view}
              loading={eventsLoading}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onToday={onDateToday}
              onChangeView={onChangeView}
              // onOpenFilters={openFilters.onTrue}
            />
            <Calendar
              weekends
              droppable
              selectable
              rerenderDelay={10}
              allDayMaintainDuration
              eventResizableFromStart
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              eventDisplay="block"
              // selectAllow={selectAllowCallback}
              events={overallEvents}
              // events={eventDataMe}
              eventContent={renderEventContent}
              headerToolbar={false}
              select={onSelectRange}
             eventClick={onClickEvent}
              height={smUp ? 720 : 'auto'}
              eventDrop={(arg) => {
                onDropEvent(arg, updateEvent);
              }}
              eventResize={(arg) => {
                onResizeEvent(arg, updateEvent);
              }}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            timeZone = {timezone}
               
            />
          </StyledCalendar>}
          
        </Card>
        {showAutocomplete&& 
        <Grid container justifyContent="flex-end" marginTop={1} xs={12}>
  <Button variant="contained" color="primary" onClick={handleOpen}>
    Approve Time Sheet
  </Button>
</Grid>
}
{tablePermission === false &&  <ApproveTimeSheetTable/>}
      </Container>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openForm}
        onClose={onCloseFormRefresh}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}  
      >
        {/* <DialogTitle sx={{ minHeight: 76 }}> */}
        {openForm && <ModalHeader 
        heading="Add Time Sheet"
        />}
        <CalendarForm
          currentEvent={currentEvent}
          colorOptions={CALENDAR_COLOR_OPTIONS}
          // selectedRange={selectedRange}
          date={selectedRange}
          onClose={onCloseForm}
          projectInfo={data}
          //event data passing
          // eventData={overallEvents}
          editData={onDayData()}
          eventClickMe={onClickEvent} // just using above events
          
        />
        {/* </DialogTitle> */}
      </Dialog>
     
      {/* <Button variant="contained" color="primary" onClick={() => setConfirmDeleteOpen(true)}>
  Approve Time Sheet1
</Button> */}

      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        // onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
         <ModalHeader heading="Approve Time Sheet"/>
        <FormProvider methods={methods} onSubmit={(event) => onSubmitEdit2(approveData, event)}>
          {/* methods={methods} onSubmit={onSubmit} */}
          {/* <DialogTitle>Apply My Compoff</DialogTitle> */}

          <DialogContent>
           


            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                // xs: 'repeat(1, 1fr)',
                // sm: 'repeat(2, 1fr)',
              }}
            >
              
{/* <TextField label="Start Date"></TextField> */}
<CardContent fullWidth>
<Typography>Are you sure you want to Approve Time Sheet</Typography>
</CardContent>        

            </Box>


          </DialogContent>

          <DialogActions>
            <Button variant="outlined" 
            onClick={handleClose}
            >
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
              Approve 
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>


       {/* <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConformed}
        itemName="Approve Time Sheet "
        message={`Are you sure you want to Approve Time Sheet`}
      /> */}
   
    
      </>
  );
}
  // ----------------------------------------------------------------------
  function applyFilter({ inputData, filters, dateError }) {
    const { colors, from_date, to_date } = filters;
    const stabilizedThis = inputData.map((el, index) => [el, index]);
    inputData = stabilizedThis.map((el) => el[0]);
    if (colors.length) {
      inputData = inputData.filter((event) => colors.includes(event.color));
    }
    if (!dateError) {
      if (from_date && to_date) {
        inputData = inputData.filter(
          (event) =>
            fTimestamp(event.from_date_unix) >= fTimestamp(from_date) &&
            fTimestamp(event.to_date_unix) <= fTimestamp(to_date)
        );
      }
    }
    return inputData;
  }
  // Events Style in Calendar 
  function renderEventContent(eventContent) {
    const {event} = eventContent; // Get the event title
    const backgroundColor = event?.title==="Vacation Leave"?"#c9de8c":event?.title==="Sick Leave"?"#e8caf1":event?.title==="Paid Leave"?"#d4a085":event?.title==="Maternity Leave"?"#ffbed1":event?.title==="Personal Leave"?"	#04c4ca":"#6fa8dc"
    return (
      <>
        <div style={{color:"green",fontWeight:"700",backgroundColor,padding:"1px",cursor: "pointer" }}>{event?.title} Hours</div>
        </>
    );
  }
  