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

  console.log(eventsLoading,"event calendar view",events)


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
  const updatedEvents = dataFiltered.map((event) => ({
    title: event.leavetype_name,
    start: event.from_date_unix,
    end: event.to_date_unix,
  }));
  
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
  console.log(dataFiltered); // Log event data
  console.log(view); // Log the current view
  console.log(updatedEvents,"eventssssssssssssssssssssssssss"); // Log the current date
  
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

  useEffect(()=>{
    if(tabIndex===2){
      PendingApproved(true)
    }
    if(tabIndex===3){
      PendingApproved(false)
    }
  },[tabIndex])
  const PendingApproved =(e)=>{
    const payload = {
      employee_id:"ibm2",
      flag:e
    }
    const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `https://898vmqzh-5001.inc1.devtunnels.ms/erp/pendingapproved`,
    data:  payload
  };

  axios.request(config).then((response) => {
    console.log(response,"responsssee",response?.data)
    setListData(response?.data)
  })

    .catch((error) => {
      console.log(error);
    });

  }

  const [expanded, setExpanded] = useState(Array(historydata?.length).fill(false));
  const [pending,setPending] = useState(Array(historydata?.length).fill(false));
  const [approved,setApproved] = useState(Array(historydata?.length).fill(false));
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

const dynamicValue = 1;


console.log(dataFiltered,"filtereddataa")
  return (
    <>

    <Tabs value={tabIndex} onChange={handleChange} indicatorColor="primary"  TabIndicatorProps={{ style: { display: 'none' } }} sx={{marginTop:"5px"}}>
    <CustomTab label="Leave Request" />
      <CustomTab label="History"  />
      <CustomTab label={`Pending (${dynamicValue})`} />
      <CustomTab label={`Approved (${dynamicValue})`} />
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
              onOpenFilters={openFilters.onTrue}
            />

            <Calendar
              weekends
              editable
              droppable
              selectable
              rerenderDelay={10}
              allDayMaintainDuration
              eventResizableFromStart
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              events={updatedEvents}
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
          {openForm && <> {currentEvent?.id ? 'Edit Event' : 'Leave Request'}</>}
        </DialogTitle>

        <CalendarForm
          currentEvent={currentEvent}
          colorOptions={CALENDAR_COLOR_OPTIONS}
          onClose={onCloseForm}
        />
      </Dialog>

      <CalendarFilters
        open={openFilters.value}
        onClose={openFilters.onFalse}
        //
        filters={filters}
        onFilters={handleFilters}
        //
        canReset={canReset}
        onResetFilters={handleResetFilters}
        //
        dateError={dateError}
        //
        events={events}
        colorOptions={CALENDAR_COLOR_OPTIONS}
        onClickEvent={onClickEventInFilters}
      />
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
                            <span >From : {itm?.from_date} <b>-</b> To : {itm?.to_date}</span>
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
      {(tabIndex ===2) && <>
                {
                  listData?.response?.map((itm,index) => (
                   
                      <Card sx={{margin:"10px"}}>

                     
                        <CardContent>
                          
               { (!pending[index])?  <>
               <Typography>
                <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.Leave_type}  
                <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handlePending(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
              
              </Typography>
                <Typography><span style={{fontWeight:600}}>Leave Status :  </span>  {itm?.leave_status}
                
                </Typography>
                  </>
                 :<>
                  <Typography>
                            <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.Leave_type}<br/>
                            <span>From : {itm?.From_date} <b>-</b> To : {itm?.To_date}</span>
                            <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handlePending(index)}><Iconify icon="iconamoon:arrow-up-2-thin"/></IconButton>
                  </Typography>
                          <Typography><span>No of leave day(s) : </span> {itm?.no_of_days}
                          
                           </Typography>
                          <Typography><span style={{fontWeight:600}}>Day Span : </span> 
                         Full Day</Typography>
                          <Typography><span style={{fontWeight:600}}>Leave Reason : </span> {itm?.leave_reason}</Typography>
                          <Typography><span style={{fontWeight:600}}>Leave Status : </span> {itm?.leave_status}</Typography>
                          </>}
                        </CardContent>
                       
                      </Card>
                    )
                  )
                }</>}
      {(tabIndex===3) &&<>
                {
                  listData?.response?.map((itm,index) => (
                   
                      <Card sx={{margin:"10px"}}>

                        <CardContent >
                          
               { (!approved[index])?  <>
               <Typography>
                <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.Leave_type}
                <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleApproved(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
               
              </Typography>
                <Typography><span style={{fontWeight:600}}>Leave Status :  </span>  {itm?.leave_status}
                
                </Typography>
                  </>
                 :<>
                  <Typography >
                            <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.Leave_type}<br/>
                            <span>From : {itm?.from_date} <b>-</b> To : {itm?.to_date}</span>
                            <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleApproved(index)}><Iconify icon="iconamoon:arrow-up-2-thin"/></IconButton>
                
                  </Typography>
                          <Typography><span>No of leave day(s) : </span> {itm?.no_of_days}
                          
                           </Typography>
                          <Typography><span style={{fontWeight:600}}>Day Span : </span> Full Day</Typography>
                          <Typography><span style={{fontWeight:600}}>Leave Reason : </span> {itm?.leave_reason}</Typography>
                          <Typography><span style={{fontWeight:600}}>Leave Status : </span> {itm?.leave_status}</Typography>
                          </>}
                        </CardContent>
                      </Card>
                    )
                  )
                }</>}
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
console.log(inputData,"inputdataaaa")
  return inputData;
}
