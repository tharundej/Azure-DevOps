import { useMemo } from 'react';
import merge from 'lodash/merge';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

// ----------------------------------------------------------------------

export default function useEvent(events, selectEventId, selectedRange, openForm) {
  const currentEvent = events.find((event) => event.id === selectEventId);
  console.log(currentEvent,"currenteventt",selectEventId)
  const defaultValues = useMemo(
    () => ({
      leave_type_id:0,
      company_id: "C1",
      employee_id:"E1",
      apply_date:"",
      status:"pending",
      fullday:"0",
      firsthalf:"0",
      secondhalf:"0",
      attachment: "",
      status_date:"",
      comments: "",
      from_date: selectedRange ? selectedRange.start : new Date().getTime(),
      to_date: selectedRange ? selectedRange.end : new Date().getTime(),
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
