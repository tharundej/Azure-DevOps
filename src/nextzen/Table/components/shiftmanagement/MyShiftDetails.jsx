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
import AssignShift from './AssignShift';

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

export default function MyShiftDetails() {
   
      const TABLE_HEAD = [

        
    
        { id: "employee_name", label: "Employee Name", width: 180, type: "text" },

        { id: "shift_name", label: "Shift Name", width: 180, type: "text" },
    
        // { id: "Shiftgroup_Name", label: "Shift Group Name", width: 220, type: "text" },
        // { id: "Date", label: "Date", width: 220, type: "text" },
    
        { id: "start_time", label: "Start Time", width: 180, type: "text" },
    
        { id: "end_time", label: "End Time", width: 100, type: "text" },
        { id: "start_date", label: "Start Date", width: 100, type: "text" },
        { id: "end_date ", label: "End Date", width: 100, type: "text" },
        { id: "shift_term", label: "Sift Term", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
     
    const defaultPayload ={
      "company_id":localStorage.getItem('companyID'),
      "employee_id":localStorage.getItem('employeeID'),
      "page":0,
      "count":3,
      "Search":"r",
      "externalFilters":{
      "shift_name": "",
      "shift_term": "",
      "startdate":"",
      "enddate":""
   
  },
      "sort": {
      "orderby": "shift_name",
      "key": 0
  } 
   
  }
      // const actions = [
    
      //   { name: "approve", icon: "hh", path: "jjj" },
    
      //   { name: "view", icon: "hh", path: "jjj" },
    
      //   { name: "eerr", icon: "hh", path: "jjj" },
    
      // ];
    
    
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
 <AssignShift currentUser={{}} />
      </Dialog>
    )}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm    }>Assign Shift</Button> */}
{/* <Button className="button">Filter</Button>
<Button className="button">Report</Button> */}
</Container>
    <BasicTable
defaultPayload={defaultPayload}
headerData={TABLE_HEAD}
endpoint='/Myshiftdetails'
bodyData='data'
// rowActions={actions}
filterName='MyShiftFilter'
/>  
    </>
  );
}
