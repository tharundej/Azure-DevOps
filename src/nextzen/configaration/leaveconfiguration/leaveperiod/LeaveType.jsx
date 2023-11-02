import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';
import { Container } from '@mui/system';
import { BasicTable } from '../../../Table/BasicTable';
import LeaveTypeForm from './LeaveTypeForm';

export default function LeaveType() {
    const TABLE_HEAD = [
      { id: 'slNo', label: 'SL NO', type: 'text' },
      { id: 'leaveTypeId', label: 'Leave Type ID', type: 'text' },
      { id: 'leaveName', label: 'Leave Name', type: 'text' },
      { id: 'startDate', label: 'Start Date', type: 'text' },
      { id: 'totalNumberOfLeaves', label: 'Total Number Of Leaves', type: 'text' },
      { id: 'termType', label: 'Term Type', type: 'text' },
      { id: 'elUpperCapLimit', label: 'EL Upper Cap Limit', type: 'text' },
      { id: 'elTakenRange', label: 'EL Taken Range', type: 'text' },
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];
    const defaultPayload = 
    {
      "count": 5,
      "page": 1,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
        "payscheduleType": "",
        "employmentType": "",
        "basicPayPercentage":"",
        "hraPercentage":"",
        "daPercentage":"",
        "ltaPercentage":"",
        "employerPfPercentage":"",
        "employeePfPercentage":"",
        "esicPercentage":"",
        "tdsPercentage":""
      },
      "sort": {
        "key": 1,
        "orderBy": ""
      }
    };
     
     
    // const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
    // const tabContents = [
    //   <div>Tab 1 Content</div>,
    //   <div>Tab 2 Content</div>,
    //   <div>Tab 3 Content</div>,
    // ];
    const [isLargeDevice, setIsLargeDevice] = React.useState(window.innerWidth > 530);
  
    React.useEffect(() => {
      const handleResize = () => {
        setIsLargeDevice(window.innerWidth > 530);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    const [showForm, setShowForm] = React.useState  (false);
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
        <LeaveTypeForm currentUser={{}} />
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
          endpoint=""
          defaultPayload={defaultPayload}
          rowActions={actions}
        />
      </>
    );
  }