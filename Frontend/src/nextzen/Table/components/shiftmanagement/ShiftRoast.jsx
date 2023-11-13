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
    
          id: "SL_NO",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        
        { id: "Employe_id", label: "Employe Id", width: 180, type: "text" },
        
        { id: "Employe_Name", label: "Employe Name", width: 180, type: "text" },
        
        { id: "Shift_name", label: "Shift Name", width: 180, type: "text" },
        
        
        { id: "Start_Time", label: "Start Time", width: 180, type: "text" },
        
        { id: "End_time", label: "End time", width: 100, type: "text" },
        { id: "Sift_term", label: "Sift_term", width: 100, type: "text" },
        { id: "Shift_group", label: "Shift group", width: 220, type: "text" },
        { id: "Superior_Name", label: "Superior Name", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
     
    
      const actions = [
    
        { name: "approve", icon: "hh",  },
    
        { name: "view", icon: "hh",  },
    
        { name: "eerr", icon: "hh",  },
    
      ];
    
      const bodyContent = [
    
        {
    
          SL_NO: "1",
          
          Employe_id: "As1223",
          
          Employe_Name: "Aswin",

          Shift_name: "Aswin!23",
    
          Shift_group: "BellErp",
    
          Start_Time: "12/12/2023",
    
          End_time: "12/12/2023",
    
          Superior_Name:"bindu",

          Sift_term: "Approved",
          
    
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
 <AddEmployeShift currentUser={{}} />
      </Dialog>
    )}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  <Button className="button" onClick={handleTimeForm}> Add Employe To Shift</Button>
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
