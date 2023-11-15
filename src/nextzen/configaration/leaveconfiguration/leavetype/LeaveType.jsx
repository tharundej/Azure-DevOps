import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dialog,Grid,TextField,InputAdornment, Snackbar, Alert} from '@mui/material';
import { Container } from '@mui/system';
import { BasicTable } from '../../../Table/BasicTable';
import Iconify from 'src/components/iconify/iconify';
import { useState } from 'react';

export default function LeaveType() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');  
  const [open, setOpen] = useState(false);
    const TABLE_HEAD = [
      { id: 'leaveName', label: 'Leave Name', type: 'text' , minWidth:180},
      { id: 'totalNumberOfLeaves', label: 'Total Number Of Leaves', type: 'text', minWidth:180 },
      { id: 'termType', label: 'Term Type', type: 'text', minWidth:180 },
      { id: 'elUpperCapLimit', label: 'EL Upper Cap Limit', type: 'text', minWidth:180 },
      { id: 'elTakenRange', label: 'EL Taken Range', type: 'text' , minWidth:180},
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];
    const defaultPayload = 
    {
      "companyID":"COMP4"
  };
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      handleEditAPICALL(rowdata, event);
    } else if (event?.name === 'Delete') {
      deleteFunction(rowdata, event);
    }
  };
  const deleteFunction = async (rowdata, event) => {
    console.log('iam here ');
    try {
      console.log(rowdata, 'rowData:::::');
      const data = {
          companyID:"COMP1",
          leavePeriodID: rowdata.leavePeriodID,
      };
      const response = await axios.post(baseUrl + '/deleteLeavePeriod', data);
      if(response?.data?.code===200  ){
        setSnackbarSeverity('success');
         setSnackbarMessage(response?.data?.message);
         setSnackbarOpen(true);
         handleClose()
      
      console.log('sucess', response);

      }
      if(response?.data?.code===400  ){
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
         setSnackbarOpen(true);
      
      console.log('sucess', response);

      }
    
  } catch (error) {
    setSnackbarSeverity('error');
    setSnackbarMessage('Error While Deleting Leave Type. Please try again.');
    setSnackbarOpen(true);
   console.log('error', error);
 }
  };

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
    const snackBarAlertHandleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    setSnackbarOpen(false)
      setOpen(true);
    };
    return (
      <>
      <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={snackBarAlertHandleClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Alert onClose={snackBarAlertHandleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
      {snackbarMessage}
    </Alert>
  </Snackbar>
        <BasicTable
          headerData={TABLE_HEAD}
          endpoint="/getLeaveType"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="LeaveTypeFilterSearch"
          onClickActions={onClickActions}
        />
        </>
    );
  }