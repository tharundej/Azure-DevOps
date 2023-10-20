import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import instance from 'src/api/BaseURL';
import { BasicTable } from '../Table/BasicTable';
import TimeForm from './TimeForm';
import ReusableTabs from '../tabs/ReusableTabs';
import './Time.css';
import AddTimeProject from './AddTimeProject';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TimeProject() {
   
      const TABLE_HEAD = [

        {
    
          id: "",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "project_id", label: "Project Id", width: 180, type: "text" },
    
        { id: "project_name", label: "Project Name", width: 220, type: "text" },
    
        { id: "start_date", label: "start_date", width: 180, type: "text" },
    
        { id: "end_date", label: "end_date", width: 100, type: "text" },
        { id: "due_date", label: "due date", width: 100, type: "text" },
        { id: "status", label: "status", width: 100, type: "text" },
        { id: "activity_name", label: "activity_name", width: 100, type: "text" },
    
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
    
          project_id: "Aswin!23",
    
          project_name: "BellErp",
    
          start_date: "12/12/2023",
    
          end_date: "Coding",
    
          due_date: "2hour 40minutes",

          activity_name: "122hour 40minutes",

          status: "Approved",
         
    
        },
    
      ];
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      } 
      
    
      const[tableData,SetTableData] = useState({})
      console.log("🚀 ~ file: TimeProject.jsx:113 ~ TimeProject ~ tableData:", tableData)

  const defaultPayload={
    "page": 1,

    "count": 10,

    "search": "testing",

    "externalFilters": {

        "start_date": "",

        "end_date": "",

        "project_name": "",

        "status": "",

        "activity_name": ""

    },

    "sort": {

        "key": 0,

        "orderBy": "project_id"

    }
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
 <AddTimeProject currentUser={{}} />
      </Dialog>
    )}
<hr style={ {height:'2px',margin:"20px",backgroundColor:"blac"}}/>
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  <Button className="button" onClick={handleTimeForm}>Add Project</Button>
<Button className="button">Filter</Button>
<Button className="button">Report</Button>
</Container>
    <BasicTable

headerData={TABLE_HEAD}
defaultPayload={defaultPayload}

endpoint='listProject'
bodyData='data'
rowActions={actions}

/>  
    </>
  );
}
