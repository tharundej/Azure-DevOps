import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function LeavePeriod() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');  
  const [open, setOpen] = useState(false);
    const TABLE_HEAD = [
      { id: 'leavePeriodType', label: 'Leave Period Type', type: 'text', minWidth:280  },
      { id: 'startDate', label: 'Start Date', type: 'text', minWidth:280  },
      { id: 'endDate', label: 'End date', type: 'text', minWidth:180  },
    ];
    const actions = [
      { name: 'Edit', icon: 'hh', path: 'jjj' },
      { name: 'Delete', icon: 'hh', path: 'jjj' },
    ];

    const defaultPayload = 
    {
      "companyID":"COMP1",
      "count": 5,
      "page":0

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
    setSnackbarMessage('Error While Deleting Leave Period. Please try again.');
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
          endpoint="/getAllLeavePeriod"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName='LeavePeriodFilterSearch'
          onClickActions={onClickActions}
        />
      </>
    );
  }