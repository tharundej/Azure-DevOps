import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { _userList } from 'src/_mock';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify/iconify';

import {
  TextField,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Grid,
  useTheme,
  Snackbar,
  Alert,
  Dialog,
} from '@mui/material';
import GeneralForminfo from './GeneralForminfo';
import PayScheduleform from './PayScheduleform';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import EditPaySchedule from './EditPaySchedule';
import { button } from 'src/theme/overrides/components/button';
// import useTheme from '@mui/material';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function BasicCard() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const TABLE_HEAD = [
    { id: 'employementType', label: 'Employee Type', type: 'text', minWidth: 140 },
    { id: 'payPcheduleType', label: 'Pay Schedule Type', type: 'text', minWidth: 140 },
    { id: 'basicPayPercentage', label: 'Basic Pay %', type: 'text', minWidth: 120 },
    { id: 'hraPercentage', label: 'HRA %', type: 'text', minWidth: 100 },
    { id: 'daPercentage', label: 'DA %', type: 'text', minWidth: 100 },
    { id: 'ltaPercentage', label: 'LTA %', type: 'text', minWidth: 100 },
    { id: 'employeePfPercentage', label: 'Employee PF %', type: 'text', minWidth: 100 },
    { id: 'employerPfPercentage', label: 'Employer PF %', type: 'text', minWidth: 100 },
    { id: 'esicPercentage', label: 'ESIC %', type: 'text', minWidth: 100 },
    { id: 'tdsPercentage', label: 'TDS %', type: 'text', minWidth: 100 },
  ];
  const actions = [
    {
      name: 'Delete',
      icon: 'hh',
      path: 'jjj',
      type: 'serviceCall',
      endpoint: '/updateTimesheetStatus',
    },
    { name: 'Edit', icon: 'hh', id: '1', type: 'serviceCall', endpoint: '/updateTimesheetStatus' },
  ];
  const bodyContent = [
    {
      employeeType: 'Permanent',
      payscheduleType: 'Weekly',
      payType: 'CTC',
      basicPay: '40',
      hra: '20',
      da: '8',
      employeePf: '6',
      employerPf: '6',
      tds: '20',
    },
  ];
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyId: 'COMP1',
    externalFilters: {
      payscheduleType: '',
      employmentType: '',
      basicPayPercentage: '',
      hraPercentage: '',
      daPercentage: '',
      ltaPercentage: '',
      employerPfPercentage: '',
      employeePfPercentage: '',
      esicPercentage: '',
      tdsPercentage: '',
    },
    sort: {
      key: 1,
      orderBy: '',
    },
  };

  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      buttonFunction(rowdata, event);
    } else if (event?.name === 'Delete') {
      deleteFunction(rowdata, event);
    }
  };
  const buttonFunction = (rowdata) => {
    setShowEdit(true);
    setEditData(rowdata);
    console.log(rowdata, 'rowdataaaaaaaaaaaaaa');
  };
  const deleteFunction = async (rowdata, event) => {
    console.log('iam here ');
    try {
      console.log(rowdata, 'rowData:::::');
      const data = {
        companyId: 'COMP1',
        payScheduleID: JSON.parse(rowdata.payScheduleId, 10),
      };
      const response = await axios.post(baseUrl + '/deletePaySchedule', data);
      if (response?.data?.code === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
      if (response?.data?.code === 400) {
        setSnackbarSeverity('success');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Deleting Pay Schedule. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  };

  const [showEdit, setShowEdit] = useState(false);
  const [tableEDitData, SetTableEditData] = useState({});
  const handleEditClose = () => setShowEdit(false);

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
    setSnackbarOpen(false);
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
        <Alert
          onClose={snackBarAlertHandleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {showEdit && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={showEdit}
          onClose={handleEditClose}
          PaperProps={{
            sx: { maxWidth: 770, overflow: 'hidden' },
          }}
          className="custom-dialog"
        >
          <EditPaySchedule
            currentUser={{}}
            handleClose={handleEditClose}
            tableEDitData={editData}
          />
        </Dialog>
      )}
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getallPaySchedule"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="PayScheduleFilterSearch"
        onClickActions={onClickActions}
        //  bodyData='data'
        // buttonFunction={buttonFunction}
      />
    </>
  );
}
