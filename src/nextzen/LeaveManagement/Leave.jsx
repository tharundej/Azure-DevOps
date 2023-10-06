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
import Applyleave from './applyleave/ApplyLeave';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function BasicCard() {
  const tabLabels = ['Approve Leave', 'Apply Leave', 'Leave Calendar'];
  const tabContents = [
    <div>
      <Approveleave />
    </div>,
    <div>
      <Applyleave />
    </div>,
    <div>Tab 3 Content</div>,
  ];

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Leave management
        </Typography>
      </CardContent>
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
    </Card>
  );
}
