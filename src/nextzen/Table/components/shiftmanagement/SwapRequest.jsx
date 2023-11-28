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

export default function Swaprequest() {
   
      const TABLE_HEAD = [

      
    
        { id: "employeeShiftSwapId", label: "Employee Shift Swap ID", width: 180, type: "text" },

        { id: "employeeName", label: "Employee Name", width: 180, type: "text" },
        { id: "fromShiftGroup", label: "From Shift Group", width: 180, type: "text" },
        { id: "toShiftGroup", label: "To Shift Group", width: 180, type: "text" },
    
        // { id: "Shiftgroup_Name", label: "Shift Group Name", width: 220, type: "text" },
        // { id: "Date", label: "Date", width: 220, type: "text" },
    
    
        { id: "requestDate", label: "Request Date", width: 100, type: "text" },
        // { id: "company_id ", label: "Compony ID", width: 100, type: "text" },
        { id: "startDate", label: "Start Date", width: 100, type: "text" },
        // { id: "endDate", label: "End Date", width: 100, type: "text" },
        { id: "comment", label: "Comment", width: 100, type: "text" },
        
        { id: "status", label: "Status", width: 100, type: "badge" },
        // { id: '', width: 88 }, 
    
      ];
    
     
    const defaultPayload ={
      "companyId":localStorage.getItem('companyID'),
      "supervisorId":"ibm5",
      "count":7,
      "page":0,
      "search":"",
      "externalFilters":{
      "requestDate":{
      "fromRequestDate":"",
      "toRequestDate":""
      },
      "startDate":{
      "fromStartDate":"",
      "toStartDate":""
      },
      "status":""
  }, 
      "sort":{
      "key":0,
      "order":"employeeName"
  }
  }

  const onClickActions=(rowdata,event) => {
    console.log("🚀 ~ file: SwapRequest.jsx:73 ~ onClickActions ~ event:", event?.id)
    
  //   var payload ={
  //     "project_id": rowdata?.projectId,
  //     "employee_id": rowdata?.employeeId,
  //     "status": parseInt( event?.id),          
  //  }
  // console.log(payload,"requestedddbodyyy")
  // const config = {
  //   method: 'POST',
  //   maxBodyLength:Infinity,
  //   url: baseUrl + `/updateTimesheetStatus`,
  //   // url: `https://27gq5020-3001.inc1.devtunnels.ms/erp/approveLeave`,
  //   data: payload
 
  // }
  // axios.request(config).then((response) => {
  //   enqueueSnackbar(response.data.Message,{variant:'success'})
  // })
  //   .catch((error) => {
  //     enqueueSnackbar(error.Message,{variant:'Error'})
  //     console.log(error);
  //   });
 
  }
  const actions = [
    
    { name: "Approve",  icon: "charm:circle-tick", id: "1", type: "serviceCall", endpoint: '/updateTimesheetStatus'},

    { name: "Reject", icon: "charm:circle-cross", id: "0", type: "serviceCall", endpoint: '/updateTimesheetStatus' },

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
 <AssignShift currentUser={{}} />
      </Dialog>
    )} */}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm    }>Assign Shift</Button> */}
{/* <Button className="button">Filter</Button>
<Button className="button">Report</Button> */}
</Container>
    <BasicTable
defaultPayload={defaultPayload}
headerData={TABLE_HEAD}
endpoint='/getallSwapDetails'
bodyData='data'
rowActions={actions}
onClickActions={onClickActions}
filterName='SwapRequestSearchFilter'
/>  
    </>
  );
}
