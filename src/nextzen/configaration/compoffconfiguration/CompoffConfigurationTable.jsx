import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

export default function CompoffConfigurationTable() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');  
  const [open, setOpen] = useState(false);
    const TABLE_HEAD = [
      { id: 'compensantoryPolicies', label: 'Compensatory', type: 'text', minWidth:180 },
      { id: 'expiryDays', label: 'Expiry Days', type: 'text' , minWidth:180},
      { id: 'amount', label: 'Amount', type: 'text' , minWidth:180},
    ];
    const actions = [
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
      { name: 'Delete', icon: 'hh', path: 'jjj' },
    ];
    // const bodyContent = [
    //   {
    //     employeeType: 'Permanent',
    //     payscheduleType: 'Weekly',
    //     payType: 'CTC',
    //     basicPay: '40',
    //     hra: '20',
    //     da: '8',
    //     employeePf: '6',
    //     employerPf: '6',
    //     tds: '20',
    //   },
    // ];
    const defaultPayload = 
    {
      "count": 5,
      "page": 0,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
        "compensantoryPolicies": ""
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
             compensantoryConfigurationID: rowdata.compensantoryConfigurationID,
        };
        const response = await axios.post( baseUrl+'/deleteCompensantoryConfiguration', data);
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
    const snackBarAlertHandleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    setSnackbarOpen(false)
      setOpen(true);
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
          endpoint="/getallCompensantoryConfiguration"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="CompoffFilterSearch"
          onClickActions={onClickActions}
        />
      </>
    );
  }