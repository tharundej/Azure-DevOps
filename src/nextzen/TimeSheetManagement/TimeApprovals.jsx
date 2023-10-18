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
      //   { id: 'project_name', label: 'Project Name', width: 220 },
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
    
        { id: "employee_id", label: "Employe Id", width: 180, type: "text" },
        { id: "employee_name", label: "Employe Name", width: 180, type: "text" },
    
        { id: "project_name", label: "project_name", width: 220, type: "text" },    
        { id: "activity_name", label: "Activity Name", width: 100, type: "text" },
        { id: "duration", label: "duration", width: 100, type: "text" },
        { id: "hours_worked", label: "Hours Worked", width: 100, type: "text" },
        { id: "status", label: "status", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
     const defaultPayload={
      
    "employee_id": "E1",      // Replace with the actual employee ID

    "page": "1",

    "limit": "2",

    "sort_by": "employee_name",  // Replace with the desired sorting field

    "sort_order": "asc",         // Replace with "asc" or "desc"

 

    "search": "",            // Replace with the search term

    "filter_employee_name": "",  // Replace with the desired filter values

    "filter_project_name": "",

    "filter_activity_name": "",

    "filter_status": ""
     }
    
      const actions = [
    
        { name: "approve", icon: "hh", path: "jjj" },
    
        { name: "view", icon: "hh", path: "jjj" },
    
        { name: "eerr", icon: "hh", path: "jjj" },
    
      ];
    
      const bodyContent = [
    
        {
    
          SL_NO: "1",
    
          Project_Id: "Aswin!23",

          employee_id: 'Aswi!23',
          
          employee_name: "Aswin",

          project_name: "BellErp",

    
          activity_name: "Coding",
    
          duration: "2hour 40minutes",

          hours_worked: "122hour 40minutes",

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

headerData={TABLE_HEAD}

// bodydata={bodyContent}
defaultPayload={defaultPayload}
endpoint='timeSheetApprovals'

rowActions={actions}

/>  
    </>
  );
}
