import Calendar from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
//
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import {Card,OutlinedInput,FormControl,Select,MenuItem,InputLabel,Stack,Button,Dialog,Container,CardContent,Typography,DialogTitle,Grid,Tab,Tabs,IconButton,DialogContent} from '@mui/material';
// utils
import { fTimestamp } from 'src/utils/format-time';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import dayjs from 'dayjs';
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';
// api
import { useGetEvents, updateEvent } from 'src/api/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { styled } from '@mui/system'; // Import styled from @mui/system
import { LoadingScreen } from 'src/components/loading-screen';
import { useCalendar, useEvent } from '../hooks';
import { StyledCalendar } from '../styles';
import CalendarForm from '../calendar-form';
import CalendarToolbar from '../calendar-toolbar';
import CalendarFilters from '../calendar-filters';
import CalendarFiltersResult from '../calendar-filters-result';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import formatDateToYYYYMMDD from '../../../../global/GetDateFormat';
// ----------------------------------------------------------------------
const defaultFilters = {
  colors: [],
  from_date: null,
  to_date: null,
};
// ----------------------------------------------------------------------
const CustomTab = styled(Tab)(({ theme }) => ({
 
  padding:"5px",
  color: "#000",
  cursor: "pointer",
  '&.Mui-selected': {
    backgroundColor: "#DFEBFE",
    borderRadius:"0.5rem",
    color:"#3B82F6"
  },
  '&:first-child': {
    marginLeft: '8px', // Add left margin to the first tab
  },
  // '&.Mui-hover': {
  //   backgroundColor: "#EEEEEE",
  //   borderRadius:"0.5rem",
  //   color:"#637381"
  // },
}));
export default function CalendarView() {
 //----------------Calendar -------------------
  
  const theme = useTheme();
  const settings = useSettingsContext();
  const smUp = useResponsive('up', 'sm');
  const openFilters = useBoolean();
  const [filters, setFilters] = useState(defaultFilters);
  const { events, eventsLoading } = useGetEvents();
  const [listOfHolidays,setListOfHolidays]= useState();
  const [dropdownstatus,setDropdownStatus]=useState("")
  const [dropdownLeaveType,setDropdownLeaveType]=useState("")
useEffect(()=>{
  holidayslist();
},[])
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
  const holidayslist = (e) => {
    console.log("holidaysss")
    const payload = {
      companyId: "C1"
      // companyId:localStorage.getItem('companyID')
    };
   
    
    const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `https://qx41jxft-3001.inc1.devtunnels.ms/erp/holidayList`,
    // url:baseUrl + `/holidayList`,
    data:  payload
    }
  axios.request(config).then((response) => {
    setListOfHolidays(response?.data?.data)
  })
    .catch((error) => {
      console.log(error);
    });
  };
  const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);
   console.log(selectEventId,"selevctedeventt",currentEvent)
  useEffect(() => {
    onInitialView();
  }, [onInitialView]);
  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
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
 
  const HolidayEvents = listOfHolidays?
  listOfHolidays?.map((event)=>({
    title : event.holidayName,
    start: event.holidayDate,
    end: event.holidayDate,
    type:"holiday"
   }))
:[]
   const overallEvents = [...updatedEvents,...HolidayEvents]
    
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
  const [tabIndex, setTabIndex] = useState(0);
  
  const handleChange = (event, value) => {
    setTabIndex(value);
  }
