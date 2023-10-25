import * as React from 'react';

import Box from '@mui/material/Box';

import Card from '@mui/material/Card';

import CardActions from '@mui/material/CardActions';

import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import { _userList } from 'src/_mock';

import ReusableTabs from '../tabs/ReusableTabs';

import Approveleave from './approveleave/ApproveLeave';

import CalendarView from './leavecalendar/Calendar/view/calendar-view';


const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function BasicCard() {
  const tabLabels = ['Approve Leave','Leave Calendar'];
  const tabContents = [
    <div>
      <Approveleave />
    </div>,
    <div><CalendarView/></div>,
  ];

  return (
    
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />

  );
}