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
import ApproveSwap from './ApproveSwap';

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

  
 const [approveShow  , setApproveShow]= useState(false)
//  const ApproveClose = ()=> setApproveShow(false)
const ApproveClose =() =>{
  setApproveShow(false)
}
 const [rowData,setRowData]= useState([])
 const [status,setStatus]= useState()
  const onClickActions=(rowdata,event)=>{
    if(event?.name==="Approve"){
      setApproveShow(true)
      setRowData(rowdata)
      setStatus(event.id)
      
    }
    else if(event?.name==="Reject"){
      setApproveShow(true)
      setStatus(event.id)
      
    }
  }

  const handleApproveAPICALL= (rowdata,event)=>{
    

  } 
  const actions = [
    
    { name: "Approve",  icon: "charm:circle-tick", id: "Approve", type: "serviceCall", endpoint: '/updateTimesheetStatus'},

    { name: "Reject", icon: "charm:circle-cross", id: "Reject", type: "serviceCall", endpoint: '/updateTimesheetStatus' },

  ];
    
    
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
    
  return (
    <>
    {
      approveShow &&
      <Dialog
      fullWidth
      maxWidth={false}
      open={approveShow}
      onClose={ApproveClose}
      PaperProps={{
        sx:{maxWidth:700, overflow:"hidden"}
      }}
      className="custom-dialog" 
      >
        <ApproveSwap currentUser={{}} ApproveClose={ApproveClose} status={status} rowData={rowData}   />
         </Dialog>
    }
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
