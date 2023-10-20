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

import {Card,Stack,Button,Dialog,Container,CardContent,Typography,DialogTitle,Tab,Tabs,IconButton} from '@mui/material';

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

import { BasicTable } from 'src/nextzen/Table/BasicTable';

import { styled } from '@mui/system'; // Import styled from @mui/system

import { LoadingScreen } from 'src/components/loading-screen';

import { useCalendar, useEvent } from '../hooks';

import { StyledCalendar } from '../styles';

import CalendarForm from '../calendar-form';

import CalendarToolbar from '../calendar-toolbar';

import CalendarFilters from '../calendar-filters';

import CalendarFiltersResult from '../calendar-filters-result';




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
  const theme = useTheme();

  const settings = useSettingsContext();

  const smUp = useResponsive('up', 'sm');

  const openFilters = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  const { events, eventsLoading } = useGetEvents();

  const [listOfHolidays,setListOfHolidays]= useState();

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
    const payload = {
      company_id: "COMP1",
       employee_id:"info1"
    
    }
    
    const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `http://192.168.1.17:3001/erp/holidayList`,
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
    title: event.leavetype_name,
    start: event.from_date,
    end: event.to_date,
    type:"leave",
    color:event.color
  }));
 
  const HolidayEvents = listOfHolidays?
  listOfHolidays?.map((event)=>({
    title : event.holiday_name,
    start: event.holiday_date,
    end: event.holiday_date,
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
  const [listData,setListData] = useState();
  const handleChange = (event, value) => {
    setTabIndex(value);
  }
  
  const historydata = [
    {
      appliedleave:"AL",
      from_date:"31/10/2023",
      to_date:"02/11/2023",
      no_of_days:"3",
      day_span:"Full Day",
      leave_reason:"Due to some Personal Work not able to attend the office.",
      leave_status:"Approved",
    },
    {
      appliedleave:"SL",
      from_date:"31-10-2023",
      to_date:"02-11-2023",
      no_of_days:"3",
      day_span:"Full Day",
      leave_reason:"Due to some Personal Work not able to attend the office.",
      leave_status:"Approved",
    }
  ]
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loading,setLoading] = useState(false);
  
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
    url: `http://192.168.1.87:3001/erp/pendingapproved`,
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

  useEffect(()=>{
    if(tabIndex===2){
      PendingApproved(true)
    }
    if(tabIndex===3){
      PendingApproved(false)
    }
  },[tabIndex, PendingApproved ])



  const [expanded, setExpanded] = useState(Array(historydata?.length).fill(false));
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

const dynamicValue = listData?.response?.length;

  return (
    <>

    <Tabs value={tabIndex} onChange={handleChange} indicatorColor="primary"  TabIndicatorProps={{ style: { display: 'none' } }} sx={{marginTop:"5px"}}>
    <CustomTab label="Leave Request" />
      <CustomTab label="History"  />
     <CustomTab label={pendingCount ?`Pending (${pendingCount})`:"Pending"} /> 
      <CustomTab label={approvedCount?`Approved (${approvedCount})`: "Approved"} /> 
    </Tabs>
  <br/>
    {(tabIndex===0) && <>
     <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Stack
          alignItems="flex-end"
          justifyContent="flex-end"
          // sx={{
          //   mb: { xs: 3, md: 5 },
          // }}
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
             // eventClick={onClickEvent}
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
          {openForm && <> {currentEvent?.leave_id ? 'Edit Event' : 'Leave Request'}</>}
        </DialogTitle>

        <CalendarForm
          currentEvent={currentEvent}
          colorOptions={CALENDAR_COLOR_OPTIONS}
          onClose={onCloseForm}
        />
      </Dialog>
      </>
      }
      {(tabIndex === 1) &&
      <>
         
                {
                  historydata?.map((itm,index) => (
                   
                      <Card sx={{margin:"10px"}}>

                        <CardContent >
                          
               { (!expanded[index])?  <>
               <Typography>
                <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.appliedleave}  
                <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
             
              </Typography>
                <Typography><span style={{fontWeight:600}}>Leave Status :  </span>  {itm?.leave_status}
                
                </Typography>
                  </>
                 :<>
                  <Typography >
                            <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.appliedleave} <br/>
                            <span >From : {itm?.from_date} To : {itm?.to_date}</span>
                            <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-up-2-thin"/></IconButton>
               
                  </Typography>
                          <Typography><span>No of leave day(s) : </span> {itm?.no_of_days}
                          
                           </Typography>
                          <Typography><span style={{fontWeight:600}}>Day Span : </span> {itm?.day_span}</Typography>
                          <Typography><span style={{fontWeight:600}}>Leave Reason : </span> {itm?.leave_reason}</Typography>
                          <Typography><span style={{fontWeight:600}}>Leave Status : </span> {itm?.leave_status}</Typography>
                          </>}
                        </CardContent>
                      </Card>
                    )
                  )
               }
        
      </>}
    {(tabIndex === 2) && (
  <>
    {loading ? (
      <LoadingScreen />
    ) : (
      listData?.response != null ? (
        listData?.response?.map((itm, index) => (
          <Card sx={{ margin: "10px" }}>
            <CardContent>
              {!pending[index] ? (
                <>
                  <Typography>
                    <span style={{ fontWeight: 700 }}>Applied Leave : </span> {itm?.Leave_type}
                    <IconButton
                      sx={{ position: 'absolute', top: 15, right: 0 }}
                      onClick={() => handlePending(index)}
                    >
                      <Iconify icon="iconamoon:arrow-down-2-thin" />
                    </IconButton>
                  </Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Status :</span>{itm?.leave_status}</Typography>
                </>
              ) : (
                <>
                  <Typography>
                    <span style={{ fontWeight: 700 }}>Applied Leave : </span> {itm?.Leave_type}<br />
                    <span>From : {itm?.From_date} To : {itm?.To_date}</span>
                    <IconButton
                      sx={{ position: 'absolute', top: 15, right: 0 }}
                      onClick={() => handlePending(index)}
                    >
                      <Iconify icon="iconamoon:arrow-up-2-thin" />
                    </IconButton>
                  </Typography>
                  <Typography><span>No of leave day(s) : </span> {itm?.duration}</Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Reason : </span> {itm?.leave_reason}</Typography>
                  <Typography><span style={{ fontWeight: 600 }}>Leave Status : </span> {itm?.leave_status} </Typography>
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

{(tabIndex === 3) && (
  <>
    {loading ? (
      <LoadingScreen />
    ) : (
      listData?.response != null ? (
        listData?.response?.map((itm, index) => (
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

function renderEventContent(eventContent) {
  const {event} = eventContent; // Get the event title
  const backgroundColor = event?.title==="Vacation Leave"?"#c9de8c":event?.title==="Sick Leave"?"#e8caf1":event?.title==="Paid Leave"?"#d4a085":event?.title==="Maternity Leave"?"#ffbed1":event?.title==="Personal Leave"?"	#04c4ca":"#6fa8dc"
  return (
    
      <div style={{color:"black",fontWeight:"700",backgroundColor,padding:"4px"}}>{event?.title}</div>
    
  );
}
