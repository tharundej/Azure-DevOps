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

export default function TimeSheetTable() {
     
      const TABLE_HEAD = [

        {
    
          id: "SL_NO",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "Project_id", label: "Project Id", width: 180, type: "text" },
    
        { id: "project_name", label: "Project Name", width: 220, type: "text" },
    
        { id: "date_of_activity", label: "date_of_activity", width: 180, type: "text" },
    
        { id: "activity_name", label: "activity_name", width: 100, type: "text" },
        { id: "working_time", label: "Working Time", width: 100, type: "text" },
        { id: "Total_working_time", label: "TotalWorking Time", width: 100, type: "text" },
        { id: "status", label: "status", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
 
    
     
    const defaultPayload={
      "employee_id":"ibm2",

      "Page":0,
  
      "Count":30,
  
      "search":"",
  
      "externalfilter":{
  
               "project_name":"testing51",
  
               "activity_name":"",
  
               "Status":"",
  
               "from_date":"2023-10-10",
  
               "to_date":"2023-12-10"
  
      },
  
      "sort":{
  
          "key":1,
  
          "orderBy":"pa.activity_name"
  
      }
    }
      const actions = [
    
        { name: "approve", icon: "hh", path: "jjj" },
    
        { name: "view", icon: "hh", path: "jjj" },
    
        { name: "eerr", icon: "hh", path: "jjj" },
    
      ];
    
      const bodyContent = [
    
        {
    
          SL_NO: "1",
    
          Project_id: "Aswin!23",
    
          project_name: "BellErp",
    
          date_of_activity_name: "12/12/2023",
    
          activity_name: "Coding",
    
          working_time: "2hour 40minutes",

          Total_working_time: "122hour 40minutes",

          status: "Approved",
          aswin: "Approved",
    
        },
    
      ];
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
    
  return (
    <>
      {showForm && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <TimeForm currentUser={{}} />
      </Dialog>
    )}
   
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  <Button className="button" onClick={handleTimeForm}>Add Time Sheet</Button>
<Button className="button" >Filter</Button>
<Button className="button" >Report</Button>
</Container>
 <BasicTable
 defaultPayload={defaultPayload}
 headerData={TABLE_HEAD}
 endpoint='Mytimesheets'
 bodyData='response'
 />
    </>
  );
}
