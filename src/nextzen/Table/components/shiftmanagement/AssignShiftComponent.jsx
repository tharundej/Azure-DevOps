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

export default function AssignShiftComponent() {
   
      const TABLE_HEAD = [

        {
    
          id: "",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "shift_name", label: "Shift Name", width: 180, type: "text" },
    
        { id: "shift_group_name", label: "Shift Group Name", width: 220, type: "text" },
    
        { id: "start_time", label: "Start Time", width: 180, type: "text" },
    
        { id: "end_time", label: "End time", width: 100, type: "text" },
        { id: "start_date", label: "Start Date", width: 100, type: "text" },
        { id: "end_date", label: "End Date", width: 100, type: "text" },
        { id: "shift_term", label: "Sift Term", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
    
      const onClickActions=(rowdata,event)=>{
        console.log("row dataaaaaa")
        var payload ={
          "project_id": rowdata?.project_id,
        
       }
      console.log(payload,"requestedddbodyyy")
      const config = {
        method: 'POST',
        maxBodyLength:Infinity,
        url: baseUrl + `/DeleteShiftRoaster`,
        // url: `https://27gq5020-3001.inc1.devtunnels.ms/erp/approveLeave`,
        data: payload
     
      }
      axios.request(config).then((response) => {
        enqueueSnackbar(response.data.message,{variant:'success'})
      })
        .catch((error) => {
          enqueueSnackbar(error.message,{variant:'Error'})
          console.log(error);
        });
     
      }
    
    
      const actions = [
    
        { name: "Edit", icon: "hh", id: "0", type: "serviceCall", endpoint: '/updateTimesheetStatus'},
        { name: "Delete", icon: "hh", id: "0", type: "serviceCall", endpoint: '/DeleteShiftRoaster'},
      ];
    
      const defaultPayload ={
        "cid": "COMP2",
        "locationId":32,
        "search": "",
        "page": 1,
        "count": 10,
        "externalFilters": {
            "shift_term": "",
            "start_date": "",
            "end_date": "",
            "shift_name": ""
        },
        "sort": {
            "key": 0,
            "orderBy": ""
        }
    }
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
 <AssignShift currentUser={{}} />
      </Dialog>
    )} */}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm}>Assign Shift</Button> */}
{/* <Button className="button">Filter</Button>
<Button className="button">Report</Button> */}
</Container>
    <BasicTable

headerData={TABLE_HEAD}
endpoint="/getAssignshift"
bodyData='data'
defaultPayload={defaultPayload}

filterName='AssignShiftFilter'
rowActions={actions}
onClickActions={onClickActions}

/>  
    </>
  );
}
