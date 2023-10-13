import Calendar from '@fullcalendar/react'; // => request placed at the top

import interactionPlugin from '@fullcalendar/interaction';

import listPlugin from '@fullcalendar/list';

import dayGridPlugin from '@fullcalendar/daygrid';

import timeGridPlugin from '@fullcalendar/timegrid';

import timelinePlugin from '@fullcalendar/timeline';
//
import { useState, useEffect, useCallback } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';

import {Card,Stack,Button,Dialog,Container,CardContent,Typography,DialogTitle,Tab,Tabs} from '@mui/material';

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


// ----------------------------------------------------------------------

const defaultFilters = {
  colors: [],
  startDate: null,
  endDate: null,
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

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
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

  const canReset = !!filters.colors.length || (!!filters.startDate && !!filters.endDate);

  const dataFiltered = applyFilter({
    inputData: events,
    filters,
    dateError,
  });

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

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, value) => {
    setTabIndex(value);
  }

  const historydata = [
    {
      appliedleave:"AL",
      from_date:"31-10-2023",
      to_date:"02-11-2023",
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

  return (
    <>

    <Tabs value={tabIndex} onChange={handleChange} indicatorColor="primary"  TabIndicatorProps={{ style: { display: 'none' } }} sx={{marginTop:"5px"}}>
    <CustomTab label="Leave Request" />
      <CustomTab label="History"  />
      <CustomTab label="Pending" />
      <CustomTab label="Approved" />
    </Tabs>
  <br/>
    {(tabIndex===0) && <>
     <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          {/* <Typography variant="h4">Calendar </Typography> */}
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onOpenForm}
          >
            New Event
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
              events={dataFiltered}
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
          {openForm && <> {currentEvent?.id ? 'Edit Event' : 'Add Event'}</>}
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
      </>}
      {(tabIndex === 1) &&<>
    <Card>
      <CardContent>
                {
                  historydata?.map((itm) => (
                   
                      <Card >
                        <CardContent >
                          <Typography><span style={{fontWeight:500}}>Applied Leave:</span> {itm?.appliedleave}</Typography>
                          <Typography><span>No of leave day(s):</span> {itm?.no_of_days}</Typography>
                          <Typography><span>Day Span:</span> {itm?.day_span}</Typography>
                          <Typography><span>Leave Reason:</span> {itm?.leave_reason}</Typography>
                          <Typography><span>Leave Status:</span> {itm?.leave_status}</Typography>
                        </CardContent>
                      </Card>
                    )
                  )
                }
      </CardContent>
    </Card>
      </>}
      {(tabIndex ===2) && <>Pending</>}
      {(tabIndex===3) &&<>Approved</>}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters, dateError }) {
  const { colors, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  inputData = stabilizedThis.map((el) => el[0]);

  if (colors.length) {
    inputData = inputData.filter((event) => colors.includes(event.color));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (event) =>
          fTimestamp(event.start) >= fTimestamp(startDate) &&
          fTimestamp(event.end) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
