import * as React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import { BasicTable } from '../Table/BasicTable';

import ApplyLoan from './ApplyLoan';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Loans() {
   
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
        { id: "No_Instalment", label: "No Instalment ", width: 100, type: "text" },
        { id: "Intrest_rate", label: "Intrest Rate", width: 100, type: "text" },
        { id: "Approver_name", label: " Approver Name", width: 100, type: "text" },
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

          No_Instalment: "122hour 40minutes",

          Intrest_rate: "Intrest_rate",
          Approver_name:"aswin",
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
 <ApplyLoan currentUser={{}} />
      </Dialog>
    )}
<hr style={ {height:'2px',margin:"20px",backgroundColor:"blac"}}/>
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  <Button className="button" onClick={handleTimeForm}>Apply Loan </Button>
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
