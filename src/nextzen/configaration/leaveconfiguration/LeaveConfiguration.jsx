import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReusableTabs from '../../tabs/ReusableTabs';
import LeavePeriod from './LeavePeriod';
import LeaveType from './LeaveType';
import Holidays from './Holidays';
import WorkWeek from './WorkWeek';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const tabLabels = ['Leave Period', 'Leave Type', 'Holidays','Work week'];
  const tabContents = [
    <div>
      <LeavePeriod/>
    </div>,
    <div>
      <LeaveType/>
    </div>,
    <div>
      <Holidays/>
    </div>,
    <div>
      <WorkWeek/>
    </div>
  ];

export default function BasicCard() {
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
      />
  );
}
