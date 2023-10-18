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

export default function Deduction() {
   
      const TABLE_HEAD = [

        {
    
          id: "Employe_name",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "Employe_name", label: "Employe Name", width: 180, type: "text" },
    
        { id: "Dedution_type", label: "Dedution type", width: 220, type: "text" },
    
        { id: "Taken_amount", label: "Taken Amount", width: 180, type: "text" },
    
        { id: "Paid_date", label: "Paid Date", width: 100, type: "text" },
        { id: "Paid_amount", label: "paid Amount", width: 100, type: "text" },
        { id: "Instalment_no", label: "Instalment No ", width: 100, type: "text" },
        { id: "Intrest_rate", label: "Intrest rate", width: 100, type: "text" },
        { id: "Dedution_from", label: "Dedution From", width: 100, type: "text" },
        { id: "Dedution_date", label: " Dedution_date", width: 100, type: "text" },
        { id: "Dedution_amount", label: "Dedution amount ", width: 100, type: "text" },
        { id: "Balence_amount", label: "Balence amount ", width: 100, type: "text" },
        { id: "Comment", label: "Comment", width: 100, type: "text" },
    
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
    
          Dedution_type: "BellErp",
    
          Taken_amount: "12/12/2023",
    
          Paid_date: "Coding",
    
          Working_Time: "2hour 40minutes",

          Instalment_no: "122hour 40minutes",

          Intrest_rate: "Intrest_rate",
          Dedution_from: "Approved",
          Dedution_date: "Approved",
          Dedution_amount: "100000",
          Balence_amount: "20000",
          Comment: "Approved",
    
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
 <SalaryAdvanceForm currentUser={{}} />
      </Dialog>
    )} */}
<hr style={ {height:'2px',margin:"20px",backgroundColor:"blac"}}/>
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm}>Apply Salary Advance</Button> */}
<Button className="button">Filter</Button>
<Button className="button">Report</Button>
</Container>
    <BasicTable

headerData={TABLE_HEAD}
defaultPayload={defaultPayload}

endpoint='listProject'

rowActions={actions}

/>  
    </>
  );
}
