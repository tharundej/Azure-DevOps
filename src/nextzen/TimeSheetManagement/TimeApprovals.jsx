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
    
          id: "",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "employee_id", label: "Employe Id", width: 180, type: "text" },
        { id: "employee_name", label: "Employe Name", width: 180, type: "text" },
    
        { id: "project_name", label: "Project Name", width: 220, type: "text" },    
        { id: "activity_name", label: "Activity Name", width: 220, type: "text" },
        { id: "duration", label: "Duration", width: 100, type: "text" },
        { id: "hours_worked", label: "Hours Worked", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
     const defaultPayload={
      "count": 2,
      "page": 1,
      "search": "",
      "employee_id": "E1",
      "externalFilters": {
        "employee_name": "",
        "project_name": "",
        "activity_name": "",
        "status": ""
      },
      "sort": {
        "key": 1,
        "orderBy": "project_name"
      }
    }
    
      const actions = [
    
        { name: "approve", icon: "hh", path: "jjj" },
    
        { name: "view", icon: "hh", path: "jjj" },
    
        { name: "eerr", icon: "hh", path: "jjj" },
    
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
 
{/* <Button className="button">Filter</Button>
<Button className="button">Report</Button> */}
</Container>
    <BasicTable

headerData={TABLE_HEAD}
filterName='ApprovalSearchFilter'
// bodydata={bodyContent}
defaultPayload={defaultPayload}
endpoint='/timeSheetApprovals'
bodyData="timesheets"

rowActions={actions}

/>  
    </>
  );
}
