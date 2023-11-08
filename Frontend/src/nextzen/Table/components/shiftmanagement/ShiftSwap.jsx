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

        {
    
          id: "SL_NO",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "Employe_Name", label: "Employe Name", width: 180, type: "text" },

        { id: "FromShift_name", label: "From Shift Name", width: 180, type: "text" },
    
        { id: "from_shift_name", label: " From Shift Group Name", width: 220, type: "text" },
        { id: "start_date", label: "Swap Date", width: 220, type: "text" },
    
        { id: "ToShift_Name", label: "To Shift Name", width: 180, type: "text" },
    
        { id: "ToShiftGroup_Name", label: " ToShift Group Name", width: 100, type: "text" },
        { id: "Status", label: "Status ", width: 100, type: "text" },
        // { id: "End_Date", label: "End Date", width: 100, type: "text" },
        // { id: "Sift_term", label: "Sift_term", width: 100, type: "text" },
    
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
          Employe_Name:"Aight",
    
          FromShift_name: "Aswin!23",
    
          FromShiftgroup_Name: "BellErp",

          Swap_Date: "12/12/2023",
    
          ToShift_Name: "night",
    
          ToShiftGroup_Name: "Coding",
    
          Status: "Swaped",

        //   End_Date: "122hour 40minutes",

        //   Sift_term: "Weakly",
          
    
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
 <ShiftSwapForm currentUser={{}} />
      </Dialog>
    )}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  <Button className="button" onClick={handleTimeForm    }> Shift Swap</Button>
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
