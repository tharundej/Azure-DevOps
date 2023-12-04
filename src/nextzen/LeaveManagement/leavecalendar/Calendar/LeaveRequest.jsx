import * as React from 'react';

import Box from '@mui/material/Box';

import { _userList } from 'src/_mock';

import ReusableTabs from '../../../tabs/ReusableTabs';


import CalendarView from '../Calendar/view/calendar-view';
import History from '../../LeaveHistory/LeaveHistory';

export default function LeaveRequest() {
  const tabLabels = ['Leave Schedule','Leave History'];
  const tabContents = [
    <div><CalendarView/></div>,
    <div><History/></div>,
  ];

  return (
    
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom: "none !important" }}/>

  );
}
