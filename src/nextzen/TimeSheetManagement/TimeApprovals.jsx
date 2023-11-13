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
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TimeApprovals() {

      const TABLE_HEAD = [

        {
    
          id: "",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "employeeId", label: "Employe Id", width: 180, type: "text" },
        { id: "employeeName", label: "Employe Name", width: 180, type: "text" },
    
        { id: "projectName", label: "Project Name", width: 220, type: "text" },    
        { id: "activityName", label: "Activity Name", width: 220, type: "text" },
        { id: "duration", label: "Duration", width: 100, type: "text" },
        { id: "hoursWorked", label: "Hours Worked", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];



      const onClickActions=(rowdata,event)=>{
        console.log("row dataaaaaa")
        var payload ={
          "project_id": rowdata?.projectId,
          "employee_id": rowdata?.employeeId,
          "status": parseInt( event?.id),          
       }
      console.log(payload,"requestedddbodyyy")
      const config = {
        method: 'POST',
        maxBodyLength:Infinity,
        url: baseUrl + `/updateTimesheetStatus`,
        // url: `https://27gq5020-3001.inc1.devtunnels.ms/erp/approveLeave`,
        data: payload
     
      }
      axios.request(config).then((response) => {
        enqueueSnackbar(response.data.Message,{variant:'success'})
      })
        .catch((error) => {
          enqueueSnackbar(error.Message,{variant:'Error'})
          console.log(error);
        });
     
      }
    
     const defaultPayload={
      "count": 2,
      "page": 1,
      "search": "",
      "employeeId": "info1",
      "externalFilters": {
        "employeeName": "",
        "projectName": "",
        "activityName": "",
        "status": ""
      },
      "sort": {
        "key": 1,
        "orderBy": ""
      }
    }
    
      const actions = [
    
        { name: "Approve", icon: "hh", id: "1", type: "serviceCall", endpoint: '/updateTimesheetStatus'},
    
        { name: "Reject", icon: "hh", id: "0", type: "serviceCall", endpoint: '/updateTimesheetStatus' },
    
      ];
    
  
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }

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
bodyData="timeSheets"
onClickActions={onClickActions}
rowActions={actions}

/>  
    </>
  );
}