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
import ShiftSwapForm from './ShiftSwapForm';

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

export default function ShiftSwap() {
   
      const TABLE_HEAD = [

    
    
        { id: "employee_name", label: "Employee Name", width: 180, type: "text" },

        { id: "from_shift_name", label: "Old Shift Name", width: 180, type: "text" },
    
        // { id: "FromShiftgroup_Name", label: " From Shift Group Name", width: 220, type: "text" },
        { id: "to_shift_name", label: "New Shift Name", width: 220, type: "text" },
        { id: "start_date", label: "Swap Date", width: 220, type: "text" },
    
        // { id: "to_shift_name", label: "To Shift Name", width: 180, type: "text" },
    
        // { id: "ToShiftGroup_Name", label: " ToShift Group Name", width: 100, type: "text" },
        { id: "status", label: "Status ", width: 100, type: "badge" },
        // { id: "End_Date", label: "End Date", width: 100, type: "text" },
        // { id: "Sift_term", label: "Sift_term", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
     const defaultPayload = {
      "company_id":localStorage.getItem('companyID'),
      "location_id":32,
      "page":0,
      "Search":"",
      "count": 10,
      "externalFilters":{
      "status": "",
      "swap_date": {
           "from": "",
          "to": ""
      }
  } ,
      "sort": {
      "orderby": "",
      "key": 0
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
      {/* {showForm && (
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
 <ShiftSwapForm currentUser={{}} />
      </Dialog>
    )} */}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm    }> Shift Swap</Button> */}
{/* <Button className="button">Filter</Button>
<Button className="button">Report</Button> */}
</Container>
    <BasicTable

headerData={TABLE_HEAD}
endpoint="/MyShiftSwap"
bodyData='data'
defaultPayload={defaultPayload}
filterName="SwapSearchFilter"
// rowActions={actions}

/>  
    </>
  );
}
