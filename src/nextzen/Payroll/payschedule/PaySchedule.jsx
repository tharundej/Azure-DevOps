import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {BasicTable} from 'src/nextzen/Table/BasicTable';
import { _userList } from 'src/_mock';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const TABLE_HEAD = [
    { id: 'employeeType', label: 'Employee Type' },
    { id: 'payscheduleType', label:'Pay Schedule Type', width: 80 },
    { id: 'payType', label: 'Pay Type', width: 20 },
    { id: 'basicPay', label: 'Basic Pay', width: 20 },
    { id: 'hra', label: 'HRA', width: 20 },
    { id: 'da',label:'DA', width: 20 },
    {id: 'employeePf', label: 'Employee PF', width: 20},
    { id: 'employerPf',label:'Employer PF',width:80},
    {id: 'tds',label:'TDS',width:60}
  ];
  const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
  const tabContents = [
    <div>Tab 1 Content</div>,
    <div>Tab 2 Content</div>,
    <div>Tab 3 Content</div>,
  ];
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Pay Schedule
          
        </Typography>
        <BasicTable headdata={TABLE_HEAD} bodydata={_userList}/>
      </CardContent>
      </Card>
  );
}