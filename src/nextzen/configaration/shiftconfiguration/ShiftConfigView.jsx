import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from '../../Table/BasicTable';
import instance from 'src/api/BaseURL';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Alert ,Snackbar} from '@mui/material';
import { useState } from 'react';

export default function ShiftConfigView() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const TABLE_HEAD = [
    { id: 'shiftName', label: 'Shift Name', type: 'text', minWidth: 180 },
    { id: 'startTime', label: 'Start Time', type: 'text', minWidth: 180 },
    { id: 'endTime', label: 'End Time', type: 'text', minWidth: 180 },
    { id: 'shiftTerm', label: 'Shift Term', type: 'text', minWidth: 180 },
    { id: 'locationName', label: 'Location Name', type: 'text', minWidth: 180 },
  ];

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
        shiftConfigId: rowdata.shiftConfigId,
      };
      const response = await axios.post(baseUrl + '/deleteShiiftConfig', data);
      if(response?.status===200){
        setSnackbarSeverity('success');
         setSnackbarMessage('Shift Configuration Deleted Succuessfully!');
         setSnackbarOpen(true);
      
      console.log('sucess', response);
      }
    } catch (error) {
       setSnackbarSeverity('error');
       setSnackbarMessage('Error While Deleting Shift Configuration. Please try again.');
       setSnackbarOpen(true);
      console.log('error', error);
    }
  };

  const actions = [
    { name: 'Edit', icon: 'hh', path: 'jjj', type: 'edit' },
    { name: 'Delete', icon: 'hh', path: 'jjj' },
  ];

  const defaultPayload = {
    companyId: 'COMP2',
    locationId: 34,
    count: 5,
    search: '',
    page: 0,
    limit: 5,
    externalFilters: {
      shiftTerm: '',
      shiftName: '',
      startTime: '',
      endTime: '',
    },
    sort: {
      key: 0,
      orderBy: '',
    },
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
      endpoint="/getALLShiftConfig"
      defaultPayload={defaultPayload}
      rowActions={actions}
      onClickActions={onClickActions}
      filterName="ShiftConfigurationFilterSearch"
    />
    </>
  );
}
