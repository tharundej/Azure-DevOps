import { useMemo, useState,useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import axios from 'axios';
// utils
import { fetcher, endpoints } from 'src/utils/axios';


// ----------------------------------------------------------------------

const ApplyLeave = "https://qx41jxft-3001.inc1.devtunnels.ms/erp/applyLeave";
const URL = "https://qx41jxft-3001.inc1.devtunnels.ms/erp/appliedLeaveList";




const options = {
    company_id:"c1",
    employee_id:"E1"
};



export function useGetEvents() {

  const { data, isLoading, error, isValidating } = useSWR([URL,options] ,fetcher);

  const memoizedValue = useMemo(() => {
    const events = data?.map((event) => ({
      ...event,
    }));
console.log(events,"eventsssss")
    return {
      events: events || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.length,
    };
  }, [data, error, isLoading, isValidating]);
  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createEvent(eventData) {
  console.log(eventData,"eventdata")
  /**
   * Work on server
   */
  // const data = { eventData };
  try {
  await axios.post(ApplyLeave, eventData);
  mutate([URL,options]); 
  }
  catch(error){
     console.log(error)
  }
  /**
   * Work in local
   */
  // mutate(
  //   URL,
  //   (currentData) => {
  //     const events = [...currentData.events, eventData];

  //     return {
  //       ...currentData,
  //       events,
  //     };
  //   },
  //   false
  // );

}

// ----------------------------------------------------------------------

export async function updateEvent(eventData) {
  /**
   * Work on server
   */
  // const data = { eventData };
  // await axios.put(endpoints.calendar, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData) => {
      const events = currentData.events.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteEvent(eventId) {
  /**
   * Work on server
   */
  // const data = { eventId };
  // await axios.patch(endpoints.calendar, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData) => {
      const events = currentData.events.filter((event) => event.id !== eventId);

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}
