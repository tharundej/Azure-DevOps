import { useState, useCallback, useRef } from 'react';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
// utils
import { fTimestamp } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function useCalendar() {
  const calendarRef = useRef(null);

  const calendarEl = calendarRef.current;

  const smUp = useResponsive('up', 'sm');

  const [date, setDate] = useState(new Date());

  const [openForm, setOpenForm] = useState(false);

  const [selectEventId, setSelectEventId] = useState('');

  const [selectedRange, setSelectedRange] = useState(null);

  const [view, setView] = useState(smUp ? 'dayGridMonth' : 'listWeek');
  console.log(date,"datedate")

  const onOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const onCloseForm = useCallback(() => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectEventId('');
  }, []);

  const onInitialView = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      const newView = smUp ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarEl, smUp]);

  const onChangeView = useCallback(
    (newView) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.changeView(newView);
        setView(newView);
      }
    },
    [calendarEl]
  );

  const onDateToday = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
      
    }
  }, [calendarEl]);
  

  const onDatePrev = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDateNext = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onSelectRange = useCallback(
    (arg) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();
        calendarApi.unselect();
      }
     
      onOpenForm();
      setSelectedRange({
        start: arg.startStr,
        end:arg.endStr ,
      });
    },
  
    [calendarEl, onOpenForm]
   
  );

 

  const onClickEvent = useCallback(
    
    // (arg) => {
    //   const { event } = arg;
    //   if (event.extendedProps.type === 'holiday') {
    //     return;
    //   }
    //   onOpenForm();
    //   setSelectEventId(event.id);
    // },
    // [onOpenForm]
  );


  const onResizeEvent = useCallback((arg, updateEvent) => {
    const { event } = arg;

    updateEvent({
      // id: event.id,
      fromDate: fTimestamp(event.fromDate),
      toDate: fTimestamp(event.toDate),
    });
  }, []);

  const onDropEvent = useCallback((arg, updateEvent) => {
    const { event } = arg;

    updateEvent({
      // id: event.id,
      fromDate: fTimestamp(event.fromDate),
      toDate: fTimestamp(event.toDate),
    });
  }, []);

  const onClickEventInFilters = useCallback(
    (eventId) => {
      if (eventId) {
        onOpenForm();
        setSelectEventId(eventId);
      }
    },
    [onOpenForm]
  );

  return {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onClickEvent,
    onChangeView,
    onSelectRange,
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
  };
}


