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
    
        { id: "Project_Id", label: "Project Id", width: 180, type: "text" },
    
        { id: "Project_Name", label: "Project Name", width: 220, type: "text" },
    
        { id: "Date", label: "Date", width: 180, type: "text" },
    
        { id: "Activity", label: "Activity", width: 100, type: "text" },
        { id: "Working_Time", label: "Working Time", width: 100, type: "text" },
        { id: "TotalWorking_Time", label: "TotalWorking Time", width: 100, type: "text" },
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
    
          Project_Name: "BellErp",
    
          Date: "12/12/2023",
    
          Activity: "Coding",
    
          Working_Time: "2hour 40minutes",

          TotalWorking_Time: "122hour 40minutes",

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

headdata={TABLE_HEAD}

bodydata={bodyContent}

rowActions={actions}

/>  
    </>
  );
}
