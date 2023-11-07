import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReusableTabs from '../../tabs/ReusableTabs';
import ExpenseClaimConfiguration from './ExpenseClaimView';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const tabLabels = ['Expensive Claim Config'];
  const tabContents = [
    <div>
      <ExpenseClaimConfiguration/>
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
