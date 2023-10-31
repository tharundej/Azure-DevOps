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
} from '@mui/material';
import GeneralForminfo from './GeneralForminfo';
// import useTheme from '@mui/material';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function BasicCard() {
  const TABLE_HEAD = [
    { id: 'employementType', label: 'Employee Type', type: 'text' },
    { id: 'payPcheduleType', label: 'Pay Schedule Type', type: 'text' },
    { id: 'basicPayPercentage', label: 'Basic Pay %', type: 'text' },
    { id: 'hraPercentage', label: 'HRA %', type: 'text' },
    { id: 'daPercentage', label: 'DA %', type: 'text' },
    {id: 'ltaPercentage',label:'LTA %',type:'text'},
    { id: 'employeePfPercentage', label: 'Employee PF %', type: 'text' },
    { id: 'employerPfPercentage', label: 'Employer PF %', type: 'text' },
    {id: 'esicPercentage', label: 'ESIC %', type: 'text' },
    { id: 'tdsPercentage', label: 'TDS %', type: 'text' },
  ];
  const actions = [
    { name: 'View', icon: 'hh', path: 'jjj' },
    { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
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
  const defaultPayload = 
  {
    "count": 3,
    "page": 1,
    "search": "",
    "companyId": "COMP1",
    "externalFilters": {
      "payscheduleType": "",
      "employmentType": ""
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
  return (
    <>
      <GeneralForminfo style={{ paddingTop: '10px' }} currentUser={{}} />
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="getallPaySchedule"
        defaultPayload={defaultPayload}
        rowActions={actions}
      />
    </>
  );
}
