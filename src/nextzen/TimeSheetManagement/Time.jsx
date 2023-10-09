import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState } from 'react';
import { BasicTable } from '../Table/BasicTable';
import TimeForm from './TimeForm';

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
        { id: 'SL_NO', label: ' SL NO' },
        { id: 'Project_Id', label: 'Project Id', width: 180 },
        { id: 'Project_Name', label: 'Project Name', width: 220 },
        { id: 'Date', label: 'Date', width: 180 },
        { id: 'Activity', label: 'Activity', width: 100 },
        { id: 'Working_Time', label: 'Working Time', width: 100 },
        { id: 'TotalWorking_Time', label: ' Total Working Time', width: 100 },
        { id: 'status', label: ' status', width: 100 },
        { id: '', width: 88 },
      ];
      const [showForm, setShowForm] = useState  (false);

      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
  return (
    <>
      {showForm && (
      <TimeForm currentUser={{}}/>
    )}
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Time sheet  management
          
        </Typography>
       
      
       
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleTimeForm}>Learn More</Button>
      </CardActions>
    </Card>
    <BasicTable  headdata={TABLE_HEAD} bodydata={_userList}/>
  
    </>
  );
}
