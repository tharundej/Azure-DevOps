import Calendar from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
//
import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import {Card,OutlinedInput,FormControl,Select,MenuItem,InputLabel,Stack,Button,Dialog,Container,CardContent,Typography,DialogTitle,Grid,Tab,Tabs,IconButton,DialogContent} from '@mui/material';
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
import CalendarFilters from '../calendar-filters';
import CalendarFiltersResult from '../calendar-filters-result';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import UserContext from 'src/nextzen/context/user/UserConext';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

const defaultFilters = {
  colors: [],
  from_date: null,
  to_date: null,
};

export default function CalendarView() {
 //----------------Calendar -------------------
  
  const theme = useTheme();
  const {user} = useContext(UserContext)
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
      // companyId: "C1"
      companyId:(user?.companyID)?user?.companyID:'',
      locationId:(user?.locationID)?user?.locationID:''
    };
    const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url:baseUrl + `/holidayList`,
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

const eventsExistOnDate = (date, overallEvents) => {
  // Filter events to find if any event matches the provided date
  const eventsOnDate = overallEvents?.filter(event => {
    const eventStartDate = event.start.split('T')[0]; // Extract the start date from the event
    return eventStartDate === date;
  }) || []; // Set a default empty array if overallEvents is undefined

  return eventsOnDate.length > 0; // Return true if events exist, false otherwise
};

const selectAllowCallback = (selectInfo) => {
  const today = new Date().toISOString().split('T')[0]; // Get current date
  const selectedDate = selectInfo.startStr.split('T')[0]; // Get selected date

  // Check if the selected date is before today and events exist on that date
  if (selectedDate < today && !eventsExistOnDate(selectedDate)) {
    return false; // Disallow selection for past dates without events
  }

  return true; // Allow date selection for other cases
};

  return (
 <>
     <Container sx={{height:"100%",width:"100%"}} maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack
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
              selectAllow={selectAllowCallback}
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
        {/* <DialogTitle sx={{ minHeight: 76 }}> */}
        {openForm && <ModalHeader 
        heading={(currentEvent?.leaveId && currentEvent?.leaveStatus==="pending") ? 'Delete Event' :(currentEvent?.leaveId && currentEvent?.leaveStatus==="approved")?"View Request": 'Leave Request'}
        />}
        <CalendarForm
          currentEvent={currentEvent}
          colorOptions={CALENDAR_COLOR_OPTIONS}
          selectedRange={selectedRange}
          onClose={onCloseForm}
        />
        {/* </DialogTitle> */}
      </Dialog>
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
      
        <div style={{color:"black",fontWeight:"700",backgroundColor,padding:"4px",cursor: "pointer" }}>{event?.title}</div>
      
    );
  }
  