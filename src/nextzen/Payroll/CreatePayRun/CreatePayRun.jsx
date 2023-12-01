import * as React from 'react';

import {Box,FormControl,Button,Typography,Grid,Paper,Stack,InputLabel,MenuItem,ListItemText,Select,InputAdornment,TextField,IconButton} from '@mui/material';

import './createPayRun.css';

import { BasicTable } from 'src/nextzen/Table/BasicTable';

import { Icon } from '@iconify/react';

import Iconify from 'src/components/iconify/iconify';

import PropTypes from 'prop-types';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function CreatePayRun({ moveToPageFunction  ,employmentType}) {
  const TABLE_HEAD = [
    { id: 'employementType', label: 'Employee Type', type: 'text' },

    { id: 'employeeName', label: 'Employee Name', type: 'text' },

    { id: 'employeeID', label: 'Employee id', type: 'text' },

    // { id: 'salaryMonth', label: 'Salary', type: 'text' },

    { id: 'ctcOfYear', label: 'CTC Of Year', type: 'text' },

    { id: 'ctcOfMonth', label: 'CTC Of Month', type: 'text' },
    { id: 'basicMonthSalary', label: 'Basic Of Month', type: 'text' },
    { id: 'hra', label: 'HRA', type: 'text' },
    { id: 'lta', label: 'LTA', type: 'text' },
    { id: 'esic', label: 'ESIC  Amount', type: 'text' },
    { id: 'tds', label: 'TDS', type: 'text' },
    { id: 'specialAllowance', label: 'Spacial Alowance', type: 'text' },

    { id: 'conveyanceAllowance', label: 'Conveyance Alowance', type: 'text' },
    { id: 'medicalAllowance', label: 'Medical Allowance', type: 'text' },
    // { id: 'professionalTax', label: 'Professional Tax', type: 'text' },

    { id: 'employeePF', label: 'Employee PF', type: 'text' },

    { id: 'employerPF', label: 'Employer PF', type: 'text' },
  
    { id: 'totalGrossPay', label: 'Gross Pay', type: 'text' },
  ];


  const actions = [
    { name: 'Approve', icon: 'hh', path: 'jjj' },

    { name: 'View', icon: 'hh', path: 'jjj' },

    { name: 'Edit', icon: 'hh', path: 'jjj' },
  ];
  const defaultPayload = 
  {
      page:0,
      count:5,
      companyID:"JSON.parse(localStorage.getItem('userDetails'))?.companyID,",
      employementType:employmentType,
      sort:{
          key:1,
          orderBy:""
      }        
  }

  const bodyContent = [
    {
      employeeType: 'Permanent',
      employeeName: 'benak',
      employeeid: '123',
      salaryMonth: 'August',
      CTCOfYear: '4,80,000',
      CTCOfMonth: '40,000',
      basicofMonth: '16,000',

      basicPay: '32000',

      hra: '20000',

      da: '1400',
      lta: '1600',
      specialAllowance: '2000',

      employeePf: '2000',
      conveyanceAllowance: '7400',
      professionalTax: '250',
      esic: '1000',
      grosspay: '40000',
      employerPf: '2000',

      tds: '1800',
      medicalAllowance: '2000',
    },
    {
      employeeType: 'Permanent',
      employeeName: 'benak',
      employeeid: '123',
      salaryMonth: 'August',
      CTCOfYear: '4,80,000',
      CTCOfMonth: '40,000',
      basicofMonth: '16,000',

      basicPay: '32000',

      hra: '20000',

      da: '1400',
      lta: '1600',
      specialAllowance: '2000',

      employeePf: '2000',
      conveyanceAllowance: '7400',
      professionalTax: '250',
      esic: '1000',
      grosspay: '40000',
      employerPf: '2000',

      tds: '1800',
      medicalAllowance: '2000',
    },
    {
      employeeType: 'Permanent',
      employeeName: 'benak',
      employeeid: '123',
      salaryMonth: 'August',
      CTCOfYear: '4,80,000',
      CTCOfMonth: '40,000',
      basicofMonth: '16,000',

      basicPay: '32000',

      hra: '20000',

      da: '1400',
      lta: '1600',
      specialAllowance: '2000',

      employeePf: '2000',
      conveyanceAllowance: '7400',
      professionalTax: '250',
      esic: '1000',
      grosspay: '40000',
      employerPf: '2000',

      tds: '1800',
      medicalAllowance: '2000',
    },
  ];
  const [personName, setPersonName] = React.useState();

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const moveToPage = (event) => {
    // console.log
    moveToPageFunction(event);
  };
  return (
    <Box>
     <Grid container spacing={3}>
     <Grid xs={12} md={6} lg={4}>
  <Stack
    direction="column"
    // alignItems="center"
    // justifyContent="center"
    sx={{
      p: 3,
      px: 3,ml:3,mt:3,
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
      color: 'common.white',
      bgcolor: `primary.dark`,
      minHeight:"16vh"
    }}
  >
   {/* Heading */}
      <Typography
      variant="subtitle2"
      sx={{
        color: 'inherit',
        textAlign:"left !important",
        marginBottom:"16px",
         opacity:"0.64"
      }}
    >
      Period : 01/08/2023 to 31/08/2023
    </Typography>

    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <div>
        <ListItemText 
          primary="11,22093802"
          secondary="Payroll Cost"
          primaryTypographyProps={{
            typography: 'subtitle2',
            component: 'span',
            sx: { textAlign: 'center' },
          }}
          secondaryTypographyProps={{
            color: 'inherit',
            component: 'span',
            sx: { opacity: 0.64 },
            typography: 'h6',
          }}
        />
      </div>

      <div>
        <ListItemText
          sx={{ ml: 3 }}
          primary="2,500"
          secondary="Employee's Gross Pay"
          primaryTypographyProps={{
            typography: 'subtitle2',
            component: 'span',
            sx: { textAlign: 'center' },
          }}
          secondaryTypographyProps={{
            color: 'inherit',
            component: 'span',
            sx: { opacity: 0.64 },
            typography: 'h6',
          }}
        />
      </div>


      <Iconify
        icon="raphael:dollar"
        sx={{
          width: 112,
          right: -32,
          height: 112,
          opacity: 0.08,
          position: 'absolute',
        }}
      />
    </div>
     
  </Stack>
</Grid>
    <Grid xs={12} md={6} lg={4}>
  <Stack
    direction="column"
    sx={{
      p: 3,
      px: 3,ml:3,mt:3,
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
      color: 'common.white',
      bgcolor: `primary.dark`,
      minHeight:"16vh"
    }}
  >
   {/* Heading */}
      <Typography
      variant="subtitle2"
      sx={{
        color: 'inherit',
        textAlign:"left !important",
        opacity:"0.64"
      }}
    >
     Tax Deductions
    </Typography>

    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
 
 
 <Typography
    variant="subtitle2"
    
  >
    Taxes
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
  
  >
    Prs-Tax Deductions
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
    
  >
    Post-Tax Deductions
  </Typography>

  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: "3px" }}>
    <Typography
    variant="subtitle2"
    
  >
    11,34,023.09
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
   
  >
   14,023.49
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
    
  >
   34,023.00
  </Typography>

  </div>


      <Iconify
        icon="raphael:dollar"
        sx={{
          width: 112,
          right: -32,
          height: 112,
          opacity: 0.08,
          position: 'absolute',
        }}
      />
    </div>
     
  </Stack>
</Grid>
      </Grid>
      {/* from ai  */}
     
      {console.log(bodyContent, 'body content', actions)}
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getPayRunDetailsContract"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="HrTabFilter"
      />

    </Box>
  );
}
CreatePayRun.propTypes = {
  moveToPageFunction: PropTypes.any,
};
