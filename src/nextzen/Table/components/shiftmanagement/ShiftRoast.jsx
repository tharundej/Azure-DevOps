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
import { BasicTable } from '../../BasicTable'; 
import AddEmployeShift from './AddeployeShift';

// import ReusableTabs from '../tabs/ReusableTabs';
// import './Time.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ShiftRoast() {
   
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
        
        { id: "shift_name", label: "Shift Name", width: 180, type: "text" },
        
        
        { id: "start_time", label: "Start Time", width: 180, type: "text" },
        
        { id: "end_time", label: "End time", width: 100, type: "text" },
        { id: "shift_term", label: "Sift_term", width: 100, type: "text" },
        { id: "shift_group", label: "Shift group", width: 220, type: "text" },
        { id: "supervisor_name", label: "Superior Name", width: 100, type: "text" },
        
        { id: "start_date", label: " Start Date", width: 100, type: "text" },
        { id: "end_date", label: "End Date", width: 100, type: "text" },
        // { id: '', width: 88 },
    
      ];
    
      const defaultPayload={
        "company_id":"COMP2",
        "page":0,
        "search":"ram",
        "externalFilters":{
          "shift_name":"",
          "shift_term":"",
          "shift_group":"",
          "supervisor_name":""
        },
        "count":6,
       "sort":{
          "key":0,
          "orderBy":""
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
 <AddEmployeShift currentUser={{}} />
      </Dialog>
    )}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  <Button className="button" onClick={handleTimeForm}> Add Employe To Shift</Button>
</Container>
    <BasicTable

headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
filterName="ShiftRoastFilter"
bodyData='data'
endpoint='ShiftRoaster'
rowActions={actions}

/>  
    </>
  );
}
