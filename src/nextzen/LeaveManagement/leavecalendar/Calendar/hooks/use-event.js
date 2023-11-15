import { useMemo } from 'react';
import merge from 'lodash/merge';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

// ----------------------------------------------------------------------

export default function useEvent(events, selectEventId, selectedRange, openForm) {
  console.log(events,"eventsss",selectEventId)
  const currentEvent = events.find((event) => event.leaveId === parseInt(selectEventId));
  console.log(currentEvent,"currenteventt",selectEventId)
  const defaultValues = useMemo(
    () => ({
      leaveTypeId:0,
      companyId: localStorage.getItem('companyID'),
      employeeId:localStorage.getItem('employeeID'),
      applyDate:"",
      status:"pending",
      fullday:"0",
      firsthalf:"0",
      secondhalf:"0",
      attachment: "",
      status_date:"",
      comments: "",
      fromDate: selectedRange ? selectedRange.start : new Date().getTime(),
      toDate: selectedRange ? selectedRange.end : new Date().getTime(),
      color:"#ffffff"
    }),
    [selectedRange]
  );

  if (!openForm) {
    return undefined;
  }

  if (currentEvent || selectedRange) {
    return merge({}, defaultValues, currentEvent);
  }

  return defaultValues;
}