// -------------------------------
  // -----------------History,Pending and Approved ---------------------------
  const [listData,setListData] = useState();
  const [historyData,setHistoryData] = useState();
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loading,setLoading] = useState(false);
  const [leaveType,SetLeaveType]= useState();
  const getLeaveType = () => {
    const payload = {
        companyId: "C1"
        // companyId:localStorage.getItem('companyID')
    }
   
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      // url: baseUrl + `/getLeaveType`,
      url: `https://qx41jxft-3001.inc1.devtunnels.ms/erp/getLeaveType`,
      data:  payload
    };
  
    axios.request(config).then((response) => {
      SetLeaveType(response?.data?.list)
    })
  
      .catch((error) => {
        console.log(error);
      });
  }
  const updateCounts = (response) => {
    if (response?.message === "Pending leaves") {
      setPendingCount(response.Count);
    } else if (response?.message === "Approved leaves") {
      setApprovedCount(response.Count);
    }
  
  };
  const PendingApproved =  useCallback((e) => {
    setLoading(true);
    const payload = {
      employee_id:"info1",
      flag:e
    }
    const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    // url: `/erp/pendingapproved`,
    url: baseUrl + `/pendingapproved`,
    data:  payload
    }
  axios.request(config).then((response) => {
    updateCounts(response?.data)
    setListData(response?.data)
    setLoading(false);
  })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, [setListData]);
  const LeaveHistory = () => {
    setLoading(true);
    const payload = {
      "employee_id": "info1",
       "status":(dropdownstatus)?dropdownstatus:"",
       "leavetypename":(dropdownLeaveType)?dropdownLeaveType:"",
       "search": "",
      "Page": 1,
      "Count": 7,
   "externalFilters":{
      
       "apply_date":{
           "from_date":(dates?.applyDatefrom)?dates?.applyDatefrom:"",
           "to_date":(dates?.applyDateto)?dates?.applyDateto:""
       },

       "from_date":{
           "from_date":(dates?.fromDatefrom)?dates?.fromDatefrom:"",
           "to_date":(dates?.fromDateto)?dates?.fromDateto:"",
       },
       "to_date":{
            "from_date":(dates?.toDatefrom)?dates?.toDatefrom:"",
           "to_date":(dates?.toDateto)?dates?.toDateto:""
       }
      }

      // "from_date":(dates?.applyDatefrom)?dates?.applyDatefrom:"",
      // "to_date": (dates?.applyDateto)?dates?.applyDateto:""
    }
     
    const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `https://g3nshv81-3001.inc1.devtunnels.ms/erp/getLeaveHistory`,
    // url: baseUrl + `getLeaveHistory`,
    data:  payload
    }
  axios.request(config).then((response) => {
    console.log(response,"responsee",response.data.list)
    setHistoryData(response.data)
    setLoading(false);
  })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }
  useEffect(()=>{
    if(tabIndex === 1){
      LeaveHistory();
    }
    if(tabIndex===2){
      PendingApproved(true)
    }
    if(tabIndex===3){
      PendingApproved(false)
    }
  },[tabIndex, PendingApproved ])
  const [expanded, setExpanded] = useState(Array(historyData?.list?.length).fill(false));
  const [pending,setPending] = useState(Array(listData?.response?.length).fill(false));
  const [approved,setApproved] = useState(Array(listData?.response?.length).fill(false));
  const handleExpanded=(index)=>{
  const newExpanded = [...expanded];
  newExpanded[index] = !newExpanded[index];
  setExpanded(newExpanded);
}
const handlePending=(index)=>{
  const newExpanded = [...pending];
  newExpanded[index] = !newExpanded[index];
  setPending(newExpanded);
}
const handleApproved=(index)=>{
  const newExpanded = [...approved];
  newExpanded[index] = !newExpanded[index];
  setApproved(newExpanded);
}
// -------------------------
// ------------Filters Dialog-----------------
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflow:"hidden"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
const [open,setOpen]=useState(false);
const [dates,setDates]=useState({
  applyDatefrom:"",
  applyDateto:"",
  fromDatefrom:"",
  fromDateto:"",
  toDatefrom:"",
  toDateto:""
})
const handleClickOpen=()=>{
  getLeaveType()
  setOpen(true);
 
}
const handleClickClose=()=>{
  setOpen(false)
}
const handleApply = async()=>{
 setOpen(false)
 LeaveHistory()
}

