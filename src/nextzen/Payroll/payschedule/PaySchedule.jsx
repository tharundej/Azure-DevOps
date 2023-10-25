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
    { id: 'employeeType', label: 'Employee Type', type: 'text' },
    { id: 'payscheduleType', label: 'Pay Schedule Type', type: 'text' },
    { id: 'basicPay', label: 'Basic Pay %', type: 'text' },
    { id: 'hra', label: 'HRA %', type: 'text' },
    { id: 'da', label: 'DA %', type: 'text' },
    {id: 'lta',label:'LTA %',type:'text'},
    { id: 'employeePf', label: 'Employee PF %', type: 'text' },
    { id: 'employerPf', label: 'Employer PF %', type: 'text' },
    {id: 'esic', label: 'ESIC %', type: 'text' },
    { id: 'tds', label: 'TDS %', type: 'text' },
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
      "companyId": "COMP1",
      "rowsPerPage": 10,
      "pageNum": 1,
      "filterBy": [],
      "sortOrder": ["asc"],
      "orderBy": ["pay_schedule_id"],
      "search": ""
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
        endpoint="getPaySchedule"
        defaultPayload={defaultPayload}
        rowActions={actions}
      />
    </>
  );
}
