import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState } from 'react';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import { BasicTable } from '../Table/BasicTable';
import TimeForm from './TimeForm';
import ReusableTabs from '../tabs/ReusableTabs';
import './Time.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TimeApprovals() {
      // const TABLE_HEAD = [
      //   { id: 'SL_NO', label: ' SL NO' },
      //   { id: 'Project_Id', label: 'Project Id', width: 180 },
      //   { id: 'Project_Name', label: 'Project Name', width: 220 },
      //   { id: 'Date', label: 'Date', width: 180 },
      //   { id: 'Activity', label: 'Activity', width: 100 },
      //   { id: 'Working_Time', label: 'Working Time', width: 100 },
      //   { id: 'TotalWorking_Time', label: ' Total Working Time', width: 100 },
      //   { id: 'status', label: ' status', width: 100 },
      //   { id: '', width: 88 },
      // ];
      const TABLE_HEAD = [

        {
    
          id: "SL_NO",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "Employe_Id", label: "Employe Id", width: 180, type: "text" },
        { id: "Employe_Name", label: "Employe Name", width: 180, type: "text" },
    
        { id: "Project_Name", label: "Project_Name", width: 220, type: "text" },    
        { id: "Activity_name", label: "Activity Name", width: 100, type: "text" },
        { id: "Duration", label: "Duration", width: 100, type: "text" },
        { id: "Hours_Worked", label: "Hours Worked", width: 100, type: "text" },
        { id: "status", label: "status", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
     
    
      const actions = [
    
        { name: "approve", icon: "hh", path: "jjj" },
    
        { name: "view", icon: "hh", path: "jjj" },
    
        { name: "eerr", icon: "hh", path: "jjj" },
    
      ];
    
      const bodyContent = [
    
        {
    
          SL_NO: "1",
    
          Project_Id: "Aswin!23",

          Employe_Id: 'Aswi!23',
          
          Employe_Name: "Aswin",

          Project_Name: "BellErp",

    
          Activity_name: "Coding",
    
          Duration: "2hour 40minutes",

          Hours_Worked: "122hour 40minutes",

          status: "Approved",
          
    
        },
    
      ];
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
      const tabLabels = ["Projects" , "My Timesheet" , "Approvals"]
      const tabContents = [
        <div>  </div>
      ]
  return (
    <>

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
 
<Button className="button">Filter</Button>
<Button className="button">Report</Button>
</Container>
    <BasicTable

headdata={TABLE_HEAD}

bodydata={bodyContent}

rowActions={actions}

/>  
    </>
  );
}
