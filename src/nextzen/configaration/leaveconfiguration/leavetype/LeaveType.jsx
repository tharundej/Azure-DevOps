import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dialog,Grid,TextField,InputAdornment, Snackbar, Alert} from '@mui/material';
import { Container } from '@mui/system';
import { BasicTable } from '../../../Table/BasicTable';
import Iconify from 'src/components/iconify/iconify';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

export default function LeaveType() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');  
  const [open, setOpen] = useState(false);
    const TABLE_HEAD = [
      { id: 'leaveTypeName', label: 'Leave Name', type: 'text' , minWidth:180},
      { id: 'totalNumberLeave', label: 'Total Number Of Leaves', type: 'text', minWidth:180 },
      { id: 'leavePeriodType', label: 'Term Type', type: 'text', minWidth:180 },
      { id: 'leaveTakeRange', label: 'Leave Take Range', type: 'text' , minWidth:180},
      { id: 'upperCapLimit', label: 'EL Upper Cap Limit', type: 'text', minWidth:180 },
    ];
    const actions = [
      { name: 'Edit', icon: 'hh', path: 'jjj' },
      { name: 'Delete', icon: 'hh', path: 'jjj' },
    ];
    const defaultPayload = 
    {
      "count": 5,
      "page": 0,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
          "leaveTypeName": "",
          "leavePeriodType": ""
      },
      "sort": {
          "key": 1,
          "orderBy": ""
      }
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
           leaveTypeID: rowdata.leaveTypeID,
      };
      const response = await axios.post( baseUrl+'/deleteLeaveType', data);
      if(response?.data?.code===200  ){
        setSnackbarSeverity('success');
         setSnackbarMessage(response?.data?.message);
         setSnackbarOpen(true);      
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
    autoHideDuration={4000}
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
          endpoint="/getallLeaveType"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="LeaveTypeFilterSearch"
          onClickActions={onClickActions}
        />
        </>
    );
  }