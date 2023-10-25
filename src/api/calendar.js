import { useMemo, useState,useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import axios from 'axios';
// utils
import { fetcher, endpoints } from 'src/utils/axios';


// ----------------------------------------------------------------------

const ApplyLeave = "http://192.168.1.17:3001/erp/applyLeave";
const URL = "http://192.168.1.17:3001/erp/appliedLeaveList";


const options = {
  company_id: "COMP1",
   employee_id:"info1"

}


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
  // try {
  // await axios.post(ApplyLeave, eventData);
  // mutate([URL,options]); 
  // }
  // catch(error){
  //    console.log(error.response.data)
  // }
  try {
    const response = await axios.post(ApplyLeave, eventData);
    // Check the response for errors and throw an error if needed.
    if (response.data.success === false) {
      throw new Error(response.data.message);
    }
    // If successful, return any necessary data.
    mutate([URL,options]); 
    return response.data;
  } 
  catch (error) {
    throw error; // Re-throw the error to propagate it up.
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
