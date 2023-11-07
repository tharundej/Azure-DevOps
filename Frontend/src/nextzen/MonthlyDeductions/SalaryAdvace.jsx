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
import ReusableTabs from '../tabs/ReusableTabs';
import SalaryAdvanceForm from './SalaryAdvaceForm';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function SalaryAdvace() {
   
      const TABLE_HEAD = [

        {
    
          id: "Employe_name",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "Employe_name", label: "Employe Name", width: 180, type: "text" },
    
        { id: "Request_date", label: "request Date", width: 220, type: "text" },
    
        { id: "Request_amount", label: "Request Amount", width: 180, type: "text" },
    
        { id: "Paid_date", label: "Paid Date", width: 100, type: "text" },
        { id: "Paid_amount", label: "paid Amount", width: 100, type: "text" },
        { id: "Aprover_name", label: "Approver Name", width: 100, type: "text" },
        { id: "Comments", label: "Comments", width: 100, type: "text" },
        { id: "status", label: "status", width: 100, type: "text" },
        { id: "Payment_status", label: "Payment Status", width: 100, type: "text" },
    
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
    
          Employe_name: "Aswin!23",
    
          Request_date: "BellErp",
    
          Request_amount: "12/12/2023",
    
          Paid_date: "Coding",
    
          Working_Time: "2hour 40minutes",

          Aprover_name: "122hour 40minutes",

          Comments: "Comments",
          status: "Approved",
          Payment_status: "Approved",
          aswin: "Approved",
    
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
    'Page':parseInt(1,10),

    'Count':parseInt(5,10)
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
 <SalaryAdvanceForm currentUser={{}} />
      </Dialog>
    )}
<hr style={ {height:'2px',margin:"20px",backgroundColor:"blac"}}/>
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  <Button className="button" onClick={handleTimeForm}>Apply Salary Advance</Button>
<Button className="button">Filter</Button>
<Button className="button">Report</Button>
</Container>
    <BasicTable

headerData={TABLE_HEAD}
defaultPayload={defaultPayload}

endpoint='/listProject'

rowActions={actions}

/>  
    </>
  );
}