const handleCancel = async()=>{
  setDropdownStatus([]);
  setDropdownLeaveType([]);
  setDates({
    applyDatefrom: "",
    applyDateto: "",
    fromDatefrom:"",
    fromDateto:"",
    toDatefrom:"",
    toDateto:""
  });
  setOpen(false);
}
// --------------------------------
  return (
    <>
    <Tabs value={tabIndex} onChange={handleChange} indicatorColor="primary"  TabIndicatorProps={{ style: { display: 'none' } }} sx={{marginTop:"5px"}}>
    <CustomTab label="Leave Request" />
      <CustomTab label="History"  />
     <CustomTab label={pendingCount ?`Pending (${pendingCount})`:"Pending"} /> 
      <CustomTab label={approvedCount?`Approved (${approvedCount})`: "Approved"} /> 
    </Tabs>
  <br/>
  {/* Calendar Tab Code */}
    {(tabIndex===0) && <>
     <Container sx={{height:"100%",width:"100%"}} maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onOpenForm}
          >
           Leave Request
          </Button>
        </Stack>
        {canReset && renderResults}
        <Card>
          <StyledCalendar>
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
              events={overallEvents}
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
          </StyledCalendar>
        </Card>
      </Container>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openForm}
        onClose={onCloseForm}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
      >
        <DialogTitle sx={{ minHeight: 76 }}>
          {openForm && <> {currentEvent?.leaveId ? 'Edit Event' : 'Leave Request'}</>}
        </DialogTitle>
        <CalendarForm
          currentEvent={currentEvent}
          colorOptions={CALENDAR_COLOR_OPTIONS}
          onClose={onCloseForm}
        />
      </Dialog>
      </>
      }
      {/* History Tab Code */}
      {(tabIndex === 1) && (
      <>
       <Stack sx={{display:'flex',alignItems:'flex-end'}} >
            <Button onClick={handleClickOpen} sx={{width:"80px"}}>
           <Iconify icon="mi:filter"/>
      </Button>
      </Stack>
      
     {loading ? 
     <Card sx={{height:"60vh"}}><LoadingScreen/></Card>
     :(historyData?.list != null ? (
                  historyData?.list.map((itm,index) => (
                      <Card sx={{margin:"10px"}}>
                        <CardContent >
                          
               { (!expanded[index])?  <>
               <Typography>
                <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.leaveTypeName}  
                <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
             
              </Typography>
                <Typography><span style={{fontWeight:600}}>Leave Status :  </span>  {(itm?.status===0)?"Pending":(itm?.status===1)?"Approved":"Rejected"}
                
                </Typography>
                  </>
                 :<>
                  <Typography >
                            <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.leaveTypeName} <br/>
                            <span >From : {itm?.fromDate} To : {itm?.toDate}</span>
                            <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-up-2-thin"/></IconButton>
               
                  </Typography>
                          {/* <Typography><span>No of leave day(s) : </span> {itm?.no_of_days}
                          
                           </Typography> */}
                          <Typography><span style={{fontWeight:600}}>Day Span : </span> {itm?.leaveDays} Days</Typography>
                          <Typography><span style={{fontWeight:600}}>Leave Reason : </span> {itm?.comments}</Typography>
                          <Typography><span style={{fontWeight:600}}>Leave Status : </span> {(itm?.status===0)?"Pending":(itm?.status===1)?"Approved":"Rejected"}</Typography>
                          </>}
                        </CardContent>
                      </Card>
                    )
                  )
     ) :
     
     (<div style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
     No Leaves 
   </div>)
     )}

<BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        
        <DialogTitle sx={{textAlign:"center",paddingBottom:0,paddingTop:2}}>Filters
        <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button>
        </DialogTitle>
        <DialogContent sx={{mt:0,paddingBottom:0}}>
          <Grid>
            <Grid>
            <Typography>Apply Date</Typography>
            <Grid container flexDirection="row">
            <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From"
                      value={dates?.applyDatefrom ? dayjs(dates.applyDatefrom) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          applyDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To"
                      value={dates?.applyDateto ? dayjs(dates.applyDateto) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          applyDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
              </Grid>
                </Grid>
                <Grid sx={{marginTop:2}}>
            <Typography>Start Date</Typography>
            <Grid container flexDirection="row">
            <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From"
                      value={dates?.fromDatefrom ? dayjs(dates.fromDatefrom) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          fromDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To"
                      value={dates?.fromDateto ? dayjs(dates.fromDateto) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          fromDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
              </Grid>
                </Grid>
                <Grid sx={{marginTop:2}}>
            <Typography>End Date</Typography>
            <Grid container flexDirection="row">
            <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From"
                      value={dates?.toDatefrom ? dayjs(dates.toDatefrom) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          toDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To"
                      value={dates?.toDateto ? dayjs(dates.toDateto) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          toDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
              </Grid>
                </Grid>
                <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  value={dropdownstatus}
                  onChange={(e)=>setDropdownStatus(e.target.value)}
                  input={<OutlinedInput label="Status" />}
                  MenuProps={MenuProps}
                >
                 
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approve">Approved</MenuItem>
                    <MenuItem value="reject">Rejected</MenuItem>
                  
                </Select>
              </FormControl>
                   </Grid>
                   <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="LeaveTypeName">Leave Type</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_2"
                  id="demo-multiple-status_2"
                  value={dropdownLeaveType}
                  onChange={(e)=>setDropdownLeaveType(e.target.value)}
                  input={<OutlinedInput label="Leave Type" />}
                  MenuProps={MenuProps}
                >
                    {leaveType?.map((status) => (
                <MenuItem value={status.leave_Type_ID} key={status.leave_Type_ID}>
                  {status.leave_Type_Name}
                </MenuItem>
              ))}
                </Select>
              </FormControl>
                   </Grid>
                </Grid>
               </Grid>
           
         </DialogContent>
         <div style={{marginBottom:16}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Cancel</Button></div>
   
    </BootstrapDialog>
      </>
      )}
      {/* Pending Tab Code */}
    {(tabIndex === 2) && (
  <>
    {loading ? 
     <Card sx={{height:"60vh"}}><LoadingScreen/></Card>
     : (
      listData?.data != null ? (
        listData?.data?.map((itm, index) => (
          <Card sx={{ margin: "10px" }}>
            <CardContent>
              {!pending[index] ? (
                <>
                  <Typography>
                    <span style={{ fontWeight: 700 }}>Applied Leave : </span> {itm?.leaveType}
                    <IconButton
                      sx={{ position: 'absolute', top: 15, right: 0 }}
                      onClick={() => handlePending(index)}
                    >
                      <Iconify icon="iconamoon:arrow-down-2-thin" />
                    </IconButton>
                  </Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Status :</span>{itm?.leaveStatus}</Typography>
                </>
              ) : (
                <>
                  <Typography>
                    <span style={{ fontWeight: 700 }}>Applied Leave : </span> {itm?.leaveType}<br />
                    <span>From : {itm?.fromDate} To : {itm?.toDate}</span>
                    <IconButton
                      sx={{ position: 'absolute', top: 15, right: 0 }}
                      onClick={() => handlePending(index)}
                    >
                      <Iconify icon="iconamoon:arrow-up-2-thin" />
                    </IconButton>
                  </Typography>
                  <Typography><span>No of leave day(s) : </span> {itm?.duration}</Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Reason : </span> {itm?.leaveReason}</Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Status : </span> {itm?.leaveStatus} </Typography>
                </>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
          No Pending Leaves
        </div>
      )
    )}
  </>
  )}
  {/* Approved Tab Code */}
{(tabIndex === 3) && (
  <>
    {loading ? 
      <Card sx={{height:"60vh"}}><LoadingScreen/></Card>
    : (
      listData?.data != null ? (
        listData?.data?.map((itm, index) => (
          <Card sx={{ margin: "10px" }}>
            <CardContent>
              {(!approved[index]) ? (
                <>
                  <Typography>
                    <span style={{ fontWeight: 700 }}>Applied Leave: </span> {itm?.Leave_type}
                    <IconButton sx={{ position: 'absolute', top: 15, right: 0 }} onClick={() => handleApproved(index)}>
                      <Iconify icon="iconamoon:arrow-down-2-thin" />
                    </IconButton>
                  </Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Status:</span>{itm?.leave_status}</Typography>
                </>
              ) : (
                <>
                  <Typography>
                    <span style={{ fontWeight: 700 }}>Applied Leave: </span> {itm?.Leave_type}<br />
                    <span>From: {itm?.From_date} To: {itm?.To_date}</span>
                    <IconButton sx={{ position: 'absolute', top: 15, right: 0 }} onClick={() => handleApproved(index)}>
                      <Iconify icon="iconamoon:arrow-up-2-thin" />
                    </IconButton>
                  </Typography>
                  <Typography><span>No of leave day(s):</span> {itm?.duration}</Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Reason:</span> {itm?.leave_reason}</Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Status:</span> {itm?.leave_status} </Typography>
                </>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
          No Approved Leaves
        </div>
      )
    )}
  </>
)}
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
      
        <div style={{color:"black",fontWeight:"700",backgroundColor,padding:"4px"}}>{event?.title}</div>
      
    );
  }
  