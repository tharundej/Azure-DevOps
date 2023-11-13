import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';

export default function Holidays() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');  
  const [open, setOpen] = useState(false);
    const TABLE_HEAD = [
      { id: 'holidayName', label: 'Holiday Name', type: 'text', minWidth:180 },
      { id: 'holidayDate', label: 'Holiday Date', type: 'text' , minWidth:180},
      { id: 'fulldayHalfday', label: 'Full Day/Half Day', type: 'text', minWidth:180 },
      { id: 'repeatAnnualy', label: 'Repeats Anually', type: 'text', minWidth:180 },
      { id: 'locationName', label: 'Locations', type: 'text', minWidth:180 },
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Delete', icon: 'hh', path: 'jjj' ,endpoint:'/'},
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
      "count":5,
      "page": 0,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
        "holidayName":"",
        "holidayDate": "",
        "repeatAnnualy": "",
        "fulldayHalfday": "",
        "locationName":""
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
             holidayID: rowdata.holidayID,
        };
        const response = await axios.post( 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/deleteHoliday', data);
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
          endpoint="/getallHoliday"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="holidaysFilterSearch"
          onClickActions={onClickActions}
        />
      </>
    );
  }