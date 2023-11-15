import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReusableTabs from '../../tabs/ReusableTabs';
import ShiftConfigView from './ShiftConfigView';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const tabLabels = ['Shift Config'];
  const tabContents = [
    <div>
      <ShiftConfigView/>
    </div>
  ];

export default function BasicCard() {
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
        tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}
      />
  );
}
